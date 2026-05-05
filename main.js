const list = document.querySelector('.list');
const btn = document.querySelector('.btn');
const inputText = document.querySelector('.input__text');

let listArr = JSON.parse(localStorage.getItem('listArr')) || [];

const updateLocal = () => {
    localStorage.setItem('listArr', JSON.stringify(listArr));
};

const fillList = () => {
    list.innerHTML = listArr.map((text, index) => `
        <li class="list__item">
            ${text}
            <button onclick="deleteItem(${index})" class="delete__btn">Delete</button>
        </li>
    `).join('');
};

btn.addEventListener('click', () => {
    const textValue = inputText.value.trim();

    if (!textValue) return; 

    listArr.push(textValue);
    inputText.value = '';
    updateLocal();
    fillList();
});

window.deleteItem = (index) => {
    listArr.splice(index, 1);
    updateLocal();
    fillList();
};

fillList();