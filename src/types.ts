import { LovelaceCardConfig } from 'custom-card-helpers';

export interface KanjiClockCardConfig extends LovelaceCardConfig {
  type: string;
  use_24h?: boolean;
  short_weekdays?: boolean;
  kanji_numbers?: boolean;
}

declare global {
  interface Window {
    customCards: Array<object>;
  }
}
