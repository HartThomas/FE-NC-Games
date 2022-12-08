import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentsByReviewId,
  getReviewByReviewId,
  patchVotesByReviewId,
} from "../api";
import Form from "./Form";

export default function SingleReview(props) {
  let { review_id } = useParams();
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [reviewVote, setReviewVote] = useState(0);
  const [seed, setSeed] = useState(1);
  useEffect(() => {
    getReviewByReviewId(review_id).then((data) => {
      setReviewData(data);
      setReviewVote(data.votes);
      setIsReviewLoading(false);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setCommentData(data);
      setIsCommentsLoading(false);
    });
  }, [review_id, seed]);

  return isReviewLoading || isCommentsLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="single-review">
      <div className="review-text">
        <h3>{reviewData.title}</h3>
        <img
          src={reviewData.review_img_url}
          alt={reviewData.title}
          className="review-image"
        />
        <p>{reviewData.username}</p>
        <p>{reviewData.review_body}</p>
        <p>Votes: {reviewVote}</p>
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
      <ul className="review-comments">
        <h3>Comments</h3>
        {commentData === undefined ? (
          <h4>There are no comments yet... Be the first!</h4>
        ) : (
          commentData.map((comment) => {
            return (
              <li className="comment-list" key={comment.comment_id}>
                <p>Posted by: {comment.author}</p>
                <p>{comment.body}</p>
                <p>Posted at: {Date(comment.created_at)}</p>
                <p>Votes: {comment.votes}</p>
              </li>
            );
          })
        )}
      </ul>
      <Form review_id={review_id} setSeed={setSeed} user={props.user} />
    </div>
  );
}
