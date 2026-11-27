# Guide de migration vers v5 — brouillon E10

État : brouillon E10 mis à jour le 2026-11-27. Les vérifications E9 des paquets installés et du navigateur ont réussi pour le candidat actuel. Ce guide décrit les contrats v5 implémentés pour le moteur, les wrappers, les bundles et les couleurs. Les seuils de taille E0 restent des références de diagnostic selon le critère E10 mis à jour ; ils ne sont pas présentés comme satisfaits. Le suivi du renderer sans callback réussit les 30 vérifications runtime E0, y compris les lignes en HDR forcé. Pour M4/500, update et render respectent les seuils E0 ; le p95 des images atteint 7,20 ms, soit 0,05 ms au-dessus de la référence historique E5. La vérification HDR sur matériel et les revues documentaires requises restent ouvertes.

L’exemple TypeScript généré par MCP et les 20 scaffolds CLI (Vanilla et 19 frameworks) passent la vérification de types, le build de production et le démarrage dans Chrome sans erreur de page ni de console. Les neuf familles de templates empaquetées ne contiennent aucune variante retirée de Vue 2, Nuxt 2 ou Nuxt 3. La relecture linguistique des neuf brouillons et la vérification HDR/navigateur sur matériel restent ouvertes. Ces documents sont des brouillons internes, pas les guides de migration définitifs pour la publication.

Les guides Vanilla par défaut et localisés du site actuel sont identiques octet par octet et utilisent les paquets CDN v4 actuellement publiés. Leurs exemples avec singleton restent de la documentation v4 jusqu’à ce que la page de migration v5 soit prête à publier ; ils ne comptent pas comme vérifications de consommateurs v5.

## Propriété du moteur

Remplacez les imports du singleton `tsParticles` par `createEngine()`. Conservez l’instance retournée à l’échelle de l’application, transmettez-la à chaque loader et fournissez-la explicitement aux wrappers et providers. Une variable locale peut toujours s’appeler `tsParticles`. Le teardown d’un composant gère son container ; il ne doit pas détruire les containers sans rapport qui utilisent le même moteur.

La personnalisation du générateur aléatoire et du logger, ainsi que la planification des animations, appartiennent désormais à chaque instance dans l’implémentation E2. Enregistrez les plugins personnalisés dans `container.engine` (ou `container.pluginManager.engine`) afin que les services runtime suivent le moteur propriétaire.

## Intégrations de framework retirées

| Intégration                                   | Destination de migration                                 | Suppression / vérification                   |
| --------------------------------------------- | -------------------------------------------------------- | -------------------------------------------- |
| Wrapper Vue 2, démo et références du starter  | Migrer l’application vers Vue 3 et `@tsparticles/vue3`   | Retirés dans E1 ; vérifiés à nouveau dans E9 |
| Wrapper Nuxt 2, démo et références du starter | Migrer l’application vers Nuxt 4 et `@tsparticles/nuxt4` | Retirés dans E1 ; vérifiés à nouveau dans E9 |
| Wrapper Nuxt 3, démo et références du starter | Migrer l’application vers Nuxt 4 et `@tsparticles/nuxt4` | Retirés dans E1 ; vérifiés à nouveau dans E9 |

Les mises à niveau de framework sont des migrations d’application, pas de simples changements de nom de paquet. La recherche de références E0 se trouve dans [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt) ; lors d’un retrait, vérifiez les installateurs, chaînes générées, documents et traductions. La matrice comprend aussi les consommateurs maintenus qui doivent utiliser des moteurs explicites.

## API obsolètes

`colorMix()`, qui renvoyait du RGB, a été supprimée. Les helpers obsolètes du moteur `getStyleFromRgb()` et `getStyleFromHsl()`, le `getStyleFromHsv()` du plugin HSV et le formateur local `getStyleFromOklch()` du paquet OKLCH ont également été supprimés. Convertissez le RGB avec `rgbToOklch()`, le HSL avec `rgbToOklch(hslToRgbFloat(color))`, et résolvez les options HSV via le gestionnaire de couleurs HSV enregistré avec `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })`. Transmettez le résultat canonique à `getStyleFromOklch()` du moteur, qui gère le gamut de destination et les paramètres HDR. Si la sortie doit réellement être limitée au RGB, utilisez `mapOklchToSrgb(result).rgb`.

### Hooks du cycle de vie des interactors

Les classes de base des interactors fournissent une implémentation par défaut sans effet de `reset()`. La classe de base des interactors externes fournit également un `clear()` sans effet. Le manager sélectionne les hooks personnalisés après l’initialisation des interactors, y compris lors de l’initialisation du redraw. Conservez les overrides qui maintiennent un état ou effectuent un travail pendant reset, et ajoutez le modificateur TypeScript `override` si `noImplicitOverride` est activé.

Consultez l’[inventaire des API obsolètes](../../e9/deprecated-migrations.md) pour les formateurs de couleur supprimés, les options Confetti et Ribbons, ainsi que la surface de compatibilité particles.js conservée en option. Si vous mettez votre compilateur à niveau vers Stencil 5, supprimez `applyPolyfills()` et attendez `defineCustomElements()` lorsque l’enregistrement doit être terminé avant l’hydratation. Le wrapper tsParticles pour Stencil utilise Stencil 4 et déclare toujours `applyPolyfills()`.

## Couleurs, options et contrats publics

Les entrées de couleur acceptent toujours RGB, HSL, HSV, HWB, Lab, LCH, OKLab, les chaînes CSS, les tableaux et les plages prises en charge. Le contrat d’animation des particules utilise maintenant OKLCH : remplacez les composants HSL historiques `{ h, s, l }` par `{ h, c, l }`. La teinte reste un angle ; le chroma et la luminosité utilisent l’échelle numérique OKLCH de v5, et l’alpha reste une valeur d’opacité distincte. Ne copiez pas la saturation HSL dans le chroma ; convertissez les couleurs à la frontière d’entrée ou conservez une entrée CSS/RGB prise en charge pour analyse par le moteur. Les gestionnaires qui implémentent le point d’extension couleur doivent respecter le contrat actuel du gestionnaire OKLCH. Consultez les [décisions sur les couleurs](../../../V5-COLOR-DECISIONS.md) pour les entrées acceptées, le gamut mapping, l’alpha et le comportement HDR.

## API à moteur explicite implémentées dans E1

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Les entrées root, `/lazy` et browser module ne créent pas de moteur et ne publient aucun objet dans `globalThis`. Les scripts Rollup classiques exposent le namespace des factories et des loaders :

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Un bundle autonome inclut les définitions du moteur ; les scripts externes de fonctionnalités exigent d’abord le moteur correspondant et ses dépendances. Gardez les versions des paquets alignées. Le namespace contient des définitions, pas un moteur. Charger un autre bundle ne détruit jamais un moteur déjà créé. La propriété d’un même canvas est exclusive, même entre copies du moteur incluses dans différents bundles. Détruisez le propriétaire avant de transférer le canvas. Des ID identiques sur des canvas distincts fournis restent indépendants entre moteurs.

Utilisez un moteur séparé lorsque l’application a besoin de registres de plugins, sources aléatoires, loggers, schedulers ou propriété de containers distincts. Enregistrez chaque fonctionnalité requise sur chacun des moteurs qui l’utilisera :

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Les paquets de commodité exportent `createConfetti(engine)`, `createFireworks(engine)`, `createParticles(engine)` et `createRibbons(engine)`. La fonction retournée est liée à ce moteur et conserve `init`, `create` et `version` :

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` renvoie `{ particlesJS, pJSDom, Particles }` ; ces API de compatibilité ne sont pas affectées à `globalThis`. `loadConfigs(engine)` enregistre explicitement le catalogue et les palettes sur ce moteur.

| Famille de wrappers                           | Propriété du moteur et enregistrement                                                                                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Transmettez `engine` à `ParticlesProvider` et fournissez un registrar `init` qui y charge les plugins requis.                                                                         |
| Vue 3                                         | Installez le provider particles avec `{ engine, init }` ; appelez `useParticlesProvider()` depuis les descendants.                                                                    |
| Angular                                       | Fournissez un moteur à `service.init(engine, registrar)` et un provider de service distinct pour chaque moteur indépendant. Les composants de commodité reçoivent `engine` en entrée. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Fournissez le moteur via l’API du composant/provider et initialisez-le avec `initParticlesEngine(engine, registrar)` lorsque cette API existe.                                        |
| Qwik                                          | Créez/enregistrez côté client et conservez le moteur avec `noSerialize` ; ne créez pas de moteur pendant le rendu serveur.                                                            |
| Éléments personnalisés                        | Affectez `.engine` comme propriété ; ce n’est pas un attribut HTML sérialisé.                                                                                                         |
| Nuxt 4                                        | Utilisez `engine` et `registerParticles` exportés par le module d’initialisation configuré.                                                                                           |

Consultez le README de chaque wrapper pour les signatures propres au framework et les contraintes SSR. Ne recréez pas de moteur implicite au niveau du module dans un provider.

Le teardown d’un composant détruit uniquement le container qu’il possède. L’application gère la durée de vie d’un moteur partagé et doit terminer les chargements en attente et détruire les containers avant de le supprimer. Les services runtime appartiennent à chaque moteur. Configurez-les avant de charger un container :

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

Les anciennes API globales `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` et `getParticlesLogger` ont été supprimées. Remplacez-les par `engine.setRandom`, `engine.getRandom`, `engine.getRandomFn`, `engine.setLogger` et `engine.getLogger`. Les plugins personnalisés peuvent accéder au propriétaire via `container.engine` ou `container.pluginManager.engine`. Les helpers runtime reçoivent un fournisseur aléatoire explicite ; utilisez le fournisseur stable `getRandomFn()` du moteur propriétaire pour que les modifications ultérieures de la source prennent effet sans affecter les autres moteurs. La planification des animations est aussi propre à chaque moteur ; le scheduler ayant créé les images de chaque container les annule.

### Ordre d’initialisation

Pour les wrappers qui exposent `initParticlesEngine`, appelez `initParticlesEngine(engine, registrar)` pendant l’initialisation de l’application. Les composants peuvent être montés avant cet appel : ils attendent l’initialisation de ce moteur et n’en créent ni n’en initialisent un implicitement. Pour jQuery, utilisez `$.particles(engine).init(registrar)`. Les providers React/Vue et l’initialisation du service Angular effectuent l’étape équivalente. Un échec d’enregistrement rejette les attentes actuelles et permet de réessayer l’initialisation.

## Entrées de modules et navigateur

Importez la racine du paquet pour l’API ESM standard. Utilisez le sous-chemin `/lazy` si vous avez besoin de son point d’entrée différé ; le chargement dynamique ne restaure pas l’ancien singleton. Les vérifications du paquet installé couvrent `import` ESM, `require` CJS et la condition `browser` pour les entrées root et `/lazy`.

Pour la sortie navigateur classique, le namespace Rollup contient les factories et les loaders de fonctionnalités. Créez le moteur après le chargement du script namespace et transmettez-le à chaque loader. Les scripts externes de fonctionnalités dépendent du moteur correspondant et des dépendances partagées ; utilisez des versions cohérentes et respectez l’ordre indiqué dans le README navigateur du bundle. Un bundle autonome contient les fonctionnalités sélectionnées. Le chargement de l’entrée navigateur ou l’import de la racine d’un paquet ne crée jamais de moteur automatiquement.

## Limites des paquets et suppression des API singleton

Importez les types runtime et `createEngine` depuis `@tsparticles/engine`, puis seulement les paquets de fonctionnalités nécessaires à l’application, par exemple `@tsparticles/slim` ou un paquet dédié d’interaction, de forme ou d’updater. Les paquets de commodité sont des adapters distincts. Préférez les exports déclarés du paquet aux imports de chemins `dist` internes ou du code source d’un autre paquet. Le rapport E10 des paquets installés fait référence pour les vérifications actuelles des `exports`, déclarations et résolutions.

Le singleton moteur exporté et les helpers globaux de mutation du moteur ont été supprimés. Remplacez `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` et `getParticlesLogger` par les méthodes correspondantes du moteur propriétaire du container. Si l’application utilisait `tsParticles.load`, `tsParticles.loadJSON` ou `tsParticles.dom`, appelez ces opérations sur le moteur explicite ou conservez le container retourné. N’accédez pas à `window.tsParticles` depuis un paquet ESM/CJS importé ; les bundles navigateur classiques exposent séparément le namespace documenté.
