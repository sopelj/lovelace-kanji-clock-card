import { LitElement, html, customElement, property, CSSResult, TemplateResult, css } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';

import { KanjiClockCardConfig } from './types';
import { KANJI_NUMBERS, KANJI_WEEKDAYS, TENS } from './const';

(window as Window).customCards = (window as Window).customCards || [];
(window as Window).customCards.push({
  type: 'kanji-clock-card',
  name: 'Kanji Clock Card',
  description: 'A simple clock widget using Japanese Kanji for time and date',
});

@customElement('kanji-clock-card')
export class KanjiClockCard extends LitElement {
  private _handle = 0;

  @property() public hass!: HomeAssistant;
  @property() private _config!: KanjiClockCardConfig;

  public connectedCallback(): void {
    super.connectedCallback();
    this._handle = window.setInterval(this.requestUpdate.bind(this), 500);
  }

  public disconnectedCallback(): void {
    clearInterval(this._handle);
  }

  public setConfig(config: KanjiClockCardConfig): void {
    this._config = {
      name: 'Kanji Clock',
      ...config,
    };
  }

  protected numberToKanji(number: number): string {
    if (this._config.kanji_numbers !== true) {
      return number.toString();
    }

    let output = '';
    const length = number.toString().length;
    for (let i = length - 1; i >= 0; i--) {
      const divisor = Math.pow(10, i);
      const num = number % divisor;
      const prefix = Math.floor(number / divisor);
      if (prefix > 1 && prefix < 10) {
        output += KANJI_NUMBERS[prefix];
      }
      if (prefix > 0) {
        output += TENS[i];
      }
      if (num > 0 && num < 10) {
        output += KANJI_NUMBERS[num];
      }
    }
    return output;
  }

  protected render(): TemplateResult | void {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const day = this.numberToKanji(date.getDate());
    const year = this.numberToKanji(date.getFullYear());
    const month = this.numberToKanji(date.getMonth() + 1);
    let pm = '';
    const weeksuffix = this._config.short_weekdays ? '曜日' : '';

    if (this._config.use_24h !== true) {
      if (hours > 12) {
        hours -= 12;
      }
      pm = hours >= 12 ? '午前' : '午後';
    }

    let minutesText;
    if (this._config.use_24h !== true && minutes === 0) {
      minutesText = '';
    } else if (minutes === 30) {
      minutesText = '半';
    } else {
      minutesText = `${this.numberToKanji(minutes)}分`;
    }

    return html`
      <ha-card>
        <div class="content" id="content">
          <div class="time"><span>${pm}</span>${this.numberToKanji(hours)}時${minutesText}</div>
          <div class="date">
            ${day}日${month}月${year}年 (${KANJI_WEEKDAYS[date.getDay()]}${weeksuffix})
          </div>
        </div>
      </ha-card>
    `;
  }

  static get cardSize(): number {
    return 3;
  }

  static get styles(): CSSResult {
    return css`
      .content {
        padding: 1.5rem;
        text-align: center;
        font-family: 'Sarasa UI J', 'Noto Sans JP', Helvetica, Arial, sans-serif;
      }
      .time {
        font-size: 3.2rem;
        line-height: 1em;
        font-weight: 400;
        line-height: 1em;
        font-weight: 400;
        padding-bottom: 0.2em;
        color: var(--primary-text-color);
      }
      .time span {
        font-weight: 300;
        color: var(--secondary-text-color);
      }
      .date {
        color: var(--primary-color);
        font-size: var(--paper-font-headline_-_font-size);
      }
    `;
  }
}
