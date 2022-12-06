import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { NavLink } from "react-router-dom";

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
          <li className="review" key={review.review_id}>
            <NavLink to={`/reviews/${review.review_id}`}>
              <h2>{review.title}</h2>
            </NavLink>
            <h3>{review.owner}</h3>
            <NavLink to={`/reviews/${review.review_id}`}>
              <img
                className="card-image"
                src={review.review_img_url}
                alt={review.title}
              ></img>
            </NavLink>
            <p>Votes: {review.votes}</p>
          </li>
        );
      })}
    </ul>
  );
}
