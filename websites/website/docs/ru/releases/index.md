# Релизы и версии

Этот проект теперь поставляется из одного репозитория: `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Где происходит работа по выпуску

- Корень монорепо: <https://github.com/tsparticles/tsparticles>
- Пакеты: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Движок: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Обертки: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Пресеты: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Палитры: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Правило выравнивания версий

- Сохраняйте все пакеты `@tsparticles/*` в одной строке выпуска.
- Избегайте смешивания разных бета-линий или основных версий в одном приложении.

## Контрольный список практического выпуска

1. Проверьте версии целевого пакета в файлах `package.json` рабочей области.
2. Создайте и протестируйте затронутые проекты.
3. Проверьте ссылки на документы и поведение игровой площадки.
4. Публикация из потока выпуска монорепозитория.
