let users = {
    name: "peter",
    email: "peter@gmail.com",
    password: "password",
    address: {
        street: "123 Main Street",
        city: "Miramar",
        state: "Florida",
        zipcode: 33027
    },
    accounts: ["saving", "checking"],
    checking : {
      openDate: "",
      closeDate: "",
      accountNumber: "",
      balance: 0.00,
      transaction: {
        date: "",
        type: "",
        amount: "",
      }
    },
    saving : {
      openDate: "",
      closeDate: "",
      accountNumber: "",
      balance: 0.00,
      transaction: {
        date: "",
        type: "",
        amount: "",
      }
    },
};

console.log(users.accounts.finance);

// let autoLoan = {
//   openDate: "",
//   closeDate: "",
//   accountNumber: "",
//   balance: 0.00,
//   transaction: {
//     date: "",
//     type: "",
//     amount: "",
//   }
// };
// users = {...users, autoLoan};
// users.accounts.push("loan");
// https://github.com/AminTahseen/Node-Js-Simple-Banking-Application

let acc = {
  name: "sun",
  email: "sun@gmail.com",
  password: "password",
  address: {
    street: "123 Main Street",
    city: "Miramar",
    state: "Florida",
    zipCode: 33027,
  },
  accountTypes: ["savings", "checking"],
  accounts: [
    {
      type: this.n,
      balance: 100.00,
    }
  ]
}

// login.js
function handleLogin () {

  window.localStorage.clear();
  
  if (!email) return validate('Email cannot be empty');
  if (!password) return validate('Password cannot be empty');

  const url = `http://localhost:3000/login/${email}/${password}`;
  fetch(url)
    .then((response) => response.json())
    .then((user) => {
      console.log('from login : ', user);
      setUser(user);
      console.log('FROM LOGIN : ', user);
      if (email === user.email && password === user.password) {
        setName(user.name);
        window.localStorage.setItem("email", user.email);
        window.localStorage.setItem("id", user.id);
        isLoggedIn = true;
        setShow(false);
        setRoleType("LoggedIn");
        validate('Login Success');
        return true;
      } else if (email !== user.email || password !== user.password) {
        isLoggedIn ? validate('Login Success') : validate('Incorrect email address or password');
      }
      return true;
    })
};

// #######################################################

const url = `http://localhost:3000/withdraw`;
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: userEmail,
            amount: amount,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
          }
         })
          .then((response) => response.json())
          .then((user) => {
            setBalance(user.balance);
            validate(`${type} successful ${FormatCurrency(Number(amount))}`);
          })