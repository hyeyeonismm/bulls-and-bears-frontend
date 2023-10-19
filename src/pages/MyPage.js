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

				// reportId 기준으로 데이터 내림차순 정렬
				const sortedReportList = response.data.reportList.sort((a, b) => b.reportId - a.reportId);

				setUserData(response.data);
				setReportList(sortedReportList);
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
			<Grid sx={{ margin: '60px 120px' }}>
				<Grid sx={{ textAlign: 'center', fontSize: 18, color: '#58606d' }}>
					{name}님이 생성했던 포트폴리오를 확인해보세요!
				</Grid>
			</Grid>
			<Grid sx={{ margin: '80px 120px' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Stock Name</TableCell>
							<TableCell align='center'>Amount</TableCell>
							<TableCell align='center'>Price</TableCell>
							<TableCell align='center'>Dividend</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataToShow.map((report) =>
							report.stockGroupInfoList.map((group) =>
								group.stockInfoList.map((stock, stockIndex) => (
									<TableRow key={`${report.reportId}-${stockIndex}`}>
										<TableCell align='center'>{stock.stockName}</TableCell>
										<TableCell align='center'>{stock.amount}</TableCell>
										<TableCell align='center'>{stock.price}</TableCell>
										<TableCell align='center'>{stock.dividend}</TableCell>
									</TableRow>
								)),
							),
						)}
					</TableBody>
				</Table>

				<Grid sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '15px' }}>
					<div className='pagination'>
						<Button
							variant='contained'
							style={{ background: '#3671ba' }}
							onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							disabled={page === 1}>
							이전
						</Button>

						<Typography variant='body1' display='inline' style={{ margin: '0 10px' }}>
							{page} / {LAST_PAGE}
						</Typography>

						<Button
							variant='contained'
							style={{ background: '#3671ba' }}
							onClick={() => setPage((prev) => Math.min(prev + 1, LAST_PAGE))}
							disabled={page === LAST_PAGE}>
							다음
						</Button>
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default MyPage;
