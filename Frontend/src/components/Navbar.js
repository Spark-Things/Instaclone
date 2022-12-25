import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App"; 
import tab from "../icons/tab.png";
import user from "../icons/user.png";
import fav from "../icons/fav.png";
import home from "../icons/hut.png";
import search from "../icons/serch.png"
import M from "materialize-css";
import close from "../icons/close.png";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const getUserID = JSON.parse(localStorage.getItem("user"));
  // const searchModal = useRef(null);
  const [state, dispatch] = useContext(UserContext);
  const [isOpen, setIsopen] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   M.Modal.init(searchModal.current);
  // }, []);

  const renderList = () => {
    if (state) {
      return [
        <>
          <div className="right_Nav2">
            <li key="1">
              <Link to="/">
                <img src={home} className="icons" />
              </Link>
            </li>
            <Link to={"/search"}>
            <li key="2">
            <img src={search} className="icons" />
            </li>
            </Link>
            <li key="3">
              <Link to="/create">
                <img src={tab} className="icons" />
              </Link>
            </li>
            <li key="4">
              <Link to="/myfollowingpost">
                <img src={fav} className="icons" />
              </Link>
            </li>
            <li key="5">
              <Link to="/profile">
                {" "}
                {getUserID.pic ? (
                  <img
                    src={getUserID.pic}
                    className="icons"
                    style={{
                      borderRadius: "25px",
                    }}
                  />
                ) : (
                  <img src={user} className="icons"
                  style={{
                    borderRadius: "25px",
                  }} />
                )}
              </Link>
            </li>
          </div>
        </>,
      ];
    }
  };
  return (
     <>
      {/* { isOpen ? */}
      {/* <div className="Searchmodal">
          <div className="modalContent">
            <div style={{ borderBottom: "1px solid #cacaca" }}>
              <div>
                <h5 style={{ margin: "0px", fontWeight: "500" }}>Search</h5>
              </div>
             
              <form>
                <input
                  id="searchbar"
                  type="text"
                  placeholder="Search .."
                  autoFocus
                  value={search}
                  onChange={(e) => fetchUsers(e.target.value)}
                />
              </form>
            </div>
            <div className="userDisplayContainer">
              {userDetails.map((item) => {
                return (
               
                 <Link to={item._id !== state._id ? "/profile/"+ item._id : '/profile'}
                  
                  onClick={() => setIsopen(false)}
                 >
                  <div className="userContainer">
                    <img
                      src={item.pic}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <span className="userNames">{item.name}</span>
                  </div>
                  </Link>    
                );
              })}
            </div>
          </div>
        </div>  */}
       <Sidebar />
     
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brandLogo">
            Instagram
          </Link>
          <button
            className="logOutbtn2"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin");
            }}
          >
            logout
          </button>
        </div>
        <div className="right_Nav2">
            <a key="1">
              <Link to="/">
                <img src={home} className="icons" />
              </Link>
            </a>
            <Link to={"/search"}>
            <a key="2">
            <img src={search} className="icons" />
            </a>
            </Link>
            <a key="3">
              <Link to="/create">
                <img src={tab} className="icons" />
              </Link>
            </a>
            <a key="4">
              <Link to="/myfollowingpost">
                <img src={fav} className="icons" />
              </Link>
            </a>
            <a key="5">
              <Link to="/profile">
                {" "}
                {getUserID ? <>
                {getUserID.pic ? (
                  <img
                    src={getUserID.pic}
                    className="icons"
                    style={{
                      borderRadius: "25px",
                    }}
                  />
                ) : (
                  <img src={user} className="icons"
                  style={{
                    borderRadius: "25px",
                  }} />
                )} </> : "0"}
              </Link>
            </a>
          </div>
      {/* } */}
    </>
  );
};

export default Navbar;
