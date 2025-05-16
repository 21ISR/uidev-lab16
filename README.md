# Интерактивный UI

## Срок сдачи работ

Последний коммит и пул реквест должен быть оформлен до ???

## Цель:

Научиться использовать Javascript для работы с DOM элементами

Вам дана верстка и стили не в полном объеме. Отсутствуют такие элементы как:

-   popup
-   accordion
-   тултипы
-   слайдер

_Ознакомиться с тем как они должны выглядеть можно [здесь](https://21isr.github.io/uidev-lab16/)_

Ваша задача дописать сайт

## Теория

### Попап

Для реализации попапа необходимо скрыть его (`display: none`). При нажатии на кнопку "Свяжитесь с нами" на него должен накладываться класс, который перебьет значение `none`

```Javascript
const popup = document.querySelector(".popup")

popup.classList.add("popup--show")
```

### Аккордион

_Можно реализовать также как попап, просто перед показом новой страницы контента скрыть все предыдущие, однако тогда потеряется анимация_

Для того, чтобы вернуть анимацию нужно найти размер контента и дать размер всему контейнеру

```Javascript
const accordionHeaders = document.querySelectorAll('.accordion-header')

accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling
        if (header.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px'
        } else {
            content.style.maxHeight = null
        }
    })
})
```

_`forEach` является методом, который предоставляет полную альтернативу `for` циклу_

### Вкладки

Сами вкладки должны помечаться активными с помощью класса `active` (через метод `classList.add("active")`). Доступ к HTML элементу можно получить через событие нажатия (`event.target`).

_Не забудьте перед тем как задавать `active` убрать его со всех остальных вкладок_

```js
const tabs = document.querySelector(...)

for (tab of tabs) {
    tab.classList.remove("active")
}
```

Содержимое по дефолту является скрытым (`display: none`). Класс `active` меняет значение свойства `display`, где становится видно контент. Соответсвенно работает абсолютно также, как и сами вкладки.

### Тултипы

Сам тултип уже существует в верстке, но он должен быть скрыт. Соответсвенно при наведении на него необходимо поменять его значение `display`. Однако в этот раз событие будет называться `mouseover`

```Javascript
tooltipContainer.addEventListener("mouseover", функция_для_показа_самого_тултипа)
```

### Слайдер

Слайды необходимо разместить внутри контейнера слева направо и скрыть слайды, которые юзер не должен видеть через `overflow: hidden`

```CSS
.slider-container {
    position: relative;
    overflow: hidden;
    width: 100%;
}

.slider {
    display: flex;
    transition: transform 0.5s ease;
}

.slide {
    min-width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Сам сдвиг слайдов делается при помощи `transform: translateX(...)`

```Javascript
function showSlide(n) {
    Проверяем чтобы следующий слайд не было больше количества всех картинок и предыдущий слайд не был меньше 0

    slider.style.transform = `translateX(-${currentSlide * 100}%)`
}
```

## Как сдавать

1. Создайте форк репозитория в организации `21ISR` с названием `uidev-lab16-вашафамилия`
2. Используя ветку `wip` сделайте задание
3. Зафиксируйте изменения в вашем репозитории
4. Когда документ будет готов - создайте пул реквест из ветки `wip` (вашей) на ветку `main` (тоже вашу) и укажите меня ([ktkv419](https://github.com/ktkv419)) как reviewer

**Не мержите сами коммит**, это сделаю я после проверки задания
