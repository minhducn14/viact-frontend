import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    PropsWithChildren,
} from 'react';

interface User {
    id: number;
    company: string;
    firstName: string;
    lastName: string;
    username: string;

}

interface AuthContextType {
    user: User | null;
    login: (userData: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                const parsedUser: User = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error("Invalid user data in localStorage");
                localStorage.removeItem('user');
            }
        }

        setLoading(false);
    }, []);

    const login = (userData: User, accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log("User logged in:", userData);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
