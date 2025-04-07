import { Stack, Typography } from '@mui/material';
import logo from '../assets/logo.png';

export default function LogoWithTagline() {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <img src={logo} alt="Logo" style={{ width: '75%', height: 'auto' }} />
            <Typography sx={{ whiteSpace: 'pre-line', textAlign: 'left', color: 'red' }}>
                Automate<br />
                Construction<br />
                Monitorings
            </Typography>
        </Stack>
    );
}
