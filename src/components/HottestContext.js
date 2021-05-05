import React, { useState, createContext } from 'react';

export const HottestContext = createContext();

export const HottestStatus = (props) => {
    const [video, setVideo] = useState(null)
    const [reviews, setReviews] = useState(null)

    return (
        <HottestContext.Provider value={{ video: [video, setVideo], reviews: [reviews, setReviews] }}>
            {props.children}
        </HottestContext.Provider>
    )
}