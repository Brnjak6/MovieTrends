import React from 'react';
import Trending from '../components/Trending'
import TopRated from '../components/TopRated'
import Hottest from '../components/Hottest'
import Footer from '../components/Footer'

function Home() {

  return (
    <div>
      <Trending />
      <TopRated />
      <Hottest />
      <Footer />
    </div>
  )
}


export default Home
