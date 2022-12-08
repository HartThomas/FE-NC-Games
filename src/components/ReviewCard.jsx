import { NavLink } from "react-router-dom";

export default function ReviewCard(props) {
  const review = props.review;
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
}
