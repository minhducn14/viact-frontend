import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import backgroundImage from '../assets/background.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
    id: number;
    company: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string;
}

export default function ProfilePage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Profile response:', res.data);

                setProfile(res.data);
                console.log('Profile data:', profile);
            } catch (err: any) {
                const msg = err.response?.data?.message || 'Failed to fetch profile';
                setError(msg);

                if (err.response?.status === 401) {
                    logout();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [logout, navigate]);

    useEffect(() => {
        if (profile) {
            console.log("✅ Profile đã cập nhật:", profile);
        }
    }, [profile]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <>
                        <Typography variant="h5" color='black'>Your Profile</Typography>
                        <Typography mt={2} color='black'>First Name: {profile?.firstName} </Typography>
                        <Typography color='black'>Last Name: {profile?.lastName}</Typography>
                        <Typography mt={2} color='black'>Username: {profile?.username}</Typography>
                        <Typography color='black'>Email: {profile?.email}</Typography>
                        <Typography color='black'>Company: {profile?.company}</Typography>
                        <Typography color='black'>Phone: {profile?.phone || 'N/A'}</Typography>

                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginTop: 3 }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </Box>
        </Box >
    );
}
