'use strict';

function Home () {

  const ctx = React.useContext(UserContext);

  return (
    <div className="myhome" id="#/">
      <div className="row justify-content-center">
        <div className="col">
          <Card
            bgcolor=""
            txtcolor="primary"
            bgheadercolor="danger"
            headercolor="white"
            header="Checking & Savings"
            title="Open your account today"
            text="Convenient, secure access and rewarding features such as cash back deals."
            width="30rem"
            height="38rem"
            fontSize="25px"
            body={<img src="https://picsum.photos/id/692/500/500/" className="img-fluid img-home" alt="Responsive image"></img>}
          />      
        </div>
        <div className="col">
          <Card
            bgcolor=""
            txtcolor="danger"
            bgheadercolor="primary"
            headercolor="white"
            header="Welcome to BadBank"
            title="Bad Bank Where Your Money Is Safe"
            text="You can trust this Bank"
            width="30rem"
            height="38rem"
            fontSize="25px"
            body={<img src="../images/bmb-3.jpg" className="img-fluid img-home-2" alt="Responsive image"></img>}
          />    
        </div>
      </div>
    </div>
  );
}