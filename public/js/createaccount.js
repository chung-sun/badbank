'use strict';

function CreateAccount () {

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [users, setUser] = React.useState('');
  
  // error message handler
  function validate (error) {
    
    setStatus(error);
    setTimeout(() => setStatus(''), 4000);
    
  };

  // to check if user with email already exist
  React.useEffect(() => {
    const url = '/api/accounts/users/displayAllAccounts'
        fetch(url)
        .then((response) => response.json())
        .then((users) => {
          setUser(users);
        })
  },[email]);

  // create account handler
  function createUserAccount () {

    console.log(name, email, password);
    const url = `/api/accounts/users/createaccount/${name}/${email}/${password}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
      })
    setShow(false);
    setStatus(true);
    validate(`Welcome to BadBank ${name}, your account has been created`);
    alert("Successfully Created Account");
  };

  // to validate user information
  function handleCheckUser () {

    if (!name) return validate('Name cannot be empty');
    if (!email) return validate('Email cannot be empty');
    if (!password) return validate('Password cannot be empty');

    if (name.length < 3) {
      setName('');
      validate('Name must have 3 characters minimum');
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmail('');
      validate('Enter a valid email address');
      return;
    } else if (password.length < 8) {
      setPassword('');
      validate('Password must have 8 characters minimum');
      return;
    } else {
        let search = users.find((user) => user.email == email);
        if (search) {
          validate("Email already exist")
        } else {
          createUserAccount();
        }
      }
  };

  // clear the form after successful user registration
  function clearForm () {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  };

  return (
    <>
    <form>
    <br/>
      <Card
        bgcolor=""
        txtcolor=""
        bgCostumColor="CornflowerBlue"
        header="Create Account"
        width="30rem"
        height="38rem"
        fontSize="25px"
        statusfontsize="20px"
        statustextalign="center"
        statuscolor="white"
        status={status}
        body={show ? (
                      <>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="input" autoComplete="off" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)}></input>
                        <br/>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" autoComplete="off" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.currentTarget.value)}></input>
                        <br/>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" autoComplete="off" suggested="current-password" className="form-control" id="password" placeholder="Enter password 8 char min." value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                        <br/>
                        <button type="submit" className="btn btn-light w-100" id="create-account" disabled={(!name || !email || !password) ? true : false} onClick={handleCheckUser}>Create Account</button>
                        <br/>
                        <div className="card-link text-center"><button className="btn btn-light w-100"><a className="card-link account-link" href="#/login/">{isLoggedIn ? 'Logout' : 'Already have an account?'}</a></button></div>
                      </>
                      ) : (
                      <>
                        <h5>Success</h5>
                        <button type="submit" className="btn btn-light w-100" onClick={clearForm}>Add Another Account</button>
                      </>
                      )}
      />
    </form>
    </>
  );
}