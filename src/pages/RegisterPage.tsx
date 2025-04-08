import * as React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Link,
    Typography
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import axios from 'axios';
import { toast } from 'react-toastify';

import backgroundImage from '../assets/background.png';
import LogoWithTagline from '../components/LogoWithTagline';
import TextFieldCustom from '../components/TextFieldCustom';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [openTerms, setOpenTerms] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const [formData, setFormData] = React.useState({
        company: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = React.useState({
        company: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleShowPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(event.target.checked);
    };

    const isValidPassword = (password: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    const isEmailValid = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const isPhoneValid = (phone: string): boolean => {
        const regex = /^\+?[0-9]{9}$/;
        return regex.test(phone);
    }

    const isUsernameValid = (username: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]{4,}$/;
        return regex.test(username);
    }


    const isFormValid = () => {
        const requiredFields = ['company', 'firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword'];
        const hasEmptyField = requiredFields.some(
            (field) => formData[field as keyof typeof formData].trim() === ''
        );
        const passwordsMatch = formData.password === formData.confirmPassword;
        const passwordValid = isValidPassword(formData.password);
        const emailValid = isEmailValid(formData.email);
        const phoneValid = formData.phone ? isPhoneValid(formData.phone) : true;
        const usernameValid = isUsernameValid(formData.username);
        return !hasEmptyField && passwordsMatch && passwordValid && emailValid && phoneValid && usernameValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormValid()) {
            return;
        }
        try {

            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
                company: formData.company,
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                phone: formData.phone ? formData.phone : null,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            if (response.status === 201) {
                setOpenSuccess(true);
            } else {
                setError(response.data.message);
                toast.error(error);
            }
        } catch (error: any) {
            console.error('Error during registration:', error);
            const errorMessage = error.response?.data?.message || error.response?.error || 'Registration failed';
            setError(errorMessage);
            toast.error(errorMessage);
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
                    display: 'flex',
                    justifyContent: 'center',
                    width: '60%',
                    padding: 5,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 3,
                    margin: 5,
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                <Box sx={{ flex: 1, paddingRight: { md: 3 }, height: '100%' }}>
                    <LogoWithTagline />
                    <Typography sx={{ mt: 3, color: 'black' }}>CREATE NEW ACCOUNT</Typography>
                    <Typography sx={{ color: 'rgb(235, 87, 87)', fontWeight: 'bold', mb: 2 }}>
                        Build smart risk free
                    </Typography>
                    <ul style={{ fontSize: 16, color: 'black', paddingLeft: 20 }}>
                        <li style={{ marginBottom: 30, textAlign: 'left' }}>
                            Understand why Viact is being used on millions of customers everyday
                        </li>
                        <li style={{ marginBottom: 30, textAlign: 'left' }}>
                            Find out if Viact is the right fit for your business
                        </li>
                        <li style={{ marginBottom: 30, textAlign: 'left' }}>
                            Get all your questions answered (personally)
                        </li>
                        <li style={{ marginBottom: 30, textAlign: 'left' }}>
                            Completely risk-free with 14-day free trial and a 30-day money back guarantee!
                        </li>
                    </ul>
                </Box>

                <Box
                    sx={{
                        width: '1px',
                        backgroundColor: '#ccc',
                        mx: 3,
                        display: { xs: 'none', md: 'block' },
                    }}
                />

                <Box sx={{ flex: 1 }}>
                    <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextFieldCustom id="company" name="company" label="Company *" value={formData.company} onChange={handleChange} error={errors.company} />
                        <TextFieldCustom id="firstName" name="firstName" label="First Name *" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                        <TextFieldCustom id="lastName" name="lastName" label="Last Name *" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
                        <TextFieldCustom id="username" name="username" label="Username *" value={formData.username} onChange={handleChange}
                            error={
                                formData.username && !isUsernameValid(formData.username)
                                    ? 'Must be at least 4 characters long and can only contain letters, numbers, dots, underscores, and hyphens'
                                    : ''
                            } />
                        <TextFieldCustom id="email" name="email" label="Email *" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                        <MuiTelInput
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formData.phone}
                            onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                            fullWidth
                            defaultCountry="VN"
                            sx={{ mt: 2 }}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                        />
                        <TextFieldCustom
                            id="password"
                            name="password"
                            label="Password *"
                            value={formData.password}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            error={
                                formData.password && !isValidPassword(formData.password)
                                    ? 'Must contain at least 8 characters, a combination of upper, lower case, number and least one special character'
                                    : ''
                            }
                        />
                        <TextFieldCustom
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password *"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            error={
                                formData.confirmPassword && formData.confirmPassword !== formData.password
                                    ? 'Passwords do not match'
                                    : ''
                            }
                        />

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
                            label={<Typography sx={{ color: 'black', fontSize: 12 }}>Show Password</Typography>}
                            sx={{ marginLeft: 0, flexGrow: 1 }}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            disabled={!isFormValid()}
                            sx={{
                                backgroundColor: isFormValid() ? 'rgb(235, 87, 87)' : '#ccc',
                                color: '#fff',
                                mt: 2,
                                fontWeight: 600,
                            }}
                        >
                            SIGN UP
                        </Button>
                    </FormControl>

                    <Typography sx={{ color: 'black', marginTop: 3, fontSize: 12 }} variant="body2">
                        By clicking Sign up or Continue with Google, you agree to viAct’s{' '}
                        <Link component="button" underline="none" onClick={() => setOpenTerms(true)} sx={{ display: 'inline-block' }}>
                            <Typography
                                component="span"
                                sx={{
                                    color: 'rgb(235, 87, 87)',
                                    fontWeight: 700,
                                    display: 'inline',
                                    fontSize: 12,
                                }}
                            >
                                Terms and Conditions for Free Trial.
                            </Typography>
                        </Link>
                    </Typography>

                    <Typography sx={{ color: 'black', marginTop: 3, fontSize: 12 }} variant="body2">
                        Already have an account?{' '}
                        <Link href="/login" underline="none" sx={{ display: 'inline-block' }}>
                            <Typography
                                component="span"
                                sx={{
                                    color: 'rgb(235, 87, 87)',
                                    fontWeight: 700,
                                    display: 'inline',
                                    fontSize: 12,
                                }}
                            >
                                Log In.
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Box>

            <Dialog open={openTerms} onClose={() => setOpenTerms(false)} maxWidth="md" fullWidth>
                <DialogTitle>viAct’s Terms and Conditions for Free Trial</DialogTitle>
                <DialogContent dividers sx={{ typography: 'body1' }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                        Last updated April 9, 2020
                    </Typography>
                    <Typography fontWeight="bold" mt={2} mb={5}>AGREEMENT TO TERMS</Typography>
                    <Typography sx={{ color: 'black', fontSize: 14 }}>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity and VIACT, concerning your access to and use of the free trial.
                        <br />
                        <br />

                        You agree that by accessing the free trial, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the free trial and you must discontinue use immediately.
                        <br />
                        <br />

                        We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.
                        <br />
                        <br />

                        We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions, and you waive any right to receive specific notice of each such change.
                        <br />
                        <br />

                        It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the free trial after the date such revised Terms and Conditions are posted.
                        <br />
                        <br />

                        The information provided on the free trial is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
                        <br />
                        <br />

                        Accordingly, those persons who choose to access the free trial from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpenTerms(false)} sx={{ backgroundColor: '#00BFD8' }}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)} maxWidth="md" fullWidth>
                <DialogContent dividers sx={{
                    typography: 'body1', justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box
                        width={'90%'}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <LogoWithTagline />
                        </Box>
                    </Box>

                    <Typography fontWeight="bold" mt={2} mb={5}>Account Registration Confirmation</Typography>
                    <Typography sx={{ color: 'black', fontSize: 14 }}>
                        An confirmation email have been sent to your email. Please check and follow the instructions in the email to activate your account and start using Viact.
                        <br />
                        <br />

                        Please make sure to check your notification email and spam folders in case you don't see the verification email.
                        <br />
                        <br />

                        Please check your notification email or spam folder regularly for updates. Still having trouble?

                        Accordingly, those persons who choose to access the free trial from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                        <br />
                        <br />
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Button variant="contained" onClick={() => setOpenSuccess(false)} sx={{
                            color: 'white',
                            backgroundColor: '#00BFD8',
                            '& .MuiInputLabel-root:hover': {
                                backgroundColor: 'rgb(185, 185, 185)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgb(185, 185, 185)'
                            },
                            width: '40%',
                            border: 'none',
                            outline: 'none',
                            marginBottom: 2,
                        }}>
                            I GOT IT
                        </Button>

                        <Button variant="contained" onClick={() => setOpenSuccess(false)} sx={{
                            backgroundColor: 'white',
                            '& .MuiInputLabel-root:hover': {
                                color: 'rgb(185, 185, 185)',
                            },
                            color: 'black',
                            outline: 'none',
                            border: 'none',
                            width: '30%',
                            marginBottom: 2,
                            shadow: 'none',
                        }}>
                            <Link href="/" underline="none" sx={{ display: 'inline-block' }}>
                                <Typography
                                    component="span"
                                    sx={{
                                        color: 'black',
                                        display: 'inline',
                                        textDecoration: 'underline',
                                        fontSize: 12,
                                        fontWeight: 700,
                                    }}
                                >
                                    Back to home
                                </Typography>
                            </Link>
                        </Button>
                    </Box>
                </DialogContent>

            </Dialog >
        </Box >
    );
}
