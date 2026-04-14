import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home'
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroPet from "./pages/CadastroPet";
import UserPage from "./pages/UserPage";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/> 
        <Route path="/CadastroUsuario" element={<CadastroUsuario/>}/>
        <Route path="/CadastroPet" element={<CadastroPet/>} />
        <Route path="/UserPage" element={<UserPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;