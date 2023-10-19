import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack, Grid } from '@mui/material';
import Close from '@mui/icons-material/CloseRounded';

function AboutStock({ open, onClose }) {
	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Body alignItems='center' spacing={2}>
					<>
						<CloseButton onClick={onClose} title='닫기' />
						<Title>💰 삼일제약 (000520)</Title>
						<Grid sx={{ lineHeight: 1.8, margin: '20px' }}>
							<div>
								최종 금액은 6,250원입니다.
								<br />
								같은 기간동안 시장의 수익률은 117.05%로 <br />
								시장보다 낮은 수익률을 기록했을 뿐만 아니라
								<br />
								최대 낙폭이 81.02%로 같은 기간 시장 최대 낙폭 24.80%보다 높아 리스크까지 컸습니다. <br />
								<div style={{ color: 'red' }}>실제 투자를 실행하기 전에 신중함이 필요합니다.</div>
							</div>
						</Grid>
					</>
				</Body>
			</Modal>
		</>
	);
}

const Title = styled(Box)(() => ({
	paddingTop: '10px',
	paddingBottom: '20px',
	fontFamily: 'PretendardB',
	fontSize: 18,
	fontWeight: 700,
}));

const Body = styled(Stack)(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '380px',
	overflowX: 'hidden',
	overflowY: 'auto',
	backgroundColor: 'white',
	borderRadius: '10px',
	boxShadow: '0 10px 50px rgb(70, 70, 70)',
	padding: '20px 30px 40px 30px',
}));

const CloseButton = styled(Close)(() => ({
	position: 'absolute',
	right: 20,
	cursor: 'pointer',
	color: 'grey',
	fontSize: 26,
	'&:hover': {
		color: 'lightgrey',
	},
}));

const SubTitle = styled(Box)(() => ({
	fontFamily: 'PretendardM',
	fontSize: '16px',
}));

const CustomButton = styled(Button)(() => ({
	width: 140,
	fontFamily: 'PretendardM',
	fontSize: 14,
	boxShadow: 'none',
	backgroundColor: '#0094FF',
	borderRadius: 0,
	'&:hover': {
		backgroundColor: '#0094FF',
	},
}));

const PresentButton = styled(Button)(() => ({
	width: 250,
	padding: 10,
	marginTop: 50,
	fontFamily: 'PretendardM',
	fontSize: 16,
	boxShadow: 'none',
	color: 'white',
	backgroundColor: '#0094FF',
	'&:hover': {
		backgroundColor: '#34ABFF',
	},
}));

export default AboutStock;
