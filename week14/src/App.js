import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import Mypage from "./pages/Mypages";
import "./App.css";

function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={
          <PrivateRoute>
            <Mypage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;