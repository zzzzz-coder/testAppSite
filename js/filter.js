let originalUsers = [];
let currentUsers = [];
let nameSortState = 0;
let ageSortState = 0;
export function initFilter(users, onChange) {
  originalUsers = [...users];
  const filterBox = document.createElement('div');
  filterBox.className = 'chooseSettingsBox';
  filterBox.innerHTML = `
    <div class="sortRow">
      <span class="sortRow_text">Сортировать по:</span>
      <button type="button" class="filterRow_nameSort filterRowBtn">Имя</button>
      <button type="button" class="filterRow_ageSort filterRowBtn">Возраст</button>
    </div>
    <div class="filter-row">
      <span class="filter-row_text">Фильтровать по:</span>
      <input type="text" placeholder="Имя" class="filterRow_nameFilter filterRow_input">
      <input type="number" placeholder="Возраст от" class="filterRow_age filterRow_ageFilter_min filterRow_input">
      <input type="number" placeholder="Возраст до" class="filterRow_age filterRow_ageFilter_max filterRow_input">
    </div>
  `;
  document.getElementById('app').prepend(filterBox);
  const nameSortBtn = filterBox.querySelector('.filterRow_nameSort');
  const ageSortBtn = filterBox.querySelector('.filterRow_ageSort');
  const nameInput = filterBox.querySelector('.filterRow_nameFilter');
  const ageMinInput = filterBox.querySelector('.filterRow_ageFilter_min');
  const ageMaxInput = filterBox.querySelector('.filterRow_ageFilter_max');
  function update() {
    onChange(getProcessedUsers(
      nameInput.value,
      ageMinInput.value,
      ageMaxInput.value
    ));
  }
  nameSortBtn.addEventListener('click', () => {
    nameSortState = (nameSortState + 1) % 3;
    ageSortState = 0;
    applySort(nameSortBtn, ageSortBtn);
    update();
  });
  ageSortBtn.addEventListener('click', () => {
    ageSortState = (ageSortState + 1) % 3;
    nameSortState = 0;
    applySort(nameSortBtn, ageSortBtn);
    update();
  });
  nameInput.addEventListener('input', update);
  ageMinInput.addEventListener('input', update);
  ageMaxInput.addEventListener('input', update);
}
function applySort(nameBtn, ageBtn) {
  nameBtn.textContent = 'Имя' + (nameSortState === 1 ? ' ↑' : nameSortState === 2 ? ' ↓' : '');
  ageBtn.textContent = 'Возраст' + (ageSortState === 1 ? ' ↑' : ageSortState === 2 ? ' ↓' : '');
}
function getProcessedUsers(nameValue, ageMin, ageMax) {
  let users = [...originalUsers];
  if (nameValue) {
    const value = nameValue.toLowerCase();
    users = users.filter(u =>
      `${u.secondName} ${u.firstname}`.toLowerCase().includes(value)
    );
  }
  const min = ageMin ? Number(ageMin) : null;
  const max = ageMax ? Number(ageMax) : null;
  if (min !== null) {
    users = users.filter(u => u.age >= min);
  }
  if (max !== null) {
    users = users.filter(u => u.age <= max);
  }
  if (nameSortState) {
    users.sort((a, b) => {
      const aName = `${a.secondName} ${a.firstname}`;
      const bName = `${b.secondName} ${b.firstname}`;
      return nameSortState === 1
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    });
  }
  if (ageSortState) {
    users.sort((a, b) =>
      ageSortState === 1 ? a.age - b.age : b.age - a.age
    );
  }
  return users;
}