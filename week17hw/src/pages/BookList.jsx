import axios from 'axios';
import {React, useEffect, useState} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    const goHome = () => {
      navigate("/")
    }

    useEffect(() => {
      const fetchBooks = async () => {
        const response = await axios.get("/databases/books.json");
        setBooks(response.data);
      }
      fetchBooks();
    }, []) //의존성 배열 (필수)

  return (
    <div className="flex h-[80vh] w-full items-center justify-start gap-5 m-5">
      <div className="flex h-[80%] flex-col justify-start rounded-r-[10px] bg-white p-[50px] shadow-[2px_2px_5px_rgba(0,0,0,0.1)]">
        <div
          onClick={goHome}
          className="text-[40px] font-bold text-[#535353]"
        >
          집
        </div>

        <div className="text-[40px] font-bold text-[#535353]">
          Book List
        </div>

        <ul>
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <li>{book.title}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="mt-[100px] flex h-full flex-col items-center justify-start rounded-r-[10px] p-[50px]">
        <Outlet />
      </div>
    </div>
  )
}

export default BookList