import { Link } from "react-router";
import SearchBar from "../components/searchBar";
import "../styles/header.css";
export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">Metropolitan</h1>
      </Link>
      <SearchBar />
      <nav>
        <ul>
          <li>
            <Link to="/search">
              <h1 className="header__title">Search</h1>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
