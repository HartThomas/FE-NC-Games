import "./App.css";
import ReviewList from "./components/ReviewList";
import SearchRefinement from "./components/SearchRefinement";
import User from "./components/User";

function App() {
  return (
    <body>
      <h1>Game Reviews</h1>
      <User />
      <SearchRefinement />
      <ReviewList />
    </body>
  );
}

export default App;
