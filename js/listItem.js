export function createListItem(user) {
  const li = document.createElement('li');
  li.className = 'usersList_item';
  li.innerHTML = `
    <div class="usersList_itemBox">
      <div class="usersList_itemData">
        <div class="usersList_userImgBox">
          <img src="${user.avatar}" class="usersList_userImg">
        </div>
        <div class="usersList_userDataBox">
          <p class="usersList_userData">${'Имя: ' + user.secondName + ' ' + user.firstname}</p>
          <p class="usersList_userData">${'Возраст (лет): ' + user.age}</p>
          <p class="usersList_userData">${'Email: ' + user.email}</p>
        </div>
      </div>
    </div>
  `;
  return li;
}