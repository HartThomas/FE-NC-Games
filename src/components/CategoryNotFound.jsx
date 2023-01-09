import { Link } from "react-router-dom";

export default function CategoryNotFound() {
  return (
    <div>
      <h2>That category doesn't seem to exist</h2>
      <p>Please enjoy a visit to the Homepage</p>
      <Link to="/">Home</Link>
    </div>
  );
}
