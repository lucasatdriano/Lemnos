import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "http://localhost:8080/api";

export async function listarProdutosFiltrados(filtro) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/produto/find",
            data: {
              nome: filtro.nome,
              categoria: filtro.categoria,
              subCategoria: filtro.subCategoria,
              marca: filtro.marca,
              menorPreco: filtro.menorPreco,
              maiorPreco: filtro.maiorPreco,
              page: filtro.page,
              size: filtro.size
            },
            timeout: 10000,
        });

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Erro ao filtrar produtos.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao filtrar produtos.');
        }
        throw error;
    }
}

export async function listarProdutosFavoritos(email) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "GET",
            url: `/produto/fav`,
            params: {
              email: email
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao adicionar favorito.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao adicionar favorito.');
        }
        throw error;
    }
}

export async function adicionarFavorito(produto, cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/produto/fav",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
                email: cliente.email,
                id_prod: produto.id
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao adicionar favorito.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao adicionar favorito.');
        }
        throw error;
    }
}

export async function desfavoritarProduto(produto, cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: "/produto/fav",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
                email: cliente.email,
                id_prod: produto.id
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao remover favorito.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao remover favorito.');
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

        if (response.status !== 200) {
            throw new Error('Erro ao avaliar produto.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao avaliar produto.');
        }
        throw error;
    }
}

export async function listarCarrinho(email) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "GET",
            url: "/carrinho",
            params: {
                email: email
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao listar carrinho.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao listar carrinho.');
        }
        throw error;
    }
}

export async function adicionarProdutoCarrinho(produto, entidade, qntd) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/carrinho",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                id: produto.id,
                email: entidade.email,
                quantidade: qntd
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao adicionar produto ao carrinho.');
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao adicionar produto ao carrinho.');
        }
        throw error;
    }
}

export async function removerProdutoCarrinho(produto, entidade, qntd) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "DELETE",
            url: "/carrinho",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: {
                id: produto.id,
                email: entidade.email,
                quantidade: qntd
            },
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao remover produto do carrinho.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
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
            method: "DELETE",
            url: "/carrinho/tudo",
            timeout: 10000
        });

        if (response.status !== 200) {
            throw new Error('Erro ao apagar carrinho.');
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error('Erro ao apagar carrinho.');
        }
        throw error;
    }
}