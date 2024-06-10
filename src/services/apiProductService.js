import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUri = "https://lemnos-server.up.railway.app/api";
const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJMZW1ub3MtU2VydmVyIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzE3OTg0MzY3LCJpYXQiOjE3MTc5ODQwNjd9.W6tnLtVG-wN1sof5zdMXfe9tlOsaTVN6MDYw2WzMfTOypIzZulAcyDRLSOXVXrKljZkz5veEiun6hM7yaNDLixf6dUnLtqA-d2Y1OTtk3wFqxM3v0047LLTfOVKDarrg1EB4SBLc-_hQn2stmdekFV-RUnWNJt6Q84fD01-ZsxWBMksNO0FQZssghVSulX6GYboMvknVt1wtWhgTmVNzChozZuz74lyProeES85yrZxfax6VduAJ2MWkE_ZibDf4hxUh2XJVw9RlaIeL6rGCTZWrflz8GwEi2crLUe4fwYBI6dkHOHwB8QssBG9JXePUulMWaR986AbFrqqd1bE_8A';

export async function listarProdutosFiltrados(filtro, size) {
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
              size: size
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
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
            },
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
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
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
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
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
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
            },
            data: {
                avaliacao: valorAvaliacao,
            },
            timeout: 10000
        });

        if (response.status != 201) {
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

export async function listarCarrinho() {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "GET",
            url: "/carrinho",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
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
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
            },
            data: {
                id: produto.id,
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
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
            },
            data: {
                id: produto.id,
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
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
            },
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

export async function listarPedido(pedido) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "GET",
            url: `/pedido/${pedido.id}`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('authToken')
            },
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

export async function novoPedido(pedido, cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "POST",
            url: "/pedido",
            data: {
                email: cliente.email,
                metodoPagamento: pedido.metodoPagamento
            },
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

export async function atualizarStatus(pedido, cliente) {
    try {
        const response = await axios({
            baseURL: baseUri,
            method: "PUT",
            url: "/pedido",
            data: {
                email: cliente.email,
                id: pedido.id
            },
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