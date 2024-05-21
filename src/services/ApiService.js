import axios from 'axios';
import { tratarDados } from '../utils';

const baseUri = "http://localhost:8080/api";

export default function cadastrarCliente(cliente) {
    cliente = tratarDados(cliente);
    
    return axios.post(baseUri + "/cadastro/cliente", {
        nome: cliente.nome,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        email: cliente.email,
        senha: cliente.senha
    });
}