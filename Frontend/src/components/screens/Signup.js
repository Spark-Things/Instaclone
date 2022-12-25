import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";
import M from "materialize-css";
import user from "../../user.png";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState();
  const [image, setImage] = useState(url);

  const uploadPic = () => {
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
        // console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    uploadPic();
  }, [image]);

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid email", classes: "#c62828 red daeken-3" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: image,
        username: Username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red daeken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          // localStorage.setItem("user",JSON.stringify(data.Username));
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
//   console.log(image);
//   const PostData = () => {
//     if (image) {
//       uploadPic();
//     } else {
//       uploadFields();
//     }
//   };

  return (
    <div>
      <div className="My-container">
        <div className="Logincard">
          <span className="brand-logo">Instagram</span>
          <div style={{ textAlign: "center" }}>
            <img className="profilePic" src={url ? url : user} alt="dp" />
            <br />
            <input
              type="file"
              class="custom-file-input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              id="inputTxt"
              type="text"
              placeholder="ItsSpark69"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Full Name</label>
            <input
              id="inputTxt"
              type="text"
              placeholder="Tony Strak"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              id="inputTxt"
              type="text"
              placeholder="Spark3000@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              id="inputTxt"
              type="password"
              placeholder="Spark@3000"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="LoginBtn" onClick={() => uploadFields()}>
            SignUp
          </button>
          <br />
          <br />
          <span style={{ color: "grey", fontSize: "15px" }}>
            Already have an account ? 
            <Link to="/signin">
              <span style={{ color: "blue", textDecoration: "underline" }}>
                  Sign in
              </span>
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
