// search button click event
document.getElementById('search-button').addEventListener('click', () => {
    // get input field keyword
    const keyword = document.getElementById('search-input').value
    getPhoneData(keyword)   
})


// Get Products data from api
const getPhoneData = (searchText) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(phoneList => showPhone(phoneList.data))
}


// Show Products to ui
const showPhone = (phones) => {
    // Get product div from ui
    const keyword = document.getElementById('search-input').value;
    const phoneList = document.getElementById('phone-list');
    const phoneDetailsDiv = document.getElementById('phone-details');
    const alert = document.getElementById('alert');
    phoneList.innerText = '';
    phoneDetailsDiv.innerHTML = '';

    if(phones.length === 0){
        alert.innerText = `Sorry! "${keyword}" Not Found`;
    }else{
        alert.innerText = '';
        const maxProduct = phones.slice(0, 20);
        maxProduct.forEach(phone => {   
            // create a div for each product
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('card');
    
            phoneDiv.innerHTML = `
                <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                <div class="card-body text-center">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <a href="#" class="btn" id="details" onclick="getDetails('${phone.slug}')">More Details</a>
                </div>
                `
                phoneList.append(phoneDiv);
        });
    }

    // reset input field
    document.getElementById('search-input').value = '';
}