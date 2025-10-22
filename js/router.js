// js/router.js
// Задача: Переключать контент в зависимости от # в адресе

import { renderListingsGrid, renderListingDetails } from './ui.js';
import { getListingById } from './api.js';

let allListingsData = []; // Копия данных для работы роутера

function handleLocation() {
    console.log("Router: Смена адреса или загрузка страницы.");
    const path = window.location.hash.slice(1); // Берем адрес без #
    const mainContent = document.getElementById('main-content'); 

    if (path.startsWith('listing/')) {
        // Адрес типа #listing/123 - показываем детали
        const id = path.split('/')[1]; 
        const listing = getListingById(id, allListingsData);
        
        if (listing) {
            renderListingDetails(listing);
        } else {
            mainContent.innerHTML = '<h2>Ой! 404</h2><p>Объявление пропало.</p><a href="#">На главную</a>';
        }

    } else {
        // Все остальное (пустой адрес или #) - показываем список
        // NOTE: Тут надо бы вызвать фильтры, но пока просто показываем все
        renderListingsGrid(allListingsData); 
    }
}

/**
 * Запускаем роутер.
 */
export function initRouter(listings) {
    allListingsData = listings; // Сохраняем данные
    
    // 1. Слушаем, когда пользователь меняет хеш
    window.addEventListener('hashchange', handleLocation); 
    
    // 2. Вызываем при первой загрузке, чтобы показать контент
    handleLocation(); 
}