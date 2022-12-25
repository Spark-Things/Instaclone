import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import likes from "../../icons/heart.png";
import comments from "../../icons/cmnt.png";
import more from "../../icons/more.png";
import PostDetail from "../models/PostDetail";
import close from "../../icons/close.png";
//not getting data from backend

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(true)
  //   state.following ? !state.following.includes(userid) : true
  // );
  const [postId, setpostId] = useState();
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
        name: userProfile.user.name,
        username: userProfile.user.username,
        pic: userProfile.user.pic,
        followername: state.name,
        followerusername: state.username,
        followerpic: state.pic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
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
          {userProfile ? (
            <div className="mainDiv">
              <div
                className="profilePage"
                style={{ fontFamily: "Signika Negative" }}
              >
                <div>
                  { userProfile ?  <img className="ProfilePic" src={userProfile.user.pic} /> :
                  <span>loading..</span> }
                 
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
                        fontSize: "16px",
                        minWidth: "47%",
                      }}
                    >
                      {userProfile.username
                        ? userProfile.user.username
                        : userProfile.user.name}
                      {/* <img src={verified} style={{"width":"20px","height":"20px","marginLeft":"5px"}}/> */}
                    </span>
                    {showfollow ? (
                      <button className="FUbtn" onClick={() => followUser()}>
                        Follow
                      </button>
                    ) : (
                      <button className="FUbtn" onClick={() => unfollowUser()}>
                        UnFollow
                      </button>
                    )}

                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "transparent",
                        border: "0",
                      }}
                      onClick={() => alert("tapa tatti")}
                    >
                      <img
                        src={more}
                        style={{ width: "20px", height: "20px" }}
                      ></img>
                    </button>
                  </div>
                  <span style={{ fontSize: "14px" }}>
                    {userProfile.name}
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
                          
                          {userProfile.posts ? userProfile.posts.length : "0"}
                        </span>
                      </span>
                      <span style={{ fontSize: "14px" }}>posts</span>
                    </div>
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
                          {userProfile.user.followers ? userProfile.user.followers.length : 0 }
                        </span>
                      </span>
                      <span style={{ fontSize: "14px" }}>follower</span>
                    </div>
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
                          {userProfile.user.following
                            ? userProfile.user.following.length
                            : 0}
                        </span>
                      </span>
                      <span style={{ fontSize: "14px" }}>following</span>
                    </div>
                  </div>
                  <div>
                    <p>bio will be displayed here</p>
                  </div>
                </div>
              </div>

              <div className="Gallary">
                {userProfile.posts
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
                            }}
                          />
                          <span className="LikesCount">
                            <b>{item.likes.length}</b>
                          </span>
                          <img
                            src={comments}
                            style={{
                              width: "18px",
                              height: "18px",
                              marginRight: "5px",
                            }}
                          />
                          <span className="CommentsCount">
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
            <h2>Loading...!</h2>
          )}
        </>
      )}
      ;
    </>
  );
};
export default UserProfile;
