import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center gap-5 m-5">
        <div className="text-[40px] font-bold text-[#535353]">
          12주차
        </div>

        <Link
          to="/books"
          className="flex h-[100px] w-[300px] items-center justify-center rounded-[20px] bg-[#b8edfb] text-[25px] font-medium text-[#4a4a4a] no-underline shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          Books
        </Link>

        <Link
          to="/quiz"
          className="flex h-[100px] w-[300px] items-center justify-center rounded-[20px] bg-[#b8edfb] text-[25px] font-medium text-[#4a4a4a] no-underline shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          Quiz
        </Link>
      </div>
    </div>
  )
}

export default Home