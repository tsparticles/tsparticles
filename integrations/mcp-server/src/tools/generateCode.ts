import type { BundleMatch, Framework, GenerateCodeInput, GenerateCodeOutput, PackageImport } from "../types.js";
import { bundles } from "../registry/bundles.js";
import { packageCatalog } from "../registry/packages.js";
import { suggestPlugins } from "./suggestPlugins.js";

// ── Base templates ────────────────────────────────────────────────
//
// The options generator uses a template + override approach instead of
// trying to be an AI. Each template is the "sane default" for the
// selected bundle; keyword-driven overrides then adjust common
// parameters (count, color, speed, shape, direction, ...).

const CONFETTI_TEMPLATE: Record<string, unknown> = {
    count: 120,
    spread: 100,
    origin: { y: 0.7 },
    colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
    gravity: 1.2,
    ticks: 200,
  },
  FIREWORKS_TEMPLATE: Record<string, unknown> = {
    splitCount: 50,
    speed: 30,
    gravity: 30,
    colors: ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"],
  },
  RIBBONS_TEMPLATE: Record<string, unknown> = {
    count: 60,
    positionX: 50,
    colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
  },
  MAX_FIREWORKS_SPLIT_COUNT = 500,
  FIREWORKS_YEAR_LENGTH = 4,
  MIN_IMPLICIT_YEAR = 1900,
  MAX_IMPLICIT_YEAR = 2100,
  // Bounded suffix covering the longest year/count context phrase and its word boundary.
  YEAR_CONTEXT_SUFFIX_LENGTH = 32,
  GROUPED_INTEGER_PATTERN = String.raw`(?:\d{1,3}(?:,\d{3})+|\d+)`,
  GROUPED_INTEGER_COUNT_PATTERN = new RegExp(String.raw`^(${GROUPED_INTEGER_PATTERN})\b`),
  GENERIC_TEMPLATE: Record<string, unknown> = {
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#ffffff" },
      paint: { color: { value: "#ffffff" } },
      shape: { type: "circle" },
      opacity: { value: { min: 0.1, max: 0.8 } },
      size: { value: { min: 1, max: 5 } },
      move: { enable: true, speed: 3, direction: "none" },
    },
    background: { color: "#000000" },
  },
  // ── Stopwords (EN + IT) ───────────────────────────────────────────
  //
  // Excluded from the extracted keyword list so they don't inflate the
  // keyword count used by the "simple → basic bundle" fallback rule.

  STOPWORDS = new Set<string>([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "for",
    "of",
    "with",
    "in",
    "on",
    "at",
    "to",
    "from",
    "by",
    "as",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "it",
    "its",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "we",
    "they",
    "my",
    "your",
    "our",
    "their",
    "me",
    "him",
    "us",
    "them",
    "do",
    "does",
    "did",
    "have",
    "has",
    "had",
    "can",
    "could",
    "will",
    "would",
    "should",
    "may",
    "might",
    "must",
    "not",
    "no",
    "yes",
    "about",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "between",
    "behind",
    "there",
    "here",
    "very",
    "more",
    "most",
    "some",
    "such",
    "only",
    "own",
    "same",
    "than",
    "too",
    "then",
    "now",
    "over",
    "under",
    "again",
    "once",
    "also",
    "un",
    "una",
    "uno",
    "il",
    "lo",
    "la",
    "gli",
    "le",
    "di",
    "da",
    "su",
    "per",
    "tra",
    "fra",
    "e",
    "ed",
    "o",
    "u",
    "ma",
    "se",
    "come",
    "che",
    "chi",
    "cui",
    "dei",
    "delle",
    "degli",
    "della",
    "dello",
    "del",
    "al",
    "allo",
    "alla",
    "ai",
    "agli",
    "alle",
    "più",
    "piu",
    "molto",
    "anche",
    "sono",
    "ha",
    "ho",
    "essere",
    "avere",
    "questo",
    "questa",
    "questi",
    "queste",
    "quello",
    "quella",
    "quei",
    "quelle",
    "non",
    "mai",
    "qui",
    "li",
    "ne",
    "ci",
    "vi",
  ]),
  // ── Keyword feature sets ──────────────────────────────────────────
  //
  // Used by the fallback selection logic (section 3.2 of the plan) and
  // the keyword-driven option overrides (section 4.3).

  INTERACTIVITY_WORDS = [
    "interactive",
    "interattivo",
    "interattiva",
    "hover",
    "hovering",
    "click",
    "clicking",
    "mouse",
    "tap",
    "touch",
    "pointer",
    "cursor",
  ],
  LINK_WORDS = [
    "links",
    "link",
    "linked",
    "connect",
    "connected",
    "connection",
    "connecting",
    "line",
    "lines",
    "collegati",
    "collegate",
    "collegamento",
    "connessi",
    "connesse",
    "connesso",
  ],
  EMITTER_WORDS = [
    "emit",
    "emits",
    "emitting",
    "emitter",
    "emitters",
    "spawn",
    "spawning",
    "spawns",
    "shoot",
    "shooting",
    "shoots",
    "shot",
    "firing",
    "launch",
    "launching",
    "source",
    "sorgente",
  ],
  ABSORBER_WORDS = [
    "absorb",
    "absorbs",
    "absorbing",
    "absorber",
    "absorbers",
    "suck",
    "sucking",
    "swallow",
    "swallowing",
    "black hole",
    "buco nero",
  ],
  MOVEMENT_WORDS = [
    "move",
    "moving",
    "moves",
    "fall",
    "falling",
    "falls",
    "fell",
    "float",
    "floating",
    "floats",
    "drift",
    "drifting",
    "drifts",
    "flow",
    "flowing",
  ],
  NAMED_COLORS: Record<string, string> = {
    red: "#ff0000",
    blue: "#0000ff",
    green: "#00ff00",
    yellow: "#ffff00",
    purple: "#800080",
    orange: "#ffa500",
    pink: "#ffc0cb",
    white: "#ffffff",
    black: "#000000",
    teal: "#008080",
    cyan: "#00ffff",
    magenta: "#ff00ff",
    gold: "#ffd700",
    silver: "#c0c0c0",
    gray: "#808080",
    grey: "#808080",
    brown: "#a52a2a",
    violet: "#ee82ee",
    lime: "#00ff00",
  },
  SHAPE_WORDS: [string, string][] = [
    ["stars", "star"],
    ["star", "star"],
    ["starfield", "star"],
    ["hearts", "heart"],
    ["heart", "heart"],
    ["squares", "square"],
    ["square", "square"],
    ["triangles", "polygon"],
    ["triangle", "polygon"],
    ["polygons", "polygon"],
    ["polygon", "polygon"],
    ["lines", "line"],
    ["line", "line"],
    ["emojis", "emoji"],
    ["emoji", "emoji"],
    ["circles", "circle"],
    ["circle", "circle"],
  ],
  // ── Framework metadata ────────────────────────────────────────────

  FRAMEWORK_PACKAGES: Record<Framework, string | undefined> = {
    vanilla: undefined,
    react: "@tsparticles/react",
    vue3: "@tsparticles/vue3",
    svelte: "@tsparticles/svelte",
    angular: "@tsparticles/angular",
  },
  FRAMEWORK_LABELS: Record<Framework, string> = {
    vanilla: "vanilla",
    react: "React",
    vue3: "Vue 3",
    svelte: "Svelte",
    angular: "Angular",
  },
  CONFLICT_THRESHOLD = 1,
  JSON_INDENT = 2,
  SIMPLE_REQUEST_KEYWORD_LIMIT = 3;

// ── Specialized / preset rules (priority-ordered) ─────────────────
//
// First match wins (section 3.1). Presets only win when the description
// doesn't request advanced features (interactivity/links/emitters/
// absorbers) — e.g. "interactive stars with links on hover" must NOT be
// forced into the stars preset, otherwise rich descriptions would never
// reach the interactive fallback.

interface SpecializedRule {
  bundleName: string;
  isAutoInitialized?: boolean;
  isPreset?: boolean;
  keywords: string[];
  loadFunction: string;
  presetName?: string;
  presetPackage?: string;
}

const SPECIALIZED_RULES: SpecializedRule[] = [
  {
    bundleName: "@tsparticles/confetti",
    loadFunction: "confetti",
    keywords: ["confetti", "coriandoli", "celebration", "party", "festa", "feste"],
    isAutoInitialized: true,
  },
  {
    bundleName: "@tsparticles/fireworks",
    loadFunction: "fireworks",
    keywords: ["fireworks", "fuochi d'artificio", "fuochi artificiali", "spettacolo pirotecnico"],
    isAutoInitialized: true,
  },
  {
    bundleName: "@tsparticles/ribbons",
    loadFunction: "ribbons",
    keywords: ["ribbon", "ribbons", "nastro", "nastri", "nastro volante"],
    isAutoInitialized: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["snow", "snowfall", "neve", "nevicata", "fiocchi di neve", "fiocchi"],
    presetName: "snow",
    presetPackage: "@tsparticles/preset-snow",
    isPreset: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["fire", "flame", "flames", "fuoco", "fiamme", "fiamma", "incendio"],
    presetName: "fire",
    presetPackage: "@tsparticles/preset-fire",
    isPreset: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["matrix", "hacker", "codice", "digital rain", "pioggia di codice"],
    presetName: "matrix",
    presetPackage: "@tsparticles/preset-matrix",
    isPreset: true,
  },
  {
    bundleName: "@tsparticles/basic",
    loadFunction: "loadBasic",
    keywords: ["stars", "starfield", "stelle", "cielo stellato", "starry"],
    presetName: "stars",
    presetPackage: "@tsparticles/preset-stars",
    isPreset: true,
  },
];

// ── Small helpers ─────────────────────────────────────────────────

/**
 *
 * @param value
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 *
 * @param text
 * @param keyword
 */
function matchesKeyword(text: string, keyword: string): boolean {
  const k = keyword.trim().toLowerCase();
  if (!k) {
    return false;
  }
  if (!k.includes(" ") && /^[a-z0-9]+$/i.test(k)) {
    return new RegExp(`\\b${escapeRegExp(k)}\\b`).test(text);
  }
  return text.includes(k);
}

/**
 *
 * @param text
 * @param keywords
 */
function matchesAny(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => matchesKeyword(text, keyword));
}

/**
 *
 * @param keywords
 * @param text
 * @param terms
 */
function mentions(keywords: string[], text: string, terms: string[]): boolean {
  return terms.some(term => matchesKeyword(text, term) || keywords.includes(term));
}

/**
 *
 * @param value
 */
function capitalize(value: string): string {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// ── Keyword extraction ────────────────────────────────────────────

/**
 *
 * @param description
 */
export function extractKeywords(description: string): string[] {
  const tokens = description
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  return [...new Set(tokens)].filter(token => !STOPWORDS.has(token));
}

// ── Bundle matching ───────────────────────────────────────────────

/**
 *
 * @param bundleName
 * @param loadFunction
 * @param opts
 */
function makeBundleMatch(bundleName: string, loadFunction: string, opts?: Partial<BundleMatch>): BundleMatch {
  const bundle = bundles.find(b => b.name === bundleName);
  return {
    bundleName,
    loadFunction,
    packages: bundle ? [...bundle.packages] : [bundleName],
    ...opts,
  };
}

/**
 *
 * @param keywords
 * @param text
 */
function hasAdvancedFeatures(keywords: string[], text: string): boolean {
  return (
    mentions(keywords, text, INTERACTIVITY_WORDS) ||
    mentions(keywords, text, LINK_WORDS) ||
    mentions(keywords, text, EMITTER_WORDS) ||
    mentions(keywords, text, ABSORBER_WORDS)
  );
}

/**
 *
 * @param keywords
 * @param text
 */
function isSimpleRequest(keywords: string[], text: string): boolean {
  if (keywords.length > SIMPLE_REQUEST_KEYWORD_LIMIT) {
    return false;
  }
  if (hasAdvancedFeatures(keywords, text)) {
    return false;
  }
  return MOVEMENT_WORDS.some(word => matchesKeyword(text, word));
}

/**
 *
 * @param keywords
 * @param description
 */
export function matchBundle(keywords: string[], description: string): BundleMatch {
  const text = description.toLowerCase();

  for (const rule of SPECIALIZED_RULES) {
    if (!matchesAny(text, rule.keywords)) {
      continue;
    }
    if (rule.isPreset && hasAdvancedFeatures(keywords, text)) {
      continue;
    }
    return makeBundleMatch(rule.bundleName, rule.loadFunction, {
      presetName: rule.presetName,
      presetPackage: rule.presetPackage,
      isPreset: rule.isPreset,
      isAutoInitialized: rule.isAutoInitialized,
    });
  }

  const hasInteractivity = mentions(keywords, text, INTERACTIVITY_WORDS),
    hasLinks = mentions(keywords, text, LINK_WORDS),
    hasEmitter = mentions(keywords, text, EMITTER_WORDS),
    hasAbsorber = mentions(keywords, text, ABSORBER_WORDS);

  if (hasInteractivity && hasLinks) {
    return makeBundleMatch("@tsparticles/slim", "loadSlim");
  }
  if (hasEmitter || hasAbsorber) {
    return makeBundleMatch("tsparticles", "loadFull");
  }
  if (isSimpleRequest(keywords, text)) {
    return makeBundleMatch("@tsparticles/basic", "loadBasic");
  }
  return makeBundleMatch("@tsparticles/slim", "loadSlim");
}

// ── Options generation ────────────────────────────────────────────

/**
 * Extracts the first requested count, ignoring numbers used as year references.
 *
 * @param text - The normalized particle description.
 */
function extractCount(text: string): number | undefined {
  const labeledCount = extractLabeledCount(text, /\bcount\b/gi, false);

  if (labeledCount !== undefined) {
    return parseSafeCount(labeledCount);
  }

  const numberPattern = new RegExp(String.raw`\b(${GROUPED_INTEGER_PATTERN})\b`, "g");

  for (const { match, precedingText } of getMatchesWithNormalizedPrefix(text, numberPattern)) {
    if (!isAmbiguousYearReference(precedingText, match[1])) {
      return parseSafeCount(match[1]);
    }
  }

  return undefined;
}

function normalizeCountString(count: string): string {
  return count.replace(/,/g, "");
}

function parseSafeCount(count: string): number | undefined {
  const value = Number(normalizeCountString(count));

  return Number.isSafeInteger(value) ? value : undefined;
}

function* getMatchesWithNormalizedPrefix(
  text: string,
  pattern: RegExp,
): Generator<{ match: RegExpMatchArray; precedingText: string }> {
  let textIndex = 0,
    precedingText = "";

  for (const match of text.matchAll(pattern)) {
    const matchIndex = match.index;

    while (textIndex < matchIndex) {
      const char = text[textIndex];

      if (/\s/.test(char)) {
        if (!precedingText.endsWith(" ")) {
          precedingText += " ";
        }
      } else {
        precedingText += char;
      }

      if (precedingText.length > YEAR_CONTEXT_SUFFIX_LENGTH) {
        precedingText = precedingText.slice(-YEAR_CONTEXT_SUFFIX_LENGTH);
      }

      textIndex++;
    }

    yield { match, precedingText };
  }
}

/**
 * Determines whether a numeric candidate follows a year reference rather than an explicit count label.
 *
 * @param precedingText - The normalized text before the numeric candidate.
 * @param count - The numeric candidate to inspect.
 */
function isAmbiguousYearReference(precedingText: string, count: string): boolean {
  if (count.length !== FIREWORKS_YEAR_LENGTH) {
    return false;
  }

  const normalizedPrecedingText = precedingText.trimEnd().replace(/[:=]$/, "").trimEnd(),
    hasYearContext = /(?:^|\s)(?:new year|year(?: of)?|for|in)(?: the)?$/i.test(normalizedPrecedingText),
    isExplicitCount = /(?:^|\s)(?:count|number)(?: of)?$/i.test(normalizedPrecedingText);

  return hasYearContext && !isExplicitCount;
}

/**
 * Finds a year reference that could otherwise be mistaken for a particle count.
 *
 * @param text - The normalized particle description.
 */
function extractAmbiguousYearCount(text: string): string | undefined {
  for (const { match, precedingText } of getMatchesWithNormalizedPrefix(text, /\b(\d{4})\b/g)) {
    if (isAmbiguousYearReference(precedingText, match[1])) {
      return match[1];
    }
  }

  return undefined;
}

/**
 * Collects the positions of four-digit values introduced by year context phrases.
 *
 * @param text - The normalized fireworks description.
 */
function getYearContextCountIndexes(text: string): Set<number> {
  const indexes = new Set<number>(),
    yearContextPattern = /(?:^|\s)(new\s+year|year(?:\s+of)?|for|in)(?:\s+the)?(?:\s*[:=]\s*|\s+)(\d{4})\b/gi;

  for (const match of text.matchAll(yearContextPattern)) {
    const count = match[2],
      value = Number(count),
      hasExplicitYearLabel = /year/i.test(match[1]),
      isPlausibleImplicitYear = value >= MIN_IMPLICIT_YEAR && value <= MAX_IMPLICIT_YEAR;

    if (hasExplicitYearLabel || isPlausibleImplicitYear) {
      indexes.add((match.index ?? 0) + match[0].length - count.length);
    }
  }

  return indexes;
}

/**
 * Collects years associated with named events or event contexts.
 *
 * @param text - The normalized fireworks description.
 */
function getEventYearCountIndexes(text: string, explicitSparkCountIndexes: Set<number>): Set<number> {
  const indexes = new Set<number>(),
    eventYearPattern =
      /\b(?:christmas|easter|halloween|thanksgiving|new year(?:'s)?(?: (?:day|eve))?|valentine(?:'s)?(?: day)?|independence day|memorial day|labor day|canada day|diwali|hanukkah|ramadan|eid(?: al-(?:fitr|adha))?)(?:\s*[:=]\s*|\s+(?:of\s+)?)(\d{4})\b/gi;

  for (const match of text.matchAll(eventYearPattern)) {
    const count = match[1];

    indexes.add((match.index ?? 0) + match[0].length - count.length);
  }

  const eventContextWords = ["for", "in", "during", "at", "on"],
    isWhitespace = (char: string | undefined): boolean => char !== undefined && /\s/.test(char),
    isWordCharacter = (char: string | undefined): boolean => char !== undefined && /[a-z0-9_]/i.test(char),
    isPhraseWordCharacter = (char: string | undefined): boolean => char !== undefined && /[a-z0-9'-]/i.test(char);

  // Consume each context phrase once so repeated prefixes cannot rescan the remaining text.
  for (let index = 0; index < text.length;) {
    if (isWordCharacter(text[index - 1])) {
      index++;
      continue;
    }

    const contextWord = eventContextWords.find(
      word => text.slice(index, index + word.length).toLowerCase() === word && isWhitespace(text[index + word.length]),
    );

    if (!contextWord) {
      index++;
      continue;
    }

    let position = index + contextWord.length;

    while (isWhitespace(text[position])) {
      position++;
    }

    let phraseWordCount = 0,
      firstPhraseWord = "",
      secondPhraseWord = "",
      thirdPhraseWord = "",
      firstPhraseGapIsSingleSpace = false,
      secondPhraseGapIsSingleSpace = false,
      previousPhraseWordEnd = -1;

    const isFourDigitYearAt = (yearIndex: number): boolean =>
        /^\d{4}$/.test(text.slice(yearIndex, yearIndex + FIREWORKS_YEAR_LENGTH)) &&
        !isWordCharacter(text[yearIndex + FIREWORKS_YEAR_LENGTH]),
      addPhraseWord = (phraseWordStart: number, phraseWordEnd: number): void => {
        const phraseWord = text.slice(phraseWordStart, phraseWordEnd).toLowerCase();

        if (phraseWordCount === 0) {
          firstPhraseWord = phraseWord;
        } else if (phraseWordCount === 1) {
          secondPhraseWord = phraseWord;
          firstPhraseGapIsSingleSpace =
            phraseWordStart - previousPhraseWordEnd === 1 && text[previousPhraseWordEnd] === " ";
        } else if (phraseWordCount === 2) {
          thirdPhraseWord = phraseWord;
          secondPhraseGapIsSingleSpace =
            phraseWordStart - previousPhraseWordEnd === 1 && text[previousPhraseWordEnd] === " ";
        }

        phraseWordCount++;
        previousPhraseWordEnd = phraseWordEnd;
      },
      addEventYearCandidate = (yearIndex: number): void => {
        const skipsArticle = phraseWordCount > 1 && /^(?:the|a|an)$/i.test(firstPhraseWord),
          eventContextWordCount = phraseWordCount - (skipsArticle ? 1 : 0),
          firstEventContextWord = skipsArticle ? secondPhraseWord : firstPhraseWord,
          secondEventContextWord = skipsArticle ? thirdPhraseWord : secondPhraseWord,
          eventContextGapIsSingleSpace = skipsArticle ? secondPhraseGapIsSingleSpace : firstPhraseGapIsSingleSpace,
          isYearContext =
            eventContextWordCount === 1
              ? firstEventContextWord === "year"
              : eventContextWordCount === 2 &&
                firstEventContextWord === "year" &&
                secondEventContextWord === "of" &&
                eventContextGapIsSingleSpace,
          value = Number(text.slice(yearIndex, yearIndex + FIREWORKS_YEAR_LENGTH));

        if (
          !isYearContext &&
          !explicitSparkCountIndexes.has(yearIndex) &&
          value >= MIN_IMPLICIT_YEAR &&
          value <= MAX_IMPLICIT_YEAR
        ) {
          indexes.add(yearIndex);
        }
      };

    while (position < text.length && /[a-z0-9]/i.test(text[position])) {
      const phraseWordStart = position;

      while (isPhraseWordCharacter(text[position])) {
        position++;
      }

      if (phraseWordCount > 0 && isFourDigitYearAt(phraseWordStart)) {
        addEventYearCandidate(phraseWordStart);
      }

      if (isWhitespace(text[position])) {
        addPhraseWord(phraseWordStart, position);

        while (isWhitespace(text[position])) {
          position++;
        }

        continue;
      }

      if (isWordCharacter(text[position])) {
        break;
      }

      let yearIndex = position;

      while (yearIndex < text.length && !isWhitespace(text[yearIndex]) && !isWordCharacter(text[yearIndex])) {
        yearIndex++;
      }

      while (isWhitespace(text[yearIndex])) {
        yearIndex++;
      }

      if (phraseWordCount === 0 || !isFourDigitYearAt(yearIndex)) {
        break;
      }

      addPhraseWord(phraseWordStart, position);
      addEventYearCandidate(yearIndex);
      addPhraseWord(yearIndex, yearIndex + FIREWORKS_YEAR_LENGTH);
      position = yearIndex + FIREWORKS_YEAR_LENGTH;

      while (isWhitespace(text[position])) {
        position++;
      }
    }

    index = position;
  }

  return indexes;
}

/**
 * Extracts a count written after a spark heading.
 *
 * @param text - The normalized fireworks description.
 */
function extractSparkCountAfterHeading(text: string): string | undefined {
  const match = new RegExp(
    String.raw`(?:^|\r?\n)[ \t]*(?:sparks|particles)(?:[ \t]*[:=][ \t]*(?:\r?\n[ \t]*)?|[ \t]+|\r?\n[ \t]*)(${GROUPED_INTEGER_PATTERN})\b`,
    "gim",
  ).exec(text);

  return match?.[1];
}

/**
 * Collects the positions of spark quantities explicitly identified by their usage.
 *
 * @param text - The normalized fireworks description.
 */
function getExplicitSparkCountIndexes(text: string): Set<number> {
  const indexes = new Set<number>();

  for (const match of text.matchAll(
    new RegExp(
      String.raw`\b(${GROUPED_INTEGER_PATTERN})\s+(?:sparks|particles)\s+(?:per\s+(?:burst|explosion|fireworks?)|each)\b`,
      "gi",
    ),
  )) {
    indexes.add(match.index ?? 0);
  }

  for (const match of text.matchAll(
    new RegExp(String.raw`\b(?:exactly|precisely)\s+(${GROUPED_INTEGER_PATTERN})\s+(?:sparks|particles)\b`, "gi"),
  )) {
    indexes.add((match.index ?? 0) + match[0].indexOf(match[1]));
  }

  return indexes;
}

/**
 * Extracts a number following a count label.
 *
 * @param text - The description to search.
 * @param labelPattern - The label to search for.
 * @param skipSplitCount - Whether to skip labels preceded by "split".
 * @param countPattern - The accepted numeric count format.
 */
function extractLabeledCount(
  text: string,
  labelPattern: RegExp,
  skipSplitCount: boolean,
  countPattern: RegExp = GROUPED_INTEGER_COUNT_PATTERN,
): string | undefined {
  const splitCountIndexes = new Set<number>();

  if (skipSplitCount) {
    for (const match of text.matchAll(/\bsplit\s*count\b/gi)) {
      splitCountIndexes.add(match.index + match[0].length - "count".length);
    }
  }

  for (const labelMatch of text.matchAll(labelPattern)) {
    const labelIndex = labelMatch.index;

    if (splitCountIndexes.has(labelIndex)) {
      continue;
    }

    let suffix = text.slice(labelIndex + labelMatch[0].length).replace(/^\s+/, "");

    if (/^of\b/i.test(suffix)) {
      suffix = suffix.slice(2).replace(/^\s+/, "");
    }

    if (suffix.startsWith(":") || suffix.startsWith("=")) {
      suffix = suffix.slice(1).replace(/^\s+/, "");
    }

    const labeledCount = countPattern.exec(suffix);

    if (labeledCount) {
      return labeledCount[1];
    }
  }

  return undefined;
}

/**
 *
 * @param count - The candidate count.
 */
function isAmbiguousFireworksYear(count: string): boolean {
  return count.length === FIREWORKS_YEAR_LENGTH;
}

/**
 * Extracts an explicit or ambiguous split count from a fireworks description.
 *
 * @param text - The normalized fireworks description.
 */
function extractFireworksSplitCount(text: string): { ambiguous: boolean; raw: string; value: number } | undefined {
  const splitCount = extractLabeledCount(text, /\bsplit\s*count\b/gi, false);

  if (splitCount !== undefined) {
    return { ambiguous: false, raw: splitCount, value: Number(normalizeCountString(splitCount)) };
  }

  const explicitSparkCount = new RegExp(
    String.raw`\b(?:with|using)\s+(${GROUPED_INTEGER_PATTERN})\s+(?:sparks|particles)\b`,
    "i",
  ).exec(text);

  if (explicitSparkCount) {
    const raw = normalizeCountString(explicitSparkCount[1]);

    return { ambiguous: false, raw, value: Number(raw) };
  }

  const labeledCount = extractLabeledCount(text, /\bcount\b/gi, true);

  if (labeledCount !== undefined) {
    return { ambiguous: false, raw: labeledCount, value: Number(normalizeCountString(labeledCount)) };
  }

  const sparkCountAfterHeading = extractSparkCountAfterHeading(text);

  if (sparkCountAfterHeading !== undefined) {
    const raw = normalizeCountString(sparkCountAfterHeading);

    return { ambiguous: false, raw, value: Number(raw) };
  }

  const explicitSparkCountIndexes = getExplicitSparkCountIndexes(text),
    yearContextCountIndexes = getYearContextCountIndexes(text),
    eventYearCountIndexes = getEventYearCountIndexes(text, explicitSparkCountIndexes);
  const withCounts = [
      ...text.matchAll(
        new RegExp(
          String.raw`\b(?:fireworks|particles|sparks)\s+(?:with|using)\s+(${GROUPED_INTEGER_PATTERN})\b`,
          "gi",
        ),
      ),
    ],
    bareSparkCounts = [
      ...text.matchAll(new RegExp(String.raw`\b(${GROUPED_INTEGER_PATTERN})\s+(?:sparks|particles)\b`, "gi")),
    ],
    bareFireworksCounts = [
      ...text.matchAll(new RegExp(String.raw`\b(${GROUPED_INTEGER_PATTERN})\s+fireworks\b`, "gi")),
    ],
    unambiguousFireworksCount = bareFireworksCounts.find(match => !isAmbiguousFireworksYear(match[1]))?.[1],
    standaloneWithCount = withCounts.find(
      match =>
        !isAmbiguousFireworksYear(match[1]) &&
        /^\s*(?:[,.;!?]|$)/.test(text.slice((match.index ?? 0) + match[0].length)),
    ),
    isYearLabeledSparkCount = (match: RegExpMatchArray): boolean =>
      yearContextCountIndexes.has(match.index ?? 0) && !explicitSparkCountIndexes.has(match.index ?? 0);
  const isEventYearSparkCount = (match: RegExpMatchArray): boolean =>
    eventYearCountIndexes.has(match.index ?? 0) && !explicitSparkCountIndexes.has(match.index ?? 0);

  const bareSparkCount = bareSparkCounts.find(
    match => !isYearLabeledSparkCount(match) && !isEventYearSparkCount(match),
  );

  if (bareSparkCount) {
    const raw = normalizeCountString(bareSparkCount[1]);

    return { ambiguous: false, raw, value: Number(raw) };
  }

  if (unambiguousFireworksCount !== undefined) {
    const raw = normalizeCountString(unambiguousFireworksCount);

    return { ambiguous: false, raw, value: Number(raw) };
  }

  if (standaloneWithCount) {
    const raw = normalizeCountString(standaloneWithCount[1]);

    return { ambiguous: false, raw, value: Number(raw) };
  }

  const eventYearSparkCount = bareSparkCounts.find(isEventYearSparkCount);

  if (eventYearSparkCount) {
    const raw = normalizeCountString(eventYearSparkCount[1]);

    return { ambiguous: true, raw, value: Number(raw) };
  }

  const ambiguousFireworksCount = bareFireworksCounts[0]?.[1];

  if (ambiguousFireworksCount !== undefined) {
    const raw = normalizeCountString(ambiguousFireworksCount);

    return { ambiguous: true, raw, value: Number(raw) };
  }

  const ambiguousWithCount = withCounts.find(match => isAmbiguousFireworksYear(match[1]));

  if (ambiguousWithCount) {
    const raw = normalizeCountString(ambiguousWithCount[1]);

    return { ambiguous: true, raw, value: Number(raw) };
  }

  return undefined;
}

/**
 *
 * @param text
 */
function findNamedColor(text: string): string | undefined {
  for (const [name, hex] of Object.entries(NAMED_COLORS)) {
    if (matchesKeyword(text, name)) {
      return hex;
    }
  }
  return undefined;
}

/**
 *
 * @param text
 */
function findShape(text: string): string | undefined {
  for (const [word, type] of SHAPE_WORDS) {
    if (matchesKeyword(text, word)) {
      return type;
    }
  }
  return undefined;
}

/**
 *
 * @param text
 */
function findDirection(text: string): string | undefined {
  if (matchesKeyword(text, "up") || matchesKeyword(text, "top") || matchesKeyword(text, "sopra")) {
    return "top";
  }
  if (matchesKeyword(text, "down") || matchesKeyword(text, "bottom") || matchesKeyword(text, "sotto")) {
    return "bottom";
  }
  if (matchesKeyword(text, "left") || matchesKeyword(text, "sinistra")) {
    return "left";
  }
  if (matchesKeyword(text, "right") || matchesKeyword(text, "destra")) {
    return "right";
  }
  return undefined;
}

/**
 *
 * @param template
 * @param lower
 */
function applySpecializedOverrides(
  template: Record<string, unknown>,
  count: number | undefined,
  countProperty: "count" | "splitCount",
  maxCount?: number,
): Record<string, unknown> {
  const result = structuredClone(template);

  if (count !== undefined) {
    result[countProperty] = maxCount === undefined ? count : Math.min(count, maxCount);
  }

  return result;
}

/**
 *
 * @param keywords
 * @param lower
 */
function generateGenericOptions(keywords: string[], lower: string): Record<string, unknown> {
  const options = structuredClone(GENERIC_TEMPLATE),
    particles = options.particles as Record<string, unknown>,
    move = particles.move as Record<string, unknown>,
    count = extractCount(lower);
  if (count !== undefined) {
    (particles.number as Record<string, unknown>).value = count;
  }

  if (mentions(keywords, lower, ["slow", "lento", "lenta", "lentamente"])) {
    move.speed = 1;
  }
  if (mentions(keywords, lower, ["fast", "veloce", "veloci", "rapido", "rapida", "rapidamente"])) {
    move.speed = 10;
  }

  const color = findNamedColor(lower);
  if (color !== undefined) {
    (particles.paint as Record<string, unknown>).color = { value: color };
  }

  const shape = findShape(lower);
  if (shape !== undefined) {
    (particles.shape as Record<string, unknown>).type = shape;
  }

  const direction = findDirection(lower);
  if (direction !== undefined) {
    move.direction = direction;
  }

  if (mentions(keywords, lower, ["gravity", "gravità", "gravita"])) {
    move.gravity = { enable: true };
  }

  const hasLinks = mentions(keywords, lower, LINK_WORDS);
  if (hasLinks) {
    particles.links = { enable: true, distance: 150, opacity: 0.5 };
  }

  const hasInteractivity = mentions(keywords, lower, INTERACTIVITY_WORDS);
  if (hasInteractivity) {
    options.interactivity = {
      events: {
        onHover: { enable: true, mode: hasLinks ? "grab" : "repulse" },
      },
      modes: {},
    };
    move.speed = 2;
  }

  if (color !== undefined && mentions(keywords, lower, ["background", "sfondo"])) {
    (options.background as Record<string, unknown>).color = color;
  }

  return options;
}

/**
 *
 * @param bundle
 * @param keywords
 * @param lower
 */
export function generateOptions(bundle: BundleMatch, keywords: string[], lower: string): Record<string, unknown> {
  if (bundle.isPreset && bundle.presetName) {
    return { preset: bundle.presetName };
  }

  if (bundle.isAutoInitialized) {
    return generateAutoInitializedOptions(bundle, lower);
  }

  return generateGenericOptions(keywords, lower);
}

/**
 *
 * @param bundle - The matched bundle configuration.
 * @param lower - The normalized description.
 */
function generateAutoInitializedOptions(bundle: BundleMatch, lower: string): Record<string, unknown> {
  let template: Record<string, unknown>;

  if (bundle.bundleName === "@tsparticles/fireworks") {
    template = FIREWORKS_TEMPLATE;
  } else if (bundle.bundleName === "@tsparticles/ribbons") {
    template = RIBBONS_TEMPLATE;
  } else {
    template = CONFETTI_TEMPLATE;
  }

  const isFireworks = bundle.bundleName === "@tsparticles/fireworks",
    fireworksSplitCount = isFireworks ? extractFireworksSplitCount(lower) : undefined;

  let requestedCount: number | undefined;

  if (isFireworks) {
    if (!fireworksSplitCount?.ambiguous) {
      requestedCount = fireworksSplitCount?.value;
    }
  } else {
    requestedCount = extractCount(lower);
  }

  return applySpecializedOverrides(
    template,
    requestedCount,
    isFireworks ? "splitCount" : "count",
    isFireworks ? MAX_FIREWORKS_SPLIT_COUNT : undefined,
  );
}

// ── Framework codegen ─────────────────────────────────────────────

/**
 *
 * @param options
 */
function serializeOptions(options: Record<string, unknown>): string {
  return JSON.stringify(options, null, JSON_INDENT);
}

/**
 *
 * @param bundle
 */
function buildLoadImports(bundle: BundleMatch): string[] {
  const mainLoad = `import { ${bundle.loadFunction} } from "${bundle.bundleName}";`;
  if (bundle.isPreset && bundle.presetPackage) {
    const presetInfo = packageCatalog.byName[bundle.presetPackage],
      presetLoad = presetInfo.loadFunction ?? `load${capitalize(bundle.presetName ?? "")}Preset`;
    return [mainLoad, `import { ${presetLoad} } from "${bundle.presetPackage}";`];
  }
  return [mainLoad];
}

/**
 *
 * @param bundle
 * @param indent
 * @param engineVar
 */
function buildLoadCalls(bundle: BundleMatch, indent: string, engineVar: string): string {
  const calls = [`${indent}await ${bundle.loadFunction}(${engineVar});`];
  if (bundle.isPreset && bundle.presetPackage) {
    const presetInfo = packageCatalog.byName[bundle.presetPackage],
      presetLoad = presetInfo.loadFunction ?? `load${capitalize(bundle.presetName ?? "")}Preset`;
    calls.push(`${indent}await ${presetLoad}(${engineVar});`);
  }
  return calls.join("\n");
}

/**
 *
 * @param loaders
 */
function buildLoaderImports(loaders: PackageImport[]): string[] {
  return loaders.map(({ function: loadFunction, from }) => `import { ${loadFunction} } from "${from}";`);
}

/**
 *
 * @param loaders
 * @param indent
 * @param engineVar
 */
function buildLoaderCalls(loaders: PackageImport[], indent: string, engineVar: string): string {
  return loaders.map(({ function: loadFunction }) => `${indent}await ${loadFunction}(${engineVar});`).join("\n");
}

/**
 *
 * @param bundle
 * @param options
 */
function autoInitCode(bundle: BundleMatch, options: Record<string, unknown>): string {
  return `import { ${bundle.loadFunction} } from "${bundle.bundleName}";

await ${bundle.loadFunction}(${serializeOptions(options)});
`;
}

/**
 *
 * @param bundle
 * @param options
 * @param typescript
 * @param extraLoaders
 */
function vanillaCode(
  bundle: BundleMatch,
  options: Record<string, unknown>,
  typescript: boolean,
  extraLoaders: PackageImport[],
): string {
  const imports = [...buildLoadImports(bundle), ...buildLoaderImports(extraLoaders)],
    calls = [buildLoadCalls(bundle, "  ", "tsParticles"), buildLoaderCalls(extraLoaders, "  ", "tsParticles")]
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(call => call.length > 0)
      .join("\n");

  if (typescript) {
    return `${imports.join("\n")}
import { tsParticles } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = ${serializeOptions(options)};

async function init(): Promise<void> {
${calls}

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
}

void init();
`;
  }

  return `${imports.join("\n")}
import { tsParticles } from "@tsparticles/engine";

async function init() {
${calls}

  await tsParticles.load({
    id: "tsparticles",
    options: ${serializeOptions(options)},
  });
}

init();
`;
}

/**
 *
 * @param bundle
 * @param options
 * @param typescript
 * @param extraLoaders
 */
function reactCode(
  bundle: BundleMatch,
  options: Record<string, unknown>,
  typescript: boolean,
  extraLoaders: PackageImport[],
): string {
  const engineTypeImport = typescript ? 'import type { Engine } from "@tsparticles/engine";\n' : "",
    initParam = typescript ? "(engine: Engine)" : "(engine)",
    imports = [...buildLoadImports(bundle), ...buildLoaderImports(extraLoaders)],
    calls = [buildLoadCalls(bundle, "    ", "engine"), buildLoaderCalls(extraLoaders, "    ", "engine")]
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(call => call.length > 0)
      .join("\n");

  return `import { useCallback } from "react";
${engineTypeImport}import Particles, { ParticlesProvider } from "@tsparticles/react";
${imports.join("\n")}

export function ParticlesBackground() {
  const init = useCallback(async ${initParam} => {
${calls}
  }, []);

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="tsparticles"
        options={${serializeOptions(options)}}
      />
    </ParticlesProvider>
  );
}
`;
}

/**
 *
 * @param bundle
 * @param options
 * @param typescript
 * @param extraLoaders
 */
function vueCode(
  bundle: BundleMatch,
  options: Record<string, unknown>,
  typescript: boolean,
  extraLoaders: PackageImport[],
): string {
  const engineTypeImport = typescript ? 'import type { Engine } from "@tsparticles/engine";\n' : "",
    registerSignature = typescript
      ? "async function registerParticles(engine: Engine): Promise<void> {"
      : "async function registerParticles(engine) {",
    scriptSetup = typescript ? '<script setup lang="ts">' : "<script setup>",
    optionsType = typescript ? ": ISourceOptions" : "",
    imports = [...buildLoadImports(bundle), ...buildLoaderImports(extraLoaders)],
    calls = [buildLoadCalls(bundle, "  ", "engine"), buildLoaderCalls(extraLoaders, "  ", "engine")]
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(call => call.length > 0)
      .join("\n");

  return `// main.ts
import { createApp } from "vue";
${engineTypeImport}import Particles from "@tsparticles/vue3";
${imports.join("\n")}

import App from "./App.vue";

${registerSignature}
${calls}
}

const app = createApp(App);

app.use(Particles, {
  init: registerParticles,
});

app.mount("#app");

// App.vue
<template>
  <vue-particles
    id="tsparticles"
    :options="options"
    @particles-loaded="particlesLoaded"
  />
</template>

${scriptSetup}
${typescript ? 'import type { Container, ISourceOptions } from "@tsparticles/engine";\n\n' : ""}const options${optionsType} = ${serializeOptions(options)};

function particlesLoaded(${typescript ? "container?: Container" : "container"})${typescript ? ": void" : ""} {
  console.log(container);
}
</script>
`;
}

/**
 *
 * @param bundle
 * @param options
 * @param typescript
 * @param extraLoaders
 */
function svelteCode(
  bundle: BundleMatch,
  options: Record<string, unknown>,
  typescript: boolean,
  extraLoaders: PackageImport[],
): string {
  const svelteImports = [...buildLoadImports(bundle), ...buildLoaderImports(extraLoaders)],
    calls = [buildLoadCalls(bundle, "    ", "engine"), buildLoaderCalls(extraLoaders, "    ", "engine")]
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(call => call.length > 0)
      .join("\n");

  if (typescript) {
    return `<script lang="ts">
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";
  ${svelteImports.join("\n  ")}

  const options: ISourceOptions = ${serializeOptions(options)};
  const onParticlesLoaded = (event: CustomEvent) => {
    console.log(event.detail.particles);
  };

  void initParticlesEngine(async (engine: Engine) => {
${calls}
  });
</script>

<Particles
  id="tsparticles"
  options={options}
  on:particlesLoaded={onParticlesLoaded}
/>
`;
  }

  return `<script>
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  ${svelteImports.join("\n  ")}

  const options = ${serializeOptions(options)};
  const onParticlesLoaded = (event) => {
    console.log(event.detail.particles);
  };

  void initParticlesEngine(async (engine) => {
${calls}
  });
</script>

<Particles
  id="tsparticles"
  options={options}
  on:particlesLoaded={onParticlesLoaded}
/>
`;
}

/**
 *
 * @param bundle
 * @param options
 * @param typescript
 * @param extraLoaders
 */
function angularCode(
  bundle: BundleMatch,
  options: Record<string, unknown>,
  typescript: boolean,
  extraLoaders: PackageImport[],
): string {
  const imports = [...buildLoadImports(bundle), ...buildLoaderImports(extraLoaders)],
    calls = [buildLoadCalls(bundle, "      ", "engine"), buildLoaderCalls(extraLoaders, "      ", "engine")]
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(call => call.length > 0)
      .join("\n");

  if (typescript) {
    return `import { Component, OnInit } from "@angular/core";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { NgParticlesService, NgxParticlesModule } from "@tsparticles/angular";
${imports.join("\n")}

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgxParticlesModule],
  template: \`<ngx-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"></ngx-particles>\`,
})
export class ParticlesComponent implements OnInit {
  id = "tsparticles";
  particlesOptions: ISourceOptions = ${serializeOptions(options)};

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  public ngOnInit(): void {
    void this.ngParticlesService.init(async engine => {
${calls}
    });
  }

  public particlesLoaded(container?: Container): void {
    console.log(container);
  }
}
`;
  }

  return `import { Component, inject } from "@angular/core";
import { NgParticlesService, NgxParticlesModule } from "@tsparticles/angular";
${imports.join("\n")}

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgxParticlesModule],
  template: \`<ngx-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"></ngx-particles>\`,
})
export class ParticlesComponent {
  id = "tsparticles";
  particlesOptions = ${serializeOptions(options)};

  ngParticlesService = inject(NgParticlesService);

  ngOnInit() {
    void this.ngParticlesService.init(async engine => {
${calls}
    });
  }

  particlesLoaded(container) {
    console.log(container);
  }
}
`;
}

/**
 *
 * @param framework
 * @param options
 * @param bundle
 * @param typescript
 * @param extraLoaders
 */
function generateFrameworkCode(
  framework: Framework,
  options: Record<string, unknown>,
  bundle: BundleMatch,
  typescript: boolean,
  extraLoaders: PackageImport[],
): string {
  if (bundle.isAutoInitialized) {
    return autoInitCode(bundle, options);
  }
  switch (framework) {
    case "vanilla":
      return vanillaCode(bundle, options, typescript, extraLoaders);
    case "react":
      return reactCode(bundle, options, typescript, extraLoaders);
    case "vue3":
      return vueCode(bundle, options, typescript, extraLoaders);
    case "svelte":
      return svelteCode(bundle, options, typescript, extraLoaders);
    case "angular":
      return angularCode(bundle, options, typescript, extraLoaders);
  }
}

// ── HTML / install command ────────────────────────────────────────

/**
 *
 * @param framework
 * @param bundle
 */
export function generateHtml(framework: Framework, _bundle: BundleMatch): string {
  if (framework === "vanilla") {
    return '<div id="tsparticles"></div>';
  }
  return "";
}

/**
 *
 * @param packages
 */
export function generateInstallCommand(packages: string[]): string {
  return `npm install ${packages.join(" ")}`;
}

// ── Notes ─────────────────────────────────────────────────────────

/**
 *
 * @param bundle
 * @param framework
 * @param lower
 * @param keywords
 * @param extraPackages
 * @param conflicting
 */
function buildNotes(
  bundle: BundleMatch,
  framework: Framework,
  lower: string,
  keywords: string[],
  extraPackages: string[],
  conflicting: boolean,
): string[] {
  const notes: string[] = [];

  if (bundle.isAutoInitialized) {
    notes.push(`${bundle.bundleName} auto-initializes all plugins — no manual load() needed.`);
  }

  if (bundle.isPreset) {
    notes.push(
      `Using the ${bundle.presetName} preset — all ${bundle.presetName} options are pre-configured. Override with custom options if needed.`,
    );
  }

  if (framework !== "vanilla" && !bundle.isAutoInitialized) {
    const label = FRAMEWORK_LABELS[framework];
    notes.push(
      `Generated for ${label} — ensure ${FRAMEWORK_PACKAGES[framework]} is compatible with your ${label} version.`,
    );

    if (framework === "angular") {
      notes.push("The generated component uses Angular standalone APIs.");
    }
  }

  const hasInteractivity = mentions(keywords, lower, INTERACTIVITY_WORDS),
    hasLinks = mentions(keywords, lower, LINK_WORDS),
    isAmbiguousFallback = bundle.bundleName === "@tsparticles/slim" && !(hasInteractivity && hasLinks);
  if (isAmbiguousFallback) {
    notes.push(
      "Generated generic particles — try being more specific (e.g. 'confetti', 'snow', 'stars') for specialized bundles.",
    );
  }

  if (conflicting) {
    notes.push(
      "The description matches multiple effects. First match wins — for combining effects, consider using @tsparticles/all.",
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (extraPackages.length > 0) {
    notes.push(`Additional packages beyond the selected bundle: ${extraPackages.join(", ")}.`);
  }

  return notes;
}

// ── Orchestrator ──────────────────────────────────────────────────

/**
 *
 * @param bundleName
 */
function collectBundlePackages(bundleName: string): Set<string> {
  const packages = new Set<string>(),
    seen = new Set<string>(),
    walk = (name: string): void => {
      if (!name || seen.has(name)) {
        return;
      }
      seen.add(name);
      const bundle = bundles.find(b => b.name === name);
      if (!bundle) {
        return;
      }
      for (const pkg of bundle.packages) {
        packages.add(pkg);
      }
      if (bundle.extends) {
        walk(bundle.extends);
      }
    };
  walk(bundleName);
  return packages;
}

/**
 *
 * @param input
 */
export function generateCode(input: GenerateCodeInput): GenerateCodeOutput {
  const description = input.description.trim(),
    framework = input.framework ?? "vanilla",
    typescript = input.typescript ?? false,
    lower = description.toLowerCase(),
    keywords = extractKeywords(description),
    bundleMatch = matchBundle(keywords, lower),
    options = generateOptions(bundleMatch, keywords, lower),
    suggestion = suggestPlugins(options),
    covered = collectBundlePackages(bundleMatch.bundleName),
    extraPackages = suggestion.npmPackages.filter(p => !covered.has(p)),
    extraLoaders = suggestion.imports.filter(({ from }) => !covered.has(from)),
    installPackages: string[] = [];
  if (bundleMatch.isAutoInitialized) {
    installPackages.push(bundleMatch.bundleName);
  } else {
    installPackages.push(bundleMatch.bundleName);
    installPackages.push("@tsparticles/engine");
    if (bundleMatch.presetPackage) {
      installPackages.push(bundleMatch.presetPackage);
    }
    const frameworkPackage = FRAMEWORK_PACKAGES[framework];
    if (frameworkPackage) {
      installPackages.push(frameworkPackage);
    }
  }
  for (const extra of extraPackages) {
    if (!installPackages.includes(extra)) {
      installPackages.push(extra);
    }
  }

  const installCommand = generateInstallCommand(installPackages),
    code = generateFrameworkCode(framework, options, bundleMatch, typescript, extraLoaders),
    html = generateHtml(framework, bundleMatch),
    matchedRuleCount = SPECIALIZED_RULES.filter(rule => matchesAny(lower, rule.keywords)).length,
    notes = buildNotes(bundleMatch, framework, lower, keywords, extraPackages, matchedRuleCount > CONFLICT_THRESHOLD);

  if (bundleMatch.bundleName === "@tsparticles/fireworks") {
    const requestedSplitCount = extractFireworksSplitCount(lower);

    if (requestedSplitCount?.ambiguous) {
      notes.push(
        `The fireworks value "${requestedSplitCount.raw}" could be a year or a requested splitCount. Please clarify with a labeled count, such as "split count: ${requestedSplitCount.raw}".`,
      );
    } else if (requestedSplitCount && requestedSplitCount.value > MAX_FIREWORKS_SPLIT_COUNT) {
      notes.push(
        `Requested fireworks splitCount of ${requestedSplitCount.raw} exceeds the maximum of ${MAX_FIREWORKS_SPLIT_COUNT}; using ${MAX_FIREWORKS_SPLIT_COUNT}.`,
      );
    }
  } else {
    const ambiguousYearCount = extractAmbiguousYearCount(lower);

    if (ambiguousYearCount !== undefined && extractCount(lower) === undefined) {
      notes.push(
        `The value "${ambiguousYearCount}" could be a year or a requested particle count. Please clarify with a labeled count, such as "count: ${ambiguousYearCount}".`,
      );
    }
  }

  return {
    options,
    bundle: bundleMatch.bundleName,
    loadFunction: bundleMatch.loadFunction,
    isAutoInitialized: bundleMatch.isAutoInitialized,
    installPackages,
    installCommand,
    framework,
    html,
    code,
    notes,
  };
}
