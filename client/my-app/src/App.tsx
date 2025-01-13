import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Echo from "./pages/Echo";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoute";
function App() {
  return (
    <div>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/echo"} element={
            <PrivateRoutes>
              <Echo/>
            </PrivateRoutes>
          }/>
          <Route path={"/register"} element={<RegisterPage/>}/>
          <Route path={"/login"} element={<LoginPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
