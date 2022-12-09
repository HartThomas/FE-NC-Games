import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./ReviewCard";

export default function ReviewsByCategory(props) {
  const [reviewListByCategory, setReviewListByCategory] = useState([]);
  let [searchParams] = useSearchParams();
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);

  useEffect(() => {
    setIsReviewsLoading(true);
    getReviews(searchParams.get("category"), props.sortBy, props.order).then(
      (data) => {
        setReviewListByCategory(data);
        setIsReviewsLoading(false);
      }
    );
  }, [searchParams, props.sortBy, props.order]);

  return isReviewsLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <ul className="review-container">
        {reviewListByCategory.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })}
      </ul>
      <NavLink to="/">Home</NavLink>
    </>
  );
}
