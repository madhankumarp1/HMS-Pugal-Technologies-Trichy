import { Wrench, Settings, Monitor, Package, Phone } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            icon: Wrench,
            title: "Installation & Setup",
            desc: "Professional on-site installation for CCTV, POS systems, and other machinery. We ensure everything is configured correctly for your specific needs."
        },
        {
            icon: Settings,
            title: "Repair & Maintenance",
            desc: "Quick diagnosis and repair services for all brands of billing machines and printers. We offer Annual Maintenance Contracts (AMC) for peace of mind."
        },
        {
            icon: Monitor,
            title: "Software Support",
            desc: "Training and troubleshooting for billing software. We help you manage inventory, GST, and reports efficiently."
        },
        {
            icon: Package,
            title: "Consumables Supply",
            desc: "Steady supply of high-quality thermal paper rolls, ribbons, and labels delivered to your doorstep."
        }
    ];

    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-slate-900 mb-8">Service & Support</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    We define ourselves by our service. Our relationship with clients begins after the sale.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((service, idx) => (
                        <div key={idx} className="flex gap-6 p-8 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all bg-slate-50">
                            <div className="shrink-0">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                                    <service.icon className="w-7 h-7" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-primary rounded-2xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Need Immediate Support?</h2>
                        <p className="text-blue-100 mb-8 text-lg">Our technicians are just a phone call away.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="tel:+919443965064" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                                <Phone className="w-5 h-5" /> Call Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
