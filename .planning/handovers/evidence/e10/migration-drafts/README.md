# E10 migration guide translation drafts

These files are internal working drafts. They are not included in the website.
Native-language sign-off for all nine is queued for final plan validation at
the user's direction; do not publish them as release documentation before that
review and separate publication authorization.

| Locale            | Draft                                    | Status                                                                                                    |
| ----------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Italian (`it`)    | [v5-migration-it.md](v5-migration-it.md) | First translation pass; structural and technical status review complete; native-language sign-off pending |
| Spanish (`es`)    | [v5-migration-es.md](v5-migration-es.md) | Complete first translation pass; code examples and section structure checked against English              |
| German (`de`)     | [v5-migration-de.md](v5-migration-de.md) | First pass complete; structural check passed; native-language review pending                              |
| French (`fr`)     | [v5-migration-fr.md](v5-migration-fr.md) | First pass complete; structural check passed; native-language review pending                              |
| Hindi (`hi`)      | [v5-migration-hi.md](v5-migration-hi.md) | First pass complete; structural check passed; native-language review pending                              |
| Japanese (`ja`)   | [v5-migration-ja.md](v5-migration-ja.md) | First pass complete; structural check passed; native-language review pending                              |
| Portuguese (`pt`) | [v5-migration-pt.md](v5-migration-pt.md) | First pass complete; structural check passed; native-language review pending                              |
| Russian (`ru`)    | [v5-migration-ru.md](v5-migration-ru.md) | First pass complete; structural check passed; native-language review pending                              |
| Chinese (`zh`)    | [v5-migration-zh.md](v5-migration-zh.md) | First pass complete; structural check passed; native-language review pending                              |

Run `node .planning/handovers/evidence/tools/check-migration-draft-alignment.mjs`
to verify that each draft retains the English guide's section hierarchy and
exact code examples and that its relative Markdown links resolve. This
structural check does not replace terminology or native-language review.

Native-language review is still required for all nine drafts and is queued for
final plan validation at the user's direction. The progress
paragraphs now reflect the current evidence: all 20 CLI scaffold consumers pass,
the callback-free renderer follow-up passes all 30 runtime rows, and the quiet
M4/500 update/render checks meet their E0 ceilings. The structural alignment
check does not replace native-language sign-off.
