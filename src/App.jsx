import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout";
import Home from './paginas/Home';
import CadastroFilmes from './paginas/CadastroFilmes';
import CadastroJogos from './paginas/CadastroJogos';
import CadastroSeries from './paginas/CadastroSeries';
import CadastroLivros from './paginas/CadastroLivros';


function App(){
    return (
        <div>
            <Routes>
                <Route path='/' element={<Layout><Home></Home></Layout>}></Route>

                <Route path='/cadastroFilmes' element={<Layout><CadastroFilmes></CadastroFilmes></Layout>}></Route>

                <Route path='/cadastroJogos' element={<Layout><CadastroJogos></CadastroJogos></Layout>}></Route>

                <Route path='/cadastroSeries' element={<Layout><CadastroSeries></CadastroSeries></Layout>}></Route>

                <Route path='/cadastroLivros' element={<Layout><CadastroLivros></CadastroLivros></Layout>}></Route>

            </Routes>
            

        </div>
    );
}

export default App;
