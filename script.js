// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Инициализация частиц
    initParticles();
    
    // Инициализация кастомного курсора
    initCustomCursor();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация обработчиков событий
    initEventHandlers();
    
    // Скрытие прелоадера
    hidePreloader();
    
    // Установка минимальной даты для бронирования
    setMinBookingDate();
}

// Прелоадер
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
}

// Частицы на фоне
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#D4AF37" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#D4AF37",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    }
}

// Кастомный курсор
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Эффекты при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('button, a, .service-card, .hall-card, input, select');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderColor = '#C41E3A';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = '#D4AF37';
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Специфичные анимации для разных элементов
                if (entry.target.classList.contains('hall-card')) {
                    entry.target.style.transition = 'all 0.6s ease-out';
                }
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transition = 'all 0.8s ease-out';
                }
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.hall-card, .service-card, .gallery-item, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
}

// Обработчики событий
function initEventHandlers() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка формы бронирования
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }

    // Ховер эффекты для услуг
    initServiceHoverEffects();
    
    // Клик по гамбургер меню (для мобильных)
    const hamburger = document.querySelector('.nav-hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

// Эффекты наведения для услуг
function initServiceHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const hoverContent = card.querySelector('.service-hover');
        
        card.addEventListener('mouseenter', () => {
            hoverContent.style.opacity = '1';
            hoverContent.style.transform = 'translateY(0)';
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.borderColor = '#D4AF37';
            card.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)';
        });
        
        card.addEventListener('mouseleave', () => {
            hoverContent.style.opacity = '0';
            hoverContent.style.transform = 'translateY(20px)';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.borderColor = '#404040';
            card.style.background = '#1A1A1A';
        });
    });
}

// Обработка отправки формы бронирования
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        hall: formData.get('hall'),
        date: formData.get('date'),
        time: formData.get('time'),
        hours: formData.get('hours')
    };

    // Валидация
    if (!validateBookingForm(bookingData)) {
        return;
    }

    // Показ успешного модального окна
    showSuccessModal();
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Данные бронирования:', bookingData);
    
    // Очистка формы
    e.target.reset();
    
    // Отправка в Telegram (пример)
    sendToTelegram(bookingData);
}

// Валидация формы
function validateBookingForm(data) {
    // Проверка имени
    if (!data.name || data.name.length < 2) {
        showError('Пожалуйста, введите корректное имя');
        return false;
    }

    // Проверка телефона
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    const cleanPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length !== 11) {
        showError('Пожалуйста, введите корректный номер телефона');
        return false;
    }

    // Проверка даты
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError('Нельзя выбрать прошедшую дату');
        return false;
    }

    // Проверка времени
    if (!data.time) {
        showError('Пожалуйста, выберите время');
        return false;
    }

    return true;
}

// Показать ошибку
function showError(message) {
    // Создаем красивый toast для ошибки
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #C41E3A;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(196, 30, 58, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Анимация появления
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
}

// Показать успешное модальное окно
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Анимация появления
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Маска для телефона
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('7') || value.startsWith('8')) {
        value = value.substring(1);
    }
    
    let formattedValue = '+7 ';
    
    if (value.length > 0) {
        formattedValue += '(' + value.substring(0, 3);
    }
    if (value.length > 3) {
        formattedValue += ') ' + value.substring(3, 6);
    }
    if (value.length > 6) {
        formattedValue += '-' + value.substring(6, 8);
    }
    if (value.length > 8) {
        formattedValue += '-' + value.substring(8, 10);
    }
    
    e.target.value = formattedValue;
}

// Установка минимальной даты для бронирования
function setMinBookingDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Прокрутка к секции
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Прокрутка к бронированию с предвыбором зала
function scrollToBooking(hallName) {
    const hallSelect = document.getElementById('hall');
    if (hallSelect && hallName) {
        hallSelect.value = hallName;
    }
    scrollToSection('booking');
}

// Мобильное меню
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.nav-hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Отправка в Telegram (пример реализации)
function sendToTelegram(bookingData) {
    const botToken = 'YOUR_BOT_TOKEN'; // Заменить на реальный токен
    const chatId = 'YOUR_CHAT_ID'; // Заменить на реальный chat ID
    
    const message = `
🎬 НОВАЯ БРОНЬ GOODDAY:
    
👤 Имя: ${bookingData.name}
📞 Телефон: ${bookingData.phone}
🎭 Зал: ${bookingData.hall}
📅 Дата: ${bookingData.date}
⏰ Время: ${bookingData.time}
⏳ Часов: ${bookingData.hours}
    `;
    
    // Раскомментировать для реальной отправки
    /*
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });
    */
}

// Параллакс эффект для героя
function initParallax() {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Анимация чисел для статистики (если добавите)
function animateNumbers() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateNumbers(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Обработка изменения темы (если добавите переключатель)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    // Сохранение в localStorage
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Загрузка сохраненной темы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Обработка ресайза окна
window.addEventListener('resize', function() {
    // Переинициализация при необходимости
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Предотвращение контекстного меню (опционально)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Добавление класса для загрузки шрифтов
document.fonts.ready.then(function() {
    document.body.classList.add('fonts-loaded');
});

// Service Worker для оффлайн работы (опционально)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
