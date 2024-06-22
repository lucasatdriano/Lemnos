import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from './AuthService';

const baseUri = 'https://lemnos-server.up.railway.app/api';
// const baseUri = "http://localhost:8080/api";

export async function listarProdutosFiltrados(filtro, page, size) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'POST',
            url: '/produto/find',
            data: {
                nome: filtro.nome,
                categoria: filtro.categoria,
                subCategoria: filtro.subCategoria,
                marca: filtro.marca,
                menorPreco: filtro.menorPreco,
                maiorPreco: filtro.maiorPreco,
                avaliacao: filtro.avaliacao,
                page: page,
                size: size,
            },
            timeout: 10000,
        });

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Erro ao filtrar produtos.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao filtrar produtos.');
        }
        throw error;
    }
}

export async function listarProdutosFavoritos() {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'GET',
            url: `/produto/fav`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao adicionar favorito.');
        }

        if (response.status == 401) {
            return false;
        }

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function adicionarFavorito(produto) {
    if (AuthService.isLoggedIn()) {
        try {
            const response = await axios({
                baseURL: baseUri,
                method: 'POST',
                url: '/produto/fav',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: AuthService.getToken(),
                },
                params: {
                    id_prod: produto.id,
                },
                timeout: 10000,
            });

            if (response.status !== 200) {
                throw new Error('Erro ao adicionar favorito.');
            }

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export async function desfavoritarProduto(produto) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'DELETE',
            url: '/produto/fav',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            params: {
                id_prod: produto.id,
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao remover favorito.');
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function avaliarProduto(produto, valorAvaliacao) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'POST',
            url: `/produto/avaliar/${produto.id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            data: {
                avaliacao: valorAvaliacao,
            },
            timeout: 10000,
        });

        if (response.status != 201) {
            throw new Error('Erro ao avaliar produto.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function listarCarrinho() {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'GET',
            url: '/carrinho',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao listar carrinho.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function adicionarProdutoCarrinho(produto, qntd) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'POST',
            url: '/carrinho',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            data: {
                id: produto.id,
                quantidade: qntd,
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao adicionar produto ao carrinho.');
        }
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function removerProdutoCarrinho(produto, qntd) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'DELETE',
            url: '/carrinho',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            data: {
                id: produto.id,
                quantidade: qntd,
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao remover produto do carrinho.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function apagarCarrinho() {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'DELETE',
            url: '/carrinho/tudo',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao apagar carrinho.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function novoPedido(pedido) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'POST',
            url: '/pedido',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            data: {
                metodoPagamento: pedido.metodoPagamento,
                valorPagamento: pedido.valor,
                valorFrete: pedido.frete,
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao fazer pedido.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function listarPedido(pedido) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'GET',
            url: `/pedido/${pedido.id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao listar pedido.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function getPedido(pedido) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'GET',
            url: `/pedido/${pedido.id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao adicionar método de pagamento.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}

export async function atualizarStatus(pedido) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'PUT',
            url: '/pedido',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: AuthService.getToken(),
            },
            data: {
                id: pedido.id,
            },
            timeout: 10000,
        });

        if (response.status !== 200) {
            throw new Error('Erro ao apagar carrinho.');
        }

        return response.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            console.error(error.response.data.error);
        }
        throw error;
    }
}
