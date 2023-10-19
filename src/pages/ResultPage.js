import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
	TableContainer,
	Paper,
	Grid,
	styled,
	Button,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Header from '../components/Header';
import StockCarousel from '../components/StockCarousel';
import AboutStock from '../components/AboutStock';
import axios from 'axios';

function ResultPage() {
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({});
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const reportId = location.state.reportId;
	const name = location.state?.name;
	const { amount, duration } = location.state || {};

	// State to store the selected stock name
	const [selectedStockName, setSelectedStockName] = useState('');

	// Handle row click to open the modal
	const [open, setOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleRowClick = (name) => {
		// 다른 로직...
		setIsModalOpen(true);
	};

	// Handle modal close
	const handleClose = () => {
		setOpen(false);
	};

	// 주식 정보 데이터
	const stockData = [
		{ name: '삼일제약', price: '6,250', change: '-2.19%' },
		{ name: '유한양행', price: '6,150', change: '-17.45%' },
		{ name: 'JB금융지주', price: '11,340', change: '+2.90%' },
	];

	const dataBody = [
		{
			rank: 1,
			stbd_nm: '에스코넥',
			stock_code: '096630',
		},
		{
			rank: 2,
			stbd_nm: '서남',
			stock_code: '294630',
		},
		{
			rank: 3,
			stbd_nm: '에스와이',
			stock_code: '109610',
		},
		{
			rank: 4,
			stbd_nm: '이미지스',
			stock_code: '115610',
		},
		{
			rank: 5,
			stbd_nm: '삼성중공업',
			stock_code: '010140',
		},
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
					{/* <StockStepper name={name} /> */}
					<Container sx={{ width: '427px', borderRadius: '40px', padding: '30px 40px' }}>
						<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '25px' }}>Hyeyeon Kim님의 최적 포트폴리오</Grid>
						{/* <Grid sx={GridStyle}>
							<div>총 자산</div>
							<div style={InputStyle}>{amount}만원 이상</div>
						</Grid>
						<Grid sx={GridStyle}>
							<div>예상 배당금</div>
							<div style={InputStyle}>{duration}개월</div>
						</Grid> */}
						<Grid
							sx={{
								color: '#1D242A',
								display: 'flex',
								flexDirection: 'column',
								paddingTop: '0px',
								paddingLeft: '20px',
								paddingRight: '20px',
							}}>
							<Grid sx={{ background: '#f4cccc', borderRadius: 20, padding: '20px', marginBottom: '8px' }}>삼일제약: 2주</Grid>
							<Grid sx={{ background: '#f9cb9c', borderRadius: 20, padding: '20px', marginBottom: '8px' }}>유한양행: 1주</Grid>
							<Grid sx={{ background: '#cfe2f3', borderRadius: 20, padding: '20px', marginBottom: '8px' }}>
								JB금융지주: 4주
							</Grid>
						</Grid>
					</Container>
					<Container sx={{ width: '803px', borderRadius: '20px', padding: '20px' }}>
						<Grid sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
							<div style={{ fontWeight: 600, fontSize: 18 }}>추천종목</div>

							<div style={{ maxHeight: '190px', marginTop: '8px' }}>
								<Table sx={{ minWidth: 650 }} aria-label='stock table'>
									<TableHead>
										<TableRow sx={{ fontWeight: 600 }}>
											<TableStyle>종목</TableStyle>
											<TableStyle align='right'>종가</TableStyle>
											<TableStyle align='right'>등락률</TableStyle>
										</TableRow>
									</TableHead>
									<TableBody>
										{stockData &&
											stockData.map((data, index) => (
												<TableRow
													key={index}
													sx={{
														cursor: 'pointer',
														'&:hover': { backgroundColor: '#f0f0f0' },
														'&:active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
													}}
													onClick={() => handleRowClick(data.name)}>
													<TableCell>{data.name}</TableCell>
													<TableCell align='right'>{data.price}원</TableCell>
													<TableCell
														align='right'
														style={{
															color: parseFloat(data.change) >= 0 ? 'red' : 'blue',
														}}>
														{data.change}
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</div>
						</Grid>
					</Container>
				</Grid>
				<Grid sx={{ marginTop: '40px', marginLeft: '150px', marginRight: '150px' }}>
					<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '25px' }}>시장 상위 종목</Grid>
					<StockCarousel data={dataBody} />
				</Grid>

				<AboutStock open={isModalOpen} onClose={() => setIsModalOpen(false)} />
			</>
		</>
	);
}
const Container = styled(Grid)(() => ({
	background: '#fff',
	height: '300px',
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
