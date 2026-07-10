/**
 * Parses a `mode` value from an interactivity event config into a list
 * of mode names. tsParticles allows this to be a single space/comma
 * separated string or an array of strings.
 */
export function parseModeNames(value: unknown): string[] {
  if (typeof value === "string") return value.split(/[,\s]+/).filter(Boolean);
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string" && v.length > 0);
  return [];
}

/**
 * Collects every interactivity mode name referenced by an
 * `interactivity` options section, whether declared under
 * `interactivity.modes` (object keys) or under
 * `interactivity.events.onClick.mode` / `.onHover.mode` (string or
 * array). Shared between `suggestPlugins` and `diagnoseIssues` so the
 * two tools never drift on what counts as "this mode is configured".
 */
export function collectInteractivityModes(interactivity: Record<string, unknown> | undefined): string[] {
  if (!interactivity) return [];

  const modeNames = new Set<string>();
  const modesSection = interactivity.modes as Record<string, unknown> | undefined;
  if (modesSection) {
    for (const mode of Object.keys(modesSection)) {
      modeNames.add(mode);
    }
  }

  const events = interactivity.events as Record<string, unknown> | undefined;
  const eventEntries = [events?.onClick, events?.onHover];

  for (const entry of eventEntries) {
    if (!entry || typeof entry !== "object") continue;
    const mode = (entry as Record<string, unknown>).mode;
    for (const modeName of parseModeNames(mode)) {
      modeNames.add(modeName);
    }
  }

  return [...modeNames];
}
