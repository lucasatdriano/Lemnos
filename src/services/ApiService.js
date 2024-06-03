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
            },
            timeout: 10000,
        });

        if (response.status != 201) {
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
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            return false;
        }
        toast.success('Funcionário cadastrado com sucesso')

        return true;
    
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

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
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            return false;
        }
        toast.success('Fornecedor cadastrado com sucesso')

        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function cadastrarProduto(produto){
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/produto`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                cor: produto.cor,
                valor: produto.preco,
                modelo: produto.modelo,
                peso: produto.peso,
                altura: produto.altura,
                comprimento: produto.comprimento,
                largura: produto.largura,
                fabricante: produto.fabricante,
                fornecedor: produto.fornecedor,
                subCategoria: produto.subCategoria,
                imagemPrincipal: produto.imagemPrinc,
                imagens: produto.imagens
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            throw new Error('Erro ao cadastrar o produto.');
        }
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.log(error.response.data.error);
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
            console.log(error)
        }
    }
}

export async function updateCliente(cliente) {
    axios.put(baseUri + `/cliente/${cliente.id}`, {
        nome: cliente.nome,
        cpf: cliente.cpf,
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
}

export async function updateFuncionario(funcionario) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/funcionario`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                nome: funcionario.nome,
                telefone: funcionario.telefone,
                dataNascimento: funcionario.dataNasc,
                dataAdmissao: funcionario.dataAdmissao
            },
            params: {
                email: funcionario.email
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }

        return true;

    } catch (error) {
       if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function updateFornecedor(fornecedor) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/fornecedor`,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                nome: fornecedor.nome,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone
            },
            params: {
                email: fornecedor.email
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }

        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function cadastrarEndereco(idEntidade, endereco, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/endereco`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                cep: endereco.cep,
                numeroLogradouro: endereco.numLogradouro,
                complemento: endereco.complemento,
                entidade: tipoEntidade,
                id: idEntidade
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            return false;
        }
        
        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function updateEndereco(entidade, endereco, TipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: "/endereco",
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: {
                email: entidade.email,
                cep: endereco.cep,
                numeroLogradouro: endereco.numLogradouro,
                complemento: endereco.complemento,
                entidade: TipoEntidade
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            return false;
        }
        
        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
        return false;
    }
}

export async function findIdByEmail(email, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "GET",
            url: `/${tipoEntidade}/find`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
                email: email
            },
            timeout: 10000,
        });

        if (response.status != 200) {
            throw new Error(`Erro encontrar ${tipoEntidade}.`);
        }
        
        return response.data["id"];

    } catch (error) {
        console.log(error)
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        }
    }
}

export async function verificarCep(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erro ao verificar o CEP:', error);
        return false;
    }
}