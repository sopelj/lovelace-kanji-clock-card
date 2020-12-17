import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  internalProperty,
} from 'lit-element';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import { KanjiClockCardConfig } from './types';
import { KANJI_NUMBERS, KANJI_WEEKDAYS, TENS } from './const';

import './editor';

(window as Window).customCards = (window as Window).customCards || [];
(window as Window).customCards.push({
  type: 'kanji-clock-card',
  name: 'Kanji Clock Card',
  description: 'A simple clock widget using Japanese Kanji for time and date',
});

const isBoolean = (val?: boolean): boolean => val === false || val === true;

@customElement('kanji-clock-card')
export class KanjiClockCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('kanji-clock-card-editor');
  }

  public static getStubConfig(): object {
    return {
      use_24h: false,
      invert_date: false,
      short_weekdays: true,
      kanji_numbers: false,
    };
  }

  private _handle = 0;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @internalProperty() private config!: KanjiClockCardConfig;

  public connectedCallback(): void {
    super.connectedCallback();
    this._handle = window.setInterval(this.requestUpdate.bind(this), 500);
  }

  public disconnectedCallback(): void {
    clearInterval(this._handle);
  }

  public setConfig(config: KanjiClockCardConfig): void {
    this.config = {
      ...config,
      name: 'Kanji Clock',
      use_24h: isBoolean(config.use_24h) ? config.use_24h : false,
      invert_date: isBoolean(config.invert_date) ? config.invert_date : false,
      short_weekdays: isBoolean(config.short_weekdays) ? config.short_weekdays : true,
      kanji_numbers: isBoolean(config.kanji_numbers) ? config.kanji_numbers : false,
    };
  }

  protected numberToKanji(number: number): string {
    if (this.config.kanji_numbers !== true) {
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

    if (!this.config.use_24h) {
      if (hours > 12) {
        hours -= 12;
      }
      pm = hours >= 12 ? '午前' : '午後';
    }

    let minutesText: string;
    if (!this.config.use_24h && minutes === 0) {
      minutesText = '';
    } else if (minutes === 30) {
      minutesText = '半';
    } else {
      minutesText = `${this.numberToKanji(minutes)}分`;
    }

    let dateDisplay = this.config.invert_date === true ? `${day}日${month}月${year}年` : `${year}年${month}月${day}日`;

    const weekdayKanji = KANJI_WEEKDAYS[date.getDay()];
    dateDisplay += ' ' + (this.config.short_weekdays ? `(${weekdayKanji})` : `${weekdayKanji}曜日`);

    return html`
      <ha-card>
        <div class="content" id="content">
          <div class="time"><span>${pm}</span>${this.numberToKanji(hours)}時${minutesText}</div>
          <div class="date">${dateDisplay}</div>
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
