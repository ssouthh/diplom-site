// js/filters.js
// Задача: Взять значения из формы, отфильтровать и обновить список

import { renderListingsGrid } from './ui.js';

let allListingsData = []; // Исходные данные

/**
 * Применяет все фильтры к массиву объявлений.
 */
function applyFilters() {
    let filtered = allListingsData; // Начинаем с полного списка
    
    // Читаем значения из формы
    const searchText = document.getElementById('search-text').value.toLowerCase().trim();
    const rooms = document.getElementById('rooms').value;
    const priceMax = parseFloat(document.getElementById('price-max').value);

    // 1. Фильтр по тексту
    if (searchText) {
        filtered = filtered.filter(listing => 
            listing.title.toLowerCase().includes(searchText) ||
            listing.description.toLowerCase().includes(searchText)
        );
    }

    // 2. Фильтр по комнатам
    if (rooms) {
        if (rooms === '3') {
            filtered = filtered.filter(listing => listing.rooms >= 3);
        } else {
            const requiredRooms = parseInt(rooms, 10);
            filtered = filtered.filter(listing => listing.rooms === requiredRooms);
        }
    }

    // 3. Фильтр по цене
    if (!isNaN(priceMax) && priceMax > 0) {
        filtered = filtered.filter(listing => listing.price <= priceMax);
    }
    
    return filtered;
}

/**
 * Обрабатывает отправку формы (кнопка "Применить").
 */
function handleFilterSubmit(e) {
    e.preventDefault(); // Не даем странице перезагрузиться!
    console.log("Filters: Применяем фильтры...");

    const filteredListings = applyFilters();
    renderListingsGrid(filteredListings); // Показываем результат
    
    // Если находимся на деталях, надо убрать хеш, чтобы вернуться на список
    if (window.location.hash !== '') {
        window.location.hash = ''; 
    }
}

/**
 * Обрабатывает сброс формы.
 */
function handleReset() {
    document.getElementById('filter-form').reset(); // Сброс полей
    console.log("Filters: Сброс фильтров. Показываем все объявления.");
    renderListingsGrid(allListingsData); // Показываем полный список
    window.location.hash = ''; // Возвращаем на главную
}

/**
 * Инициализация фильтров.
 */
export function initFilters(listings) {
    allListingsData = listings; // Сохраняем данные
    
    // Навешиваем обработчики на форму и кнопку сброса
    document.getElementById('filter-form').addEventListener('submit', handleFilterSubmit);
    document.getElementById('reset-filters').addEventListener('click', handleReset);
}