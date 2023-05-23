"use strict";
// ----------------------------------\\
//               BANK-APP             \\
// ----------------------------------//

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [2000000, 450, -400, 30000, -650, -130, 70, 10000],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-02-01T21:31:17.178Z",
    "2023-02-10T07:42:02.383Z",
    "2023-02-18T09:15:04.904Z",
    "2023-02-21T10:17:24.185Z",
    "2023-02-25T14:11:59.604Z",
    "2023-02-26T17:01:17.194Z",
    "2023-02-27T23:36:17.929Z",
    "2023-02-28T10:51:36.790Z",
  ],
  currency: "NGN",
  locale: "en-GB", // de-DE
};

const account2 = {
  owner: "Ibrahim Mukhtar",
  movements: [5000000, 3400, -150, -790, -3210, -10000, 85000, 30000],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2023-02-01T21:31:17.178Z",
    "2023-02-10T07:42:02.383Z",
    "2023-02-18T09:15:04.904Z",
    "2023-02-21T10:17:24.185Z",
    "2023-02-25T14:11:59.604Z",
    "2023-02-26T17:01:17.194Z",
    "2023-02-27T23:36:17.929Z",
    "2023-02-28T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-EU", // de-DE
};

const account3 = {
  owner: "Hadiza Mukhtar",
  movements: [200, -200, 340, -300, -20, 500000, 40000, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2023-02-01T21:31:17.178Z",
    "2023-02-10T07:42:02.383Z",
    "2023-02-18T09:15:04.904Z",
    "2023-02-21T10:17:24.185Z",
    "2023-02-25T14:11:59.604Z",
    "2023-02-26T17:01:17.194Z",
    "2023-02-27T23:36:17.929Z",
    "2023-02-28T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US", // de-DE
};

const account4 = {
  owner: "Ahmed Mohammed",
  movements: [430, 1000, 700, 90, -80, 20000, 80000, 20000],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2023-02-01T21:31:17.178Z",
    "2023-02-10T07:42:02.383Z",
    "2023-02-18T09:15:04.904Z",
    "2023-02-21T10:17:24.185Z",
    "2023-02-25T14:11:59.604Z",
    "2023-02-26T17:01:17.194Z",
    "2023-02-27T23:36:17.929Z",
    "2023-02-28T10:51:36.790Z",
  ],
  currency: "NGN",
  locale: "en-GB", // de-DE
};

// Let's create an accounts variable and declear the individual accounts in an array.

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance--value");
const labelSumIn = document.querySelector(".summary--value--in");
const labelSumOut = document.querySelector(".summary--value--out");
const labelSumInterest = document.querySelector(".summary--value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login--btn");
const btnTransfer = document.querySelector(".form--btn--transfer");
const btnLoan = document.querySelector(".form--btn--loan");
const btnClose = document.querySelector(".form--btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login--input--user");
const inputLoginPin = document.querySelector(".login--input--pin");
const inputTransferTo = document.querySelector(".form--input--to");
const inputTransferAmount = document.querySelector(".form--input--amount");
const inputLoanAmount = document.querySelector(".form--input--loan--amount");
const inputCloseUsername = document.querySelector(".form--input--user");
const inputClosePin = document.querySelector(".form--input--pin");

// Using DOM Manipulation
// Functions

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed === 2) return `${daysPassed} days ago`;
  if (daysPassed === 3) return `${daysPassed} days ago`;
  if (daysPassed === 4) return `${daysPassed} days ago`;
  if (daysPassed === 5) return `${daysPassed} days ago`;
  if (daysPassed > 5) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acct, sort = false) {
  containerMovements.innerHTML = "";

  const sortMovements = sort
    ? acct.movements.slice().sort((a, b) => a - b)
    : acct.movements;

  sortMovements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acct.movementsDates[i]);
    const displayDate = formatMovementDate(date, acct.locale);

    const formattedMov = formatCurrency(mov, acct.locale, acct.currency);

    // const formattedMov = new Intl.NumberFormat(acct.locale, {
    //   style: "currency",
    //   currency: acct.currency,
    // }).format(mov);

    const html = `
        <div class="movements--row">
            <div class="movements--type movements--type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements--date">${displayDate}</div>
            <div class="movements--value">${formattedMov}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayTotalBalance = function (acct) {
  acct.balance = acct.movements.reduce((accum, mov) => accum + mov, 0);

  labelBalance.textContent = formatCurrency(
    acct.balance,
    acct.locale,
    acct.currency
  );
};

const calcDisplayTotalSummary = function (acct) {
  const incomes = acct.movements
    .filter((mov) => mov > 0)
    .reduce((acct, mov) => acct + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acct.locale, acct.currency);

  const out = acct.movements
    .filter((mov) => mov < 0)
    .reduce((acct, mov) => acct + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acct.locale,
    acct.currency
  );
  // Using map() method to create a new array to give interests on each deposits
  const interest = acct.movements
    .filter((mov) => mov > 0)
    .map((desposit) => (desposit * acct.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acct, interestOnDesposit) => acct + interestOnDesposit, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acct.locale,
    acct.currency
  );
};

const createUsernames = function (accts) {
  accts.forEach(function (acct) {
    acct.userName = acct.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
  // console.log(accts);
};
createUsernames(accounts);

const updateUI = function (acct) {
  // Display Movements
  displayMovements(acct);

  // Display Balance
  calcDisplayTotalBalance(acct);

  // Display Summary
  calcDisplayTotalSummary(acct);
};

const startLogOutTimer = function () {
  const tickTockTimer = function () {
    // Lets cut out the decimal part by using Math.trunc function
    const min = String(Math.trunc(currentTime / 60)).padStart(2, 0);
    const currentSec = String(currentTime % 60).padStart(2, 0);
    // In each call, print the remaining time to UI.
    labelTimer.textContent = `${min}:${currentSec}`;

    // When time get to 0 seconds, stop timer and log out the user.
    if (currentTime === 0) {
      clearInterval(countDownTimer);
      labelWelcome.textContent = "Log in to continue...";
      containerApp.style.opacity = 0;
    }

    // Decrease 1sec
    currentTime--;
  };

  // Setting time to 5 mins.
  let currentTime = 600;

  // We will call the timer every seconds.
  tickTockTimer();
  const countDownTimer = setInterval(tickTockTimer, 1000);
  return countDownTimer;
};

// const printWelcome = function (name) {
//   const now = new Date();
//   const greetings = new Map([
//     [[6, 7, 8, 9, 10], "Good Morning"],
//     [[11, 12, 13, 14], "Good Day"],
//     [[15, 16, 17, 18], "Good Afternoon"],
//     [[19, 20, 21, 22], "Good Evening"],
//     [[23, 0, 1, 2, 3, 4, 5], "Good Night"],
//   ]);

//   const arr = [...greetings.keys()].find((key) => key.includes(now.getHours()));
//   const greet = greetings.get(arr);
//   labelWelcome.textContent = `${greet}, ${name}!`;
// };
// printWelcome(`${currentAccount.owner.split(" ")[0]}`);
// Event Handlers

let currentAccount, currentTime;

// ///////////////////////////////////////
// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// ///////////////////////////////////////

btnLogin.addEventListener("click", function (myEvent) {
  // Prevents Form from Submitting
  myEvent.preventDefault();

  currentAccount = accounts.find(
    (acct) => acct.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // if (currentAccount?.pin === Number(inputLoginPin.value)) {
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and a Welcome Message.
    labelWelcome.textContent = `You are logged in as ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Experimenting with the API
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );

    // Create Current Date and Time
    //  const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // // const sec = `${now.getSeconds()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}  ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    if (currentTime) clearInterval(currentTime);
    currentTime = startLogOutTimer();

    // Let's Create a function called UpDate UI
    updateUI(currentAccount);
  }
});

// Adding Event Listener to our btn.
btnTransfer.addEventListener("click", function (myEvent) {
  // This helps to prevent the default behaviour of the btn when clicked
  myEvent.preventDefault();
  // Create a variable to convert our value into a number
  // const amount = Number(inputTransferAmount.value);
  const amount = +inputTransferAmount.value;
  const receiverAcct = accounts.find(
    (acct) => acct.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcct &&
    currentAccount.balance >= amount &&
    receiverAcct?.userName !== currentAccount.userName
  ) {
    // Executing the transfer.
    currentAccount.movements.push(-amount);
    receiverAcct.movements.push(amount);

    // Add Transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcct.movementsDates.push(new Date().toISOString());

    // Let's Create a function called UpDate UI
    updateUI(currentAccount);

    // Reset timer

    clearInterval(currentTime);
    currentTime = startLogOutTimer();
  }
});

// Implementing Loan Request
btnLoan.addEventListener("click", function (myEvent) {
  // This helps to prevent default action.
  myEvent.preventDefault();
  // const amount = Number(inputLoanAmount.value);
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(
      (amountDeposited) => amountDeposited >= amount * 0.1
    )
  ) {
    setTimeout(function () {
      // Add the movement
      currentAccount.movements.push(amount);

      // Add Loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Current Time
      clearInterval(currentTime);
      currentTime = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

// The find-index method
// Using splice() method, it helps us to delete a particular element in an array
btnClose.addEventListener("click", function (myEvent) {
  // This helps to prevent default action.
  myEvent.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    // Number(inputClosePin.value) === currentAccount.pin
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acct) => acct.userName === currentAccount.userName
    );
    console.log(index);

    // Delete account info.
    accounts.splice(index, 1);

    // Hide UI.
    containerApp.style.opacity = 0;
  }

  // Clear input fields.
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});

// Using the state variable
let sorted = false;

// Button sort
btnSort.addEventListener("click", function (myEvent) {
  myEvent.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Array.from() Method
labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements--value"),

    // (domElement) => Number(domElement.textContent.replace("₦", ""))
    (domElement) => +domElement.textContent.replace("₦", "")
  );
  console.log(movementsUI);
});

/*<div class="movements--value">₦ ${mov.toFixed(2)}</div>*/
