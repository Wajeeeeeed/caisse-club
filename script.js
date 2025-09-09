const secretCode = "1234"; // Tu peux changer ce code secret ici

function checkCode() {
  const userCode = document.getElementById("code").value;
  if (userCode === secretCode) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("site-content").style.display = "block";
  } else {
    document.getElementById("error-msg").textContent = "Code incorrect.";
  }
}

let totalIncome = 0;
let totalExpense = 0;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('transaction-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (isNaN(amount) || amount <= 0) return;

    const table = document.getElementById('transaction-table');
    const row = table.insertRow(0);
    row.innerHTML = `
      <td>${description}</td>
      <td>${amount.toFixed(3)} D</td>
      <td>${type === 'income' ? 'Revenu' : 'Dépense'}</td>
    `;

    if (type === 'income') {
      totalIncome += amount;
    } else {
      totalExpense += amount;
    }

    const balance = totalIncome - totalExpense;

    document.getElementById('total-income').innerText = totalIncome.toFixed(3);
    document.getElementById('total-expense').innerText = totalExpense.toFixed(3);
    document.getElementById('balance').innerText = balance.toFixed(3);

    const warning = document.getElementById('warning');
    if (totalExpense > totalIncome) {
      warning.textContent = "⚠️ Attention : les dépenses dépassent les revenus !";
    } else {
      warning.textContent = "";
    }

    form.reset();
  });
});
