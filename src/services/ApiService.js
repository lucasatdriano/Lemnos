import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "http://localhost:8080/api";

export async function cadastrarCliente(cliente) {
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

export async function logarUsuario(email, senha) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/cliente/${id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                email,
                senha
            }
        });

        if (response.status !== 200) {
            throw new Error('Erro ao fazer login.');
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data.error || 'Erro desconhecido.';
            throw new Error(errorMsg);
        } else {
            throw new Error('Erro desconhecido ao fazer login.');
        }
    }
}

export async function cadastrarFuncionario(funcionario) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/cadastro/funcionario",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                telefone: funcionario.telefone,
                dataNascimento: funcionario.dataNasc,
                dataAdmissao: funcionario.dataAdmissao,
                email: funcionario.email,
                senha: funcionario.senha
            }
        });

        if (response.status !== 201) {
            throw new Error('Erro ao cadastrar funcionário.');
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data.error || 'Erro desconhecido.';
            throw new Error(errorMsg);
        } else {
            throw new Error('Erro desconhecido ao cadastrar funcionário.');
        }
    }
}

export async function cadastrarFornecedor(fornecedor) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/cadastro/fornecedor",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: fornecedor.nome,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                numeroLogradouro: fornecedor.numeroLogradouro,
                email: fornecedor.email
            }
        });

        if (response.status !== 201) {
            throw new Error('Erro ao cadastrar fornecedor.');
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data.error || 'Erro desconhecido.';
            throw new Error(errorMsg);
        } else {
            throw new Error('Erro desconhecido ao cadastrar fornecedor.');
        }
    }
}
