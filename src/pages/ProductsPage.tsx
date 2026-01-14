import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProductItem {
    name: string;
    desc: string;
    image?: string; // Added optional image field
}

interface ProductCategory {
    category: string;
    items: ProductItem[];
}

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch from the serverless function
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

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
                                    <div key={itemIdx} className="border border-slate-100 rounded-xl p-6 hover:shadow-lg transition-shadow bg-slate-50 group">
                                        <div className="w-full h-48 bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-slate-100">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : (
                                                <div className="text-slate-300 flex flex-col items-center justify-center w-full h-full bg-slate-50">
                                                    <span className="text-sm font-medium">No Image</span>
                                                </div>
                                            )}
                                            {/* Fallback for error */}
                                            <div className="hidden text-slate-300 flex-col items-center justify-center w-full h-full bg-slate-50 absolute inset-0">
                                                <span className="text-sm font-medium">Image unavailable</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1" title={item.name}>{item.name}</h3>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-3" title={item.desc}>{item.desc}</p>
                                        <ul className="text-sm text-slate-500 space-y-2 mt-auto">
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
