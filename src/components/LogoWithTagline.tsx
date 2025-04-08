import { Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import logo from '../assets/logo.png';

export default function LogoWithTagline() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent="center"
            sx={{
                width: '100%',
                textAlign: isMobile ? 'center' : 'left',
            }}
        >
            <img
                src={logo}
                alt="Logo"
                style={{
                    width: isMobile ? '30%' : '50%',
                    height: 'auto',
                }}
            />
            <Typography
                sx={{
                    whiteSpace: 'pre-line',
                    color: 'red',
                    fontSize: { xs: 14, sm: 16, md: 18 },
                    textAlign: isMobile ? 'center' : 'left',
                }}
            >
                Automate{'\n'}
                Construction{'\n'}
                Monitorings
            </Typography>
        </Stack>
    );
}
