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
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
    }
}

export async function cadastrarFuncionario(funcionario, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/cadastro/${tipoEntidade}`,
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
            throw new Error(`Erro ao cadastrar ${tipoEntidade}.`);
        }
        const funcionarioData = response.data;
        toast.success('Funcionário cadastrado com sucesso')

        return funcionarioData;
    
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
    }
};

export async function cadastrarFornecedor(fornecedor, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/cadastro/${tipoEntidade}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: fornecedor.nome,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                email: fornecedor.email
            }
        });

        if (response.status !== 201) {
            throw new Error(`Erro ao cadastrar ${tipoEntidade}.`);
        }
        const fornecedorData = response.data;
        toast.success('Fornecedor cadastrado com sucesso')

        await cadastrarEndereco(fornecedorData.id, tipoEntidade, fornecedor.endereco);

        return fornecedorData;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
    }
}

export async function selecionarCliente(id) {
    try {
        const response = await axios.get(`${baseUri}/cliente/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function listarFornecedores() {
    try {
        const response = await axios.get(`${baseUri}/fornecedor`);
        return response.data;
    } catch (error) {
       toast.error(error.response.data.error)
    }
}

export async function selecionarFornecedor(id) {
    try {
        const response = await axios.get(`${baseUri}/fornecedor/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function cadastrarEndereco(idEntidade, tipoEntidade, endereco) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/${tipoEntidade}/endereco`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                cep: endereco.cep,
                numeroLogradouro: endereco.numLogradouro,
                complemento: endereco.complemento
            },
            params: {
                id: idEntidade
            }
        });

        if (response.status !== 201) {
            throw new Error('Erro ao cadastrar endereço.');
        }
        
        return response.data;

    } catch (error) {
        console.log(error)
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
    }
}