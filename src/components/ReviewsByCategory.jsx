import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import CategoryNotFound from "./CategoryNotFound";
import ReviewCard from "./ReviewCard";

export default function ReviewsByCategory(props) {
  const [reviewListByCategory, setReviewListByCategory] = useState([]);
  let [searchParams] = useSearchParams();
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [categoryExist, setCategoryExist] = useState(true);

  useEffect(() => {
    setIsReviewsLoading(true);
    getReviews(searchParams.get("category"), props.sortBy, props.order)
      .then((data) => {
        setReviewListByCategory(data);
        setIsReviewsLoading(false);
      })
      .catch((err) => {
        if (err.response.data.msg === "Invalid query") {
          setCategoryExist(false);
          setIsReviewsLoading(false);
        }
      });
  }, [searchParams, props.sortBy, props.order]);

  return isReviewsLoading ? (
    <p>Loading ...</p>
  ) : categoryExist ? (
    <div className="review-list-container">
      <ul className="review-container">
        {reviewListByCategory.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })}
      </ul>
      <NavLink to="/" className="home-link">
        Home
      </NavLink>
    </div>
  ) : (
    <CategoryNotFound />
  );
}
