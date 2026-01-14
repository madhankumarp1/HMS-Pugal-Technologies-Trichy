
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Trash2, LogOut } from 'lucide-react';

interface ProductItem {
    _id: string; // MongoDB ID
    name: string;
    desc: string;
}

interface ProductCategory {
    _id: string;
    category: string;
    items: ProductItem[];
}

export default function AdminDashboardPage() {
    const [products, setProducts] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const adminPassword = localStorage.getItem('adminPassword');

    // Form State
    const [newCategory, setNewCategory] = useState('');
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newImage, setNewImage] = useState(''); // New State
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!adminPassword) {
            navigate('/admin/login');
            return;
        }
        fetchProducts();
    }, [adminPassword, navigate]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                const errorData = await response.json().catch(() => ({}));
                // Show DETAILED message for debugging
                console.error("API Error Details:", errorData);
                setError(`${errorData.error || 'Failed to load products'}: ${errorData.message || ''} ${errorData.stack ? '(Check Console)' : ''}`);
            }
        } catch (err) {
            setError('Error loading products: Network or Server Error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminPassword');
        navigate('/admin/login');
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory || !newName || !newDesc) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': adminPassword || ''
                },
                body: JSON.stringify({
                    category: newCategory,
                    name: newName,
                    desc: newDesc,
                    image: newImage // Send Image URL
                })
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok) {
                    setNewName('');
                    setNewDesc('');
                    setNewImage(''); // Reset Image
                    await fetchProducts();
                    alert('Product added successfully!');
                } else {
                    // Show DETAILED message in alert
                    alert(`Error: ${data.error}\nDetails: ${data.message || ''}`);
                }
            } else {
                // Not JSON (likely HTML 404/500)
                const text = await response.text();
                alert(`Server Error (${response.status}): The server returned a non-JSON response. It might be hitting 404 or 500. Check console for details.`);
                console.error('Non-JSON response:', text);
            }
        } catch (err: any) {
            alert(`Network/Connection Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProduct = async (categoryId: string, itemId: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch('/api/products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': adminPassword || ''
                },
                body: JSON.stringify({ categoryId, itemId })
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok) {
                    await fetchProducts();
                } else {
                    alert(`Delete Failed: ${data.error}`);
                }
            } else {
                const text = await response.text();
                alert(`Server Error (${response.status}): Non-JSON response.`);
                console.error('Non-JSON response:', text);
            }
        } catch (err: any) {
            alert(`Network/Connection Error: ${err.message}`);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <span className="font-bold text-xl text-slate-800">Admin Dashboard</span>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Product Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-primary" /> Add New Product
                            </h2>
                            <form onSubmit={handleAddProduct} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Billing Solutions"
                                        value={newCategory}
                                        onChange={e => setNewCategory(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        required
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Type an existing category name to add to it.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. New POS Machine"
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        placeholder="Describe features..."
                                        value={newDesc}
                                        onChange={e => setNewDesc(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none h-24 resize-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        placeholder="Paste image link here (https://...)"
                                        value={newImage}
                                        onChange={e => setNewImage(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Optional. Paste a link to an image.</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Product'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="lg:col-span-2 space-y-8">
                        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>}

                        {products.map((section) => (
                            <div key={section._id} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3 mb-4">{section.category}</h3>
                                <div className="space-y-4">
                                    {section.items.map((item) => (
                                        <div key={item._id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
                                            <div>
                                                <h4 className="font-medium text-slate-900">{item.name}</h4>
                                                <p className="text-sm text-slate-500">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteProduct(section._id, item._id)}
                                                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {section.items.length === 0 && <p className="text-sm text-slate-400 italic">No items in this category.</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
