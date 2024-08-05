import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center mb-5 text-xl font-bold uppercase">Navigate to</h1>
        <div className="flex justify-center items-center gap-10">
          <Link to="/signup"><button className="bg-red-600 px-4 py-1 text-white rounded-full">Signup page</button></Link>
          <Link to="/login"><button className="bg-blue-600 px-4 py-1 text-white rounded-full">Login page</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home
