'use strict'

function CustomerSetting () {

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('please update');
  const [state, setState] = React.useState('please update');
  const [zipCode, setZipCode] = React.useState('please update');
  const [phone, setPhone] = React.useState('please update');

  const [userEmail, setUserEmail] = React.useState(window.localStorage.getItem("email"));
  const [token, setToken] = React.useState(window.localStorage.getItem("token"));

  React.useEffect(() => {
    const url = `http://localhost:3000/api/accounts/users/finduser/${userEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((user) => {
        setName(user.name);
        setEmail(user.email);
        setBalance(user.balance);
        setRole(user.role);
      })
  },[]);

  function handleUpdate () {
    const url = `http://localhost:3000/account/users/settings`;
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: userEmail,
            name: name,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
          }
        })
          .then( async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const user = isJson ? await response.json() : null;

            if (!response.ok) {
              const error = (user && user.message) || response.status;
              return Promise.reject(error);
          }
            setEmail(user.email);
            setName(user.name);
            validate(`Account updated`);
          })
          .catch(error => {
            error == 401 ? validate('Incorrect email address or password') :  error == 403 ? validate('Invalid Token, Please login again') : validate('User not found');
            console.log('error : ', error);
          });
  };

  return (
    <>
    <form>
    <br/>
      <Card
        bgcolor=""
        txtcolor="white"
        bgCostumColor="CornflowerBlue"
        header="Customer Setting"
        width="30rem"
        height="38rem"
        fontSize="25px"
        statusfontsize="20px"
        statustextalign="center"
        statuscolor="white"
        status={status}
        body={(
              <>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="input" autoComplete="off" className="form-control" id="name" placeholder={name} value={name} onChange={e => setName(e.currentTarget.value)}></input>
                <br/>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" autoComplete="off" className="form-control" id="email" placeholder={email} value={email} onChange={e => setEmail(e.currentTarget.value)}></input>
                <br/>
                <label className="form-label balance">Current Balance <button className="btn btn-light" disabled={true}>{FormatCurrency(balance)}</button></label><br/>
                <label className="form-label balance">Role Type<button className="btn btn-light" disabled={true}>{role}</button></label><br/>
                <br/>
                <button type="submit" className="btn btn-light w-100" id="create-account" disabled={true} onClick={handleUpdate}>Update Account</button>
                <br/>
                <div className="card-link text-center"><button className="btn btn-light w-100"><a className="card-link account-link" href="#/login/">{isLoggedIn ? 'Logout' : 'Login'}</a></button></div>
              </>
              )}
      />
    </form>
    </>)
}