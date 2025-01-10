import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recommend from "./pages/recommend";
import Rating from "./pages/Rating";
import Contact from "./pages/Contact";
import Tags from "./pages/Tag";
import Echo from "./pages/Echo";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
function App() {
  return (
    <div>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/about"} element={<About/>}/>
          <Route path={"/recommend"} element={<Recommend/>}/>
          <Route path={"/rating"} element={<Rating/>}/>
          <Route path={"/contact-us"} element={<Contact/>}/>
          <Route path={"/tags"} element={<Tags/>}/>
          <Route path={"/echo"} element={<Echo/>}/>
          <Route path={"/register"} element={<RegisterPage/>}/>
          <Route path={"/login"} element={<LoginPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
