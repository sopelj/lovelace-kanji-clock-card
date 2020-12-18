/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import {
  LitElement,
  customElement,
  property,
  internalProperty,
  html,
  TemplateResult,
  css,
  CSSResult,
} from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';

import { KanjiClockCardConfig } from './types';

@customElement('kanji-clock-card-editor')
export class KanjiClockCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: KanjiClockCardConfig;

  public setConfig(config: KanjiClockCardConfig): void {
    this._config = config;
  }

  public configChanged(newConfig: KanjiClockCardConfig): void {
    if (!this._config || !this.hass) {
      return;
    }
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  get _use_24h(): boolean {
    return this._config?.use_24h || false;
  }

  get _invert_date(): boolean {
    return this._config?.invert_date || false;
  }

  get _short_weekdays(): boolean {
    return this._config?.short_weekdays || true;
  }

  get _kanji_numbers(): boolean {
    return this._config?.kanji_numbers || false;
  }

  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="options">
          <div class="option">
            <ha-switch
              .checked=${this._use_24h}
              .configValue="${'use_24h'}"
              @change="${this._valueChanged}"
            ></ha-switch>
            <span class="label">Use 24 Clock</span>
          </div>
          <div class="option">
            <ha-switch
              .checked=${this._invert_date}
              .configValue="${'invert_date'}"
              @change="${this._valueChanged}"
            ></ha-switch>
            <span class="label">Invert date order</span>
            <span class="help">Use d日m月Y年 instead of the standard Y年m月d日</span>
          </div>
          <div class="option">
            <ha-switch
              .checked=${this._short_weekdays}
              .configValue="${'short_weekdays'}"
              @change="${this._valueChanged}"
            ></ha-switch>
            <span class="label">Use short weekdateformat</span>
            <span class="help">eg. (火) instead of 火曜日</span>
          </div>
          <div class="option">
            <ha-switch
              .checked=${this._kanji_numbers}
              .configValue="${'kanji_numbers'}"
              @change="${this._valueChanged}"
            ></ha-switch>
            <span class="label">Show numbers as Kanji</span>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .options {
        display: grid;
      }

      .option {
        display: flex;
        margin: 1rem 0;
        align-items: center;
      }

      .option .label {
        margin: 0 1rem;
      }

      .option .help {
        color: var(--secondary-text-color);
      }
    `;
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }
}
