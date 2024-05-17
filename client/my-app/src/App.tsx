import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Recommend from "./pages/recommend";
import Guess from "./pages/Guess";
function App() {
  return (
    <div>
        <Navbar/> 
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/about"} element={<About/>}/>
          <Route path={"/recommend"} element={<Recommend/>}/>
          <Route path={"/guess"} element={<Guess/>}/>
        </Routes>
    </div>
  );
}

export default App;
