import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Headers from '../components/Header.js';
import { Grid, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function MyPage() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const name = queryParams.get('name');

	const [userData, setUserData] = useState([]);
	const [reportList, setReportList] = useState([]); // reportList state 추가
	const [page, setPage] = useState(1);
	const [dataToShow, setDataToShow] = useState([]);

	const LAST_PAGE = reportList.length % 5 === 0 ? parseInt(reportList.length / 5) : parseInt(reportList.length / 5) + 1;

	useEffect(() => {
		console.log(name);
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/v1/mypage?name=' + encodeURIComponent(name), {
					withCredentials: true,
				});
				console.log(response.data.reportList);
				setUserData(response.data);
				setReportList(response.data.reportList);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		if (name) {
			fetchData();
		}
	}, [name]);

	useEffect(() => {
		if (page === LAST_PAGE) {
			setDataToShow(reportList.slice(5 * (page - 1)));
		} else {
			setDataToShow(reportList.slice(5 * (page - 1), 5 * (page - 1) + 5));
		}
	}, [page, LAST_PAGE, reportList]);

	return (
		<>
			<Headers />
			<Grid sx={{ margin: '0px 120px' }}>
				<Typography variant='h5' gutterBottom>
					{userData.username}
				</Typography>

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Report ID</TableCell>
							<TableCell>Stock Name</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Dividend</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataToShow.map((report) =>
							report.stockGroupInfoList.map((group, groupIndex) =>
								group.stockInfoList.map((stock, stockIndex) => (
									<TableRow key={`${report.reportId}-${stockIndex}`}>
										<TableCell>{report.reportId}</TableCell>
										<TableCell>{stock.stockName}</TableCell>
										<TableCell>{stock.amount}</TableCell>
										<TableCell>{stock.price}</TableCell>
										<TableCell>{stock.dividend}</TableCell>
									</TableRow>
								)),
							),
						)}
					</TableBody>
				</Table>

				<div className='pagination'>
					<Button
						variant='contained'
						color='primary'
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
						disabled={page === 1}>
						이전
					</Button>

					<Typography variant='body1' display='inline' style={{ margin: '0 10px' }}>
						{page} / {LAST_PAGE}
					</Typography>

					<Button
						variant='contained'
						color='primary'
						onClick={() => setPage((prev) => Math.min(prev + 1, LAST_PAGE))}
						disabled={page === LAST_PAGE}>
						다음
					</Button>
				</div>
			</Grid>
		</>
	);
}

export default MyPage;
