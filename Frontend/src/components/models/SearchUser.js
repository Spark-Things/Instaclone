import React,{useState,useContext,useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import close from "../../icons/close.png";



function SearchUser() {
  const [search, setSearch] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [state, dispatch] = useContext(UserContext);

  const navigate=useNavigate();

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setUserDetails(results);
      });
  };

  useEffect(() => {
    getAllusers();
  }, [])
  

  const getAllusers = () => {
    fetch("/allUsers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        //   console.log(results);
        setUserDetails(results);
      });
  };

  return (
    <div className="Searchmodal">
    <div className="modalContent">
      <div style={{ borderBottom: "1px solid #cacaca" }}>
      <Link to={"/"}>
                <button className="cancelbtn" onClick={() => navigate("/") }>
                  <img src={close} style={{ width: "30px", height: "30px" }} />
                </button>
      </Link>
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
        {userDetails.slice(0).reverse().map((item) => {
          return (
         
           <Link to={item._id !== state._id ? "/profile/"+ item._id : '/profile'}
            
            // onClick={() => setIsopen(false)}
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
  </div>
  )
}

export default SearchUser