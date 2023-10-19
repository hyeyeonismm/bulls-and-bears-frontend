import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { TableContainer, Paper, Grid, styled, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Header from '../components/Header';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';


function ResultPage() {
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({});
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const reportId = location.state.reportId;
	const name = location.state?.name;
	const { amount, duration } = location.state || {};
	const stockNames = ['삼성전자', 'SK하이닉스', 'LG디스플레이', '카카오', '동국제약'];
	// 주식 정보 데이터
	const stockData = [
		{ name: '삼일제약', price: '6,250', change: '-2/19%' },
		{ name: '유한양행', price: '6,150', change: '-17.45%' },
		{ name: 'jb금융지주', price: '11,340', change: '+2.90%' },
	];
	useEffect(() => {
		const fetchReportData = async () => {
			try {
				const response = await axios.get(`api/v1/report/${reportId}`);
				console.log(response.data);
				// setReportData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		if (reportId) {
			fetchReportData();
		}
	}, [reportId]);


	return (
		<>
			<Header />

			<>
				<Grid
					sx={{
						margin: '30px 140px',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 3,
						justifyContent: 'space-around',
					}}>
					<Container>Hyeyeon Kim님의 포트폴리오

					</Container>
					{/* <StockStepper name={name} /> */}
					{/* <Container sx={{ width: '397px', borderRadius: '40px', padding: '30px 40px' }}>
						<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '25px' }}>{`${name}`}님의 최적 포트폴리오</Grid>
						<Grid sx={GridStyle}>
							<div>총 자산</div>
							<div style={InputStyle}>{amount}만원 이상</div>
						</Grid>
						<Grid sx={GridStyle}>
							<div>예상 배당금</div>
							<div style={InputStyle}>{duration}개월</div>
						</Grid>
					</Container> */}
					<Container sx={{ width: '803px', borderRadius: '20px', padding: '20px' }}>
						<Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
							<div style={{ fontWeight: 600, fontSize: 18 }}>추천 종목</div>
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>회사명</TableCell>
											<TableCell>주가</TableCell>
											<TableCell>변동률</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{stockData.map((stock, index) => (
											<TableRow key={index}>
												<TableCell>{stock.name}</TableCell>
												<TableCell>{stock.price}</TableCell>
												<TableCell>{stock.change}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>

					</Container>
				</Grid>

			</>

		</>
	);
}
const Container = styled(Grid)(() => ({
	background: '#fff',
	height: '250px',
}));

const GridStyle = {
	color: '#1D242A',
	display: 'flex',
	flexDirection: 'row',
	padding: '15px 30px',
};

const InputStyle = {
	fontSize: '17px',
	marginTop: '-4px',
	marginLeft: '20px',
	width: 'auto',
	background: 'rgba(0, 0, 0, 0.10)',
	color: '#7B7B7B',
	borderRadius: '7px',
	padding: '5px 11px',
	textAlign: 'center',
};
const TableStyle = styled(TableCell)(() => ({
	borderBottom: '1px solid #999',
	fontWeight: 'bold',
	fontSize: 17,
}));

const ButtonStyle = {
	display: 'flex',
	background: '#3671ba',
	color: '#fff',
	borderRadius: '10px',
	justifyContent: 'center',
	padding: '5px 13px',
	marginRight: '20px',
	'&:hover': {
		background: '#3671ba',
	},
};

export default ResultPage;
