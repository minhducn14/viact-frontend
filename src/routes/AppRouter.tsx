import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmail from '../pages/Verifyemail';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
                <PrivateRoute>
                    <ProfilePage />
                </PrivateRoute>
            } />
            <Route path="/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            } />
            <Route path="/signup" element={
                <PublicRoute>
                    <RegisterPage />
                </PublicRoute>
            } />
            <Route path="/verify-email" element={
                <PublicRoute>
                    <VerifyEmail />
                </PublicRoute>
            } />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
