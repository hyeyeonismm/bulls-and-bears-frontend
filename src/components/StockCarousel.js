import React from 'react';
import { Grid, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const StockCarousel = ({ data }) => {
	return (
		<Carousel showArrows={true} sx={{ marginBottom: '40px' }}>
			{data.map((item, index) => (
				<Grid
					sx={{ borderRadius: 20, border: '1px solid #ddd' }}
					key={index}
					elevation={3}
					style={{ padding: 20, margin: 10 }}>
					<Grid sx={{ paddingLeft: '30px' }}>
						<Grid sx={{ fontSize: 14, color: '#1D242A', marginBottom: '10px' }}>Rank: {item.rank}</Grid>
						<Grid sx={{ fontWeight: 700, fontSize: 18, marginBottom: '8px' }}>{item.stbd_nm}</Grid>
						<Grid sx={{ color: '#1d242a', fontSize: 14 }}>Stock Code: {item.stock_code}</Grid>
					</Grid>
				</Grid>
			))}
		</Carousel>
	);
};

export default StockCarousel;
