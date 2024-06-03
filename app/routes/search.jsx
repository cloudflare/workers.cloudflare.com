import SearchComponent from "../components/search"

const Search = () => {
  return (
    <div className="search">
      <Header showInput={false} />
      <SearchComponent />
    </div>
  )
}

export default Search
