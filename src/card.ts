import { LitElement, html, type TemplateResult, css } from "lit";
import { type HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import type { KanjiClockCardConfig, KanjiClockCardConfigOptions } from "./types";
import { KANJI_WEEKDAYS } from "./const";
import { convertNumberToKanji } from "./utils";
import { property, state } from "lit/decorators.js";

const isBoolean = (val?: boolean): boolean => val === false || val === true;

export class KanjiClockCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("kanji-clock-card-editor");
  }

  public static getStubConfig(): KanjiClockCardConfigOptions {
    return {
      use_24h: false,
      invert_date: false,
      short_weekdays: true,
      kanji_numbers: false,
    };
  }

  private _handle = 0;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: KanjiClockCardConfig;

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
      name: "Kanji Clock",
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
    return convertNumberToKanji(number);
  }

  protected render(): TemplateResult {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const day = this.numberToKanji(date.getDate());
    const year = this.numberToKanji(date.getFullYear());
    const month = this.numberToKanji(date.getMonth() + 1);
    let pm = "";

    if (!this.config.use_24h) {
      if (hours > 12) {
        hours -= 12;
      }
      pm = hours >= 12 ? "午前" : "午後";
    }

    let minutesText: string;
    if (!this.config.use_24h && minutes === 0) {
      minutesText = "";
    } else if (minutes === 30) {
      minutesText = "半";
    } else {
      minutesText = `${this.numberToKanji(minutes)}分`;
    }

    let dateDisplay = this.config.invert_date === true ? `${day}日${month}月${year}年` : `${year}年${month}月${day}日`;

    const weekdayKanji = KANJI_WEEKDAYS[date.getDay()];
    dateDisplay += " " + (this.config.short_weekdays ? `(${weekdayKanji})` : `${weekdayKanji}曜日`);

    return html`
      <ha-card>
        <div class="content" id="content">
          <div class="time"><span>${pm}</span>${this.numberToKanji(hours)}時${minutesText}</div>
          <div class="date">${dateDisplay}</div>
        </div>
      </ha-card>
    `;
  }

  static readonly cardSize = 3;

  static readonly styles = css`
    .content {
      padding: 1.5rem;
      text-align: center;
      font-family: "Sarasa UI J", "Noto Sans JP", Helvetica, Arial, sans-serif;
    }
    .time {
      font-size: 3.2rem;
      line-height: 1em;
      font-weight: 400;
      line-height: 1em;
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
