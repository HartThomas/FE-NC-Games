import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReviewsByCategory } from "../api";
import ReviewCard from "./ReviewCard";

export default function ReviewsByCategory() {
  const [reviewListByCategory, setReviewListByCategory] = useState([]);
  let [searchParams] = useSearchParams();

  useEffect(() => {
    getReviewsByCategory(searchParams.get("category")).then((data) => {
      setReviewListByCategory(data);
    });
  }, [searchParams]);

  return (
    <ul className="review-container">
      {reviewListByCategory.map((review) => {
        return <ReviewCard review={review} />;
      })}
    </ul>
  );
}
