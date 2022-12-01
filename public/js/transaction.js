'use strict';

function Transaction () {

  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [balance, setBalance] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState();
  const [user, setUser] = React.useState();
  
  const [userEmail, setUserEmail] = React.useState(window.localStorage.getItem("email"));
  const [token, setToken] = React.useState(window.localStorage.getItem("token"));

  React.useEffect(() => {
    const url = `/api/accounts/users/finduser/${userEmail}`
    fetch(url)
      .then((response) => response.json())
      .then((user) => {
        setBalance(user.balance);
      })
  },[balance]);

  function validate (error) {
    
    setStatus(error);
    setTimeout(() => setStatus(''), 4000);
    
  };

  function handleFetch (amount) {
    const url = `/api/accounts/users/transactions`;
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
          .then( async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const user = isJson ? await response.json() : null;

            if (!response.ok) {
              const error = (user && user.message) || response.status;
              return Promise.reject(error);
          }
            setBalance(user.balance);
            validate(`${type} successful ${FormatCurrency(Number(amount))}`);
          })
          .catch(error => {
            error == 401 ? validate('Incorrect email address or password') :  error == 403 ? validate('Invalid Token, Please login again') : validate('User not found');
            console.log('error : ', error);
          });
  };

  function handleTransaction (e) {

    e.preventDefault();

    if (amount == 0) {
      validate(`Cannot ${type} $0 amount`);
      setAmount('');
      return;
    } else if (amount < 0) {
        validate(`Cannot ${type} less than $0`);
        setAmount('');
        return;
    } else if (!/[0-9]/.test(amount)) {
        validate(`${type} should be positive numbers only`);
        setAmount('');
        return;
    } else if (type == "Withdraw") {
      handleFetch(-amount);
    } else {
        handleFetch(amount);
    }

    // clears the amount input field
    setAmount('');
  };

  // validation
  function handleChange (e) {
    
    e.preventDefault();

    if (!/[0-9]/.test(e.currentTarget.value)) {
      validate('Please enter numbers only');
    } else if (/[A-Za-z_%+-]/.test(e.currentTarget.value)) {
      validate('Please enter number only');
    }
    else if (e.currentTarget.value > balance && type == "Withdraw") {
      validate('Transaction failed, Not enought balance');
      setAmount('');
    }
    else {
      setAmount(e.currentTarget.value);
    }
    
  };

  return (
    <form>
    <br/>
      <Card
        bgcolor=""
        txtcolor="white"
        bgCostumColor="DarkCyan"
        header="Account Transaction"
        width="40rem"
        height="38rem"
        fontSize="25px"
        statusfontsize="20px"
        statustextalign="center"
        statuscolor="white"
        status={status}
        body={
              <>
                <label className="form-label balance">Balance <button className="btn btn-light" disabled={true}>{FormatCurrency(balance)}</button></label><br/>
                <label htmlFor="deposit" className="form-label">Transaction Type</label>
                <select className="form-select" onChange={e => setType(e.target.value)}>
                  <option value="Transaction" defaultValue>Transaction...</option>
                  <option value="Deposit">Deposit</option>
                  <option value="Withdraw">Withdraw</option>
                </select><br/>
                  <input type="text" className="form-control" id="deposit" placeholder="Amount" value={amount} onChange={handleChange}></input>
                <br/>
                <div className="card-link text-center"><button type="submit" className="btn btn-light" disabled={(type == "Transaction" || !amount) ? true : false} onClick={handleTransaction}>{type == "Deposit" ? "Click to Deposit" : type == "Withdraw" ? "Click to Withdraw" : type == "Transfer" ? "Click To Transfer" : "Click to proceed"}</button></div>
              </>
              }
      />
    </form>
  );
}