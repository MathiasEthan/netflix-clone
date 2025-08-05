'use client';

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

interface Film {
  id: string;
  title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
}

interface FilmListProps {
  films: Film[];
}

const FIREBASE_DB_URL = "https://cloneflix-dbb4a-default-rtdb.firebaseio.com";

export default function FavouritesList({ films }: FilmListProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const getFavorites = async () => {
    const response = await fetch(`${FIREBASE_DB_URL}/favorites.json`);
    const data = await response.json();
    setFavorites(data || {});
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const handleFavoriteToggle = async (filmId: string) => {
    const isFavorite = !!favorites[filmId];
    const endpoint = `${FIREBASE_DB_URL}/favorites/${filmId}.json`;

    if (isFavorite) {
      await fetch(endpoint, { method: 'DELETE' });
    } else {
      await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(true),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    getFavorites();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {films.filter(film => favorites[film.id]).map((film) => (
        <Card key={film.id}>
          <CardHeader>
            <CardTitle>{film.title}</CardTitle>
            <CardDescription>{film.description}</CardDescription>
            <CardAction>
              <button
                onClick={() => handleFavoriteToggle(film.id)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle Favorite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={favorites[film.id] ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className={favorites[film.id] ? "text-red-500" : "text-gray-500"}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p><strong>Director:</strong> {film.director}</p>
            <p><strong>Producer:</strong> {film.producer}</p>
            <p><strong>Release Date:</strong> {film.release_date}</p>
            <p><strong>Running Time:</strong> {film.running_time} minutes</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}