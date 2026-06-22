const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {

    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${transaction.description} - ₹${transaction.amount}
            <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
        `;

        transactionList.appendChild(li);

        if(transaction.type === "income"){
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    income.textContent = `₹${totalIncome}`;
    expense.textContent = `₹${totalExpense}`;
    balance.textContent = `₹${totalIncome - totalExpense}`;
}

function deleteTransaction(index){
    transactions.splice(index,1);
    saveTransactions();
    updateUI();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const transaction = {
        description: description.value,
        amount: Number(amount.value),
        type: type.value
    };

    transactions.push(transaction);

    saveTransactions();
    updateUI();

    form.reset();
});

updateUI();