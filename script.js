let expenses = [];
let subTotal = 0;
let count = 0;
let total;
let listOfAmounts;
let amountValue;

function numberToPrecision(number = 1.0) {
  const numberLength = number.toString().split(".")[0].length + 2;
  return +number.toPrecision(numberLength);
}

function lookLikeCurrency(number = 1.0) {
  return number.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

function calculateTotal() {
  const totalArray = expenses.map((expense) => +expense.amount);
  total = document.getElementById("Total");
  subTotal = totalArray.reduce((a, b) => a + b, 0);
  total.innerHTML = `<strong>Total: ${lookLikeCurrency(subTotal)}</strong>`;
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let addExpenseButton = document.getElementById("addExpense");

    addExpenseButton.addEventListener("click", function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let amount = document.getElementById("amount").value;
      let date = document.getElementById("date").value;
      let tableBody = document.getElementById("expenseTable");

      if (amount != 0) {
        // Adding the data into an object then unshifting the object into an array
        expenses.unshift({
          id: `${count}`,
          name: `${name}`,
          amount: `${numberToPrecision(+amount)}`,
          date: `${date}`,
        });
        count++;

        // Creating a new row
        let newTableRow = document.createElement("tr");

        // Adding the expense data from the array into the new row
        newTableRow.id = `${expenses[0]["id"]}`;
        newTableRow.innerHTML += `<th scope="col">${expenses[0]["name"]}</th>`;
        newTableRow.innerHTML += `<th scope="col">${expenses[0]["date"]}</th>`;
        newTableRow.innerHTML += `<th scope="col" class="amount-row">${lookLikeCurrency(
          +expenses[0]["amount"]
        )}</th>`;

        // Creating a delete button
        newTableRow.innerHTML += `<th><button type='button' class='deletebtn btn btn-outline-secondary btn-sm'>X</button></th>`;

        // Adding the new row into the table
        tableBody.appendChild(newTableRow);

        // Total
        calculateTotal();
      }
    });

    // Adding an Event Listener to the delete button
    document.body.addEventListener("click", (event) => {
      if (event.target.nodeName == "BUTTON") {
        expenses = expenses.filter(
          (expense) =>
            expense.id !== event.target.parentElement.parentElement.id
        );

        event.target.parentElement.parentElement.remove();

        calculateTotal();

        if (subTotal === 0) {
          total.innerHTML = "";
        }
      }
    });
  },
  false
);
