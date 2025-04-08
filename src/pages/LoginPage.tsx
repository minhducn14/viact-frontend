import * as React from 'react';
import backgroundImage from '../assets/background.png';
import TextFieldCustom from '../components/TextFieldCustom';
import LogoWithTagline from '../components/LogoWithTagline';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        emailOrUsername: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({
        emailOrUsername: '',
        password: '',
    });

    const [loginError, setLoginError] = React.useState('');

    const handleShowPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(event.target.checked);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {
            emailOrUsername: '',
            password: '',
        };
        let isValid = true;

        if (!formData.emailOrUsername) {
            newErrors.emailOrUsername = 'Email or Username is required';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
                username: formData.emailOrUsername,
                password: formData.password,
            });
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

            } else {
                setLoginError(response.data.message);
                toast.error(loginError);
            }
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.message || 'Unauthorized.';
            setLoginError(errorMsg);
            toast.error(errorMsg);
        }


    };

    const handleGoogleLoginSuccess = async (credentialResponse: any) => {
        const credential = credentialResponse.credential;
        if (credential) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google-login`, {
                    idToken: credential
                });
                console.log(response);
                if (response.status === 201) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                }
            } catch (err: any) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Google login failed');
            }
        }
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
                <LogoWithTagline />
                {loginError && (
                    <Alert
                        severity="error"
                        icon={false}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 2,
                            border: '1px solid rgb(235, 87, 87)',
                        }}
                    >
                        <AlertTitle
                            sx={{
                                color: 'black',
                                width: '100%',
                                height: '100%',
                                padding: 0,
                                display: 'flex',
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 0,
                            }}
                        >
                            {loginError}
                        </AlertTitle>
                    </Alert>
                )}

                <Typography sx={{ color: 'black', textTransform: 'uppercase', fontSize: 16 }}>
                    Login
                </Typography>
                <Typography sx={{ color: 'rgb(235, 87, 87)', fontSize: 20, fontWeight: 700 }}>
                    Welcome Back
                </Typography>

                <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextFieldCustom
                        id="emailOrUsername"
                        name="emailOrUsername"
                        label="Email or Username"
                        value={formData.emailOrUsername}
                        error={errors.emailOrUsername}
                        onChange={handleInputChange}
                    />

                    <TextFieldCustom
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        error={errors.password}
                        onChange={handleInputChange}
                    />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%', marginTop: 1 }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showPassword}
                                    onChange={handleShowPasswordChange}
                                    size="small"
                                    sx={{
                                        '&.Mui-checked': { color: 'red' },
                                        paddingLeft: 0,
                                        paddingRight: 1,
                                        marginLeft: 0,
                                    }}
                                />
                            }
                            label={
                                <Typography sx={{ color: 'black', fontSize: 12 }}>
                                    Show Password
                                </Typography>
                            }
                            sx={{ marginLeft: 0, flexGrow: 1 }}
                        />

                        <Link href="#" underline="none">
                            <Typography sx={{ color: 'rgb(235, 87, 87)', fontSize: 12, fontWeight: 700 }}>
                                Forgot Password?
                            </Typography>
                        </Link>
                    </Stack>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'rgb(35, 182, 216)',
                            color: 'white',
                            width: '100%',
                            marginTop: 2,
                            '&:active': { border: 'none', outline: 'none' },
                            '&:focus': { border: 'none', outline: 'none' },
                            border: 'none',
                            outline: 'none',
                        }}
                        type="submit"
                    >
                        Login
                    </Button>
                </FormControl>

                <Typography sx={{ color: 'black', marginTop: 2 }} variant="body2">
                    OR
                </Typography>

                <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={() => console.warn("Google login popup might have been blocked.")}
                    />
                </Box>

                <Typography sx={{ color: 'black', marginTop: 3, fontSize: 13 }} variant="body2">
                    Not on Viact yet?{' '}
                    <Link href="/signup" underline="none" sx={{ display: 'inline-block' }}>
                        <Typography
                            component="span"
                            sx={{
                                color: 'rgb(235, 87, 87)',
                                fontWeight: 700,
                                display: 'inline',
                                fontSize: 16,
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Link>{' '}
                    now.
                </Typography>
            </Box>
        </Box >
    );
}
