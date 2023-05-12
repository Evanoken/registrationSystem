// Get the form and the table elements
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

  nameCell.innerText = name;
  idCell.innerText = id;
  countryCell.innerText = country;
  languagesCell.innerText = languages;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    newRow.remove();
  });
  actionsCell.appendChild(deleteButton);
  
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', () => {
    form.name.value = name;
    form.ID.value = id;
    form.Country.value = country;
    const selectedLanguages = languages.split(', ');
    for (let i = 0; i < form.lang.options.length; i++) {
      const option = form.lang.options[i];
      option.selected = selectedLanguages.includes(option.value);
    }
    deleteButton.disabled = true;
    editButton.disabled = true;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      nameCell.innerText = form.name.value;
      idCell.innerText = form.ID.value;
      countryCell.innerText = form.Country.value;
      languagesCell.innerText = Array.from(form.lang.selectedOptions).map(option => option.value).join(', ');
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
  const name = form.name.value;
  const id = form.ID.value;
  const country = form.Country.value;
  const languages = Array.from(form.lang.selectedOptions).map(option => option.value).join(', ');

  // Validate the form fields
  if (name === '' || id === '' || country === '' || languages === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Create a new row in the table
  createRow(name, id, country, languages);

  // Reset the form
  form.reset();
});
