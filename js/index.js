import { renderList } from './list.js';
import { initFilter } from './filter.js';
import { enableInlineImageUpload } from './chengeElement.js';
async function init() {
  const app = document.getElementById('app');
  const usersContainer = document.getElementById('usersContainer');
  const list = document.createElement('ol');
  list.id = 'usersList';
  list.className = 'usersList';
  usersContainer.appendChild(list);
  const response = await fetch('./data/users.json');
  const users = await response.json();
  function renderAndEnableImages(usersArray) {
    renderList(usersArray);
    const userImages = document.querySelectorAll('.usersList_itemData img');
    userImages.forEach(img => enableInlineImageUpload(img));
  }
  renderAndEnableImages(users);
  initFilter(users, renderAndEnableImages);
}
init();