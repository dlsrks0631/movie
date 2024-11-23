import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import { useState, useEffect } from "react";

function Movie({ id, poster_path, vote_average, onFavoriteToggle }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`favorite-${id}`)) {
      setIsFavorite(true);
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.setItem(`favorite-${id}`, true);
    } else {
      localStorage.removeItem(`favorite-${id}`);
    }
    onFavoriteToggle(id, !isFavorite);
  };

  return (
    <div className={styles.movieLinkWrapper}>
      <Link to={`/movie/${id}`} className={styles.movieLink}>
        <div
          className={styles.movie}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={"https://image.tmdb.org/t/p/w500" + poster_path}
            alt="Movie Poster"
            className={styles.movie__img}
          />
          <div className={styles.movie__overlay}></div>

          {/* 별점이 표시되는 부분 */}
          {isHovered && (
            <div className={styles.ratingOverlay}>
              <i className={"fas fa-star"}></i>
              <span className={styles.ratingText}>{vote_average}</span>
            </div>
          )}

          <i
            className={`${styles.favoriteIcon} ${
              isFavorite ? "fas" : "far"
            } fa-heart`}
            onClick={(e) => {
              e.preventDefault(); // Prevents the link from being triggered when clicking the heart
              toggleFavorite();
            }}
          ></i>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired, // 별점 정보 추가
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default Movie;
