import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, styled, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import Header from '../components/Header';

function IssuePage() {
	// useEffect(() => {
	// 	var myHeaders = new Headers();
	// 	myHeaders.append('apiKey', 'apiKey-value');

	// 	var requestOptions = {
	// 		method: 'GET',
	// 		headers: myHeaders,
	// 		redirect: 'follow',
	// 	};

	// 	fetch('https://gapi.shinhansec.com:8443/openapi/v1.0/ranking/rising', requestOptions)
	// 		.then((response) => console.log(response))
	// 		.then((result) => console.log(result))
	// 		.catch((error) => console.log('error', error));
	// });

	return (
		<>
			<Header />
		</>
	);
}
export default IssuePage;
