import React from 'react'
import FavouritesList from '../api/films/FavouritesList';
import { getAllFilms } from '../api/films/filmCall';
async function Favourites() {
  const films = await getAllFilms()
  return (
    <FavouritesList films={films}/>
);
}

export default Favourites