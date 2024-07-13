import { KanjiClockCard } from "./card";
import { KanjiClockCardEditor } from "./editor";

declare global {
  interface Window {
    customCards: object[];
  }
}

customElements.define("kanji-clock-card", KanjiClockCard);
customElements.define("kanji-clock-card-editor", KanjiClockCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "kanji-clock-card",
  name: "Kanji Clock Card",
  description: "A simple clock widget using Japanese Kanji for time and date",
});
