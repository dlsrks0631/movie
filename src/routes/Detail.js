import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css"; // Detail 스타일 import

function Detail() {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옵니다.
  const [movie, setMovie] = useState(null); // 영화 데이터를 저장할 state
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 state

  const apiKey = "f26e473a740a9c8ca94f2586e8520c9f";

  // getMovie 함수를 useCallback으로 메모이제이션
  const getMovie = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const json = await response.json();
      setMovie(json); // 영화 데이터를 state에 저장
      setLoading(false); // 로딩 상태를 false로 변경
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoading(false); // 에러 발생 시에도 로딩 상태 변경
    }
  }, [id, apiKey]);

  useEffect(() => {
    getMovie();
  }, [getMovie]); // getMovie를 의존성 배열에 추가

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!movie) {
    return <div className={styles.error}>Movie not found.</div>;
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.movieDetails}>
        <img
          className={styles.moviePoster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.movieInfo}>
          <h1 className={styles.movieTitle}>{movie.title}</h1>
          <p className={styles.movieOverview}>{movie.overview}</p>
          <ul className={styles.movieDetailsList}>
            <li>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </li>
            <li>
              <strong>Release Date:</strong> {movie.release_date}
            </li>
            <li>
              <strong>Rating:</strong> {movie.vote_average}
            </li>
            <li>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </li>
            <li>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </li>
            <li>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </li>
            <li>
              <strong>Tagline:</strong>{" "}
              {movie.tagline || "No tagline available"}
            </li>
            <li>
              <strong>Original Language:</strong>{" "}
              {movie.original_language.toUpperCase()}
            </li>
            <li>
              <strong>Production Companies:</strong>{" "}
              {movie.production_companies
                .map((company) => company.name)
                .join(", ")}
            </li>
            <li>
              <strong>Spoken Languages:</strong>{" "}
              {movie.spoken_languages.map((lang) => lang.name).join(", ")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Detail;
