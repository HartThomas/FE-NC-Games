import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { NavLink } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewList(props) {
  const [reviewList, setReviewList] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategoryList(data);
        setIsCategoriesLoading(false);
        return getReviews();
      })
      .then((data) => {
        setReviewList(data);
        setIsReviewsLoading(false);
      });
  }, []);

  return isReviewsLoading || isCategoriesLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="frontpage">
      <ul className="category-container">
        {categoryList.map((category) => {
          return (
            <li key={category.slug} className="single-category">
              <NavLink to={`/reviews?category=${category.slug}`}>
                <h2>{category.slug}</h2>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <ul className="review-container">
        {reviewList.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })}
      </ul>
    </div>
  );
}
