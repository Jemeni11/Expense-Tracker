let expenses = [];
let subTotal = 0;
let total
let listOfAmounts
let amountValue

document.addEventListener('DOMContentLoaded', function(){
    let addExpenseButton = document.getElementById('addExpense')

    addExpenseButton.addEventListener('click', function(e){
        e.preventDefault()

        let name = document.getElementById('name').value
        let amount = document.getElementById('amount').value
        let date = document.getElementById('date').value
        let tableBody = document.getElementById('expenseTable')

        if(amount != 0){
            // Adding the data into an object then unshifting the object into an array
            expenses.unshift({name: `${name}`, amount: Number(`${amount}`), date: `${date}`})
            console.log(expenses)
            console.log(e)
        
            // Creating a new row
            let newTableRow = document.createElement('tr')

            // Adding the expense data from the array into the new row
            newTableRow.innerHTML += `<th scope="col">${expenses[0]['name']}</th>`
            newTableRow.innerHTML += `<th scope="col">${expenses[0]['date']}</th>`
            newTableRow.innerHTML += `<th scope="col" class="amount-row">${expenses[0]['amount']}</th>`
        
            // Creating a delete button
            newTableRow.innerHTML += `<th><button type='button' class='deletebtn btn btn-outline-secondary btn-sm'>X</button></th>`
        
            // Adding the new row into the table
            tableBody.appendChild(newTableRow)
        
            // Total
            total = document.getElementById('Total')
            listOfAmounts = Array.from(document.getElementsByClassName('amount-row'))
            amountValue = listOfAmounts.map((i) => Number(i.innerText))
            subTotal = amountValue.reduce((a,b) => a+b, 0)
            total.innerHTML = `<strong>Total: ${subTotal}</strong>`
        }
    })
    
    // Adding an Event Listener to the delete button
    document.body.addEventListener('click', event => {
        if (event.target.nodeName == "BUTTON"){
            event.target.parentElement.parentElement.remove()
            
            total = document.getElementById('Total')
            listOfAmounts = Array.from(document.getElementsByClassName('amount-row'))
            amountValue = listOfAmounts.map((i) => Number(i.innerText))
            let amountValueTotal = amountValue.reduce((a,b) => a+b, 0)
            amountValueTotal === 0 ? total.innerHTML = '' : total.innerHTML = `<strong>Total: ${amountValueTotal}</strong>`
        }
    })
    
}, false)
