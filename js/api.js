// js/api.js
// Задача: Загрузить наш listings.json

/**
 * Загрузка всех объявлений из локального JSON-файла.
 * @returns {Promise<Array>} Массив объявлений.
 */
export async function fetchListings() {
    console.log("API: Начало загрузки данных...");
    try {
        // Запрос к файлу. Путь от корня сайта!
        const response = await fetch('./data/listings.json'); 
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        const data = await response.json();
        console.log(`API: Успешно загружено ${data.length} объявлений.`);
        return data; 
    } catch (error) {
        console.error("API: Критическая ошибка загрузки JSON!", error);
        return []; // Возвращаем пусто, чтобы не сломать приложение
    }
}

/**
 * Ищем конкретное объявление по его ID.
 */
export function getListingById(id, listings) {
    const listingId = parseInt(id, 10); 
    return listings.find(listing => listing.id === listingId);
}