import data from './data.js'

let detailContainer =  document.querySelector('#eventDetail')

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")  
const selectedEvent = data.events.find(event => event._id == id)

console.log(selectedEvent)

function createDetails (selectedEvent, container){
let div = document.createElement('div')
        div.className = "card-big d-flex bg-light gap-2 rounded p-3"
        div.style = 'width: 80%; heigth: 80%;'
        div.innerHTML += `
        <div class="d-flex flex-column align-items-center justify-content-between flex-grow-1" style="heigth: 90%; width: 50%">
        <img class="card-img-top" src=${selectedEvent.image} alt="Card image cap">
        <div class="card-body2">
            <h5 class="card-title"> ${selectedEvent.name}</h5>
            <p class="card-text">${selectedEvent.category}</p>
            <p class="card-text">${selectedEvent.description}</p>
            <p class="card-text">Capacity for ${selectedEvent.capacity} people.</p>
            <p class="card-text">the value of the ticket is $${selectedEvent.price}</p>
            <a href="/index.html" class="btn btn-secondary">Go back</a>

    </div>
                `
                container.appendChild(div)

}

createDetails(selectedEvent, detailContainer)