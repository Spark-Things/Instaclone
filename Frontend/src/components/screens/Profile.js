import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import { UserContext } from "../../App";
import settingImage from "../../icons/setting.png";
import likes from "../../icons/heart.png";
import comments from "../../icons/cmnt.png";
import PostDetail from "../models/PostDetail";
import close from "../../icons/close.png";
import { Link } from "react-router-dom";

//not getting data from backend
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [image, setImage] = useState("");
  const [postId, setpostId] = useState();
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.mypost);
        setPics(result.mypost);
        // console.log("my pics"+mypics);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "renishcloud");
      fetch("https://api.cloudinary.com/v1_1/renishclould/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              window.location.reload();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <>
      {Open ? (
        <div>
          <PostDetail postId={postId} />
          <button className="cancelbtn" onClick={() => setOpen(false)}>
            <img src={close} style={{ width: "30px", height: "30px" }} />
          </button>
        </div>
      ) : (
        <>
          {mypics ? (
            <div className="mainDiv">
              <div
                className="profilePage"
                style={{ fontFamily: "Signika Negative" }}
              >
                <div style={{ width: "max-content", margin: "0" }}>
                  <img
                    className="ProfilePic"
                    src={state ? state.pic : "loading"}
                  />
                </div>
                <div className="ContentContainer">
                  <div
                    style={{
                      width: "100%",
                      //   "backgroundColor":"green",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "20px",
                        minWidth: "47%",
                      }}
                    >
                      {state ? state.username : "Loading.."}
                      {/* <img src={verified} style={{"width":"20px","height":"20px","marginLeft":"5px"}}/> */}
                    </span>
                    <Link to="/profile/edit">
                      <button className="EditProfileBtn">Edit Profile</button>
                    </Link>
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "transparent",
                        border: "0",
                      }}
                      onClick={() => alert("tapa tatti")}
                    >
                      <img
                        src={settingImage}
                        style={{ width: "20px", height: "20px" }}
                      ></img>
                    </button>
                  </div>
                  <span style={{ fontSize: "12px" }}>
                    {state ? state.name : "Loading.."}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "10px",
                      paddingLeft: "0px",
                      width: "100%",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          width: "max-content",
                          fontWeight: "550",
                          cursor: "pointer",
                          marginRight: "10%",
                        }}
                      >
                        {" "}
                        <span style={{ fontWeight: "650" }}>
                          {mypics.length}
                        </span>
                      </span>
                      <span style={{ fontSize: "14px" }}>posts</span>
                    </div>
                    <Link to="/profile/followers">
                      <div>
                        <span
                          style={{
                            width: "max-content",
                            fontWeight: "550",
                            cursor: "pointer",
                            marginRight: "10%",
                          }}
                        >
                          <span style={{ fontWeight: "650" }}>
                            {state ? state.followers.length : "0"}
                          </span>
                        </span>
                        <span style={{ fontSize: "14px" }}>follower</span>
                      </div>
                    </Link>
                    <Link to="/profile/following">
                      <div>
                        <span
                          style={{
                            width: "max-content",
                            fontWeight: "550",
                            cursor: "pointer",
                            marginRight: "10%",
                          }}
                        >
                          <span style={{ fontWeight: "650" }}>
                            {state ? state.following.length : "0"}
                          </span>
                        </span>
                        <span style={{ fontSize: "14px" }}>following</span>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <p>bio will be displayed here</p>
                  </div>
                </div>
              </div>

              <div
                className="file-field input-field"
                style={{ margin: "10px" }}
              >
                <div className="btn #64b5f6 blue darken-1">
                  <span>Update pic</span>
                  <input
                    type="file"
                    onChange={(e) => updatePhoto(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>

              <div className="Gallary">
                {mypics
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return (
                      <div
                        className="item"
                        onClick={() => {
                          setpostId(item._id);
                          setOpen(true);
                        }}
                      >
                        <div
                          className="itemDetailContainer"
                          style={{ display: "flex" }}
                        >
                          <img
                            src={likes}
                            style={{
                              width: "22px",
                              height: "22px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                          />
                          <span
                            className="LikesCount"
                            style={{ cursor: "pointer" }}
                          >
                            <b>{item.likes.length}</b>
                          </span>
                          <img
                            src={comments}
                            style={{
                              width: "18px",
                              height: "18px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                          />
                          <span
                            className="CommentsCount"
                            style={{ cursor: "pointer" }}
                          >
                            <b>{item.comments.length}</b>
                          </span>
                        </div>
                        <img key={item._id} src={item.photo} alt={item.title} />
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </>
      )}
    </>
  );
};
export default Profile;
