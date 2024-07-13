import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from "custom-card-helpers";

export interface KanjiClockCardConfigOptions {
  use_24h?: boolean;
  invert_date?: boolean;
  short_weekdays?: boolean;
  kanji_numbers?: boolean;
}

export interface KanjiClockCardConfig extends LovelaceCardConfig, KanjiClockCardConfigOptions {
  type: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "kanji-clock-card-editor": LovelaceCardEditor;
    "hui-error-card": LovelaceCard;
  }
}
