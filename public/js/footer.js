'use strick';

function Footer () {

  return (
    <div className="footer">
      <div className="container myrow">
        <div className="row justify-content-center">
          <div className="col">
            <a href="#/">Home</a>
          </div>
          <div className="col">
            <a href="#/savings/">Savings</a>
          </div>
          <div className="col">
            <a href="#/checking/">Checking</a>
          </div>
          <div className="col">
            <a href="#/aboutus/">About Us</a>
          </div>
        </div>
      </div>
      <span className="span-footer">“Bad Bank,” the logo are trademarks of Bad Bank, N.A.  Bad Bank, N.A. is a wholly-owned subsidiary of Worst Bank Ever Co.</span><br/>
      <span className="span-footer">Investing involves market risk, including possible loss of principal, and there is no guarantee that investment objectives will be achieved</span><br/>
      <span className="span-footer">Annuities are made available through Bad Bank Insurance Agency, Inc., a NON licensed insurance agency, doing business as BB Insurance Agency Services, Inc. in Florida. Certain custody and other services are provided by Bad Bank</span><br/>
      <span className="span-footer">Bank deposit accounts, such as checking and savings, may be subject to approval. Deposit products and related services are offered by Bad Bank, N.A. NON Member FDIC.</span>
      <div className="container myrow">
        <div className="row justify-content-center">
          <div className="col">
            <p className="p-footer">Contact Us</p>
            <p className="p-footer">Email : support@badbank.com</p>
            <p className="p-footer">Tel: +1 123 456 7890</p>
            <p className="p-footer">Tel: +1 888 456 7890</p>
          </div>
          <div className="col">
            <p className="p-footer-1">Social Media</p>
            <p className="p-footer-1"><img className="img-footer" src="../images/facebook.png"></img> Facebook</p>
            <p className="p-footer-1"><img className="img-footer" src="../images/instagram.png"></img> Instagram</p>
            <p className="p-footer-1"><img className="img-footer" src="../images/youtube.png"></img> YouTube</p>
          </div>
          <div className="col">
            <p className="p-footer-2">Our representatives are available:</p>
            <p className="p-footer-2">Mon-Fri: 8 a.m.-9 p.m. ET</p>
            <p className="p-footer-2">Sat: 8 a.m.-8 p.m. ET</p>
            <p className="p-footer-2">Sun: 8 a.m.-5 p.m. ET</p>
          </div>
        </div>
      </div>
      <div>
        <span className="span-footer">🏦Equal Housing Lender</span>
      </div>
      <div>
        <span className="span-footer">© 2022 BAD BANK & Co.</span>
      </div>
    </div>
  );
};