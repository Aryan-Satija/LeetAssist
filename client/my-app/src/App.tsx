import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recommend from "./pages/recommend";
import Rating from "./pages/Rating";
import Contact from "./pages/Contact";
import Tags from "./pages/Tag";
function App() {
  return (
    <div>
        <Navbar/> 
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/about"} element={<About/>}/>
          <Route path={"/recommend"} element={<Recommend/>}/>
          <Route path={"/rating"} element={<Rating/>}/>
          <Route path={"/contact-us"} element={<Contact/>}/>
          <Route path={"/tags"} element={<Tags/>}/>
        </Routes>
    </div>
  );
}

export default App;
