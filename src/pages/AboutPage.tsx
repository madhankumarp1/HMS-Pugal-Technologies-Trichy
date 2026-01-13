export default function AboutPage() {
    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
                {/* Intro */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">About HMS Pugal Technologies</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Based in the heart of **Trichy**, HMS Pugal Technologies has established itself as a trusted name in the field of retail automation and security solutions. We specialize in providing state-of-the-art technology to help local businesses grow.
                    </p>
                </div>

                {/* Mission/Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
                    <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center text-slate-400 font-medium text-xl">
                        Office / Team Image
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            To empower businesses in Trichy and surrounding districts with reliable, affordable, and advanced technological solutions that improve efficiency and security.
                        </p>

                        <h2 className="text-2xl font-bold text-primary mb-4">Why We Are Different</h2>
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex gap-3">
                                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span>
                                <span><strong>Customer First:</strong> We prioritize your needs and budget over making a quick sale.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span>
                                <span><strong>Technical Expertise:</strong> Our team is trained to handle complex installations and repairs.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span>
                                <span><strong>Local Presence:</strong> Being local to Trichy means we can reach you quickly when you need us.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Stats or address summary */}
                <div className="border-t border-slate-100 pt-16">
                    <h2 className="text-2xl font-bold text-center mb-12">Serving Trichy & Tamil Nadu</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['Tiruchirappalli', 'Thanjavur', 'Pudukkottai', 'Perambalur', 'Ariyalur'].map(city => (
                            <span key={city} className="px-6 py-2 bg-slate-50 rounded-full text-slate-600 font-medium border border-slate-100">
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
