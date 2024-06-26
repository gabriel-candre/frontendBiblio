import axios from "axios";
import { useState, useEffect} from "react";

function CadastroFilmes () {

    const[filme, setFilme] = useState(null);
    const[filmes, setFilmes] = useState([]);

    function getFilmes() {
        axios.get("http://localhost:5127/filmes")
            .then((resposta) => {
                setFilmes(resposta.data);
            }
        );
    }

    useEffect (getFilmes, []);

    function novoFilme() {
        setFilme({
            titulo: "",
            ano: "",
            duracao: "",
            status: ""
        });
    }

    function cancelar() {
        setFilme(null);
    }

    function refresh() {
        cancelar();
        getFilmes();
    }

    function onChangeFilme(e) {
        const { name, value} = e.target;
        setFilme((prevFilme) => ({
            ...prevFilme,
            [name]: value
        }));
    }

    function salvarFilme() {
        
        if(filme.id) {
            axios.put("http://localhost:5127/filmes/" + filme.id, filme)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5127/filmes", filme)
                .then(() => {
                    refresh();
                });
        }
    }

    function getFormulario() {
        return (
            <form onSubmit={salvarFilme}>
                <table>
                    <tr>
                        <td>Título: </td>
                        <td><input type="text" id="titulo" name="titulo" value={ filme.titulo } onChange={(e) => {onChangeFilme(e, filme.id);}}/></td>
                    </tr>
                    <tr>
                        <td>Ano: </td>
                        <td><input type="number" id="ano" name="ano" value={ filme.ano } onChange={onChangeFilme}/></td>
                    </tr>
                    <tr>
                        <td>Duração: </td>
                        <td><input type="number" id="duracao" name="duracao" value={ filme.duracao } onChange={onChangeFilme}/></td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td><select name="status" id="status" value={ filme.status } onChange={onChangeFilme}>
                                <option value=""></option>
                                <option value="Assistido">Assistido</option>
                                <option value="Não assistido">Não Assistido</option>
                                <option value="Em andamento">Em andamento</option>
                            </select>
                        </td>
                    </tr>
                </table>

                <button type="submit">Salvar</button>
                <button type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function excluirFilme(id) {
        axios.delete("http://localhost:5127/filmes/" + id)
            .then(() => {
                getFilmes();
            });
    }

    function editarFilme(filme) {
        setFilme(filme);
    }

    function getLinhaTabela(filme) {
        return (
            
            <tr>
                <td>{filme.id}</td>
                <td>{filme.titulo}</td>
                <td>{filme.ano}</td>
                <td>{filme.duracao}</td>
                <td>{filme.status}</td>
                <td>                        
                    <button onClick={
                        () => {excluirFilme(filme.id);}
                    }>Excluir</button>
                    <button onClick={
                        () => { editarFilme(filme);}
                    }>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhasTabela() {

        const linhasTabela = [];

        for (let i = 0; i < filmes.length; i++) {
            const filme = filmes[i];
            linhasTabela[i] = getLinhaTabela(filme);
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
                    <th>Ano</th>
                    <th>Duração(min)</th>
                    <th>Status</th>
                    <th>Opção</th>
                </tr>
                { getLinhasTabela ()}
            </table>
            </div>
        );
    }

    function getConteudo() {
        if (filme == null) {
            return (
                <div className="container">
                    <button type="button" onClick={() => { novoFilme();}} class="botaoNovo">Novo filme</button>
                    {getTabela()}
                </div>
            );
        } else {
            return getFormulario();
        }
    }

    return (getConteudo());
}

export default CadastroFilmes;