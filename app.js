/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createListItem, deleteList, editListItem, getListItems } from './fetch-utils.js';
// import { renderListItem } from './render-utils.js';

/* Get DOM Elements */
// const signInForm = document.getElementById('sign-in');
// const signInEmail = document.getElementById('sign-in-email');
// const signInPassword = document.getElementById('sign-up-password');

// const signUpForm = document.getElementById('sign-up');
// const signUpEmail = document.getElementById('sign-up-form');
// const signUpPassword = document.getElementById('sign-up-password');

const form = document.querySelector('.create-form');
const deleteButton = document.querySelector('#delete-button');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');
/* State */

/* Events */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const rating = data.get('rating');
    form.reset();

    const newItem = await createListItem(item, rating);
    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong while adding your favorite';
    }
});
/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    // call our fetch to supabase
    const list = await getListItems();
    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItem(item);
                await fetchAndDisplayList();
            });
            if (item.cross_out) {
                listItemEl.classList.add('cross-out-true');
            }

            listEl.append(listItemEl);
        }
    }
}
