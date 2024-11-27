import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import Header from "../components/Header";
import styles from "./Home.module.css"; // Ensure correct path
import "../index.css"; // Import index.css for theme styles

function Home({
  isLoggedIn,
  onLogout,
  theme,
  language,
  onToggleTheme,
  onToggleLanguage,
  fullName,
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("rating");
  const [genreFilter, setGenreFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(`favorites_${fullName}`);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = "f26e473a740a9c8ca94f2586e8520c9f";

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(`favorites_${fullName}`, JSON.stringify(favorites));
    }
  }, [favorites, isLoggedIn, fullName]);

  const getMovies = async (page = 1) => {
    try {
      const totalPages = 5; // 가져오고 싶은 페이지 수
      const requests = [];

      for (let i = 1; i <= totalPages; i++) {
        requests.push(
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${i}&language=ko-KR`
          ).then((response) => response.json())
        );
      }

      const results = await Promise.all(requests);
      const allMovies = results.flatMap((result) => result.results);
      const startIndex = (page - 1) * 20;
      const endIndex = startIndex + 20;
      setMovies(allMovies.slice(startIndex, endIndex)); // 한 페이지당 20개만 보여줌
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch movies", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFavoriteToggle = (id, isFavorite) => {
    setFavorites((prevFavorites) => {
      if (isFavorite) {
        return [...prevFavorites, id];
      } else {
        return prevFavorites.filter((favoriteId) => favoriteId !== id);
      }
    });
  };

  const getTranslatedText = (text) => {
    const translations = {
      KR: {
        "Sort by": "정렬 기준",
        Rating: "별점",
        Title: "제목",
        Favorites: "선호 영화",
        Genre: "장르",
        All: "전체",
        Action: "액션",
        Adventure: "모험",
        Animation: "애니메이션",
        Comedy: "코미디",
        Crime: "범죄",
        Documentary: "다큐멘터리",
        Drama: "드라마",
        Family: "가족",
        Fantasy: "판타지",
        History: "역사",
        Horror: "호러",
        Music: "음악",
        Mystery: "미스터리",
        Romance: "로맨스",
        "Science Fiction": "SF",
        "TV Movie": "TV 영화",
        Thriller: "스릴러",
        War: "전쟁",
        Western: "서부",
        LOGIN: "로그인",
        "Light Mode": "라이트 모드",
        "Dark Mode": "다크 모드",
        "Search Movies": "영화 검색",
        LOGOUT: "로그아웃",
        Welcome: "환영합니다",
        Page: "페이지",
      },
      EN: {
        "Sort by": "Sort by",
        Rating: "Rating",
        Title: "Title",
        Favorites: "Favorites",
        Genre: "Genre",
        All: "All",
        Action: "Action",
        Adventure: "Adventure",
        Animation: "Animation",
        Comedy: "Comedy",
        Crime: "Crime",
        Documentary: "Documentary",
        Drama: "Drama",
        Family: "Family",
        Fantasy: "Fantasy",
        History: "History",
        Horror: "Horror",
        Music: "Music",
        Mystery: "Mystery",
        Romance: "Romance",
        "Science Fiction": "Science Fiction",
        "TV Movie": "TV Movie",
        Thriller: "Thriller",
        War: "War",
        Western: "Western",
        LOGIN: "LOGIN",
        "Light Mode": "Light Mode",
        "Dark Mode": "Dark Mode",
        "Search Movies": "Search Movies",
        LOGOUT: "LOGOUT",
        Welcome: "Welcome",
        Page: "Page",
      },
    };
    return translations[language][text] || text;
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "rating") {
      return b.vote_average - a.vote_average;
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "favorites") {
      return favorites.includes(b.id) - favorites.includes(a.id);
    }
    return 0;
  });

  const filteredMovies = sortedMovies.filter((movie) => {
    if (sortOption === "favorites" && !favorites.includes(movie.id)) {
      return false;
    }
    if (genreFilter === "all") return true;
    return movie.genre_ids.includes(parseInt(genreFilter));
  });

  const searchedMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page}>
      <Header
        onToggleTheme={onToggleTheme}
        currentTheme={theme}
        onToggleLanguage={onToggleLanguage}
        currentLanguage={language}
        isLoggedIn={isLoggedIn}
        fullName={fullName}
        onLogout={onLogout}
      />
      <div className={styles.controls}>
        <label>
          {getTranslatedText("Sort by")}:
          <select
            value={sortOption}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="rating">{getTranslatedText("Rating")}</option>
            <option value="title">{getTranslatedText("Title")}</option>
            <option value="favorites">{getTranslatedText("Favorites")}</option>
          </select>
        </label>
        <label>
          {getTranslatedText("Genre")}:
          <select
            value={genreFilter}
            onChange={handleGenreChange}
            className={styles.select}
          >
            <option value="all">{getTranslatedText("All")}</option>
            <option value="28">{getTranslatedText("Action")}</option>
            <option value="12">{getTranslatedText("Adventure")}</option>
            <option value="16">{getTranslatedText("Animation")}</option>
            <option value="35">{getTranslatedText("Comedy")}</option>
            <option value="80">{getTranslatedText("Crime")}</option>
            <option value="99">{getTranslatedText("Documentary")}</option>
            <option value="18">{getTranslatedText("Drama")}</option>
            <option value="10751">{getTranslatedText("Family")}</option>
            <option value="14">{getTranslatedText("Fantasy")}</option>
            <option value="36">{getTranslatedText("History")}</option>
            <option value="27">{getTranslatedText("Horror")}</option>
            <option value="10402">{getTranslatedText("Music")}</option>
            <option value="9648">{getTranslatedText("Mystery")}</option>
            <option value="10749">{getTranslatedText("Romance")}</option>
            <option value="878">{getTranslatedText("Science Fiction")}</option>
            <option value="10770">{getTranslatedText("TV Movie")}</option>
            <option value="53">{getTranslatedText("Thriller")}</option>
            <option value="10752">{getTranslatedText("War")}</option>
            <option value="37">{getTranslatedText("Western")}</option>
          </select>
        </label>
        <label>
          {getTranslatedText("Search Movies")}:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </label>
      </div>
      <div className={styles.movies}>
        {searchedMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            vote_average={movie.vote_average}
            poster_path={movie.poster_path}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
