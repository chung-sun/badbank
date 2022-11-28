'use strict';

function Navbar () {

  const [state, setState] = React.useState(false);
  const [active, setActive] = React.useState(window.location.hash);
  const [show, setShow] = React.useState(isLoggedIn);
  const { roleType, setRoleType } = React.useContext(RoleTypeContext);
  const { userName, setUserName } = React.useContext(UserContext);
  
  window.addEventListener('load', () => {
    console.log('page is fully loaded');
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  });

  function router () {
    setActive(window.location.hash);
  };

  window.addEventListener('hashchange', router);

  function handleNavbar () {

    if (!window.localStorage.getItem("email")) {
      isLoggedIn = false;
    } else {
      isLoggedIn = true;
    }
    
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand" href="#"  data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Welcome to Bad Banking">
          <img src="./images/icons8-bank-64a.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
          Bad Bank
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Return Home Page">
              <a className={active == "#/" ? "nav-link active" : "nav-link"} href="#/">Home</a>
            </li>
            <li className="nav-item" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Savings Account">
              <a className={active == "#/savings/" ? "nav-link active" : "nav-link"} href="#/savings/">Savings</a>
            </li>
            <li className="nav-item" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Checking Account">
              <a className={active == "#/checking/" ? "nav-link active" : "nav-link"} href="#/checking/">Checking</a>
            </li>
            <li className="nav-item" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Learn more">
              <a className={active == "#/aboutus/" ? "nav-link active" : "nav-link"} href="#/aboutus/">About Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-collapse collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
            <li className="nav-item" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Transactions">
              <a className={active == "#/transaction/" ? "nav-link active" : "nav-link"} href="#/transaction/">{roleType == "LoggedIn" ? "Transaction" : ""}</a>
            </li>
            <li className="nav-item" id="login" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="auto" data-bs-delay="500" title="Login">
                <a className={active == "#/login/" ? "nav-link active" : "nav-link"} href="#/login/" onClick={handleNavbar}>{roleType == "customer" ?  "Login/Sign Up" : "LogOut"}</a>
            </li>
            <li className="nav-item" id="username">
                <a className={active == "#/customersetting/" ? "nav-link" : "nav-link"} href="#/customersetting/" onClick={handleNavbar}>{roleType == "customer" ?  "" : userName}</a>
            </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};