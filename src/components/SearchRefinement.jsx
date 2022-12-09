import Dropdown from "react-dropdown";

export default function SearchRefinement(props) {
  const options = ["Date", "Comment count", "Votes"];

  const handleOnChange = (e) => {
    props.setSortBy(e.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (props.order === "desc") {
      props.setOrder("asc");
    } else {
      props.setOrder("desc");
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
    </>
  );
}
