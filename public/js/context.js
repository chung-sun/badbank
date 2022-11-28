'use strict';

const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const Redirect = ReactRouterDOM.Redirect;

document.addEventListener("DOMContentLoaded", function(){
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function(element){
      return new bootstrap.Tooltip(element, {
        boundary: document.body
      });
  });
});

let isLoggedIn = false;

const RoleTypeContext = React.createContext("");
const UserContext = React.createContext("");

function Card (props) {

  function classes () {

    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-black';

    return 'card mb-3 mx-auto' + bg + txt;
  }

  function classHeader () {

    const bgheadercolor = props.bgheadercolor ? ' bg-' + props.bgheadercolor : ' ' ;

    return 'card-header ' + bgheadercolor;
  }

  const myStyles = {
    maxWidth: props.width,
    height: props.height,
    backgroundColor: `${!props.bgcolor ? props.bgCostumColor : "primary"}`,
  };

  const myStylesHeader = {
    fontSize: props.fontSize,
    color: props.headercolor,
  }

  const myStyleStatus = {
    fontSize: props.statusfontsize,
    textAlign: props.statustextalign,
    color: props.statuscolor,
  }

  //console.log('fomr context : ', JSON.stringify(props.transactionHistory));
  return (
    <div className={classes()} style={myStyles}>
      {props.image && <img src={props.image} className="card-img-top ml-auto" alt="login" style={{width: "100px", height: "100px"}}></img>}
      <div className={classHeader()} style={myStylesHeader}>{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        <br/>
        {props.status && (<div className="blink_me" style={myStyleStatus} id="createStatus">{props.status}</div>)}
        {props.transactionHistory && (<div>{props.transactionHistory.deposit}</div>)}
      </div>
    </div>
  );
}