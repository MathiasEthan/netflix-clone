import React from "react";
import FilmList from "./FilmList";

interface Film {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

const API_BASE_URL = "https://ghibliapi.vercel.app";

export async function getAllFilms(): Promise<Film[]> {
  const film_endpoint = `${API_BASE_URL}/films`;
  const films_response = await fetch(film_endpoint, { cache: 'no-store' });
  if (!films_response.ok) {
    throw new Error(`Error: ${films_response.status}`);
  }
  return films_response.json();
}

export default async function Films() {
  const films = await getAllFilms();
  return <FilmList films={films} />;
}
