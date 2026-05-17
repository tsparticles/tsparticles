# Lançamentos e versionamento

Este projeto agora vem de um único repositório: `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Onde o trabalho de lançamento acontece

- Raiz Monorepo: <https://github.com/tsparticles/tsparticles>
- Pacotes: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Motor: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Invólucros: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Predefinições: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Paletas: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Regra de alinhamento de versão

- Mantenha todos os pacotes `@tsparticles/*` alinhados à mesma linha de lançamento.
- Evite misturar diferentes linhas beta ou versões principais em um aplicativo.

## Lista de verificação prática de lançamento

1. Verifique as versões do pacote de destino nos arquivos `package.json` do espaço de trabalho.
2. Construir e testar projetos afetados.
3. Valide links de documentos e comportamento do playground.
4. Publique a partir do fluxo de lançamento do monorepo.
