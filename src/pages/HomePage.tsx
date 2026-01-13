import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, Shield, Zap, Award, CheckCircle } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="text-sm font-medium tracking-wider uppercase text-white/90">Premium Sales & Service in Trichy</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up delay-100">
                        Billing Machines, CCTV & <br className="hidden md:block" />
                        <span className="text-primary">Office Automation</span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
                        Fast installation | Affordable price | Trusted service
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                        <a href="tel:+919443965064" className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105">
                            <Phone className="w-5 h-5" /> Call Now
                        </a>
                        <a href="https://wa.me/919443965064" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#20bd5a] transition-transform hover:scale-105">
                            <MessageCircle className="w-5 h-5" /> WhatsApp Now
                        </a>
                        <Link to="/contact" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-slate-900 transition-colors">
                            Get Quote
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <Shield className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Trusted Service</h3>
                            <p className="text-slate-600">Years of experience serving businesses in Trichy with reliable and honest solutions.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <Zap className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Quick Support</h3>
                            <p className="text-slate-600">Fast response times for installation and maintenance to keep your business running.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <Award className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Genuine Products</h3>
                            <p className="text-slate-600">We deal only with branded, high-quality machines ensuring long life and durability.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Premium <span className="text-primary">Products</span></h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Top-quality equipment to streamline your business operations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Billing Machines", desc: "Fast thermal printing POS systems.", bg: "bg-blue-50" },
                            { title: "CCTV Cameras", desc: "HD Surveillance for security.", bg: "bg-slate-50" },
                            { title: "Note Counters", desc: "Accurate cash counting machines.", bg: "bg-yellow-50" },
                            { title: "Weighing Scale", desc: "Digital scales for retail.", bg: "bg-green-50" }
                        ].map((item, idx) => (
                            <div key={idx} className={`group p-6 rounded-2xl ${item.bg} hover:shadow-lg transition-all`}>
                                <div className="aspect-[4/3] bg-white/50 rounded-xl mb-6 flex items-center justify-center text-slate-400 font-medium">
                                    Product Image
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 mb-4">{item.desc}</p>
                                <Link to="/products" className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                    View Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Service <br /> <span className="text-secondary">Solutions</span></h2>
                            <p className="text-slate-400 text-lg mb-8">We don't just sell; we support. Our expert technicians are ready to assist you with installation, repair, and maintenance.</p>

                            <ul className="space-y-4 mb-8">
                                {['Installation & Setup', 'Repair & Maintenance', 'Software Support', 'Paper Roll Supply'].map((service, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6 text-secondary" />
                                        <span className="text-lg">{service}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/services" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                                Explore Our Services
                            </Link>
                        </div>
                        <div className="md:w-1/2 bg-slate-800 rounded-2xl p-8 border border-slate-700">
                            {/* Placeholder for Service Image/Icon */}
                            <div className="w-full h-64 bg-slate-700/50 rounded-xl flex items-center justify-center text-slate-500">
                                Service Illustration
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enquiry Form */}
            <section className="py-20 bg-white" id="enquiry">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto block p-8 md:p-12 bg-white rounded-2xl shadow-xl border border-slate-100">
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Get a Free Quote</h2>
                        <p className="text-center text-slate-500 mb-8">Fill out the form below and we will contact you shortly.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input type="tel" className="w-full px-4 py-3 rounded-lg bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+91 98765 43210" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Interested Product</label>
                                <select className="w-full px-4 py-3 rounded-lg bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                                    <option>Select a product...</option>
                                    <option>Billing Machine</option>
                                    <option>CCTV Camera</option>
                                    <option>Cash Counting Machine</option>
                                    <option>Weighing Machine</option>
                                    <option>Printers</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea className="w-full px-4 py-3 rounded-lg bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-32" placeholder="Tell us your requirements..."></textarea>
                            </div>
                            <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Submit Enquiry
                            </button>
                            <p className="text-xs text-center text-slate-400">
                                We respect your privacy. No spam.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
