
/**
 * @returns {Promise<Array>}
 */
export async function fetchListings() {
    console.log("API: Начало загрузки данных...");
    try {
        const response = await fetch('./data/listings.json'); 
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        const data = await response.json();
        console.log(`API: Успешно загружено ${data.length} объявлений.`);
        return data; 
    } catch (error) {
        console.error("API: Критическая ошибка загрузки JSON!", error);
        return [];
    }
}

export function getListingById(id, listings) {
    const listingId = parseInt(id, 10); 
    return listings.find(listing => listing.id === listingId);
}