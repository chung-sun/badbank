'use strict';

function AllData () {

  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [data, setData] = React.useState();
  const [text, setText] = React.useState();

  const ctx = React.useContext(UserContext);

  let str;

  React.useEffect(() => {
    // const url = 'http://localhost:3000/api/accounts/users/displayAllAccounts';
    const url = '/api/accounts/users/displayAllAccounts';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(JSON.stringify(data));
        str = data.map((user, i) => (
          <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
        </tr>
        ));
        setText(str);
      });
  },[]);

  return (
    <div>
    <br/>
      <Card
        bgcolor=""
        txtcolor="white"
        bgCostumColor="CornflowerBlue"
        header="All Account Data"
        width="80%"
        height="38rem"
        fontSize="25px"
        status={status}
        body={        
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Emil</th>
                  <th scope="col">Password</th>
                </tr>
              </thead>
              <tbody>
                {text}
              </tbody>
            </table>
          }
      />
      </div>
  );

};