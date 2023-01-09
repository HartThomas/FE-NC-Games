import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  deleteComment,
  getCommentsByReviewId,
  getReviewByReviewId,
  patchVotesByReviewId,
} from "../api";
import Form from "./Form";
import ReviewNotFound from "./ReviewNotFound";

export default function SingleReview(props) {
  let { review_id } = useParams();
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [reviewVote, setReviewVote] = useState(0);
  const [canDelete, setCanDelete] = useState(true);
  const [reviewExist, setReviewExist] = useState(true);

  useEffect(() => {
    getReviewByReviewId(review_id)
      .then((data) => {
        console.log(data);
        setReviewData(data);
        setReviewVote(data.votes);
        setIsReviewLoading(false);
      })
      .catch((err) => {
        if (err.response.data.msg === "Review not found") {
          setReviewExist(false);
          setIsCommentsLoading(false);
          setIsReviewLoading(false);
        }
      });
  }, [review_id]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setCommentData(data);
      setIsCommentsLoading(false);
    });
  }, [review_id, commentData]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (canDelete) {
      setCanDelete(false);
      setCommentData(
        commentData.filter((comment) => {
          return comment.comment_id !== e.target.value;
        })
      );
      deleteComment(e.target.value).then(() => {
        setCanDelete(true);
        alert("Comment deleted. Have a good day!");
      });
    }
  };

  return isReviewLoading || isCommentsLoading ? (
    <p>Loading...</p>
  ) : reviewExist ? (
    <div className="single-review">
      <div className="review-text">
        <h3>{reviewData.title}</h3>
        <img
          src={reviewData.review_img_url}
          alt={reviewData.title}
          className="review-image"
        />
        <p>{reviewData.username}</p>
        <p className="review-body">{reviewData.review_body}</p>
        <p>Votes: {reviewVote}</p>
        <div className="voting-buttons">
          <button
            onClick={() => {
              setReviewVote(reviewVote + 1);
              patchVotesByReviewId(review_id, 1);
            }}
          >
            +1
          </button>
          <button
            onClick={() => {
              setReviewVote(reviewVote - 1);
              patchVotesByReviewId(review_id, -1);
            }}
          >
            -1
          </button>
        </div>
      </div>
      <ul className="review-comments">
        <h3>Comments</h3>
        {commentData === undefined ? (
          <h4>There are no comments yet... Be the first!</h4>
        ) : (
          commentData.map((comment) => {
            return (
              <li className="comment-list" key={comment.comment_id}>
                <p>Posted by: {comment.author}</p>
                <p className="comment-body">{comment.body}</p>
                <p>Posted at: {comment.created_at}</p>
                <p>Votes: {comment.votes}</p>
                {comment.author === props.user ? (
                  <button value={comment.comment_id} onClick={handleDelete}>
                    Delete
                  </button>
                ) : null}
              </li>
            );
          })
        )}
      </ul>
      <Form
        review_id={review_id}
        setCommentData={setCommentData}
        commentData={commentData}
        user={props.user}
      />
      <NavLink to="/" className="home-link">
        Home
      </NavLink>
    </div>
  ) : (
    <ReviewNotFound />
  );
}
