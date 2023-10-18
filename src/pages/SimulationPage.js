import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, styled, Button } from '@mui/material';
import Header from '../components/Header';

function SimulationPage() {
	const location = useLocation();
	const { amount, duration } = location.state || {};
	return (
		<>
			<Header />
			<Grid sx={{ fontSize: 20, fontWeight: 600, marginBottom: '25px' }}>님의 최적 포트폴리오</Grid>
		</>
	);
}
export default SimulationPage;
