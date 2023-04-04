const SearchBox = (props) => {
  return (
    // it will give 4/12 space
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.searchValue}
        onChange={(event) => {
          props.setSearchValue(event.target.value);
        }}
        placeholder="Type to search"
      ></input>
    </div>
  );
};

export default SearchBox;
