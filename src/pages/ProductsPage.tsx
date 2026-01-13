import { Check } from 'lucide-react';

export default function ProductsPage() {
    const products = [
        {
            category: "Billing Solutions",
            items: [
                { name: "Billing Machine (POS)", desc: "All-in-one touch POS systems for retail and restaurants." },
                { name: "Thermal Printers", desc: "High-speed 2-inch and 3-inch thermal receipt printers." },
                { name: "Bill Rolls", desc: "Premium quality thermal paper rolls in all sizes." },
                { name: "Billing Software", desc: "Easy-to-use software for inventory andGST billing." }
            ]
        },
        {
            category: "Security Systems",
            items: [
                { name: "CCTV Cameras", desc: "HD, IP, and Wireless cameras for home and business security." },
                { name: "DVR/NVR Systems", desc: "Reliable recording systems with remote viewing capabilities." },
                { name: "Biometric Attendance", desc: "Fingerprint and face recognition time attendance systems." }
            ]
        },
        {
            category: "Cash & Automation",
            items: [
                { name: "Cash Counting Machine", desc: "Accurate loose note counters with fake note detection." },
                { name: "Weighing Machines", desc: "Digital weighing scales for shops and industrial use." },
                { name: "Sealing Machines", desc: "Heat sealers for packaging efficiency." }
            ]
        }
    ];

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Our Product Range</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    Explore our comprehensive range of high-quality business automation and security products.
                </p>

                <div className="space-y-16">
                    {products.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-2xl font-bold text-primary mb-8 border-b border-gray-100 pb-2">{section.category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="border border-slate-100 rounded-xl p-6 hover:shadow-lg transition-shadow bg-slate-50">
                                        <div className="w-full h-40 bg-white rounded-lg mb-4 flex items-center justify-center text-slate-300">
                                            Product Image
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                                        <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                                        <ul className="text-sm text-slate-500 space-y-2">
                                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> In Stock</li>
                                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Warranty Available</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
