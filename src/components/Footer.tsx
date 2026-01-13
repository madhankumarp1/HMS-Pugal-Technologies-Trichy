import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            HMS <span className="text-secondary">Pugal</span>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Leading provider of billing machines, security systems, and office automation solutions in Trichy. Committed to quality sales and trusted after-sales service.
                        </p>
                    </div>

                    {/* Business Hours & Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-slate-400 hover:text-secondary transition-colors">Home</Link></li>
                            <li><Link to="/products" className="text-slate-400 hover:text-secondary transition-colors">Our Products</Link></li>
                            <li><Link to="/services" className="text-slate-400 hover:text-secondary transition-colors">Services</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-secondary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-slate-400 hover:text-secondary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400">
                                <Phone className="w-5 h-5 text-secondary shrink-0 mt-1" />
                                <div>
                                    <a href="tel:+919443965064" className="hover:text-white block">94439 65064</a>
                                    <a href="tel:+919487765064" className="hover:text-white block">94877 65064</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <Mail className="w-5 h-5 text-secondary shrink-0 mt-1" />
                                <a href="mailto:pugaltech@gmail.com" className="hover:text-white">pugaltech@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                                <span className="leading-relaxed">
                                    26/1, Iyyappan Nagar,<br />
                                    Iyyal Nagar Main Road,<br />
                                    Ariyamangalam, Trichy – 620010
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Location Map Placeholder or Social */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Visit Us</h4>
                        <div className="w-full h-40 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 mb-4 border border-slate-700 hover:border-secondary transition-colors">
                            {/* Embed Google Map Iframe would go here in real version */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.665725797371!2d78.7296068748058!3d10.83685998931566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5dec2306911%3A0xe542868725832e84!2sHMS%20Pugal%20Technologies!5e0!3m2!1sen!2sin!4v1710345678901!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '0.5rem' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} HMS Pugal Technologies. All rights reserved.
                    </p>
                    <p className="text-slate-600 text-sm">
                        Designed for Business Excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
}
