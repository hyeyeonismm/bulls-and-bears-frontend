import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import MainPage from './pages/MainPage.js';
import { createGlobalStyle } from 'styled-components';
import ResultPage from './pages/ResultPage';
import SimulationPage from './pages/SimulationPage';
import IssuePage from './pages/IssuePage';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
 body, html {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans', sans-serif;
		background: #f5f5f5;
	}

`;
function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/portfolio' element={<PortfolioPage />} />
				<Route path='/result' element={<ResultPage />} />
				<Route path='/simulate' element={<SimulationPage />} />
				<Route path='/issue' element={<IssuePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
