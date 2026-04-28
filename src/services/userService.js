import { supabase } from "./supabase";

export const getPerfilUsuario = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) return null;

    const {data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) throw error;
    return data;
};