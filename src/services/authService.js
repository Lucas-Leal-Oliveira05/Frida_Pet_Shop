import { supabase } from "./supabase";

export const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    return data;
}

export const cadastrarUsuario = async (email, password, nome, telefone) => {
    const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })
    if (authError) throw authError;

    if (data.user) {
        const { error: dbError } = await supabase
            .from('usuarios')
            .insert([
                {
                    id: data.user.id,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    perfil: 'CLIENTE'
                }
            ]);
        if (dbError) throw dbError;
    }
    return data;
}
