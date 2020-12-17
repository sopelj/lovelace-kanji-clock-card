import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

export interface KanjiClockCardConfig extends LovelaceCardConfig {
  type: string;
  use_24h?: boolean;
  invert_date?: boolean;
  short_weekdays?: boolean;
  kanji_numbers?: boolean;
}

declare global {
  interface Window {
    customCards: Array<object>;
  }
  interface HTMLElementTagNameMap {
    'kanji-clock-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}
