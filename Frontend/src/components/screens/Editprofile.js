import React,{useContext,useState} from 'react'
import { UserContext } from "../../App";
function Editprofile() {

  const [state, dispatch] = useContext(UserContext);
  const [profilePic, setprofilePic] = useState(state.pic);

   console.log(profilePic);
  return (
    <div className='mainDiv'>
      <div className='editprofileContainer'>
        <div className="column1">
             <span className='items'>Edit Profile</span>
             <span className='items'>Change Password</span>
        </div>
        <div className='column2'>
                <div className="imagetagContainer">
                   <img alt='img' src={profilePic} style={{"width":"50px",height:"50px","borderRadius":"50%",objectFit:"cover"}}></img>
                   <div style={{"display":"flex","flexDirection":"column","alignItems":"center","marginLeft":"10px"}}>
                      <span className='uSername'>{state.username}</span>
              <div className="file-field input-field cpp">
                    <span style={{color:"rgb(90, 156, 255)"}}>Change Profile Pic</span>
                    <input  className="#64b5f6 blue darken-1" type="file" onChange={(e) =>{ setprofilePic(e.target.files[0])
                    }}/>
             </div>
                   </div>
                   {/* <input id='editPageInput'/> */}
                 </div>

                <div className="tagContainer">
                   <span className='tags'><b>Name</b></span>
                   <input id='editPageInput' value={state.name} />
                 </div>
                <div className="tagContainer">
                   <span className='tags'><b>Username</b></span>
                   <input id='editPageInput' value={state.username}/>
                 </div>
                <div className="tagContainer">
                   <span className='tags'><b>Website</b></span>
                   <input id='editPageInput'disabled={true} value="website" />
                 </div>
                <div className="tagContainer">
                   <span className='tags'><b>Bio</b></span>
                   <textarea id='editPageTextarea'></textarea>
                 </div>
                 <div className="tagContainer">
                   <span className='tags'><b>Email address</b></span>
                   <input id='editPageInput' value={state.email}/>
                 </div>
                 <div className="tagContainer">
                   <span className='tags'><b>Phone number</b></span>  
                   <input id='editPageInput'/>
                 </div>
                 <div className="tagContainer">
                   <span className='tags'><b>Gender</b></span>
                   <input id='editPageInput'/>
                 </div>

                 <button className='submitBtn'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Editprofile