'use strict';

function Savings () {

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { accType, setAccType } = React.useContext(UserContext);

  return (
    <div className="savings-main">
        <h1>Savings made simple with BadBank TotalSavings℠</h1>
        <p>This account makes it easy to start saving. You’ll have access to BadBank.com and our mobile banking tools.</p>
        <img className="savings-img-banner" src="../images/saving-4.png"></img>
        <div className="savings-body">
            <h2>it's time to grow</h2>
            <button type="button" className="btn btn-success"><a className="savings-link" href="#/createaccount/">Open an account today</a></button>
        </div>
    </div>
  );
}