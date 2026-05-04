import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home'
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroPet from "./pages/CadastroPet";
import UserPage from "./pages/UserPage";
import EditarPet from "./pages/EditarPet";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rotas Usuarios */}
        <Route path="/login" element={<Login/>}/> 
        <Route path="/CadastroUsuario" element={<CadastroUsuario/>}/>
        <Route path="/UserPage" element={<UserPage/>}/>
        {/* Rotas Pet */}
        <Route path="/editarPet/:id" element={<EditarPet />} />
      </Routes>
    </Router>
  );
}

export default App;