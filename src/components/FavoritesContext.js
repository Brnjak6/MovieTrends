import React, { useState, createContext, useEffect } from 'react';
import useLocalStorage from './useLocalStorage'

export const FavoritesContext = createContext();

export const FavoriteList = (props) => {
    const [favorites, setFavorites] = useLocalStorage("favorites", []);



    return (
        <FavoritesContext.Provider value={[favorites, setFavorites]}>
            {props.children}
        </FavoritesContext.Provider>
    )
}