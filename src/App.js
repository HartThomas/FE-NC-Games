import SingleReview from "./components/SingleReview";
import "./App.css";
import ReviewList from "./components/ReviewList";
import SearchRefinement from "./components/SearchRefinement";
import User from "./components/User";
import { Outlet, Routes, Route } from "react-router-dom";
import ReviewsByCategory from "./components/ReviewsByCategory";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [sortBy, setSortBy] = useState("Date");
  const [order, setOrder] = useState("desc");
  return (
    <section>
      <h1>Game Reviews</h1>
      <User user={user} setUser={setUser} className="user-info" />
      <SearchRefinement
        setSortBy={setSortBy}
        setOrder={setOrder}
        order={order}
      />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<ReviewList setSortBy={setSortBy} />} />
          <Route
            path="reviews"
            element={<ReviewsByCategory sortBy={sortBy} order={order} />}
          />
          <Route
            path="reviews/:review_id"
            element={<SingleReview user={user} />}
          />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
