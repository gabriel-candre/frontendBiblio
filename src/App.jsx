import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout";
import Home from './paginas/Home';
import Filmes from './paginas/Filmes';
import Series from './paginas/Series';
import Livros from './paginas/Livros';
import Jogos from './paginas/Jogos';

function App(){
    return (
        <div>
            <Routes>
                <Route path='/' element={<Layout><Home></Home></Layout>}></Route>

                <Route path='/filmes' element={<Layout><Filmes></Filmes></Layout>}></Route>

                <Route path='/series' element={<Layout><Series></Series></Layout>}></Route>

                <Route path='/livros' element={<Layout><Livros></Livros></Layout>}></Route>

                <Route path='/jogos' element={<Layout><Jogos></Jogos></Layout>}></Route>
            </Routes>
            

        </div>
    );
}

export default App;
