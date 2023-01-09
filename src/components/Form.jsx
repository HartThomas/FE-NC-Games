import { useState } from "react";
import { postComment } from "../api";

export default function Form(props) {
  const [buttonWorks, setButtonWorks] = useState(true);
  const commentData = props.commentData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      alert("Please fill in the comment box");
    } else {
      if (buttonWorks) {
        if (props.user) {
          setButtonWorks(false);
          postComment(props.review_id, props.user, e.target[0].value)
            .then(() => {
              props.setCommentData([
                ...commentData,
                {
                  author: props.user,
                  body: e.target[0].value,
                  create_at: new Date(),
                  votes: 0,
                },
              ]);
            })
            .then(() => {
              setButtonWorks(true);
            });
        } else {
          alert("You are not logged in. Please login.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label className="comment-input">
        Your text here:
        <textarea rows="4" cols="50" name="comment" />
      </label>
      <input type="submit" value="Submit" className="submit-button" />
    </form>
  );
}
