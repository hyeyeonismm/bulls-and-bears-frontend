import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Modal, Stack, Avatar, TextField, InputAdornment } from '@mui/material';
import Close from '@mui/icons-material/CloseRounded';

function Dividend({ open, onClose, name }) {
	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Body alignItems='center' spacing={2}>
					<>
						<CloseButton onClick={onClose} title='닫기' />
						<Grid sx={{ padding: '25px' }}>
							<Title>💡 배당금이란?</Title>
							<Grid sx={{ lineHeight: 1.8 }}>
								<strong>배당금</strong>이란 주식회사가 돈을 벌었을 때, <br />
								<strong>그 중 일부를 주주들에게 나눠주는 돈</strong>이예요.
								<br />
								예를 들어, 친구 네 명이 함께 레모네이드 가게를 운영하며 레모네이드를 팔아 돈을 벌었다고 생각해보세요.
								<br />
								<br />
								번 돈 중 일부를 나눠 가져가기로 했다면,
								<br /> 그 나눠진 돈이 바로 배당금입니다!
								<br />
								즉, <strong>{name}님이 보유하고 있는 주식의 회사가 돈을 벌면 그 중 일부를 주는 것</strong>이 배당금이예요!
							</Grid>
						</Grid>
					</>
				</Body>
			</Modal>
		</>
	);
}

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

const Title = styled(Grid)(() => ({
	paddingTop: '10px',
	paddingBottom: '25px',
	fontSize: 18,
	fontWeight: 700,
}));

export default Dividend;
