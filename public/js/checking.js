'use strict';

function Checking () {

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
    <div className="checking-main">
        <h1>Get the essentials with BadBank TotalChecking®</h1>
        <p>BadBank TotalChecking® is easy to use and gives you access to more than 26,000 ATMs and more than 5,000 branches. You’ll also be able to use our online banking, bill pay and mobile banking services, plus FeeFree ATMs nationwide.</p>
        <img className="checking-img-banner" src="../images/checking.jpg"></img>
        <div className="checking-body">
            <h2>it's time to grow</h2>
            <button className="btn btn-warning"><a className="about-link" href="#/createaccount/">Open an account today</a></button>
        </div>
    </div>
  );
}