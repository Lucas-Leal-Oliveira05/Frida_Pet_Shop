import { supabase } from "./supabase";

export const getClientesAdmin = async () => {
    const { data, error } = await supabase
        .from('usuarios')
        .select(`
            id,
            nome,
            email,
            telefone,
            pets ( nome )
        `)
        .eq('perfil', 'CLIENTE')
        .order('nome', { ascending: true });

    if (error) throw error;

    return data.map(c => {
        // Mapeia os nomes dos pets para exibir em formato de linha de texto
        const listaPets = c.pets && c.pets.length > 0 
            ? c.pets.map(p => p.nome).join(', ') 
            : 'Nenhum pet';

        return {
            id: c.id,
            nome: c.nome,
            email: c.email,
            telefone: c.telefone || 'Sem telefone',
            petsTexto: listaPets
        };
    });
};

export const atualizarClienteAdmin = async (id, dados) => {
    const { data, error } = await supabase
        .from('usuarios')
        .update({
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone
        })
        .eq('id', id);

    if (error) throw error;
    return data;
};

export const deletarClienteAdmin = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return data;
};