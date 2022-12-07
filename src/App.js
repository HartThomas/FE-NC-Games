import SingleReview from "./components/SingleReview";
import "./App.css";
import ReviewList from "./components/ReviewList";
import SearchRefinement from "./components/SearchRefinement";
import User from "./components/User";
import { Outlet, Routes, Route } from "react-router-dom";
import ReviewsByCategory from "./components/ReviewsByCategory";

function App() {
  return (
    <section>
      <h1>Game Reviews</h1>
      <User />
      <SearchRefinement />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<ReviewList />} />
          <Route path="reviews" element={<ReviewsByCategory />} />
          <Route path="reviews/:review_id" element={<SingleReview />} />
          {/* <Route
              path=""
              search="?category=:category_name"
              element={<ReviewsByCategory />}
            /> */}
        </Route>
      </Routes>
    </section>
  );
}

export default App;
