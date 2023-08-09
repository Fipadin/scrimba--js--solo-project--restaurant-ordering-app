import { menuArray } from './data.js'
import { formatIngredients } from './formatIngredients.js'


// Initializing the costumer's order
let newOrder = []

// Add click event listener to handle costumer interactions
document.addEventListener('click', function(e){
    // Checks the clicked element's dataset or id and triggers corresponding actions
        if(e.target.dataset.add){
            addItemToOrder(e.target.dataset.add)
            render()
        }
        else if(e.target.dataset.delete){
            deleteItemFromOrder(e.target.dataset.delete)
            render()
        } else if (e.target.id === 'checkout-btn') {
            askCardDetails()
        }
        else if (e.target.id === 'pay-btn')
        payOrder(e)
})

function payOrder(e) {
        e.preventDefault()
}


function generateOrderItems() {
    let orderItems = ''

    for (const itemId in newOrder) {
        if (newOrder[itemId].amount > 0) {
            const item = newOrder[itemId]
            const itemPrice = item.amount * item.price

            orderItems += `
                <li class="order-list-item">
                    <h4>${item.name} x ${item.amount}</h4>
                    <p>$${itemPrice.toFixed(2)}</p>
                    <i class="fa-regular fa-trash-can" data-delete="${itemId}"></i>
                </li>
            `
        }
    }

    return orderItems
}

// HTML boilerplate for the checkout section
function orderCheckout() {
    let orderBoilerplate = ''
    let totalCost = 0
    let orderClassList = 'hidden'
    
    for (const itemId in newOrder) {
        if (newOrder[itemId].amount > 0) {
            const item = newOrder[itemId]
            const itemPrice = item.amount * item.price
            totalCost += itemPrice
            orderClassList = ''
        }
    }
       
    

    
    orderBoilerplate = `
        <div class="${orderClassList} order">
            <h3>Your order</h3>
            <ul class="order-list">
            ${generateOrderItems()}
            </ul>
            <div class="total-price">
                <h4>Total price:</h4>
                <p>$${totalCost.toFixed(2)}</p>
            </div>
            <button type="button" id="checkout-btn">Complete order</button>
        </div>
    `
    
    return orderBoilerplate
}

// Add click event listener for checkout button
function askCardDetails() {
    const checkOutBtn = document.getElementById('checkout-btn')
    const modalOverlay = document.getElementById('modal-overlay')
    const cardDetailsAlert = document.getElementById('card-details')
    
        modalOverlay.classList.remove('hidden')
        cardDetailsAlert.classList.remove('hidden')

        modalOverlay.addEventListener('click', (e) => {
            // Prevent clicks on the overlay from propagating to underlying elements
            e.stopPropagation()
        })
}

// Adding items to the order
function addItemToOrder(itemId) {
    if (!newOrder[itemId]) {
        newOrder[itemId] = { ...menuArray[itemId], amount: 0 }
    }
    newOrder[itemId].amount++
}

// Taking items out of the order
function deleteItemFromOrder(itemId) {
    if (newOrder[itemId]) {
        newOrder[itemId] = { ...menuArray[itemId], amount: 0 }
    }
}

function getMenuHtml() {
    let menuHtml = ''

    menuArray.forEach((item) => {
        const itemIngredients = formatIngredients(item.ingredients)
        const itemHtml = `
            <li class="menu-item">
                <img class="menu-item-img" alt="${item.name}" src="images/${item.name}.jpg">
                <div class="menu-item-text">
                    <h3>${item.name}</h3>
                    <p class="ingredients">${itemIngredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <i class="fa-solid fa-plus add-icon" data-add="${item.id}"></i>
            </li>
        `
        menuHtml += itemHtml
    })

    return `<ul class="menu-list">${menuHtml}</ul>`
}

function render() {
    const appElement = document.getElementById('app')
    appElement.innerHTML = getMenuHtml() + orderCheckout()
}

render()