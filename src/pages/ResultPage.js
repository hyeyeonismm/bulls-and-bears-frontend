import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, styled, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Header from '../components/Header';
import ApexCharts from 'react-apexcharts';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

function ResultPage() {
	const [stockData, setStockData] = useState();
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({});
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const reportId = location.state.reportId;
	const name = location.state?.name;
	const { amount, duration } = location.state || {};
	const stockNames = ['삼성전자', 'SK하이닉스', 'LG디스플레이', '카카오', '동국제약'];

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

	const handleTableClick = (data) => {
		const prices = data.data.response.body.items.item.map((item) => parseInt(item.clpr, 10));
		const dates = data.data.response.body.items.item.map((item) => {
			const year = item.basDt.substring(2, 4);
			const month = item.basDt.substring(4, 6);
			const day = item.basDt.substring(6, 8);
			return `${year}년 ${month}월 ${day}일`;
		});

		const xaxisDates = dates.map((date) => {
			return date.substring(0, date.length - 4);
		});

		const reversedDates = [...dates].reverse();
		const reversedXaxisDates = xaxisDates.reverse();
		const stockName = data.data.response.body.items.item[0].itmsNm;

		setSeries([{ name: stockName, data: prices.reverse() }]);
		setOptions({
			chart: { type: 'line', zoom: { enabled: false } },
			dataLabels: { enabled: false },
			stroke: { curve: 'straight' },
			title: {
				text: stockName,
				align: 'center',
				offsetX: 0,
				offsetY: 302,
			},
			tooltip: {
				enabled: true,
				intersect: false,
				x: {
					formatter: function (index) {
						return reversedDates[index - 1];
					},
				},
				y: {
					formatter: function (value) {
						return value + ' 원';
					},
				},
			},
			grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
			xaxis: {
				categories: reversedXaxisDates,
				tickAmount: 11,
				title: stockName,
			},
		});
	};

	return (
		<>
			<Header />
			{loading ? (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<BeatLoader color='#3f51b5' loading={loading} size={20} />
				</div>
			) : (
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
								<Button sx={ButtonStyle}>더보기</Button>
							</Grid>
							<div style={{ maxHeight: '190px', overflowY: 'auto', marginTop: '8px' }}>
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
													onClick={() => handleTableClick(data)}
													sx={{
														cursor: 'pointer',
														'&:hover': { backgroundColor: '#f0f0f0' },
														'&:active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
													}}>
													<TableCell>{data.data.response.body.items.item[0].itmsNm}</TableCell>
													<TableCell align='right'>
														{parseInt(data.data.response.body.items.item[0].clpr).toLocaleString('ko-KR')}원
													</TableCell>
													<TableCell
														align='right'
														style={{
															color: parseFloat(data.data.response.body.items.item[0].fltRt) >= 0 ? 'red' : 'blue',
														}}>
														{parseFloat(data.data.response.body.items.item[0].fltRt) >= 0 ? '+' : ''}
														{parseFloat(data.data.response.body.items.item[0].fltRt).toFixed(2)}%
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</div>
						</Container>
					</Grid>
					<Grid sx={{ margin: '30px 140px' }}>
						<div style={{ fontWeight: 600, fontSize: '20px', padding: '10px 20px' }}>주가 그래프</div>
						<Container sx={{ borderRadius: '20px', height: '350px' }}>
							<ApexCharts options={options} series={series} type='line' height={320} />
						</Container>
					</Grid>
				</>
			)}
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
