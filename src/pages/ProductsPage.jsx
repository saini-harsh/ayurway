/**
 * ProductsPage.jsx — category filter + search + product grid
 * Cards now show: primaryUse badge + description snippet + starting price
 */
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data/productsData';

function ProductCard({ product }) {
    const [imgErr, setImgErr] = useState(false);
    const catLabel = categories.find(c => c.id === product.category)?.label || product.category;
    const moq = product.moq ?? 2000;

    return (
        <Link to={`/products/${product.slug}`} className="text-decoration-none d-block h-100">
            <div className="aw-product-card h-100">
                <div className="aw-product-img">
                    {imgErr ? (
                        <div className="aw-product-img-fallback">
                            <i className="bi bi-image" style={{ fontSize: 28 }} />
                            <span>Image unavailable</span>
                        </div>
                    ) : (
                        <img src={product.image} alt={product.name} onError={() => setImgErr(true)} />
                    )}
                </div>
                <div className="aw-product-body">
                    {/* Category + Primary Use */}
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="aw-product-cat">{catLabel}</span>
                        {product.primaryUse && (
                            <span className="aw-product-use">{product.primaryUse}</span>
                        )}
                    </div>
                    {/* Name */}
                    <h3 className="aw-product-name">{product.name}</h3>
                    {/* Description snippet */}
                    {product.description && (
                        <p className="aw-product-desc">{product.description}</p>
                    )}
                    {/* MOQ + CTA row */}
                    <div className="aw-product-footer">
                        <span className="aw-product-price">
                            <span className="aw-price-label">MOQ</span>
                            <span className="aw-price-value">{moq} Units</span>
                        </span>
                        <span className="aw-view-link">View Details →</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setActiveCategory(cat);
        else setActiveCategory('all');

        // Dynamic SEO for Product Listing Page
        const catLabel = cat ? categories.find(c => c.id === cat)?.label : 'All Products';
        document.title = `${catLabel} | Ayurvedic Product Catalog | Ayurway Lifecare`;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
        metaDesc.content = `Discover our premium range of ${catLabel} including syrups, tablets, and powders. WHO-GMP certified third-party Ayurvedic manufacturing services in India.`;

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) { canonical = document.createElement('link'); canonical.rel = "canonical"; document.head.appendChild(canonical); }
        canonical.href = `https://www.ayurwaylifecare.com/products${cat ? `?category=${cat}` : ''}`;

    }, [searchParams]);

    const handleCat = (id) => {
        setActiveCategory(id);
        id === 'all' ? setSearchParams({}) : setSearchParams({ category: id });
    };

    const filtered = products.filter(p => {
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <main style={{ background: 'var(--aw-bg-soft)', minHeight: '100vh' }}>
            <div className="aw-page-header">
                <div className="container">
                    <span className="section-label">Our Range</span>
                    <h1 className="mb-2">Products</h1>
                    <p>Browse our complete lineup — syrups, tablets, capsules, powders, and drops.</p>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">

                    {/* Sidebar — desktop */}
                    <div className="col-lg-3 d-none d-lg-block">
                        <div className="aw-sidebar">
                            <div className="aw-sidebar-title">Categories</div>
                            <div className="d-flex flex-column gap-1">
                                {categories.map(({ id, label }) => {
                                    const count = id === 'all' ? products.length : products.filter(p => p.category === id).length;
                                    return (
                                        <button key={id} onClick={() => handleCat(id)}
                                            className={`aw-cat-btn${activeCategory === id ? ' active' : ''}`}>
                                            <span>{label}</span>
                                            <span className="count">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="col-12 col-lg-9">
                        <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                            <div className="d-lg-none pills-scroll flex-grow-1">
                                {categories.map(({ id, label }) => (
                                    <button key={id} onClick={() => handleCat(id)}
                                        className={`aw-pill-btn${activeCategory === id ? ' active' : ''}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div style={{ flexShrink: 0, width: 240 }}>
                                <input type="text" className="aw-search-input"
                                    placeholder="Search products…"
                                    value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>

                        <p style={{ fontSize: 12, color: 'var(--aw-charcoal-faint)', marginBottom: 16 }}>
                            Showing <strong style={{ color: 'var(--aw-charcoal)' }}>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
                            {activeCategory !== 'all' && (
                                <> in <span style={{ color: 'var(--aw-green)', fontWeight: 500 }}>
                                    {categories.find(c => c.id === activeCategory)?.label}
                                </span></>
                            )}
                        </p>

                        {filtered.length > 0 ? (
                            <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-xl-3">
                                {filtered.map(product => (
                                    <div key={product.id} className="col">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <i className="bi bi-inbox" style={{ fontSize: 36, color: 'var(--aw-charcoal-faint)' }} />
                                <p className="mt-3" style={{ color: 'var(--aw-charcoal-muted)', fontSize: 14 }}>No products found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
