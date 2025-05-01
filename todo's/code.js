let entries =  [] || JSON.parse(localStorage.getItem("entries")) ;
let editIndex = -1;

function saveToLocal() {
  localStorage.setItem("entries", JSON.stringify(entries));
}


function resetFields() {
  document.querySelector("#description").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#type").value = "income";
  editIndex = -1;
}

function addEntry() {
  const desc = document.querySelector("#description").value.trim();
  const amt = parseFloat(document.querySelector("#amount").value);
  const type = document.querySelector("#type").value;

  if (!desc || isNaN(amt) || amt <= 0) {
    alert("Please enter valid data.");
    return;
  }

  const entry = { desc, amount: amt, type };

  if (editIndex > -1) {
    entries[editIndex] = entry;
    editIndex = -1;
  } else {
    entries.push(entry);
  }

  saveToLocal();
  renderEntries();
  resetFields();
}

function renderEntries() {
  const list = document.querySelector("#entryList");
  list.innerHTML = "";

  const filter = document.querySelector("input[name='filter']:checked").value;
  let income = 0, expense = 0;

  entries.forEach((entry, index) => {
    if (filter === "all" || entry.type === filter) {
      const li = document.createElement("li");
      li.className = entry.type;
      li.innerHTML = `<span class="${entry.type}">${entry.desc}: ₹${entry.amount}</span>
        <span class="actions">
          <button onclick="editEntry(${index})">Edit</button>
          <button onclick="deleteEntry(${index})">Delete</button>
        </span>`;

      list.appendChild(li);
    }

    if (entry.type === "income") income += entry.amount;
    else expense += entry.amount;
  });

  document.querySelector("#totalIncome").textContent = income;
  document.querySelector("#totalExpense").textContent = expense;
  document.querySelector("#balance").textContent = income - expense;
}

function editEntry(index) {
  const entry = entries[index];
  document.querySelector("#description").value = entry.desc;
  document.querySelector("#amount").value = entry.amount;
  document.querySelector("#type").value = entry.type;
  editIndex = index;
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entries.splice(index, 1);
    saveToLocal();
    renderEntries();
  }
}

window.onload = renderEntries;