import React from 'react';
import { Dialog, Fade, Alert, AlertTitle } from '@mui/material';

function StartModal({ open, handleClose, message }) {
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={Fade} sx={{ height: '200px' }}>
			<Alert severity='error' onClose={handleClose} sx={{ width: 500, height: 80, alignItems: 'center' }}>
				<AlertTitle>Error</AlertTitle>
				{message}
			</Alert>
		</Dialog>
	);
}

export default StartModal;
