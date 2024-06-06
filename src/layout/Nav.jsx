import {NavLink} from 'react-router-dom';

function Nav() {
    return (
        <nav>
        <ul>
            <li><NavLink to="/">Início</NavLink></li>
            <li><NavLink to="/CadastroFilmes">Filmes</NavLink></li>
            <li><NavLink to="/CadastroJogos">Jogos</NavLink></li>
            <li><NavLink to="/CadastroSeries">Séries</NavLink></li>
            <li><NavLink to="/CadastroLivros">Livros</NavLink></li>
        </ul>
    </nav>
    );
}

export default Nav;