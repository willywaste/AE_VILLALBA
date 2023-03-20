let jsonEvents = [];
let upcomingEvents = [];
let pastEvents = [];

let highestAttendanceEvent = {};
let lowerAttendanceEvent = {};
let largerCapacity = {};

fetch('../js/amazing.json').then(response => {
    return response.json();
}).then(data => {
    jsonEvents = data.events;
    upcomingEvents = data.events.filter(e => e.estimate);
    pastEvents = data.events.filter(e => e.assistance);

    //first table
    let arrayAttendance = jsonEvents.map(e => e.assistance ? e.assistance / e.capacity : e.estimate / e.capacity)
    let arrayCapacity = jsonEvents.map(e => e.capacity)
    let maxAttendance = Math.max(...arrayAttendance)
    let minAttendance = Math.min(...arrayAttendance)
    let maxCapacity = Math.min(...arrayCapacity)
    highestAttendanceEvent = jsonEvents.find(e => e.assistance ? e.assistance / e.capacity == maxAttendance : e.estimate / e.capacity == maxAttendance)
    lowerAttendanceEvent = jsonEvents.find(e => e.assistance ? e.assistance / e.capacity == minAttendance : e.estimate / e.capacity == minAttendance)
    largerCapacity = jsonEvents.find(e => e.capacity == maxCapacity)

    let $table1 = document.getElementById("table1")
    $table1.innerHTML += `
    <tr class="tableStats">
    <td>${highestAttendanceEvent.name}</td>
    <td>${lowerAttendanceEvent.name}</td>
    <td>${largerCapacity.name}</td>
    </tr>
    `
    //second table

    let upCategories = arrayCategory(upcomingEvents)
    upCategories.forEach(e => {
        let $table2 = document.getElementById("table2")
        $table2.innerHTML += `
        <tr class="tableStats">
        <td>${e.category}</td>
        <td>$${e.revenue.toLocaleString()},00</td>
        <td>${(e.attendance * 100).toFixed(2)}%</td>
        </tr>
        `

    })

    //third table

    let pastCategories = arrayGroupCategory(pastEvents)
    pastCategories.forEach(e => {
        let $table3 = document.getElementById("table3")
        $table3.innerHTML += `
        <tr class="tableStats">
        <td>${e.category}</td>
        <td>$${e.revenue.toLocaleString()},00</td>
        <td>${(e.attendance * 100).toFixed(2)}%</td>
        </tr>
        `

    })
}).catch(err => {
    console.error(err)
});

const result2 = [];
function objOfArray2(array) {
    for (let event in array) {
        result2.push({
            category: event,
            revenue: array[event].revenue,
            attendance: array[event].attendance
        });
    }
    return result2;
}

const categoryStats = {};
function arrayCategory(array) {
    for (let event of array) {
        let cap = event.capacity;
        let est = event.estimate;
        if (categoryStats[event.category]) {
            categoryStats[event.category].revenue += event.price * event.estimate;
            categoryStats[event.category].attendance = (categoryStats[event.category].attendance + est / cap) / 2;
        } else {
            categoryStats[event.category] = { revenue: event.price * event.estimate, attendance: est / cap };
        }
    }
    let arrayOfObj = objOfArray2(categoryStats);
    return arrayOfObj;
}


const result = [];
function objOfArray(array) {
    for (let event in array) {
        result.push({
            category: event,
            revenue: array[event].revenue,
            attendance: array[event].attendance
        });
    }
    return result;
}


const categoryStats2 = {};
function arrayGroupCategory(array) {
    for (let event of array) {
        let cap = event.capacity;
        let est = event.assistance;
        if (categoryStats2[event.category]) {
            categoryStats2[event.category].revenue += event.price * event.assistance;
            categoryStats2[event.category].attendance = (categoryStats2[event.category].attendance + est / cap) / 2;
        } else {
            categoryStats2[event.category] = { revenue: event.price * event.assistance, attendance: est / cap };
        }
    }
    let arrayOfObj = objOfArray(categoryStats2);
    return arrayOfObj;
}




