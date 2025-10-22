import { renderListingsGrid, renderListingDetails } from './ui.js';
import { getListingById } from './api.js';

let allListingsData = [];

function handleLocation() {
    console.log("Router: Смена адреса или загрузка страницы.");
    const path = window.location.hash.slice(1);
    const mainContent = document.getElementById('main-content'); 

    if (path.startsWith('listing/')) {
        const id = path.split('/')[1]; 
        const listing = getListingById(id, allListingsData);
        
        if (listing) {
            renderListingDetails(listing);
        } else {
            mainContent.innerHTML = '<h2>Ой! 404</h2><p>Объявление пропало.</p><a href="#">На главную</a>';
        }

    } else {
        renderListingsGrid(allListingsData); 
    }
}

export function initRouter(listings) {
    allListingsData = listings;
    
    window.addEventListener('hashchange', handleLocation); 
    
    handleLocation(); 
}