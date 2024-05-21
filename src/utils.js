export function tratarDados(cliente) {
    if (cliente.nome) {
        cliente.nome = cliente.nome.toUpperCase();
    }

    if (cliente.cpf) {
        cliente.cpf = cliente.cpf.replace(/\D/g, '');
    }

    if (cliente.email) {
        cliente.email = cliente.email.toLowerCase();
    }

    return cliente;
}