let entries = [];

function addEntry() {
  const company = document.getElementById("company").value;
  const part = document.getElementById("part").value;
  const model = document.getElementById("model").value;
  const price = document.getElementById("price").value;

  if (!company || !part || !model || !price) return alert("يرجى تعبئة كل الحقول");

  entries.push({ company, part, model, price });
  displayEntries();
  clearForm();
}

function displayEntries() {
  const container = document.getElementById("entriesList");
  container.innerHTML = "";
  const filtered = getFilteredEntries();
  filtered.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <span>${entry.company} | ${entry.part} | ${entry.model} - ${entry.price} IQD</span>
      <div>
        <button class="edit" onclick="editEntry(${index})">تعديل</button>
        <button onclick="deleteEntry(${index})">حذف</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function clearForm() {
  document.getElementById("company").selectedIndex = 0;
  document.getElementById("part").selectedIndex = 0;
  document.getElementById("model").value = "";
  document.getElementById("price").value = "";
}

function deleteEntry(index) {
  entries.splice(index, 1);
  displayEntries();
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("company").value = entry.company;
  document.getElementById("part").value = entry.part;
  document.getElementById("model").value = entry.model;
  document.getElementById("price").value = entry.price;
  deleteEntry(index);
}

function filterEntries() {
  displayEntries();
}

function getFilteredEntries() {
  const partFilter = document.getElementById("filterPart").value;
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  return entries.filter(entry => {
    return (partFilter === "all" || entry.part === partFilter) &&
           entry.model.toLowerCase().includes(searchText);
  });
}
