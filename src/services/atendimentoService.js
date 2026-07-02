import { supabase } from "./supabase";

 export const getAtendimentosDoDia = async () => {
    const hoje = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('agendamentos')
        .select(`
            id,
            data_hora,
            status,
            usuarios!agendamentos_cliente_id_fkey ( nome, telefone ),
            pets ( nome ),
            profissionais ( nome )
        `)
        .gte('data_hora', `${hoje}T00:00:00`)
        .lte('data_hora', `${hoje}T23:59:59`)
        .order('data_hora', { ascending: true });

    if (error) throw error;
    return data.map(item => {
        const dataObj = new Date(item.data_hora);
        // Formata a hora para HH:MM
        const horario = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return {
            id: item.id,
            horario: horario,
            cliente: item.usuarios?.nome || 'Não informado',
            pet: item.pets?.nome || 'Não informado',
            profissional: item.profissionais?.nome || 'Não informado',
            status: item.status,
            telefone: item.usuarios?.telefone || 'Não informado'
        };
    });
};

export const getHistoricoCompletoServicos = async () => {
    const { data, error } = await supabase
        .from('agendamentos')
        .select(`
            id,
            data_hora,
            status,
            usuarios!agendamentos_clientes_id_fkey ( nome ),
            pets ( nome ),
            profissionais ( nome ),
            servicos ( nome )
            `)
        .order('data_hora', {ascending: false});

    if ( error ) throw error;

    return data.map( item => {
        const dataObj = new Date(item.data_hora);
        return {
            id: item.id,
            data: dataObj.toLocaleDateString('pt-BR'),
            horario: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'}),
            cliente: item.usuarios?.nome || 'Não informado',
            pet: item.pets?.nome || 'Não Informado',
            profissional: item.profissionais?.nome || 'Não informado',
            status: item.status
        };
    })
}

export const getDadosRelatoriosPeriodo = async (dataInicio, dataFim) => {
    const { data, error } = await supabase 
        .from ('agendamentos')
        .select( `
            data_hora,
            status,
            usuarios!agendamentos_clientes_id_fkey ( nome ),
            pets ( nome ),
            servicos ( nome, preco ),
            profissionais ( nome )
            `)
        .gte('data_hora', `${dataInicio}T00:00:00`)
        .lte('data_hora', `${dataFim}T23:59:59`)
        .order('data_hora', {ascending: true});

    if (error) throw error
    return data;
        
}
