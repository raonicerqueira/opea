import { ChangeEvent } from "react";

import "../styles/components/searchbar.scss";
import IconSearch from "../img/icon-search.svg";
import useSearchStore from "../stores/useSearchStore";

export default function SearchBar() {
  const { search, setSearch } = useSearchStore();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div id="search-bar-container">
      <div id="search-bar">
        <input
          onChange={handleSearchChange}
          type="text"
          placeholder="Buscar empresa..."
          value={search}
        />
        <img src={IconSearch} alt="Ícone de busca" />
      </div>
    </div>
  );
}
