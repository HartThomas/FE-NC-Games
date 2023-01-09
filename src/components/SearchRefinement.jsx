import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getCategories } from "../api";

export default function SearchRefinement(props) {
  const options = ["Date", "Comment count", "Votes"];
  const navigate = useNavigate();
  const categoryList = props.categoryList;
  const setCategoryList = props.setCategoryList;

  useEffect(() => {
    getCategories().then((data) => {
      setCategoryList(data);
    });
  }, [setCategoryList]);

  const handleOnChange = (e) => {
    props.setSortBy(e.target.value);
    navigate("/reviews");
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (props.order === "desc") {
      props.setOrder("asc");
      navigate("/reviews");
    } else {
      props.setOrder("desc");
      navigate("/reviews");
    }
  };

  return (
    <div className="search-refinement">
      <form>
        <label>
          Sort by:
          <select name="sort-by" onChange={handleOnChange}>
            <option value={options[0]}>{options[0]}</option>
            <option value={options[1]}>{options[1]}</option>
            <option value={options[2]}>{options[2]}</option>
          </select>
        </label>
        <label>
          {props.order === "desc" ? (
            <button onClick={handleClick}>Descending</button>
          ) : (
            <button onClick={handleClick}>Ascending</button>
          )}
        </label>
      </form>
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
    </div>
  );
}
