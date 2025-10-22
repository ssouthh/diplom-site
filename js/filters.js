import { renderListingsGrid } from './ui.js';

let allListingsData = [];

function applyFilters() {
    let filtered = allListingsData;

    const searchText = document.getElementById('search-text').value.toLowerCase().trim();
    const rooms = document.getElementById('rooms').value;
    const priceMax = parseFloat(document.getElementById('price-max').value);

    if (searchText) {
        filtered = filtered.filter(listing => 
            listing.title.toLowerCase().includes(searchText) ||
            listing.description.toLowerCase().includes(searchText)
        );
    }

    if (rooms) {
        if (rooms === '3') {
            filtered = filtered.filter(listing => listing.rooms >= 3);
        } else {
            const requiredRooms = parseInt(rooms, 10);
            filtered = filtered.filter(listing => listing.rooms === requiredRooms);
        }
    }

    if (!isNaN(priceMax) && priceMax > 0) {
        filtered = filtered.filter(listing => listing.price <= priceMax);
    }
    
    return filtered;
}

function handleFilterSubmit(e) {
    e.preventDefault();
    console.log("Filters: Применяем фильтры...");

    const filteredListings = applyFilters();
    renderListingsGrid(filteredListings);

    if (window.location.hash !== '') {
        window.location.hash = ''; 
    }
}

function handleReset() {
    document.getElementById('filter-form').reset();
    console.log("Filters: Сброс фильтров. Показываем все объявления.");
    renderListingsGrid(allListingsData);
    window.location.hash = '';
}

export function initFilters(listings) {
    allListingsData = listings;
    
    document.getElementById('filter-form').addEventListener('submit', handleFilterSubmit);
    document.getElementById('reset-filters').addEventListener('click', handleReset);
}