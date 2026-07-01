# Квест с QR-кодами

Статический квест без сервера. Его можно выложить на GitHub Pages: сайт состоит только из `html`, `css` и `js`, поэтому отдельный серверный процесс не нужен.

## Как работают ссылки

Это один сайт и одна страница. Каждый QR-код отличается только номером этапа в конце ссылки:

```text
https://galinamoshkina.github.io/camp_quest/?step=1
https://galinamoshkina.github.io/camp_quest/?step=2
https://galinamoshkina.github.io/camp_quest/?step=3
https://galinamoshkina.github.io/camp_quest/?step=4
https://galinamoshkina.github.io/camp_quest/?step=5
https://galinamoshkina.github.io/camp_quest/?step=6
https://galinamoshkina.github.io/camp_quest/?step=7
```

Если дети открывают этап по порядку, текст показывается. Если они пытаются открыть QR-код слишком рано, сайт показывает сообщение, что сначала нужен предыдущий QR-код.

Прогресс хранится на телефоне команды в `localStorage`. Поэтому одной команде лучше проходить маршрут с одного телефона.

## QR-коды

Готовые QR-коды лежат в папке `qrcodes`:

```text
qrcodes/step-1.png
qrcodes/step-2.png
qrcodes/step-3.png
qrcodes/step-4.png
qrcodes/step-5.png
qrcodes/step-6.png
qrcodes/step-7.png
```

Для печати можно открыть `qr-print.html`.

## Где менять задания

Все тексты лежат в `quest-data.js`.

Для каждого этапа можно поменять:

- `creature` — название существа;
- `title` — заголовок точки;
- `text` — абзацы текста, задания и подсказки.

## Как сбросить прохождение

Для теста откройте инструменты разработчика в браузере и очистите данные сайта, либо выполните в консоли:

```js
localStorage.removeItem("camp-mythic-quest-progress-v1")
```

После этого квест снова начнется с первого QR-кода.
