import axios from "axios";
import { useState, useEffect} from "react";

function CadastroJogos () {

    const[jogo, setJogo] = useState(null);
    const[jogos, setJogos] = useState([]);

    function getJogos() {
        axios.get("http://localhost:5127/jogos")
            .then((resposta) => {
                setJogos(resposta.data);
            }
        );
    }

    useEffect (getJogos, []);

    function novoJogo() {
        setJogo({
            titulo: "",
            ano: "",
            publicadora: "",
            finalizado: ""
        });
    }

    function cancelar() {
        setJogo(null);
    }

    function refresh() {
        cancelar();
        getJogos();
    }

    function onChangeJogo(e) {
        const { name, value} = e.target;
        setJogo((prevJogo) => ({
            ...prevJogo,
            [name]: value
        }));
    }

    function salvarJogo() {
        console.log(jogo);
        if(jogo.id) {
            axios.put("http://localhost:5127/jogos/" + jogo.id, jogo)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5127/jogos", jogo)
                .then(() => {
                    refresh();
                });
        }
    }

    function getFormulario() {
        return (
            <form>
                <table>
                    <tr>
                        <td>Título: </td>
                        <td><input type="text" id="titulo" name="titulo" value={ jogo.titulo } onChange={(e) => {onChangeJogo(e, jogo.id);}}/></td>
                    </tr>
                    <tr>
                        <td>Ano: </td>
                        <td><input type="number" id="ano" name="ano" value={ jogo.ano } onChange={onChangeJogo}/></td>
                    </tr>
                    <tr>
                        <td>Publicadora: </td>
                        <td><input type="text" id="publicadora" name="publicadora" value={ jogo.publicadora } onChange={onChangeJogo}/></td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td>
                            <select name="statusJogo" id="statusJogo" value={jogo.finalizado} onChange={onChangeJogo}>
                                <option value=""></option>
                                <option value="finalizado">Finalizado</option>
                                <option value="andamento">Em andamento</option>
                            </select>
                        </td>
                    </tr>
                </table>

                <button onClick={ () => {salvarJogo();}}>Salvar</button>
                <button onClick={ () => {cancelar();}}>Cancelar</button>

            </form>
        );
    }

    function excluirJogo(id) {
        axios.delete("http://localhost:5127/jogos/" + id)
            .then(() => {
                getJogos();
            });
    }

    function editarJogo(jogo) {
        setJogo(jogo);
    }

    function getLinhaTabela(jogo) {
        return (
            <tr>
                <td>{jogo.id}</td>
                <td>{jogo.titulo}</td>
                <td>{jogo.ano}</td>
                <td>{jogo.publicadora}</td>
                <td>{jogo.finalizado}</td>
                <td>
                    <button onClick={
                        () => {excluirJogo(jogo.id);}
                    }>Excluir</button>
                    <button onClick={
                        () => { editarJogo(jogo);}
                    }>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhasTabela() {

        const linhasTabela = [];

        for (let i = 0; i < jogos.length; i++) {
            const jogo = jogos[i];
            linhasTabela[i] = getLinhaTabela(jogo);
        }

        return linhasTabela;
    }

    function getTabela() {
        return (
            <table>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Ano</th>
                    <th>Publicadora</th>
                    <th>Status</th>
                </tr>
                { getLinhasTabela ()}
            </table>
        );
    }

    function getConteudo() {
        if (jogo == null) {
            return (
                <>
                    <button type="button" onClick={() => { novoJogo();}}>Novo jogo</button>
                    {getTabela()}
                </>
            );
        } else {
            return getFormulario();
        }
    }

    return (getConteudo());
}

export default CadastroJogos;