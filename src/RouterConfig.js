import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AjouterVille from './pages/AjouterVille/AjouterVille';
import Detail from './pages/Detail/Detail'; 

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/ajouter' element={<AjouterVille />} />
                    <Route path='/detail/:ville' element={<Detail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default RouterConfig;
