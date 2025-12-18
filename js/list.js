import { createListItem } from './listItem.js';
export function renderList(users) {
  const list = document.getElementById('usersList');
  list.innerHTML = '';
  users.forEach(user => {
    list.appendChild(createListItem(user));
  });
}