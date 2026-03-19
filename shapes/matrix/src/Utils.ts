import {
  type IShapeDrawData,
  type Particle,
  double,
  getRandom,
  getRangeMax,
  getRangeMin,
  originPoint,
} from "@tsparticles/engine";
import type { IMatrixOptions } from "./IMatrixOptions.js";

/**
 * Pool of Matrix-style characters: katakana, digits, Latin letters
 */
export const matrixChars: string[] = [
  // Katakana (base)
  "\u30A2", // ア
  "\u30A4", // イ
  "\u30A6", // ウ
  "\u30A8", // エ
  "\u30AA", // オ
  "\u30AB", // カ
  "\u30AD", // キ
  "\u30AF", // ク
  "\u30B1", // ケ
  "\u30B3", // コ
  "\u30B5", // サ
  "\u30B7", // シ
  "\u30B9", // ス
  "\u30BB", // セ
  "\u30BD", // ソ
  "\u30BF", // タ
  "\u30C1", // チ
  "\u30C4", // ツ
  "\u30C6", // テ
  "\u30C8", // ト
  "\u30CA", // ナ
  "\u30CB", // ニ
  "\u30CC", // ヌ
  "\u30CD", // ネ
  "\u30CE", // ノ
  "\u30CF", // ハ
  "\u30D2", // ヒ
  "\u30D5", // フ
  "\u30D8", // ヘ
  "\u30DB", // ホ
  "\u30DE", // マ
  "\u30DF", // ミ
  "\u30E0", // ム
  "\u30E1", // メ
  "\u30E2", // モ
  "\u30E4", // ヤ
  "\u30E6", // ユ
  "\u30E8", // ヨ
  "\u30E9", // ラ
  "\u30EA", // リ
  "\u30EB", // ル
  "\u30EC", // レ
  "\u30ED", // ロ
  "\u30EF", // ワ
  "\u30F2", // ヲ
  "\u30F3", // ン
  // Katakana dakuten / handakuten
  "\u30AC", // ガ
  "\u30AE", // ギ
  "\u30B0", // グ
  "\u30B2", // ゲ
  "\u30B4", // ゴ
  "\u30B6", // ザ
  "\u30B8", // ジ
  "\u30BA", // ズ
  "\u30BC", // ゼ
  "\u30BE", // ゾ
  "\u30C0", // ダ
  "\u30C2", // ヂ
  "\u30C5", // ヅ
  "\u30C7", // デ
  "\u30C9", // ド
  "\u30D0", // バ
  "\u30D3", // ビ
  "\u30D6", // ブ
  "\u30D9", // ベ
  "\u30DC", // ボ
  "\u30D1", // パ
  "\u30D4", // ピ
  "\u30D7", // プ
  "\u30DA", // ペ
  "\u30DD", // ポ
  // Small katakana
  "\u30A1", // ァ
  "\u30A3", // ィ
  "\u30A5", // ゥ
  "\u30A7", // ェ
  "\u30A9", // ォ
  "\u30E3", // ャ
  "\u30E5", // ュ
  "\u30E7", // ョ
  "\u30C3", // ッ
  // Long vowel mark
  "\u30FC", // ー
  // Extra katakana
  "\u30F4", // ヴ
  // Digits (ASCII)
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  // Full-width digits
  "\uFF10", // ０
  "\uFF11", // １
  "\uFF12", // ２
  "\uFF13", // ３
  "\uFF14", // ４
  "\uFF15", // ５
  "\uFF16", // ６
  "\uFF17", // ７
  "\uFF18", // ８
  "\uFF19", // ９
  // Latin letters (uppercase)
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  // Kanji
  "\u65E5", // 日
  "\u672C", // 本
  "\u4EBA", // 人
  "\u5927", // 大
  "\u4E2D", // 中
  "\u5C0F", // 小
  "\u4E0A", // 上
  "\u4E0B", // 下
  "\u5DE6", // 左
  "\u53F3", // 右
  "\u529B", // 力
  "\u6642", // 時
  "\u7A7A", // 空
  "\u751F", // 生
  "\u6B7B", // 死
  "\u7121", // 無
  "\u6709", // 有
  // Symbols
  "!",
  "@",
  "#",
  "$",
  "%",
  "&",
  "*",
  "+",
  "-",
  "=",
  "?",
  "/",
  "\\",
  "|",
  "<",
  ">",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
];

/**
 * Per-particle state stored in a WeakMap to avoid polluting the particle object.
 */
interface MatrixCharState {
  /** Currently displayed character */
  char: string;
  /** Accumulated time since last character change (ms) */
  elapsed: number;
  /**
   * How many ms to wait before switching character.
   * Randomised once per particle so each one has its own rhythm.
   */
  interval: number;
}

const defaultMinInterval = 100, // ms
  defaultMaxInterval = 2000, // ms
  charCache = new WeakMap<Particle, MatrixCharState>();

/**
 * @returns a random character from the pool
 */
function randomChar(): string {
  return matrixChars[Math.floor(getRandom() * matrixChars.length)] ?? " ";
}

/**
 * @param minInterval -
 * @param maxInterval -
 * @returns a random interval between MIN_INTERVAL and MAX_INTERVAL
 */
function randomInterval(minInterval: number, maxInterval: number): number {
  return minInterval + getRandom() * (maxInterval - minInterval);
}

/**
 * @param particle -
 * @param minInterval -
 * @param maxInterval -
 * @returns the state for the given particle
 */
function getState(particle: Particle, minInterval: number, maxInterval: number): MatrixCharState {
  let state = charCache.get(particle);

  if (!state) {
    state = {
      char: randomChar(),
      elapsed: 0,
      interval: randomInterval(minInterval, maxInterval), // each particle gets its own speed
    };

    charCache.set(particle, state);
  }

  return state;
}

/**
 * Draws a single Matrix-style character centered on the particle position.
 * Each particle changes its character at its own random speed.
 * @param data - shape draw data provided by tsparticles engine
 */
export function drawMatrix(data: IShapeDrawData): void {
  const { context, radius, particle, delta, fill, stroke } = data,
    shapeData = particle.shapeData as IMatrixOptions | undefined,
    minInterval = getRangeMin(shapeData?.interval ?? defaultMinInterval),
    maxInterval = getRangeMax(shapeData?.interval ?? defaultMaxInterval),
    state = getState(particle, minInterval, maxInterval);

  state.elapsed += delta.value;

  if (state.elapsed >= state.interval) {
    state.char = randomChar();
    state.elapsed -= state.interval;
    state.interval = randomInterval(minInterval, maxInterval);
  }

  const fontSize = Math.round(radius * double);

  context.font = `bold ${fontSize}px "Courier New", Courier, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (fill) {
    context.fillText(state.char, originPoint.x, originPoint.y);
  }

  if (stroke) {
    context.strokeText(state.char, originPoint.x, originPoint.y);
  }
}
