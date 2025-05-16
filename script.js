// Попап
const showPopupBtn = document.getElementById('show-popup')
const popupOverlay = document.getElementById('popup-overlay')
const popupClose = document.querySelector('.popup-close')

showPopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'flex'
})

popupClose.addEventListener('click', () => {
    popupOverlay.style.display = 'none'
})

popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none'
    }
})

// Аккордеон
const accordionHeaders = document.querySelectorAll('.accordion-header')

accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        // Закрываем все аккордеоны
        accordionHeaders.forEach((h) => {
            if (h !== header) {
                h.classList.remove('active')
                h.nextElementSibling.style.maxHeight = null
            }
        })

        // Открываем/закрываем текущий аккордеон
        header.classList.toggle('active')
        const content = header.nextElementSibling
        if (header.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px'
        } else {
            content.style.maxHeight = null
        }
    })
})

// Вкладки
const tabBtns = document.querySelectorAll('.tab-btn')

tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок и контента
        tabBtns.forEach((b) => b.classList.remove('active'))
        document
            .querySelectorAll('.tab-content')
            .forEach((content) => content.classList.remove('active'))

        // Добавляем активный класс выбранной кнопке и соответствующему контенту
        btn.classList.add('active')
        document.getElementById(btn.dataset.tab).classList.add('active')
    })
})

// Оповещения
const alertCloseButtons = document.querySelectorAll('.alert-close')

alertCloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const alert = btn.parentElement
        alert.style.display = 'none'
    })
})

// Слайдер
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const dotsContainer = document.querySelector('.slider-dots')
const dots = document.querySelectorAll('.slider-dot')
const prevBtn = document.querySelector('.slider-arrow-left')
const nextBtn = document.querySelector('.slider-arrow-right')
let currentSlide = 0

function showSlide(n) {
    if (n < 0) {
        currentSlide = slides.length - 1
    } else if (n >= slides.length) {
        currentSlide = 0
    } else {
        currentSlide = n
    }

    slider.style.transform = `translateX(-${currentSlide * 100}%)`

    // Обновляем точки
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide)
    })
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1)
})

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1)
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index)
    })
})

// Автоматическая смена слайдов
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1)
}, 5000)

// Остановка автоматической смены при наведении
const sliderContainer = document.querySelector('.slider-container')

sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval)
})

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1)
    }, 5000)
})

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Учитываем высоту шапки
                behavior: 'smooth',
            })
        }
    })
})

// Инициализация первого аккордеона как открытого
const firstAccordionHeader = document.querySelector('.accordion-header')
const firstAccordionContent = firstAccordionHeader.nextElementSibling
firstAccordionHeader.classList.add('active')
firstAccordionContent.style.maxHeight =
    firstAccordionContent.scrollHeight + 'px'

// Создание динамических тултипов
function createTooltip(element, text) {
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'

    const innerContent = element.outerHTML
    const tooltipText = document.createElement('span')
    tooltipText.className = 'tooltip-text'
    tooltipText.textContent = text

    tooltip.innerHTML = innerContent
    tooltip.appendChild(tooltipText)

    element.parentNode.replaceChild(tooltip, element)
}

// Создание динамических алертов
function createAlert(type, message, autoClose = false) {
    const alertDiv = document.createElement('div')
    alertDiv.className = `alert alert-${type}`

    const alertContent = document.createElement('div')
    alertContent.innerHTML = message

    const closeButton = document.createElement('button')
    closeButton.className = 'alert-close'
    closeButton.innerHTML = '&times;'
    closeButton.addEventListener('click', () => {
        alertDiv.remove()
    })

    alertDiv.appendChild(alertContent)
    alertDiv.appendChild(closeButton)

    const contactSection = document.getElementById('contact')
    contactSection.insertBefore(alertDiv, contactSection.querySelector('form'))

    if (autoClose) {
        setTimeout(() => {
            alertDiv.remove()
        }, 5000)
    }

    return alertDiv
}

// Функция для создания модальных окон
function createModal(title, content, okCallback = null) {
    const modalOverlay = document.createElement('div')
    modalOverlay.className = 'popup-overlay'
    modalOverlay.style.display = 'flex'

    const modal = document.createElement('div')
    modal.className = 'popup'

    const closeButton = document.createElement('button')
    closeButton.className = 'popup-close'
    closeButton.innerHTML = '&times;'
    closeButton.addEventListener('click', () => {
        modalOverlay.remove()
    })

    const modalTitle = document.createElement('h2')
    modalTitle.textContent = title

    const modalContent = document.createElement('div')
    modalContent.innerHTML = content

    const buttonContainer = document.createElement('div')
    buttonContainer.style.marginTop = '20px'
    buttonContainer.style.display = 'flex'
    buttonContainer.style.justifyContent = 'flex-end'

    const okButton = document.createElement('button')
    okButton.className = 'btn'
    okButton.textContent = 'OK'
    okButton.addEventListener('click', () => {
        if (okCallback) {
            okCallback()
        }
        modalOverlay.remove()
    })

    buttonContainer.appendChild(okButton)

    modal.appendChild(closeButton)
    modal.appendChild(modalTitle)
    modal.appendChild(modalContent)
    modal.appendChild(buttonContainer)

    modalOverlay.appendChild(modal)
    document.body.appendChild(modalOverlay)

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove()
        }
    })

    return modalOverlay
}

// Демонстрация работы модального окна
document.getElementById('show-popup').addEventListener('contextmenu', (e) => {
    e.preventDefault()
    createModal(
        'Информация',
        '<p>Это пример динамически созданного модального окна.</p><p>Вы можете использовать его для показа различных уведомлений и сообщений.</p>',
    )
})
