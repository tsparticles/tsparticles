# Mise en route

Ce chemin est la configuration fiable la plus rapide pour `tsParticles` en 2026.

## Liste de contrôle rapide

1. Installez `@tsparticles/engine`.
2. Choisissez un chemin d'exécution (`@tsparticles/slim`, `@tsparticles/all`, API ciblées comme `@tsparticles/particles` ou packages personnalisés uniquement).
3. Chargez votre bundle une seule fois.
4. Commencez par des options manuelles, un objet de configuration ou un préréglage.

## 1) Installer le moteur + un preset bundle

Utilisez `@tsparticles/engine` plus `@tsparticles/slim` pour un excellent équilibre taille/fonctionnalités par défaut.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Besoin de liens CDN, de variantes `npm`/`yarn` ou d'exemples `require(...)` ?

- Voir [`/guide/installation`](/fr/guide/installation).

## 2) Créer un conteneur en HTML

```html
<div id="tsparticles"></div>
```

## 3) Initialisez tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.35,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Choisissez le bon pack

- `@tsparticles/slim` : la plupart des applications devraient démarrer ici.
- `@tsparticles/basic` : ensemble de fonctionnalités plus petit pour les configurations très légères.
- `@tsparticles/all` : tout est inclus, le plus simple pour un prototypage rapide.

Si vous avez besoin d'une API ciblée au lieu d'une configuration directe `tsParticles` :

- `@tsparticles/particles` : API d'arrière-plan de particules simplifiée
- `@tsparticles/confetti` : API de confettis en un seul appel
- `@tsparticles/fireworks` : API de feux d'artifice en un seul appel

## 5) Utilisez les préréglages/configurations lorsque vous avez besoin de vitesse

Si vous préférez les effets prédéfinis :

```bash
pnpm add @tsparticles/configs
```

Chargez ensuite une configuration par clé, comme l'[application `demo/vite`](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Si vous préférez les configurations basées sur les noms de préréglages, utilisez le catalogue de préréglages officiel dans [`/demos/presets`](/fr/demos/presets).

## Carte de documentation rapide

- Options racine : [`/options/`](/fr/options/)
- Référence des wrappers : [`/guide/wrappers`](/fr/guide/wrappers)
- Catalogue de préréglages : [`/demos/presets`](/fr/demos/presets)
- Catalogue de palettes : [`/demos/palettes`](/fr/demos/palettes)
- Catalogue de formes : [`/demos/shapes`](/fr/demos/shapes)
- Migration depuis particles.js : [`/migrations/particles-js`](/fr/migrations/particles-js)
- Formats couleur : [`/guide/color-formats`](/fr/guide/color-formats)
- Cycle de vie du conteneur : [`/guide/container-lifecycle`](/fr/guide/container-lifecycle)
- Plugins et personnalisation : [`/guide/plugins-customization`](/fr/guide/plugins-customization)

## Dépannage

- Écran vide : vérifiez que `#tsparticles` existe avant d'appeler `tsParticles.load`.
- Fonctionnalité manquante : vous avez probablement besoin d'un autre plugin/package (forme, interaction, mise à jour).
- Tapez les erreurs sur les options : gardez vos packages alignés sur la même version majeure/mineure.
