import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useSearchParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.png';

export default function VerifyEmail() {
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const verifyEmail = async (token: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-email`, {
                token,
            });
            console.log('Email verification response:', response);
            setStatus('success');

        } catch (error: any) {
            console.error('Error verifying email:', error);
            setStatus('error');
        }
    };

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            verifyEmail(token);
        } else {
            setStatus('error');
            toast.error('No token provided');
        }
    }, []);

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'grid',
                placeItems: 'center',
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    padding: 4,
                    margin: 5,
                    borderRadius: 2,
                    boxShadow: 3,
                    minWidth: 300,
                    maxWidth: 400,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Email Verification
                </Typography>

                {status === 'pending' && (
                    <Typography variant="body1">Verifying your email...</Typography>
                )}

                {status === 'success' && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        <AlertTitle>Email verified successfully!</AlertTitle>
                        You can now log in.
                    </Alert>
                )}

                {status === 'error' && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <AlertTitle>Verification failed</AlertTitle>
                        The token is invalid or expired.
                    </Alert>
                )}

                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{
                        mt: 3,
                        backgroundColor: 'rgb(35, 182, 216)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(25, 150, 190)',
                        },
                    }}
                >
                    Back to Home
                </Button>
            </Box>
        </Box>
    );
}
