
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validation might happen server-side, 
        // but for this simple implementation, we just store it and use it for API requests.
        // The API will reject requests if the password is wrong.
        if (password) {
            localStorage.setItem('adminPassword', password);
            navigate('/admin/dashboard');
        } else {
            setError('Please enter a password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                        <Lock className="w-8 h-8" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Login</h1>
                <p className="text-center text-slate-500 mb-8">Enter your secure password to verify access.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Access Dashboard
                    </button>
                    <div className="text-center mt-4">
                        <a href="/" className="text-sm text-slate-400 hover:text-slate-600">Back to Website</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
