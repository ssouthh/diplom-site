const mainContent = document.getElementById('main-content'); 

export function renderListingCard(listing) {
    return `
        <div class="listing-card">
            <img src="${listing.images[0]}" alt="${listing.title}" class="card-image">
            <h3 class="card-title">${listing.title}</h3>
            <p class="card-price">Цена: ${listing.price.toLocaleString('ru-RU')} ₽</p>
            <p class="card-rooms">Комнат: ${listing.rooms}</p>
            <a href="#listing/${listing.id}" class="btn-details">Подробнее</a>
        </div>
    `;
}

export function renderListingsGrid(listings) {
    mainContent.className = 'listings-grid';
    
    if (listings.length === 0) {
        mainContent.innerHTML = '<h2>Ничего не найдено!</h2><p>Попробуйте сбросить фильтры.</p>';
        return;
    }
    
    const html = listings.map(renderListingCard).join('');
    mainContent.innerHTML = html;
}

export function renderListingDetails(listing) {
    mainContent.className = 'listing-details-container';

    const imagesHtml = listing.images.map(imgSrc => 
        `<img src="${imgSrc}" alt="Фото" class="detail-image">`
    ).join('');

    mainContent.innerHTML = `
        <article class="listing-details">
            <a href="#" class="btn-back">← Назад к списку</a>
            
            <h2 class="detail-title">${listing.title}</h2>
            
            <div class="image-gallery">
                ${imagesHtml} 
            </div>
            
            <div class="details-meta">
                <p><strong>Цена:</strong> ${listing.price.toLocaleString('ru-RU')} ₽</p>
                <p><strong>Район:</strong> ${listing.district}</p>
                <p><strong>Площадь:</strong> ${listing.area} м²</p>
                <p><strong>Комнат:</strong> ${listing.rooms}</p>
            </div>
            
            <h3>Описание</h3>
            <p class="detail-description">${listing.description}</p>
            
            <p class="detail-contacts">
                Звоните: +7 987 654 3210
            </p>
        </article>
    `;
}