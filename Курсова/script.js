const carsData = [
    { id: 1, title: "2020 Eco Hatchback", type: "hatchback", price: 12500, miles: "25k", img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "2019 Reliable Sedan", type: "sedan", price: 14200, miles: "42k", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "2021 Compact SUV", type: "suv", price: 18900, miles: "18k", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "2018 City Runner", type: "hatchback", price: 10800, miles: "55k", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80" },
    { id: 5, title: "2022 Premium Sedan", type: "sedan", price: 21500, miles: "12k", img: "https://images.unsplash.com/photo-1617469367425-636605dd094f?auto=format&fit=crop&w=400&q=80" },
    { id: 6, title: "2020 Rugged SUV", type: "suv", price: 16500, miles: "38k", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "1998 Toyota Supra A80", type: "coupe", era: "90s", price: 85000, hp: "320 HP", img: "/Курсова/img/supra.jpg" },
];

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    
    if (document.getElementById('carsGrid')) {
        renderCars(carsData);
    }
});

function renderCars(cars) {
    const grid = document.getElementById('carsGrid');
    const countSpan = document.getElementById('resultsCount');
    
    if (!grid) return; 
    
    grid.innerHTML = ''; 
    
    if (cars.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Автомобілів не знайдено.</p>';
        if (countSpan) countSpan.textContent = `Знайдено: 0`;
        return;
    }
    
    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${car.img}" style="width:100%; height:180px; object-fit:cover;">
            <div style="padding: 15px;">
                <h3 style="font-size: 18px; margin-bottom: 5px;">${car.title}</h3>
                <p style="font-size: 12px; color: #777; margin-bottom: 15px;">${car.miles} miles • Automatic</p>
                <div style="font-size: 20px; font-weight: bold; color: #007bff;">$${car.price.toLocaleString()}</div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    if (countSpan) countSpan.textContent = `Знайдено: ${cars.length}`;
}

function applyFilters() {
    const checkedBoxes = Array.from(document.querySelectorAll('.filter-cb:checked')).map(cb => cb.value);
    
    if (checkedBoxes.length === 0) {
        renderCars(carsData);
        return;
    }

    const filteredCars = carsData.filter(car => {
        const matchType = checkedBoxes.includes(car.type);
        let matchPrice = false;
        
        if (checkedBoxes.includes('under15k') && car.price <= 15000) matchPrice = true;
        if (checkedBoxes.includes('over15k') && car.price > 15000) matchPrice = true;

        const hasTypeFilter = checkedBoxes.some(v => ['sedan', 'hatchback', 'suv'].includes(v));
        const hasPriceFilter = checkedBoxes.some(v => v.includes('15k'));

        if (hasTypeFilter && !hasPriceFilter) return matchType;
        if (!hasTypeFilter && hasPriceFilter) return matchPrice;
        return matchType && matchPrice;
    });

    renderCars(filteredCars);
}

function resetFilters() {
    document.querySelectorAll('.filter-cb').forEach(cb => cb.checked = false);
    renderCars(carsData);
}

function openModal(modalId) { 
    const el = document.getElementById(modalId);
    if(el) el.style.display = 'flex'; 
}

function closeModal(modalId) { 
    const el = document.getElementById(modalId);
    if(el) el.style.display = 'none'; 
    clearAlerts(); 
}

function switchModals(closeId, openId) { 
    closeModal(closeId); 
    openModal(openId); 
}

function showAlert(elementId, message, isError = false) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
    el.className = isError ? 'alert alert-error' : 'alert alert-success';
}

function clearAlerts() { 
    document.querySelectorAll('.alert').forEach(el => el.style.display = 'none'); 
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if(localStorage.getItem(email)) {
        showAlert('registerAlert', 'Користувач з таким Email вже існує!', true);
        return;
    }

    localStorage.setItem(email, JSON.stringify({ name: name, password: password }));
    showAlert('registerAlert', 'Реєстрація успішна! Тепер увійдіть.', false);
    setTimeout(() => switchModals('registerModal', 'loginModal'), 1500);
    e.target.reset();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const userStr = localStorage.getItem(email);
    if(userStr) {
        const userData = JSON.parse(userStr);
        if(userData.password === password) {
            sessionStorage.setItem('currentUser', userData.name);
            sessionStorage.setItem('currentEmail', email);
            closeModal('loginModal');
            checkLoginStatus();
            e.target.reset();
            fillContactForm(userData.name, email);
            return;
        }
    }
    showAlert('loginAlert', 'Невірний Email або пароль!', true);
}

function checkLoginStatus() {
    const userName = sessionStorage.getItem('currentUser');
    const userEmail = sessionStorage.getItem('currentEmail');
    
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navRegisterBtn = document.getElementById('navRegisterBtn');
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    const userGreeting = document.getElementById('userGreeting');

    if(userName) {
        if(navLoginBtn) navLoginBtn.style.display = 'none';
        if(navRegisterBtn) navRegisterBtn.style.display = 'none';
        if(navLogoutBtn) navLogoutBtn.style.display = 'block';
        if(userGreeting) {
            userGreeting.style.display = 'block';
            userGreeting.textContent = `Привіт, ${userName}!`;
        }
        fillContactForm(userName, userEmail);
    } else {
        if(navLoginBtn) navLoginBtn.style.display = 'block';
        if(navRegisterBtn) navRegisterBtn.style.display = 'block';
        if(navLogoutBtn) navLogoutBtn.style.display = 'none';
        if(userGreeting) userGreeting.style.display = 'none';
    }
}

function logoutUser() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentEmail');
    checkLoginStatus();
    
    const contactForm = document.getElementById('contactForm');
    if(contactForm) contactForm.reset();
    
    alert('Ви успішно вийшли з системи');
}

function handleContactSubmit(e) {
    e.preventDefault();
    const alertEl = document.getElementById('contactAlert');
    if (!alertEl) return;
    
    alertEl.textContent = 'Дякуємо! Ваше повідомлення успішно надіслано.';
    alertEl.style.display = 'block';
    
    setTimeout(() => { 
        alertEl.style.display = 'none'; 
        e.target.reset(); 
    }, 4000);
}

function fillContactForm(fullName, email) {
    const form = document.getElementById('contactForm');
    if(form) {
        const fNameInput = document.getElementById('contactFirstName');
        const lNameInput = document.getElementById('contactLastName');
        const emailInput = document.getElementById('contactEmail');
        
        if(fNameInput) fNameInput.value = fullName.split(' ')[0] || '';
        if(lNameInput) lNameInput.value = fullName.split(' ')[1] || '';
        if(emailInput) emailInput.value = email;
    }
}