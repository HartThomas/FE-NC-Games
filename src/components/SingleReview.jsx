import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByReviewId, getReviewByReviewId } from "../api";

export default function SingleReview() {
  let { review_id } = useParams();
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentData, setCommentData] = useState([]);

  const [reviewData, setReviewData] = useState({});
  useEffect(() => {
    getReviewByReviewId(review_id).then((data) => {
      setReviewData(data);
      setIsReviewLoading(false);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setCommentData(data);
      setIsCommentsLoading(false);
    });
  }, [review_id]);

  return isReviewLoading && isCommentsLoading ? (
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
        <p>Votes: {reviewData.votes}</p>
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
    </div>
  );
}
