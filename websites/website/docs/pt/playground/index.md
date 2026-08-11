# Parque infantil

Dividido por caso de uso:

- [`Configs Playground`](/pt/playground/configs): demonstrações mais ricas com opções editáveis completas.
- [`Shapes Playground`](/pt/playground/shapes): demonstracoes focadas em `shape.type`, com opcoes especificas por forma quando disponiveis.
- [`Presets Playground`](/pt/playground/presets): demonstrações oficiais de nomes predefinidos (`{ preset: "..." }`).
- [`Palettes Playground`](/pt/playground/palettes): demonstrações focadas na paleta do projeto de predefinições.
- [`Bundles Playground`](/pt/playground/bundles): playgrounds dedicados para `@tsparticles/confetti`, `@tsparticles/fireworks`, `@tsparticles/particles` e `@tsparticles/ribbons`.

A execução é sempre **somente acionada pelo usuário** (sem reprodução automática).

## Fluxo compartilhado

O layout é consistente em todos os playgrounds:

1. Pré-visualização da tela primeiro.
2. Controles para Iniciar/Pausar/Retomar/Destruir.
3. Editor JSON para opções.

4. Escolha uma demonstração no menu.
5. Pressione `Start` para executá-lo (sem reprodução automática).
6. Edite o JSON no editor.
7. Pressione `Start` novamente para recarregar com suas novas opções.
8. Use `Pause`/`Resume` para controlar o desempenho e o uso da CPU.

> Nota: `Destroy` libera totalmente a instância do contêiner.

## Fluxo de trabalho sugerido

- Protótipo aqui até que o efeito fique estável.
- Copie o JSON final em seu projeto.
- Digite com `ISourceOptions` no código do aplicativo.
