import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import {Link,useNavigate} from 'react-router-dom';
import close from "../../icons/close.png";

function Userlist({title}) {
  const [Followinglist, setFollowinglist] = useState();
  const [state, dispatch] = useContext(UserContext);

  const navigate=useNavigate();
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    
    if(title == "Following"){

    fetch(`/profile/${state ? state._id : "error"}/following`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setFollowinglist(result.following);
        console.log(result.following);
      })
      .catch((err) => console.log(err));
    }
    else if(title == "Followers"){
      fetch(`/profile/${state ? state._id : "error"}/following`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setFollowinglist(result.followers);
          console.log(result.followers);
        })
        .catch((err) => console.log(err));
      }
  }, []);

  return (
    <div className="Searchmodal">
      <div className="modalContent">
        <div style={{ borderBottom: "1px solid #cacaca" }}>
                <button className="cancelbtn" onClick={() => navigate('/profile') }>
                  <img src={close} style={{ width: "30px", height: "30px" }} />
                </button>
          <div>
            <span className="modalTitle">{title}</span><br/>
            <span style={{"fontSize":"11px","fontWeight":"550","color":"grey"}}>{
            Followinglist ? Followinglist.length : null} {title}</span>
          </div>
          {/* <form>
          <input
            id="searchbar"
            type="text"
            placeholder="Search .."
            autoFocus
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
        </form> */}
        </div>
        <div className="userDisplayContainer" style={{ padding: "2% 5%" }}>
          {Followinglist ? (
            Followinglist.map((item) => {
              return (
                <>
                 <Link to={item._id !== state._id ? "/profile/"+ item._id : '/profile'}>
                  <div className="userprofileContainer">
                    <img src={item.pic} className="userprofile"></img>
                    <div
                      className="midDtailuser"
                    >
                      <span className="DuserName">{item.username}</span>
                      <span style={{ fontSize: "11px", color: "#cacaca" }}>
                        {item.name}
                      </span>
                    </div>
                    <button className="FollowingBtn">
                      { title == "Following" ? "Following" : "Remove" }   
                      </button>
                  </div>
                  </Link>
                </>
              );
            })
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userlist;
