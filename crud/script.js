// URL de la API
const apiUrl = '/crud/api/items';

// Función para obtener y mostrar la lista de personas
async function getPersons() {
    const response = await fetch(apiUrl);
    const persons = await response.json();

    const personList = document.getElementById('personList');
    personList.innerHTML = '';  // Limpiar la lista

    persons.forEach(person => {
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between items-center p-4 border border-gray-200 rounded';

        listItem.innerHTML = `
            <span>${person.name}</span>
            <div class="flex space-x-2">
                <button onclick="editPerson(${person.id}, '${person.name}')" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Editar</button>
                <button onclick="deletePerson(${person.id})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar</button>
            </div>
        `;
        personList.appendChild(listItem);
    });
}

// Función para agregar una persona
document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;

    if (name) {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        nameInput.value = '';
        getPersons();  // Refrescar la lista
    }
});

// Función para eliminar una persona
async function deletePerson(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    getPersons();  // Refrescar la lista
}

// Función para editar una persona
async function editPerson(id, currentName) {
    const newName = prompt('Editar nombre:', currentName);
    if (newName && newName !== currentName) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });
        getPersons();  // Refrescar la lista
    }
}

// Cargar la lista de personas al cargar la página
document.addEventListener('DOMContentLoaded', getPersons);
