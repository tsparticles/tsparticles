# Formenkatalog

Dieser Katalog listet die gebrauchlichsten Werte fur `particles.shape.type` auf und zeigt, wann `particles.shape.options` formspezifische Einstellungen hinzufugt.

Quellordner:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- Formoptionen-Referenz: [`/options/particles-shape`](/de/options/particles-shape)

## Haufige Formtypen

- `circle` (Standard, keine zusatzlichen Formoptionen)
- `square` / `edge` (keine zusatzlichen Formoptionen)
- `triangle` (keine zusatzlichen Formoptionen)
- `line` (keine zusatzlichen Formoptionen)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)

## Hinweise zu Aliasen und Bundles

- `square` und `edge` sind Aliase fur dieselbe Form.
- `character` und `char` sind Aliase fur dieselbe Optionsgruppe.
- `image` und `images` verwenden dasselbe Optionsobjekt.
- Die meisten erweiterten Formen erfordern `@tsparticles/slim` (oder `@tsparticles/all`) oder dedizierte Formpakete.

Um diese schnell mit Start/Pause-Steuerung und bearbeitbarem JSON zu testen, verwenden Sie [`/playground/shapes`](/de/playground/shapes).
