'use strict';

function App () {

  const [roleType, setRoleType] = React.useState("customer");
  const [userName, setUserName] = React.useState("");

  return (
    <div className="container-fluid">
    <HashRouter>
      <RoleTypeContext.Provider value={{ roleType, setRoleType }}>
        <UserContext.Provider value={{ userName, setUserName }}>
          <Navbar/>
          <div className="container mynavbar">
            <Route path="/" exact component={Home} />
            <Route path="/savings/" component={Savings}/>
            <Route path="/checking/" component={Checking} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/createaccount/" component={CreateAccount} />
            <Route path="/transaction/" component={Transaction} />
            <Route path="/login/" component={Login} />
            <Route path="/customersetting/" component={CustomerSetting} />
          </div>
          <Info/>
          <Footer/>
        </UserContext.Provider>
      </RoleTypeContext.Provider>
    </HashRouter>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)