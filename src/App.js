import SingleReview from "./components/SingleReview";
import "./App.css";
import ReviewList from "./components/ReviewList";
import SearchRefinement from "./components/SearchRefinement";
import User from "./components/User";
import { Outlet, Routes, Route } from "react-router-dom";

function App() {
  return (
    <section>
      <h1>Game Reviews</h1>
      <User />
      <SearchRefinement />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<ReviewList />} />
          <Route path="reviews" element={<SingleReview />}>
            <Route path=":review_id" element={<SingleReview />} />
          </Route>
        </Route>
      </Routes>
    </section>
  );
}

export default App;
