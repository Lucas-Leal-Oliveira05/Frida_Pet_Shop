import { supabase } from "./supabase";

export const getProfissionais = async () => {
    const { data, error } = await supabase
        .from('profissionais')
        .select(`
            id,
            nome,
            especialidade,
            ativo,
            usuario_id,
            usuarios ( email, telefone )
        `);

    if (error) throw error;

    return data.map(p => ({
        id: p.id,
        nome: p.nome,
        especialidade: p.especialidade,
        ativo: p.ativo,
        usuario_id: p.usuario_id,
        email: p.usuarios?.email || 'Sem e-mail',
        telefone: p.usuarios?.telefone || 'Sem telefone'
    }));
};

export const cadastrarProfissional = async (prof) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: prof.email,
        password: prof.senha,
    });

    if (authError) throw authError;
    const userId = authData.user.id;

    const { error: userError } = await supabase
        .from('usuarios')
        .insert([
            {
                id: userId,
                nome: prof.nome,
                email: prof.email,
                telefone: prof.telefone || null,
                perfil: 'PROFISSIONAL'
            }
        ]);

    if (userError) throw userError;

    const { data, error: profError } = await supabase
        .from('profissionais')
        .insert([
            {
                nome: prof.nome,
                especialidade: prof.especialidade,
                ativo: true,
                usuario_id: userId
            }
        ]);

    if (profError) throw profError;
    return data;
};

export const atualizarProfissional = async (id, usuarioId, dados) => {
    if (!usuarioId) throw new Error("ID do usuário correspondente não foi encontrado.");

    const { error: userError } = await supabase
        .from('usuarios')
        .update({
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone || null
        })
        .eq('id', usuarioId);

    if (userError) throw userError;

    const { data, error: profError } = await supabase
        .from('profissionais')
        .update({
            nome: dados.nome,
            especialidade: dados.especialidade
        })
        .eq('id', id);

    if (profError) throw profError;
    return data;
};

export const deletarProfissional = async (id, usuarioId) => {
    const { error: profError } = await supabase
        .from('profissionais')
        .delete()
        .eq('id', id);

    if (profError) throw profError;

    if (usuarioId) {
        const { error: userError } = await supabase
            .from('usuarios')
            .delete()
            .eq('id', usuarioId);
        if (userError) throw userError;
    }
};

export const getContagensProfissionaisPainel = async () => {
    // Total de Clientes
    const { count: clientesCount, error: err1 } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .eq('perfil', 'CLIENTE');

    // Total de Pets cadastrados
    const { count: petsCount, error: err2 } = await supabase
        .from('pets')
        .select('*', { count: 'exact', head: true });

    // Total de Agendamentos registrados
    const { count: agendamentosCount, error: err3 } = await supabase
        .from('agendamentos')
        .select('*', { count: 'exact', head: true });

    if (err1 || err2 || err3) {
        console.error("Erro nas contagens:", { err1, err2, err3 });
        throw new Error("Erro ao carregar as métricas do topo do painel.");
    }

    return {
        clientes: clientesCount || 0,
        pets: petsCount || 0,
        agendamentos: agendamentosCount || 0
    };
};

export const getProfissionaisAtivos = async () => {
    const { data, error } = await supabase
        .from('profissionais')
        .select('id, nome, dias_folga')
        .eq('ativo', true)
        .order('nome', { ascending: true });

    if (error) throw error;
    return data;
};