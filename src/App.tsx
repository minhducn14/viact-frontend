import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
}

export default App;
