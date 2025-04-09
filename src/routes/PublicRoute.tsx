import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
    children: React.ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
