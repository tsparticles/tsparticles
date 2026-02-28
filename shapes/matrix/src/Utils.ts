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
  // =========================
  // Katakana (base)
  // =========================
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "サ",
  "シ",
  "ス",
  "セ",
  "ソ",
  "タ",
  "チ",
  "ツ",
  "テ",
  "ト",
  "ナ",
  "ニ",
  "ヌ",
  "ネ",
  "ノ",
  "ハ",
  "ヒ",
  "フ",
  "ヘ",
  "ホ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ヤ",
  "ユ",
  "ヨ",
  "ラ",
  "リ",
  "ル",
  "レ",
  "ロ",
  "ワ",
  "ヲ",
  "ン",
  // =========================
  // Katakana dakuten / handakuten
  // =========================
  "ガ",
  "ギ",
  "グ",
  "ゲ",
  "ゴ",
  "ザ",
  "ジ",
  "ズ",
  "ゼ",
  "ゾ",
  "ダ",
  "ヂ",
  "ヅ",
  "デ",
  "ド",
  "バ",
  "ビ",
  "ブ",
  "ベ",
  "ボ",
  "パ",
  "ピ",
  "プ",
  "ペ",
  "ポ",
  // =========================
  // Small katakana
  // =========================
  "ァ",
  "ィ",
  "ゥ",
  "ェ",
  "ォ",
  "ャ",
  "ュ",
  "ョ",
  "ッ",
  // Long vowel mark
  "ー",
  // Extra katakana used visually
  "ヴ",
  // =========================
  // Digits (ASCII)
  // =========================
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
  // =========================
  // Full-width digits
  // =========================
  "０",
  "１",
  "２",
  "３",
  "４",
  "５",
  "６",
  "７",
  "８",
  "９",
  // =========================
  // Latin letters (uppercase)
  // =========================
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
  // =========================
  // Kanji (seen / stylistically accurate)
  // =========================
  "日",
  "本",
  "人",
  "大",
  "中",
  "小",
  "上",
  "下",
  "左",
  "右",
  "力",
  "時",
  "空",
  "生",
  "死",
  "無",
  "有",
  // =========================
  // Symbols
  // =========================
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
