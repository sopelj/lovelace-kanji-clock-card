import { describe, test, expect } from "vitest";
import { convertNumberToKanji } from "../src/utils";

describe("Test Utilities", () => {
  test("Ensure years are handles correctly", () => {
    expect(convertNumberToKanji(2024)).toBe("二千二十四");
    expect(convertNumberToKanji(2124)).toBe("二千百二十四");
    expect(convertNumberToKanji(2224)).toBe("二千二百二十四");
  });

  test("Ensure days are handles correctly", () => {
    expect(convertNumberToKanji(24)).toBe("二十四");
    expect(convertNumberToKanji(22)).toBe("二十二");
    expect(convertNumberToKanji(21)).toBe("二十一");
    expect(convertNumberToKanji(1110)).toBe("千百十");
    expect(convertNumberToKanji(2224)).toBe("二千二百二十四");
  });

  test("Check tens", () => {
    expect(convertNumberToKanji(1)).toBe("一");
    expect(convertNumberToKanji(10)).toBe("十");
    expect(convertNumberToKanji(100)).toBe("百");
    expect(convertNumberToKanji(1000)).toBe("千");
    expect(convertNumberToKanji(10000)).toBe("一万");
  });
});
