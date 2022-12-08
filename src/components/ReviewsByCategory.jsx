import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./ReviewCard";

export default function ReviewsByCategory() {
  const [reviewListByCategory, setReviewListByCategory] = useState([]);
  let [searchParams] = useSearchParams();
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);

  useEffect(() => {
    getReviews(searchParams.get("category")).then((data) => {
      setReviewListByCategory(data);
      setIsReviewsLoading(false);
    });
  }, [searchParams]);

  return isReviewsLoading ? (
    <p>Loading ...</p>
  ) : (
    <ul className="review-container">
      {reviewListByCategory.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </ul>
  );
}
