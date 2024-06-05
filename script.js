document.addEventListener('DOMContentLoaded', function() {
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const expenseList = document.getElementById('expense-list');

    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to render expenses
    function renderExpenses() {
        expenseList.innerHTML = ''; // Clear the list before rendering

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.textContent = `${expense.name}: $${expense.amount}`;

            // Add a delete button to each expense
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                expenses.splice(index, 1); // Remove the expense from the array
                saveExpenses();
                renderExpenses();
            });

            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    }

    // Function to save expenses to local storage
    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Event listener for the add expense button
    addExpenseButton.addEventListener('click', function() {
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== '' && !isNaN(amount) && amount > 0) {
            expenses.push({ name, amount });
            saveExpenses();
            renderExpenses();
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        } else {
            alert('Please enter a valid name and amount.');
        }
    });

    // Initial render
    renderExpenses();
});
