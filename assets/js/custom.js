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

// Get Product details click event
const getDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(phoneDetails => showDetails(phoneDetails.data))
}

// show product details function
const showDetails = (phone) => {
    const phoneDetailsDiv = document.getElementById('phone-details')
    phoneDetailsDiv.innerHTML = `
        <div class="card mx-auto mt-3 px-3">
            <img src="${phone.image}" class="card-img-top mx-auto" alt="${phone.name}">
            <div class="card-body">
            <h5 class="card-title fs-4">${phone.name}</h5>
            <p class="card-text">${phone.releaseDate.length != 0 ? phone.releaseDate : 'No release Date found'}</p>
            <div class="main-features">
                <p class="fw-bold">Main Features:</p>
                <ul class="list-group">
                    <li class="list-group-item list-group-item-primary"><b>ChipSet:</b> ${phone.mainFeatures.chipSet}</li>
                    <li class="list-group-item list-group-item-success"><b>Display Size:</b> ${phone.mainFeatures.displaySize}</li>
                    <li class="list-group-item list-group-item-primary"><b>Memory: </b>${phone.mainFeatures.memory}</li>
                    <li class="list-group-item list-group-item-success"><b>Sensor: </b>${getSensor(phone.mainFeatures.sensors)}</li>
                    <li class="list-group-item list-group-item-primary"><b>Storage:</b> ${phone.mainFeatures.storage}</li>
                    <li class="list-group-item list-group-item-success">${phone.others != null ?`<b>Others: </b> <br>` + getOthers(phone.others) : ''}</li>
                </ul>
            </div>
            </div>
        </div>
    `
}

// Get sensors function
const getSensor = (sensors) =>{
    let sensor = ''
    for(const feature of sensors){
        sensor += feature + ', '
    }
    return sensor
}

// Get others function
const getOthers = (others) => {
    const keys = Object.keys(others)
        let othersItem = ''
        keys.forEach((key, index) =>{
        othersItem += `${key}: ${others[key]}` + `<br>`
        })
        return othersItem
}