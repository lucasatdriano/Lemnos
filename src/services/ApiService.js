import axios from 'axios';
import { tratarDados } from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "http://localhost:8080/api";

export default async function cadastrarCliente(cliente) {
    cliente = tratarDados(cliente);

    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/cadastro/cliente",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: cliente.name,
                cpf: cliente.cpf,
                email: cliente.email,
                senha: cliente.password
            }
        });

        if (response.status !== 201) {
            throw new Error('Erro ao cadastrar cliente.');
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data.error || 'Erro desconhecido.';
            throw new Error(errorMsg);
        } else {
            throw new Error('Erro desconhecido ao cadastrar cliente.');
        }
    }
}