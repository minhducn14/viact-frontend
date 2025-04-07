import * as React from 'react';
import backgroundImage from '../assets/background.png';
import AuthTextField from '../components/AuthTextField';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LogoWithTagline from '../components/LogoWithTagline';

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Link,
    Stack,
    Typography,
} from '@mui/material';

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateForm()) {
            console.log({
                email: formData.emailOrUsername,
                password: formData.password,
            });
            // TODO: Gọi API login tại đây
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    minWidth: 300,
                    maxWidth: 400,
                    textAlign: 'center',
                }}
            >
                <LogoWithTagline />

                <Typography sx={{ color: 'black', textTransform: 'uppercase', fontSize: 16 }}>
                    Login
                </Typography>
                <Typography sx={{ color: 'rgb(235, 87, 87)', fontSize: 20, fontWeight: 700 }}>
                    Welcome Back
                </Typography>

                <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <AuthTextField
                        id="emailOrUsername"
                        name="emailOrUsername"
                        label="Email or Username"
                        value={formData.emailOrUsername}
                        error={errors.emailOrUsername}
                        onChange={handleInputChange}
                    />

                    <AuthTextField
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

                <GoogleLoginButton onClick={() => console.log('Login with Google clicked')} />

                <Typography sx={{ color: 'black', marginTop: 3, fontSize: 13 }} variant="body2">
                    Not on Viact yet?{' '}
                    <Link href="/sign-up" underline="none" sx={{ display: 'inline-block' }}>
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
        </Box>
    );
}
