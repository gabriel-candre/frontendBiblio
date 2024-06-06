import axios from "axios";
import { useState, useEffect} from "react";

function CadastroSeries() {

    const[serie, setSerie] = useState(null);
    const[series, setSeries] = useState([]);

    function getSeries() {
        axios.get("http://localhost:5127/series")
            .then((resposta) => {
                setSeries(resposta.data);
            }
        );
    }

    useEffect (getSeries, []);

    function novaSerie() {
        setSerie({
            titulo: "",
            ano: "",
            episodios: "",
            status: ""
        });
    }

    function cancelar() {
        setSerie(null);
    }

    function refresh() {
        cancelar();
        getSeries();
    }

    function onChangeSerie(e) {
        const { name, value} = e.target;
        setSerie((prevSerie) => ({
            ...prevSerie,
            [name]: value
        }));
    }

    function salvarSerie() {
        
        if(serie.id) {
            axios.put("http://localhost:5127/series/" + serie.id, serie)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5127/series", serie)
                .then(() => {
                    refresh();
                });
        }
    }

    function getFormulario() {
        return (
            <form onSubmit={salvarSerie}>
                <table>
                    <tr>
                        <td>Título: </td>
                        <td><input type="text" id="titulo" name="titulo" value={ serie.titulo } onChange={(e) => {onChangeSerie(e, serie.id);}}/></td>
                    </tr>
                    <tr>
                        <td>Ano: </td>
                        <td><input type="number" id="ano" name="ano" value={ serie.ano } onChange={onChangeSerie}/></td>
                    </tr>
                    <tr>
                        <td>Episódios: </td>
                        <td><input type="number" id="episodios" name="episodios" value={ serie.duracao } onChange={onChangeSerie}/></td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td><select name="status" id="status" value={ serie.status } onChange={onChangeSerie}>
                                <option value=""></option>
                                <option value="Assistida">Assistida</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Não iniciada">Não iniciada</option>
                            </select>
                        </td>
                    </tr>
                </table>

                <button type="submit">Salvar</button>
                <button type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function excluirSerie(id) {
        axios.delete("http://localhost:5127/series/" + id)
            .then(() => {
                getSeries();
            });
    }

    function editarSerie(serie) {
        setSerie(serie);
    }

    function getLinhaTabela(serie) {
        return (
            <tr>
                <td>{serie.id}</td>
                <td>{serie.titulo}</td>
                <td>{serie.ano}</td>
                <td>{serie.episodios}</td>
                <td>{serie.status}</td>
                <td>
                    <button onClick={
                        () => {excluirSerie(serie.id);}
                    }>Excluir</button>
                    <button onClick={
                        () => { editarSerie(serie);}
                    }>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhasTabela() {

        const linhasTabela = [];

        for (let i = 0; i < series.length; i++) {
            const serie = series[i];
            linhasTabela[i] = getLinhaTabela(serie);
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
                    <th>Episódios</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
                { getLinhasTabela ()}
            </table>
            </div>
        );
    }

    function getConteudo() {
        if (serie == null) {
            return (
                <div className="container">
                    <button type="button" onClick={() => { novaSerie();}}>Nova série</button>
                    {getTabela()}
                </div>
            );
        } else {
            return getFormulario();
        }
    }

    return (getConteudo());
}

export default CadastroSeries;