import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewByReviewId } from "../api";

export default function SingleReview() {
  let { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  const [reviewData, setReviewData] = useState({});
  useEffect(() => {
    getReviewByReviewId(review_id).then((data) => {
      setReviewData(data);
      setIsLoading(false);
    });
  }, [review_id]);
  return isLoading ? (
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
    </div>
  );
}
