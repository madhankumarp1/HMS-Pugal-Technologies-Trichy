import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-slate-900 mb-12">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Get in Touch</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Phone & WhatsApp</h3>
                                    <p className="text-slate-600">Sales: <a href="tel:+919443965064" className="text-primary hover:underline">94439 65064</a></p>
                                    <p className="text-slate-600">Service: <a href="tel:+919487765064" className="text-primary hover:underline">94877 65064</a></p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                                    <a href="mailto:pugaltech@gmail.com" className="text-slate-600 hover:text-primary">pugaltech@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Our Office</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        26/1, Iyyappan Nagar, Iyyal Nagar Main Road,<br />
                                        Ariyamangalam, Trichy – 620010
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Opening Hours</h3>
                                    <p className="text-slate-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                                    <p className="text-slate-600">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-slate-200 rounded-2xl overflow-hidden h-96 lg:h-auto border border-slate-300">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.665725797371!2d78.7296068748058!3d10.83685998931566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5dec2306911%3A0xe542868725832e84!2sHMS%20Pugal%20Technologies!5e0!3m2!1sen!2sin!4v1710345678901!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
