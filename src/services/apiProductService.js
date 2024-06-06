import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "http://localhost:8080/api";

export async function listarProdutosFiltrados(filtro) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "GET",
            url: "/produto/find",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
                categoria: filtro.categoria || '',
                subCategoria: filtro.subCategoria || '',
                marca: filtro.marca || '',
                menorPreco: filtro.menorPreco !== undefined ? filtro.menorPreco : 0,
                maiorPreco: filtro.maiorPreco !== undefined ? filtro.maiorPreco : 10000
            },
            timeout: 10000,
        });

        if (response.status != 200 && response.status != 204) {
            throw new Error('Erro ao filtrar produto.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao filtrar produto.');
        }
        throw error;
    }
}

export async function adicionarFavorito(produto, cliente){
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/produto/fav",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
                id_cliente: cliente.id,
                id_prod: produto.id
            },
            timeout: 10000
        });

        if (response.status != 200) {
            throw new Error('Erro ao favoritar produto.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao filtrar produto.');
        }
        throw error;
    }
}

export async function dasfavoritarProduto(produto, cliente){
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: "/produto/fav",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
                id_cliente: cliente.id,
                id_prod: produto.id
            },
            timeout: 10000
        });

        if (response.status != 200) {
            throw new Error('Erro ao favoritar produto.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao filtrar produto.');
        }
        throw error;
    }
}

export async function avaliarProduto(produto, valorAvaliacao) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: `/produto/avaliar/${produto.id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
              avaliacao: valorAvaliacao,
            },
            timeout: 10000
        });

        if (response.status != 200) {
            throw new Error('Erro ao favoritar produto.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao filtrar produto.');
        }
        throw error;
    }
}

export async function listarCarrinho(email) {
    axios({
      baseURL: baseUri,
      method: "GET",
      url: "/carrinho",
      params: {
        email: email
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
}

export async function adicionarProdutoCarrinho(produto, entidade, qntd) {
    axios({
      baseURL: baseUri,
      method: "POST",
      url: "/carrinho",
      data: {
        id: produto.id,
        email: entidade.email,
        quantidade: qntd
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
}

export async function removerProdutoCarrinho(produto, entidade, qntd) {
    axios({
      baseURL: baseUri,
      method: "DELETE",
      url: "/carrinho",
      data: {
        id: produto.id,
        email: entidade.email,
        quantidade: qntd
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
}

export async function apagarCarrinho() {
    axios({
      baseURL: baseUri,
      method: "DELETE",
      url: "/carrinho/tudo"
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
}