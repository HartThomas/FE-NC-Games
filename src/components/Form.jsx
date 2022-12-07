import { useState, useEffect } from "react";
import { getUsers, postComment } from "../api";

export default function Form(props) {
  const [userList, setUserList] = useState("");

  useEffect(() => {
    getUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[1].value === "") {
      alert("Please put something in the 'Your text here:' box.");
    } else if (
      userList
        .map((user) => {
          return user.username;
        })
        .includes(e.target[0].value)
    ) {
      postComment(props.review_id, e.target[0].value, e.target[1].value).then(
        () => {
          props.setSeed();
        }
      );
    } else {
      alert(
        "Hmm... that username does not match our files. Please try another one."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="username-input">
        Username:
        <input type="text" name="username" />
      </label>
      <label className="comment-input">
        Your text here:
        <input type="text" name="comment" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
