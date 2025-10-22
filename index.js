// index.js
// Задача: Главный файл, который все запускает!

import { fetchListings } from './js/api.js';
import { initRouter } from './js/router.js';
import { initFilters } from './js/filters.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Main: Приложение загрузилось. Инициализация...");
    
    // 1. Загрузка данных
    const listings = await fetchListings();

    // 2. Инициализация фильтров (должно быть до роутера, чтобы иметь доступ к данным)
    initFilters(listings);

    // 3. Инициализация роутинга (показывает первый контент)
    initRouter(listings);

    console.log("Main: Инициализация завершена. Сайт готов.");
});