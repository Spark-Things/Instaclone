import React,{useContext} from 'react';
import { UserContext } from "../App"; 
import Logo from '../icons/instagramLogo.png'
import {Link,useNavigate} from 'react-router-dom';

function Sidebar() {
  const [state,dispatch]=useContext(UserContext);  
  const navigate = useNavigate();
  return (
    <div className='Sidebar'>
           <header className='sidebarheader'>
          <Link to={state ? "/" : "/signin"} >
              <img src={Logo} className="InstaLogo"></img>
            <i className='logo-icon uil uil-instagram'></i>
           </Link>
           </header>
           <div className='navDiv' >
            <a className='sbBtn'>
           <Link to="/">
              <span className='sbBTNname'>
              <i class="uil uil-estate"></i>
               <span>Home</span>
               </span>
            </Link>
            </a>
            <a className='sbBtn'>
            <Link to={"/search"}>
              <span className='sbBTNname'>
              <i class="uil uil-search"></i>
              
               <span>search</span>
               </span>
            </Link>
            </a>
            <a className='sbBtn'>
            <Link to="/create">
              <span className='sbBTNname'>
              <i class="uil uil-plus-circle"></i>
              
               <span>Create Post</span>
               </span>
            </Link>
            </a>
            <a className='sbBtn'>
            <Link to="/myfollowingpost">
              <span className='sbBTNname'>
              <i class="uil uil-user-check"></i>
               <span>Following</span>
               </span>
            </Link>
            </a>
            <a className='sbBtn'>
            <Link to="/profile">
              <span className='sbBTNname'>
                {state ?   <img src={state.pic} className="profileImg"></img> : <span>loading </span> }
            
              
               <span>Profile</span>
               </span>
            </Link>
            </a>
            <a className='sbBtn'
             onClick={() => {
               localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin");
            }}>
               <Link>
              <span className='sbBTNname'>
              <i class="uil uil-sign-out-alt"></i>
               <span>logout</span>
               </span>
            </Link>
            </a>
            <a className='sbBtn'>
              <span className='sbBTNname'>
              <i class="uil uil-bars"> </i>
              
               <span>More</span>
               </span>
            </a>
     
           </div>
    </div>
  )
}

export default Sidebar