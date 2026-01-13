import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Services', href: '/services' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40 border-b border-primary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <img src={logo} alt="HMS Pugal Technologies" className="h-12 w-auto" />
                            <div className="flex flex-col">
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-200 hover:text-primary",
                                    isActive(item.href) ? "text-primary font-bold" : "text-gray-600"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href="tel:+919443965064"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:scale-105"
                        >
                            <Phone className="w-4 h-4" />
                            Call Now
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block w-6 h-6" /> : <Menu className="block w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-primary transition-colors",
                                    isActive(item.href) ? "text-primary bg-blue-50" : "text-gray-700"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href="tel:+919443965064"
                            className="block w-full text-center mt-4 px-5 py-3 rounded-md font-medium text-white bg-primary hover:bg-primary/90"
                        >
                            Call +91 94439 65064
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
