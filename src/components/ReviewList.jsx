import { useEffect, useState } from "react";
import { getReviews } from "../api";

export default function ReviewList() {
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    getReviews().then((data) => {
      setReviewList(data);
    });
  }, []);
  return (
    <ul className="review-container">
      {reviewList.map((review) => {
        return (
          <li className="single-review" key={review.review_id}>
            <h2>{review.title}</h2>
            <h3>{review.owner}</h3>
            <img
              className="review-image"
              src={review.review_img_url}
              alt={review.title}
            ></img>
            <p>Votes: {review.votes}</p>
          </li>
        );
      })}
    </ul>
  );
}
