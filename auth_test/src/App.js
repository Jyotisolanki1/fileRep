import Register from "./components/Register";
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import {Container} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <ToastContainer />
            <Container >
            <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/register" element={<Register />} />
               <Route  path="/login" element={<Login/>} />
               <Route  path="/profile" element={<Profile/>} />
            </Routes>              
            </Container> 
        </BrowserRouter>
   </div>
  );}
export default App;
