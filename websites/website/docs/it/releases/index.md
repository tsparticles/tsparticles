# Rilasci e versioni

Questo progetto ora viene fornito da un unico repository: `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Dove avviene il lavoro di rilascio

- Radice monorepo: <https://github.com/tsparticles/tsparticles>
- Pacchetti: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Motore: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Wrapper: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Preimpostazioni: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Tavolozze: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Regola di allineamento della versione

- Mantieni tutti i pacchetti `@tsparticles/*` allineati alla stessa riga di rilascio.
- Evita di mescolare diverse linee beta o versioni principali in un'unica app.

## Lista pratica di controllo del rilascio

1. Verificare le versioni del pacchetto di destinazione nei file `package.json` dell'area di lavoro.
2. Costruisci e testa i progetti interessati.
3. Convalida i collegamenti ai documenti e il comportamento del parco giochi.
4. Pubblicare dal flusso di rilascio monorepo.
