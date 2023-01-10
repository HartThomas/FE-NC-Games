import { useEffect, useState } from "react";
import { getUsers } from "../api";

export default function User(props) {
  const user = props.user;
  const setUser = props.setUser;

  const [userList, setUserList] = useState("");

  useEffect(() => {
    getUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      alert("Please put something in the text box.");
    } else if (
      userList
        .map((user) => {
          return user.username;
        })
        .includes(e.target[0].value)
    ) {
      setUser(e.target[0].value);
      e.target.reset();
    } else {
      alert("That username doesn't match our records.");
    }
  };

  const handleLogout = (e) => {
    setUser(undefined);
  };

  return user ? (
    <div className="user-info">
      <p>Logged in as {user}</p>
      <form onSubmit={handleSubmit} id="login-form">
        <label>
          Username:
          <input type="text"></input>
          <input type="submit" value="Submit" className="submit-button" />
        </label>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div className="user-info">
      <p>Not logged in!</p>
      <form onSubmit={handleSubmit} id="login-form">
        <label>
          Username:
          <input type="text"></input>
          <input type="submit" value="Submit" className="submit-button" />
        </label>
      </form>
    </div>
  );
}
