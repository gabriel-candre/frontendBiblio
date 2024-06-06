import axios from "axios";
import { useState, useEffect} from "react";

function CadastroLivros () {

    const[livro, setLivro] = useState(null);
    const[livros, setLivros] = useState([]);

    function getLivros() {
        axios.get("http://localhost:5127/livros")
            .then((resposta) => {
                setLivros(resposta.data);
            }
        );
    }

    useEffect (getLivros, []);

    function novoLivro() {
        setLivro({
            titulo: "",
            paginas: "",
            ano: "",
            autor: "",
            genero: "",
            status: ""
        });
    }

    function cancelar() {
        setLivro(null);
    }

    function refresh() {
        cancelar();
        getLivros();
    }

    function onChangeLivro(e) {
        const { name, value} = e.target;
        setLivro((prevLivro) => ({
            ...prevLivro,
            [name]: value
        }));
    }

    function salvarLivro() {
        
        if(livro.id) {
            axios.put("http://localhost:5127/livros/" + livro.id, livro)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5127/livros", livro)
                .then(() => {
                    refresh();
                });
        }
    }

    function getFormulario() {
        return (
            <form onSubmit={salvarLivro}>
                <table>
                    <tr>
                        <td>Título: </td>
                        <td><input type="text" id="titulo" name="titulo" value={ livro.titulo } onChange={(e) => {onChangeLivro(e, livro.id);}}/></td>
                    </tr>
                    <tr>
                        <td>Páginas: </td>
                        <td><input type="number" id="paginas" name="paginas" value={ livro.paginas } onChange={onChangeLivro} /></td>
                    </tr>
                    <tr>
                        <td>Ano: </td>
                        <td><input type="number" id="ano" name="ano" value={ livro.ano } onChange={onChangeLivro}/></td>
                    </tr>
                    <tr>
                        <td>Autor: </td>
                        <td><input type="text" id="autor" name="autor" value={ livro.autor } onChange={onChangeLivro}/></td>
                    </tr>
                    <tr>
                        <td>Gênero: </td>
                        <td><input type="text" id="genero" name="genero" value={ livro.genero } onChange={onChangeLivro}/></td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td><select name="status" id="status" value={ livro.status } onChange={onChangeLivro}>
                                <option value=""></option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Em leitura">Em leitura</option>
                                <option value="Não iniciado">Não iniciado</option>
                            </select>
                        </td>
                    </tr>
                </table>

                <button type="submit">Salvar</button>
                <button type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function excluirLivro(id) {
        axios.delete("http://localhost:5127/livros/" + id)
            .then(() => {
                getLivros();
            });
    }

    function editarLivro(livro) {
        setLivro(livro);
    }

    function getLinhaTabela(livro) {
        return (
            <tr>
                <td>{livro.id}</td>
                <td>{livro.titulo}</td>
                <td>{livro.paginas}</td>
                <td>{livro.ano}</td>
                <td>{livro.autor}</td>
                <td>{livro.genero}</td>
                <td>{livro.status}</td>
                <td>
                    <button onClick={
                        () => {excluirLivro(livro.id);}
                    }>Excluir</button>
                    <button onClick={
                        () => { editarLivro(livro);}
                    }>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhasTabela() {

        const linhasTabela = [];

        for (let i = 0; i < livros.length; i++) {
            const livro = livros[i];
            linhasTabela[i] = getLinhaTabela(livro);
        }

        return linhasTabela;
    }

    function getTabela() {
        return (
            <div className="table-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Páginas</th>
                    <th>Ano</th>
                    <th>Autor</th>
                    <th>Gênero</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
                { getLinhasTabela ()}
            </table>
            </div>
        );
    }

    function getConteudo() {
        if (livro == null) {
            return (
                <div className="container">
                    <button type="button" onClick={() => { novoLivro();}}>Novo livro</button>
                    {getTabela()}
                </div>
            );
        } else {
            return getFormulario();
        }
    }

    return (getConteudo());
}

export default CadastroLivros;