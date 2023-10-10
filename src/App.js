import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/portfolio' element={<PortfolioPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
