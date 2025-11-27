const form = document.getElementById('Registro');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody'); 

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit',function(event) {
    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;

    // agregar validación en el formulario
    if(name && email) {
        const newData = {name,email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else{
        alert('Todos los datos son obligatorios');
    }
} )

function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function(item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const ediButton = document.createElement('button');
        const eliButton = document.createElement('button');

        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        ediButton.textContent = 'Editar';
        eliButton.textContent = 'Eliminar';

        ediButton.classList.add('button', 'button-secondary');
        eliButton.classList.add('button', 'button-tertiary');

        ediButton.addEventListener('click', function(){
            ediData(index);
        })

        eliButton.addEventListener('click', function(){
            eliData(index);
        })

        actionCell.appendChild(ediButton);
        actionCell.appendChild(eliButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);


    })
}

function ediData(index){
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function eliData(index){
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
