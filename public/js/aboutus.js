'use strict';

function AboutUs () {

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { accType, setAccType } = React.useContext(UserContext);

  return (
    <div className="about-main">
        <h1>Helping you make the most of your money.</h1>
        <br/><br/>
        <p>We're proud to serve nearly half of America’s households with a broad range of financial services, including personal banking, credit cards, mortgages, auto financing, investment advice, small business loans and payment processing.</p>
        <div className="about-row">
            <div className="row justify-content-center">
                <div className="col">
                    <p className="p-about">Branches</p>
                    <p className="p-about"><img className="img-about" src="../images/branch.png"></img></p>
                    <p className="p-about">At our more than 4,700 branches. Stop by when you need advice or help from our knowledgeable staff.</p>
                </div>
                <div className="col">
                    <p className="p-about-1">ATM's</p>
                    <p className="p-about-1"><img className="img-about" src="../images/atm.png"></img></p>
                    <p className="p-about-1">At our more than 16,000 ATMs. Make deposits and get cash. You can even set your preferences for extra speed.</p>
                </div>
                <div className="col">
                    <p className="p-about-2">BadBank.com</p>
                    <p className="p-about-2"><img className="img-about" src="../images/mobile.png"></img></p>
                    <p className="p-about-2">With BadBank.com and the BadBank Mobile app. Use your smartphone, tablet or computer to bank on the go.</p>
                </div>
                <div className="col">
                    <p className="p-about-3">Credit Cards</p>
                    <p className="p-about-3"><img className="img-about" src="../images/card.png"></img></p>
                    <p className="p-about-3">With BadBank credit and debit cards. Buy what you need with the ease and security of our cards.</p>
                </div>
            </div>
        </div>
    </div>
  );
}