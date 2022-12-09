import { useEffect, useState } from "react";
import { getReviews } from "../api";

import ReviewCard from "./ReviewCard";

export default function ReviewList(props) {
  const [reviewList, setReviewList] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);

  useEffect(() => {
    getReviews().then((data) => {
      setReviewList(data);
      setIsReviewsLoading(false);
    });
  }, []);

  return isReviewsLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="frontpage">
      <ul className="review-container">
        {reviewList.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })}
      </ul>
    </div>
  );
}
