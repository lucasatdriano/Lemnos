import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "http://localhost:8080/api";
const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJMZW1ub3MtU2VydmVyIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzE3OTg0MzY3LCJpYXQiOjE3MTc5ODQwNjd9.W6tnLtVG-wN1sof5zdMXfe9tlOsaTVN6MDYw2WzMfTOypIzZulAcyDRLSOXVXrKljZkz5veEiun6hM7yaNDLixf6dUnLtqA-d2Y1OTtk3wFqxM3v0047LLTfOVKDarrg1EB4SBLc-_hQn2stmdekFV-RUnWNJt6Q84fD01-ZsxWBMksNO0FQZssghVSulX6GYboMvknVt1wtWhgTmVNzChozZuz74lyProeES85yrZxfax6VduAJ2MWkE_ZibDf4hxUh2XJVw9RlaIeL6rGCTZWrflz8GwEi2crLUe4fwYBI6dkHOHwB8QssBG9JXePUulMWaR986AbFrqqd1bE_8A';

export async function cadastrarUsuario(usuario) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/auth/register`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                nome: usuario.name,
                cpf: usuario.cpf,
                email: usuario.email,
                senha: usuario.password
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
            url: `/auth/register/${tipoEntidade}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
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
            url: `/auth/register/${tipoEntidade}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
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
            url: '/produto',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            data: {
                nome: produto.nome,
                valor: produto.valor,
                descricao: produto.descricao,
                desconto: produto.desconto,
                cor: produto.cor,
                modelo: produto.modelo,
                imagemPrincipal: produto.imagemPrincipal,
                imagens: produto.imagens,
                subCategoria: produto.subCategoria,
                peso: produto.peso,
                altura: produto.altura,
                comprimento: produto.comprimento,
                largura: produto.largura,
                fabricante: produto.fabricante,
                fornecedor: produto.fornecedor
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            throw new Error(response);
        }
        
        return true;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
            console.log(error.response.data);
        }
    }
}

export async function updateCliente(cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/cliente`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": token
            },
            data: {
                nome: cliente.nome,
                senha: cliente.senha,
            },
            params: {
                email: cliente.email
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

export async function updateFuncionario(funcionario) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/funcionario`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            data: {
                nome: funcionario.nome,
                telefone: funcionario.telefone,
                dataNascimento: funcionario.dataNasc,
                dataAdmissao: funcionario.dataAdmissao,
                senha: funcionario.senha
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
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'},
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

export async function updateProduto(produto, id) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: `/produto/${id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            data: {
                nome: produto.nome,
                valor: produto.preco,
                descricao: produto.descricao,
                desconto: produto.desconto,
                fornecedor: produto.fornecedor
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

export async function excluirFuncionario(email) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: `/funcionario`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            params: {
                email: email
            }
        })

        if (response.status != 200) {
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

export async function cadastrarEndereco(emailEntidade, endereco, tipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/endereco`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            data: {
                email: emailEntidade,
                cep: endereco.cep,
                numeroLogradouro: endereco.numLogradouro,
                complemento: endereco.complemento,
                entidade: tipoEntidade
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

export async function updateEndereco(emailEntidade, endereco, TipoEntidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: "/endereco",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            data: {
                email: emailEntidade,
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

export async function excluirEndereco(emailEntidade, endereco, entidade) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: "/endereco",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            params: {
                email: emailEntidade,
                cep: endereco.cep,
                e: entidade
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

export async function login(usuario) {  
    let token = "";
    
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/auth/login",
            headers: { 
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                email: usuario.email,
                senha: usuario.senha
            },
            timeout: 10000,
        });
        token = response.data;

    } catch (error) {
        console.log(error);
    }
    
    return token;  
}

export async function loginGoogle() {
    let token = "";
    
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/auth/login-firebase",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: {
                token: localStorage.getItem('authTokenGoogle')
            },
            timeout: 10000,
        });
        token = response.data;

    } catch (error) {
        console.log(error);
    }
    
    return token;
}

export async function sendFirebaseToken(token){
    try{
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/auth/login-firebase",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                token: token
            },
            timeout: 10000,
        });
  
        if (response.status != 200) {
            throw new Error('Erro ao cadastrar cliente.');
        }
    
        return response.data.token;
    
    } catch(error) {
        toast.error(error);
    }
}