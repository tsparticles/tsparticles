# Граф зависимостей

Это практическая карта слоев пакета, представленная в основном README `tsParticles`.

Полный исчерпывающий график см.:

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## Общий поток пакетов

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## Как использовать эту карту

- Начните с `engine` + `slim` для большинства рабочих приложений.

- Перейдите к `tsparticles`, если вам нужны дополнительные встроенные взаимодействия/плагины.
- Переходите на `all` только в том случае, если вам нужен полный набор функций.
- Используйте специальные пакеты (`confetti`, `fireworks`, `particles`) для целенаправленных эффектов.

## Похожие страницы

- [`/guide/getting-started`](/ru/guide/getting-started)
- [`/guide/installation`](/ru/guide/installation)
- [`/options/performance`](/ru/options/performance)
