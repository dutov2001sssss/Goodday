// Данные об услугах
const servicesData = [
    {
        title: "Романтические свидания",
        features: [
            "Романтическая атмосфера с мягким освещением",
            "Лепестки роз и свечи",
            "Шампанское и шоколадные конфеты",
            "Подбор фильмов для влюбленных",
            "Уютные пледы и подушки",
            "Фотосессия на память"
        ]
    },
    {
        title: "Тематические вечера",
        features: [
            "Оформление зала под выбранную тему",
            "Подбор фильмов соответствующей тематики",
            "Тематические закуски и напитки",
            "Музыкальное сопровождение",
            "Аксессуары для фотосессии",
            "Индивидуальный сценарий вечера"
        ]
    },
    {
        title: "Кино и ужин",
        features: [
            "Гастрономическое сопровождение фильма",
            "Профессиональный подбор блюд к фильму",
            "Сервировка стола",
            "Напитки премиум-класса",
            "Десерты от шеф-кондитера",
            "Обслуживание во время просмотра"
        ]
    }
];

// Показать информацию об услуге
function showServiceInfo(serviceIndex) {
    const popup = document.getElementById('servicePopup');
    const title = document.getElementById('popupTitle');
    const list = document.getElementById('popupList');
    
    const service = servicesData[serviceIndex];
    title.textContent = service.title;
    
    // Очищаем и заполняем список
    list.innerHTML = '';
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        list.appendChild(li);
    });
    
    popup.style.display = 'block';
}

// Скрыть информацию об услуге
function hideServiceInfo() {
    const popup = document.getElementById('servicePopup');
    popup.style.display = 'none';
}

// Прокрутка к бронированию
function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth'
    });
}

// Закрыть модальное окно
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Обработка формы бронирования
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь должна быть логика отправки данных на сервер
    // Для демонстрации просто показываем модальное окно
    
    // Валидация формы
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const hall = formData.get('hall');
    const date = formData.get('date');
    const time = formData.get('time');
    
    if (!name || !phone || !hall || !date || !time) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Проверка даты (нельзя бронировать на прошедшие даты)
    const selectedDateTime = new Date(date + ' ' + time);
    const now = new Date();
    
    if (selectedDateTime < now) {
        alert('Нельзя забронировать зал на прошедшую дату и время');
        return;
    }
    
    // Показываем модальное окно успеха
    document.getElementById('successModal').style.display = 'block';
    
    // Очищаем форму
    this.reset();
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Данные для бронирования:', {
        name,
        phone,
        hall,
        date,
        time,
        hours: formData.get('hours')
    });
});

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

// Добавляем тень к шапке при прокрутке
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Устанавливаем минимальную дату для бронирования (сегодня)
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Закрытие модальных окон при клике вне их
window.addEventListener('click', function(e) {
    const servicePopup = document.getElementById('servicePopup');
    const successModal = document.getElementById('successModal');
    
    if (e.target === servicePopup) {
        hideServiceInfo();
    }
    
    if (e.target === successModal) {
        closeModal();
    }
});

// Маска для телефона (базовая реализация)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = '+7 ' + value;
        if (value.length > 7) value = value.slice(0, 7) + ' ' + value.slice(7);
        if (value.length > 11) value = value.slice(0, 11) + ' ' + value.slice(11);
        if (value.length > 14) value = value.slice(0, 14);
    }
    e.target.value = value;
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Антикинотеатра Goodday загружен!');
});
