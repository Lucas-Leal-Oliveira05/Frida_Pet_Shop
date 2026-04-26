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

export const usuarioAutenticado = async () => {

    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        //teste
        console.log("Usuario do supabase: ", user)

        if (error || !user) {
            return false;
        }

        return true;
    } catch (err) {

        return false;
    }

}

export const deletarUsuarioCompleto = async () => {

    try {

        const { data: { user } } = await supabase.auth.getUser();
        if(!user){
          console.error("Nenhum usuário logado encontrado.")
          return;  
        } 

        const idLogado = user.id;

        const { error: petsError } = await supabase
            .from('pets')
            .delete()
            .eq('usuario_id', idLogado);

        if(petsError) throw petsError;

        const {error: userError } = await supabase
            .from('usuarios')
            .delete()
            .eq('id', idLogado);

        if(userError) throw userError;

        await supabase.auth.signOut();

        return true;
    } catch (error) {
        console.error("Erro ao deletar conta:", error.message);
        throw error;
    }
}

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}
