import React, { useState, useEffect,useContext } from "react";
import "./PostDetail.css";
import { UserContext } from "../../App";
import user from "../../icons/user.png";
import like from "../../icons/like.png";
import cmntp from "../../icons/cmt.png";
import more from "../../icons/more.png";
import emoji from "../../icons/emoji.png";
import send from "../../icons/send.png";
import close from "../../icons/close.png";
import { Link } from "react-router-dom";

function PostDetail({ postId }) {
  const [postData, setPostData] = useState([]);
  const [data, setData] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [cmnt, setcmnt] = useState("")
  console.log(postId);
  useEffect(() => {
    fetch(`/allpost/${postId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPostData(result);
      });
  }, [data]);

  const makeComment = (text, postId) => {
    if (text === "" || text === null || text == " ") {
      return;
    }
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((info) => {
          if (info._id == result._id) {
            return result;
          } else {
            return info;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="PostDetailContainer">
        <div className="model">
          <div className="PostContainer">
            <img
              src={postData.photo}
              alt="loading img.."
              className="postImage"
            />
          </div>

          <div className="detailContainer">
            <div className="header">
              {postData.postedBy ? (
                <img
                  src={postData.postedBy.pic}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  alt="dp"
                />
              ) : (
                <span>Loading..</span>
              )}
              {postData.postedBy ? (
                <span className="postAuthor">{postData.postedBy.name}</span>
              ) : (
                <span>Loading..</span>
              )}
              <button className="moreBtn">
                <img src={more} style={{ width: "20px", height: "20px" }}></img>
              </button>
            </div>

            <div className="postbody">
              <div className="captionContainer">
                {postData.postedBy ? (
                  <img
                    src={postData.postedBy.pic}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
                  ></img>
                ) : (
                  <span>Loading..</span>
                )}
                {postData.postedBy ? (
                  <span style={{ margin: "0px 5px" }}>
                    <b>{postData.postedBy.name}</b>
                  </span>
                ) : (
                  <span>Loading..</span>
                )}
                <span>{postData.body}</span>
              </div>
              {postData.postedBy ? (
                <>
                  {postData.comments
                    .slice(0)
                    .reverse()
                    .map((info) => {
                      return (
                        <div className="commentContainer"
                        >
                            <img
                              src={info.postedBy.pic}
                              alt=""
                              style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                              }}
                            ></img>
                        <Link to={
                                info.postedBy._id !== state._id
                                  ? "/profile/" + info.postedBy._id
                                  : "/profile"
                              }
                            >
                            <span
                              style={{ margin: "0px 5px", fontWeight: "600" }}
                            >
                              {info.postedBy.name}
                            </span>
                            <span>{info.text}</span>
                        </Link>
                          </div>
                      );
                    })}{" "}
                </>
              ) : (
                <span>Loading..</span>
              )}
            </div>
            <div className="footer">
              <div
                style={{
                  display: "flex",
                  aligninfos: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={like}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "15px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={cmntp}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "15px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={send}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
                {/* <img src={like} style={{"width":"25px","height":"25px","alignSelf":"flex-end"}}/> */}
              </div>
              <span className='likesCount'>{postData.likes ? postData.likes.length : "0"} likes</span>
              <span style={{ color: "grey", fontSize: "9px" }}>2 days ago</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={emoji}
                style={{
                  width: "30px",
                  height: "30px",
                  padding: "5px",
                  cursor: "pointer",
                  height: "100%",
                }}
                alt="img" />
              <form  className="AddComment" >
                <input type="text" placeholder="add a comment" onChange={(e) => setcmnt(e.target.value)}
                value={cmnt} autoFocus />
                <button onClick={(e)=>{
                  e.preventDefault();
                  makeComment(cmnt,postData._id);
                  setcmnt("");
                }}>Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
