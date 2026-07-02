import { Navigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import { usuarioAutenticado } from '../services/authService';

export function ProtectedRoute({ children }){
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function check () {
            const auth = await usuarioAutenticado();
            setIsAuth(auth);
            setLoading(false);
        }
        check();
    },[])
    if (loading) return <div>Carregando...</div>;

    return isAuth ? children : <Navigate to="/login"/>
}