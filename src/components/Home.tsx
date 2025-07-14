import React from 'react'
import Dropdown from './Dropdown'
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <div className='w-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]'>
      <Dropdown/>
      <Dashboard/>
    </div>
  )
}

export default Home
