'use strict';

function Login () {

    const [show, setShow] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [user, setUser] = React.useState({});
    const { roleType, setRoleType } = React.useContext(RoleTypeContext);
    const { userName, setUserName } = React.useContext(UserContext);
    const [token, setToken] = React.useState();
  
    function validate (error) {
    
      setStatus(error);
      setTimeout(() => setStatus(''), 4000);
      
    };

    function handleLogin () {

      let statusCode;

      window.localStorage.clear();
      
      if (!email) return validate('Email cannot be empty');
      if (!password) return validate('Password cannot be empty');

      const url = `/api/accounts/users/login/${email}/${password}`;
      fetch(url)
        .then( async (response) => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const user = isJson ? await response.json() : null;

          if (!response.ok) {
            const error = (user && user.message) || response.status;
            return Promise.reject(error);
          }
          setToken(user.accessToken);
          setUser(user);
          setName(user.name);
          setUserId(user._id);
          window.localStorage.setItem("email", user.email);
          window.localStorage.setItem("_id", user._id);
          window.localStorage.setItem("token", user.accessToken);
          isLoggedIn = true;
          setShow(false);
          setRoleType("LoggedIn");
          setUserName(user.name);
          validate('Login Success');
        })
        .catch(error => {
          error == 401 ? validate('Incorrect email address or password') :  validate('User not found');
          console.log('error : ', error);
        });
    };
  
    function handleLogout () {
      isLoggedIn = false;
      setShow(true);
      window.localStorage.clear();
      setEmail('');
      setPassword('');
      setRoleType("customer");
      validate('Logout Success');
    };
  
    return (
      <div>
        <form>
        <br/>
          <Card
            bgcolor="warning"
            txtcolor="white"
            bgCostumColor=""
            header="Login"
            width="30rem"
            fontSize="25px"
            statusfontsize="20px"
            statustextalign="center"
            statuscolor="white"
            image="../images/login.png"
            status={status}
            body={show && !isLoggedIn ? (
                          <>
                            Email<br/>
                            <input type="email" className="form-control" autoComplete="off" id="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.currentTarget.value)}></input>
                            <br/>
                            Password<br/>
                            <input type="password" className="form-control" autoComplete="off" id="password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                            <br/>
                            <button type="submit" className="btn btn-light w-100" disabled={!email && !password ? true : false} onClick={handleLogin}>Login</button>
                            <br/><br/>
                            <button type="submit" className="btn btn-light w-100" disabled={false}><a className="card-link account-link" href="#/createaccount/">Sign Up</a></button>
                          </>
                          ) : (
                          <>
                            <h5>Login Success</h5>
                            <h5>Welcome back {name}</h5>
                            <button type="submit" className="btn btn-light w-100" onChange={e => setShow(e.currentTarget.value)} onClick={handleLogout}>Logout</button>
                          </>
                          )}
          />
        </form>
      </div>
    );
  }