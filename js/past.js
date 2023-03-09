import data from './data.js'

const $container = document.getElementById('container');
const fragment = document.createDocumentFragment();
const $checkBoxes = document.getElementById('checkbox');
const $search = document.getElementById('search');



const eventCards = (array, contenedor) => {
    $container.innerHTML = ''
    array.forEach(dataEvent => {
        if (data.currentDate >= dataEvent.date) {
            let div = document.createElement('div');
            div.className = "card"
            div.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=${dataEvent.image} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${dataEvent.name}</h5>
            <p class="card-text">${dataEvent.category}</p>
            <p class="card-text">$${dataEvent.price}</p>
            <a href="/pages/details.html?id=${dataEvent._id}" class="btn btn-secondary">See more...</a>
        </div>
    </div>
                `
            fragment.appendChild(div)
        }
    })
    contenedor.appendChild(fragment)
}
eventCards(data.events, $container)

const newCategories = (array) => {
    let categories = array.map(categoryData => categoryData.category)
    categories = categories.reduce((acumulador, elemento) => {
        if (!acumulador.includes(elemento)) {
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories
}
let categories = newCategories(data.events)


const newCheckbox = (categories, $checkBoxes) => {
    categories.forEach(categoryData => {
        let div = document.createElement('div')
        div.className = `check-main`
        div.innerHTML = `
        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" id="${categoryData.toLowerCase()}" value="${categoryData.toLowerCase()}" name="category">
        <label class="btn btn-secondary" for="${categoryData.toLowerCase()}">${categoryData}</label>
        </div>
        `
        $checkBoxes.appendChild(div)
    })
}
newCheckbox(categories, $checkBoxes);



const filterSearch = (array, value) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase()))
    console.log(filteredArray)
    return filteredArray

}


const filterCheck = (array) => {
    let checked = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(item => item.value);

    let filteredArray = array.filter(element => checked.includes(element.category.toLowerCase()))
    if (filteredArray.length > 0) {
        return filteredArray
    }
    return array
}


$search.addEventListener('keyup', (e) => {
    let filterData = filterSearch(data.events, e.target.value)
    if (filterData.length === 0) {
        $container.innerHTML = 
        `
        <h1 class=noSeEncontro>No results found :(</h1>
        
        `
    } else {
        $container.innerHTML = "";
        eventCards(filterData, $container)
    }
})



$checkBoxes.addEventListener('change', () => {
    let filterData = filterCheck(data.events)
    eventCards(filterData, $container)
})

