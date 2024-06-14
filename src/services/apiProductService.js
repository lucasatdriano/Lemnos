import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from './authService';

//const baseUri = "https://lemnos-server.up.railway.app/api";
const baseUri = "http://localhost:8080/api";

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
    if (AuthService.isLoggedIn()) {
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

            return response.data;
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                toast.error(error.response.data.error); // aq q tá o erro
            }
            throw error;
        }
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
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                toast.error(error.response.data.error);
            }
            throw error;
        }
    }
}

export async function desfavoritarProduto(produto) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: "/produto/fav",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': AuthService.getToken()
            },
            params: {
                id_prod: produto.id
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao remover favorito.');
        }

        return true;

    } catch (error) {
        toast.error(error);
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
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao avaliar produto.');
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
            toast.error(error.response.data.error);
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
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao adicionar produto ao carrinho.');
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
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao remover produto do carrinho.');
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
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao apagar carrinho.');
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
            throw new Error('Erro ao apagar carrinho.');
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
            toast.error('Erro ao apagar carrinho.');
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
            data: {
                metodoPagamento: pedido.metodoPagamento,
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
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao apagar carrinho.');
        }
        throw error;
    }
}

export async function atualizarStatus(pedido, cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: 'PUT',
            url: '/pedido',
            data: {
                email: cliente.email,
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
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao apagar carrinho.');
        }
        throw error;
    }
}
