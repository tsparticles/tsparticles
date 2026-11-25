# E10 migration guide translation drafts

These files are internal working drafts. They are not included in the website
and must not be published as release documentation until E10 accepts the
source guide and review is complete.

| Locale            | Draft                                    | Status                                                                                       |
| ----------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Italian (`it`)    | [v5-migration-it.md](v5-migration-it.md) | Complete first translation pass; code examples and section structure checked against English |
| Spanish (`es`)    | [v5-migration-es.md](v5-migration-es.md) | Complete first translation pass; code examples and section structure checked against English |
| German (`de`)     | [v5-migration-de.md](v5-migration-de.md) | First pass complete; structural check passed; native-language review pending                 |
| French (`fr`)     | [v5-migration-fr.md](v5-migration-fr.md) | First pass complete; structural check passed; native-language review pending                 |
| Hindi (`hi`)      | [v5-migration-hi.md](v5-migration-hi.md) | First pass complete; structural check passed; native-language review pending                 |
| Japanese (`ja`)   | [v5-migration-ja.md](v5-migration-ja.md) | First pass complete; structural check passed; native-language review pending                 |
| Portuguese (`pt`) | [v5-migration-pt.md](v5-migration-pt.md) | First pass complete; structural check passed; native-language review pending                 |
| Russian (`ru`)    | [v5-migration-ru.md](v5-migration-ru.md) | First pass complete; structural check passed; native-language review pending                 |
| Chinese (`zh`)    | [v5-migration-zh.md](v5-migration-zh.md) | First pass complete; structural check passed; native-language review pending                 |

Run `node .planning/handovers/evidence/tools/check-migration-draft-alignment.mjs`
to verify that each draft retains the English guide's section hierarchy and
exact code examples and that its relative Markdown links resolve. This
structural check does not replace terminology or native-language review.
