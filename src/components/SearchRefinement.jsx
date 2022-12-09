import { useEffect } from "react";
import Dropdown from "react-dropdown";
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
    props.setSortBy(e.value);
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
    <>
      <form>
        <label>
          Sort by:
          <Dropdown
            options={options}
            value={options[0]}
            onChange={handleOnChange}
            placeholder="Select an option"
          />
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
    </>
  );
}
