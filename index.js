const form = document.querySelector('form');
const table = document.querySelector('table');

// Function to create a new row in the table
function createRow(name, id, country, languages) {
  const newRow = table.insertRow(-1);
  const nameCell = newRow.insertCell(0);
  const idCell = newRow.insertCell(1);
  const countryCell = newRow.insertCell(2);
  const languagesCell = newRow.insertCell(3);
  const actionsCell = newRow.insertCell(4);

  nameCell.textContent = name;
  idCell.textContent = id;
  countryCell.textContent = country;
  languagesCell.textContent = languages;

  const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.classList.add('delete');
deleteButton.addEventListener('click', () => {
  newRow.remove();
});
actionsCell.appendChild(deleteButton);


  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    form.name.value = name;
    form.ID.value = id;
    form.Country.value = country;
    form.languages.value= languages;
    for (const element of form.languages.options) {
      const option = element;
      option.selected = selectedLanguages.includes(option.value);
    }
    deleteButton.disabled = true;
    editButton.disabled = true;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      nameCell.textContent = form.name.value;
      idCell.textContent = form.ID.value;
      countryCell.textContent = form.Country.value;
      const newLanguages = Array.from(form.languages.selectedOptions).map(option => option.value).join(', ');
      languagesCell.textContent = newLanguages;
      deleteButton.disabled = false;
      editButton.disabled = false;
      form.removeEventListener('submit', () => {});
      form.reset();
    }, { once: true });
  });
  actionsCell.appendChild(editButton);
}

// Add an event listener to the form
form.addEventListener('submit', (event) => {
  // Prevent the default form submission
  event.preventDefault();

  // Get the form fields
  const name = form.name.value.trim();
  const id = form.ID.value.trim();
  const country = form.Country.value.trim();
  const languages = Array.from(form.languages.selectedOptions).map(option => option.value).join(',').trim();

  // Validate the form fields
  if (name === '' || id === '' || country === '' || languages === '') {
    alert('Please fill out all the fields.');
    return;
  }

  // Create a new row in the table
  createRow(name, id, country, languages);

  // Reset the form
  form.reset();
});
