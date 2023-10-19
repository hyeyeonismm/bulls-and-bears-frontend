import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, styled, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Header from '../components/Header';
import AboutStock from '../components/AboutStock';
import axios from 'axios';

function cleanString(str) {
	return str.replace(/\r\n\t/g, '');
}

function determineColor(stock, index) {
	// You can set your logic here. For the sake of this example,
	// I'm just alternating colors based on the index.
	// You could also use properties of the stock like stock.price, stock.amount, etc.
	return index % 2 === 0 ? '#f4cccc' : '#ccccf4';
}

function ResultPage() {
	const location = useLocation();
	const reportId = location.state.reportId;
	const name = new URLSearchParams(location.search).get('name');
	const [contents, setContents] = useState([]);
	const [reportData, setReportData] = useState([]);
	const [open, setOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleRowClick = (name) => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchReportData = async () => {
			try {
				const response = await axios.get(`api/v1/report/${reportId}`);
				setReportData(response.data.stockGroupInfoList[0].stockInfoList);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchData = async () => {
			try {
				const response = await axios.get('/api/v1/sinhan');
				const contentString = cleanString(response.data.dataBody.list[0].content);
				const contentArray = contentString.split('-').map((item) => item.trim());
				setContents(contentArray);
			} catch (error) {
				console.log(error);
			}
		};

		if (reportId) {
			fetchReportData();
		}
		fetchData();
	}, [reportId]);

	return (
		<>
			<Header />
			<>
				<Grid sx={{ margin: '30px 120px' }}>
					<Grid>
						<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '15px', marginLeft: '25px' }}>
							{name}님의 최적 포트폴리오
						</Grid>
						<Grid sx={{ height: '200px', padding: '30px 40px' }}>
							<Grid
								sx={{
									color: '#1D242A',
									display: 'flex',
									flexDirection: 'column',
									paddingTop: '0px',
									paddingLeft: '20px',
									paddingRight: '20px',
								}}>
								<div>
									{reportData.map((stock, index) => (
										<div key={index}>
											<Grid
												sx={{
													textAlign: 'center',
													background: determineColor(stock, index),
													borderRadius: 100,
													paddingTop: '40px',
													marginBottom: '8px',
													width: '130px',
													height: '130px',
												}}>
												<div>{stock.stockName}</div>
												<div>{stock.amount}주</div>
											</Grid>
										</div>
									))}
								</div>
							</Grid>
						</Grid>
					</Grid>

					<Grid sx={{ alignItems: 'center', marginTop: '30px', display: 'flex', flexDirection: 'row', gap: 8 }}>
						<Grid>
							<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '15px', marginLeft: '25px' }}>추천 종목</Grid>
							<Container sx={{ width: '703px', height: '260px', borderRadius: '20px', padding: '20px' }}>
								<Grid sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
									<div style={{ maxHeight: '190px', marginTop: '8px' }}>
										<Table sx={{ minWidth: 650 }} aria-label='stock table'>
											<TableHead>
												<TableRow sx={{ fontWeight: 600 }}>
													<TableStyle>종목</TableStyle>
													<TableStyle>수량</TableStyle>
													<TableStyle align='right'>종가</TableStyle>
													<TableStyle align='right'>배당금</TableStyle>
												</TableRow>
											</TableHead>
											<TableBody>
												{reportData.map((stock, index) => (
													<TableRow
														key={index}
														sx={{
															cursor: 'pointer',
															'&:hover': { backgroundColor: '#f0f0f0' },
															'&:active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
														}}>
														<TableCell>{stock.stockName}</TableCell>
														<TableCell>{stock.amount}주</TableCell>
														<TableCell align='right'>{stock.price}원</TableCell>
														<TableCell align='right'>{stock.dividend}원</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</Grid>
							</Container>
						</Grid>
						<Grid>
							<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '15px' }}>마켓 이슈</Grid>
							<Grid
								sx={{
									width: '450px',
									height: '260px',
									padding: '10px 20px',
									border: '1px solid #ddd',
									borderRadius: '20px',
									overflow: 'hidden',
								}}>
								<Carousel autoPlay={true} navButtonsAlwaysVisible={true}>
									{contents.slice(0, 8).map((content, index) => (
										<Grid key={index}>
											<Grid sx={{ padding: '60px 20px', margin: '30px', width: '350px', height: '200px' }}>{content}</Grid>
										</Grid>
									))}
								</Carousel>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<AboutStock open={isModalOpen} onClose={() => setIsModalOpen(false)} />
			</>
		</>
	);
}
const Container = styled(Grid)(() => ({
	background: '#fff',
	height: '200px',
}));

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
