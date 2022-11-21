const firstname = document.getElementById("first-name");
const surname = document.getElementById("last-name");
const date = document.getElementById("delivery-date");
const city = document.getElementById("city");
const street = document.getElementById("street");
const house = document.getElementById("house");
const flat = document.getElementById("flat");
const submit = document.getElementById("submit-button");
const form = document.getElementById("form");
const header = document.getElementById("header");
const radios = document.querySelectorAll('input[type=radio]');
const checkboxes = document.querySelectorAll('input[type=checkbox]');

const regName = /^[a-zA-Z ]{4,30}$/;
const regSurname = /^[a-zA-Z ]{5,30}$/;
const regHouse = /^[0-9]/;
const regFlat = /^(\d+-?)+\d+$/;

const isFormValid = {
  name: false,
  surname: false,
  date: false,
  city: false,
  street: false,
  house: false,
  flat: false
};

function checkAllInputs() {
  let isSubmitValid = false;

  for (let [key, value] of Object.entries(isFormValid)) {
    if (!value) {
      isSubmitValid = true;
    }
  }

  submit.disabled = isSubmitValid;
}

function changeErrorMsg(isValid, errorElement, inputElement, key) {
  if (isValid) {
    errorElement.style.display = 'none';
    inputElement.style.outline = "1px solid black";
    inputElement.style.border = "1px solid black";
    isFormValid[key] = true;
    checkAllInputs();
  } else {
    errorElement.style.display = 'block';
    inputElement.style.outline = "1px solid red";
    inputElement.style.border = "1px solid red";
    isFormValid[key] = false;
    checkAllInputs();
  }
}

firstname.addEventListener('input', () => {
  const isValid = regName.test(firstname.value);
  const isErrorTextExist = document.querySelector('#errorName');

  changeErrorMsg(isValid, isErrorTextExist, firstname, 'name');
});

surname.addEventListener('input', () => {
  const isValid = regSurname.test(surname.value);
  const isErrorTextExist = document.querySelector('#errorLastname');

  changeErrorMsg(isValid, isErrorTextExist, surname, 'surname');
});

date.addEventListener('change', () => {
  const dateValue = date.value;
  const isErrorTextExist = document.querySelector('#errorDelivery');

  const chosenDay = Date.parse(new Date(dateValue));
  const today = Date.parse(new Date());
  const tomorrow = new Date(today).setHours(24);

  if (chosenDay >= tomorrow) {
    isErrorTextExist.style.display = 'none';
    isFormValid.date = true;
    checkAllInputs();
  } else {
    isErrorTextExist.style.display = 'block';
    isFormValid.date = true;
    checkAllInputs();
  }
});

city.addEventListener('input', () => {
  const isValid = city.value.length > 0;
  const isErrorTextExist = document.querySelector('#errorCity');

  changeErrorMsg(isValid, isErrorTextExist, city, 'city');
});

street.addEventListener('input', () => {
  const isValid = street.value.length > 4;
  const isErrorTextExist = document.querySelector('#errorStreet');

  changeErrorMsg(isValid, isErrorTextExist, street, 'street');
});

house.addEventListener('input', () => {
  const isValid = regHouse.test(house.value);
  const isErrorTextExist = document.querySelector('#errorHouse');

  changeErrorMsg(isValid, isErrorTextExist, house, 'house');
});

flat.addEventListener('input', () => {
  const isValid = regFlat.test(flat.value);
  const isErrorTextExist = document.querySelector('#errorFlat');

  changeErrorMsg(isValid, isErrorTextExist, flat, 'flat');
});



form.addEventListener('submit', (e) => {
  e.preventDefault();

  let checkedPayment = '';
  let checkedOptionals = [];

  radios.forEach(i => {
    if (i.checked) {
      checkedPayment = i.value;
    }
  });

  checkboxes.forEach(i => {
    if (i.checked) {
      checkedOptionals.push(i.value);
    }
  });

  const info = {
    firstname: firstname.value,
    surname: surname.value,
    date: date.value,
    city: city.value,
    street: street.value,
    house: house.value,
    flat: flat.value,
    payment: checkedPayment,
    optionals: checkedOptionals.join(' ')
  }

  alert(JSON.stringify(info, null, 2));``
});
