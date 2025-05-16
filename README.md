# Интерактивный UI

## Срок сдачи работ

Последний коммит и пул реквест должен быть оформлен до ???

## Цель:

Научиться использовать Javascript для работы с DOM элементами

Вам дана верстка и стили не в полном объеме. Отсутствуют такие элементы как:

- popup
- accordion
- тултипы
- слайдер

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

## Как сдавать

1. Создайте форк репозитория в организации `21ISR` с названием `uidev-lab16-вашафамилия`
2. Используя ветку `wip` сделайте задание
3. Зафиксируйте изменения в вашем репозитории
4. Когда документ будет готов - создайте пул реквест из ветки `wip` (вашей) на ветку `main` (тоже вашу) и укажите меня ([ktkv419](https://github.com/ktkv419)) как reviewer

**Не мержите сами коммит**, это сделаю я после проверки задания
