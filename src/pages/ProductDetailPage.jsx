/**
 * ProductDetailPage.jsx — Product Detail with Enquiry Modal + Image Zoom Lightbox
 */
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, categories } from '../data/productsData';

/* ── Lightbox (full-screen zoom) ── */
function ImageLightbox({ src, alt, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = e => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <div className="aw-lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Zoomed image">
            <button className="aw-lightbox-close" onClick={onClose} aria-label="Close zoom">
                <i className="bi bi-x-lg" />
            </button>
            <div className="aw-lightbox-inner" onClick={e => e.stopPropagation()}>
                <img src={src} alt={alt} className="aw-lightbox-img" />
            </div>
            <span className="aw-lightbox-hint"><i className="bi bi-x-circle me-1" />Click outside or press ESC to close</span>
        </div>
    );
}

/* ── Image with fallback ── */
function ImgWithFallback({ src, alt, className, style }) {
    const [err, setErr] = useState(false);
    useEffect(() => { setErr(false); }, [src]);
    if (err) {
        return (
            <div className={className} style={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--aw-charcoal-faint)' }}>
                <i className="bi bi-image" style={{ fontSize: 36 }} />
                <span style={{ fontSize: 12 }}>Image unavailable</span>
            </div>
        );
    }
    return <img src={src} alt={alt} className={className} style={style} onError={() => setErr(true)} />;
}

/* ── Enquiry Modal ── */
const INIT_FORM = { name: '', email: '', phone: '', message: '' };

function EnquiryModal({ open, onClose, productName }) {
    const [form, setForm] = useState(INIT_FORM);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const firstInputRef = useRef(null);

    /* Focus first field when modal opens */
    useEffect(() => {
        if (open) { setTimeout(() => firstInputRef.current?.focus(), 50); }
        else { setForm(INIT_FORM); setErrors({}); setSuccess(false); }
    }, [open]);

    /* Close on ESC */
    useEffect(() => {
        if (!open) return;
        const onKey = e => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    /* Prevent body scroll while open */
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required.';
        if (!form.email.trim()) e.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
        if (!form.phone.trim()) e.phone = 'Phone number is required.';
        if (!form.message.trim()) e.message = 'Please describe your enquiry.';
        return e;
    };

    const onChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);

        fetch('/send_email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                form_type: 'Product Enquiry',
                subject: `Enquiry for ${productName}`,
                message: `Product: ${productName}\n\n${form.message}`
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSuccess(true);
                    setForm(INIT_FORM);
                } else {
                    alert(data.message || 'Error sending enquiry. Please try again.');
                }
            })
            .catch(() => {
                alert('Could not connect to the server. Please check your internet or try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (!open) return null;

    return (
        <div className="aw-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="aw-modal" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="aw-modal-header">
                    <div>
                        <h2 className="aw-modal-title">Product Enquiry</h2>
                        <p className="aw-modal-subtitle">{productName}</p>
                    </div>
                    <button className="aw-modal-close" onClick={onClose} aria-label="Close">
                        <i className="bi bi-x-lg" />
                    </button>
                </div>

                {/* Body */}
                <div className="aw-modal-body">
                    {success ? (
                        <div className="aw-modal-success">
                            <div className="aw-success-icon"><i className="bi bi-check2" /></div>
                            <h3>Enquiry Submitted!</h3>
                            <p>Thank you for your interest in <strong>{productName}</strong>. Our team will reach out within 24–48 hours.</p>
                            <button className="btn-aw-outline" onClick={onClose}>Close</button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} noValidate>
                            <div className="d-flex flex-column gap-3">
                                {/* Name + Phone side by side on md+ */}
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <label className="aw-form-label">Full Name *</label>
                                        <input ref={firstInputRef} type="text" name="name" value={form.name} onChange={onChange}
                                            placeholder="Your full name"
                                            className={`aw-form-control${errors.name ? ' is-invalid' : ''}`} />
                                        {errors.name && <div className="aw-form-error">{errors.name}</div>}
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label className="aw-form-label">Phone Number *</label>
                                        <input type="tel" name="phone" value={form.phone} onChange={onChange}
                                            placeholder="+91 00000 00000"
                                            className={`aw-form-control${errors.phone ? ' is-invalid' : ''}`} />
                                        {errors.phone && <div className="aw-form-error">{errors.phone}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="aw-form-label">Email Address *</label>
                                    <input type="email" name="email" value={form.email} onChange={onChange}
                                        placeholder="your@email.com"
                                        className={`aw-form-control${errors.email ? ' is-invalid' : ''}`} />
                                    {errors.email && <div className="aw-form-error">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="aw-form-label">Message *</label>
                                    <textarea name="message" rows={3} value={form.message} onChange={onChange}
                                        placeholder={`I'm interested in ${productName}. Please share pricing and availability…`}
                                        className={`aw-form-control${errors.message ? ' is-invalid' : ''}`}
                                        style={{ resize: 'none' }} />
                                    {errors.message && <div className="aw-form-error">{errors.message}</div>}
                                </div>

                                <div className="d-flex gap-3 pt-1">
                                    <button
                                        type="submit"
                                        className="btn-aw-primary"
                                        style={{ flex: 1 }}
                                        disabled={loading}
                                    >
                                        <i className={`bi ${loading ? 'bi-hourglass-split' : 'bi-send'} me-2`} />
                                        {loading ? 'Sending...' : 'Send Enquiry'}
                                    </button>
                                    <button type="button" className="btn-aw-outline" onClick={onClose} disabled={loading}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Main Page ── */
export default function ProductDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.slug === slug);
    const [activeIdx, setActiveIdx] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showZoom, setShowZoom] = useState(false);

    useEffect(() => {
        if (product) {
            const pName = product.name;
            const pDesc = product.description.substring(0, 160);
            const pCat = categories.find(c => c.id === product.category)?.label || product.category;

            // 1. Dynamic SEO Meta Tags
            document.title = `${pName} | Ayurvedic Manufacturer | Ayurway Lifecare`;

            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
            metaDesc.content = `${pName}: ${pDesc}`;

            let metaKeys = document.querySelector('meta[name="keywords"]');
            if (!metaKeys) { metaKeys = document.createElement('meta'); metaKeys.name = "keywords"; document.head.appendChild(metaKeys); }
            metaKeys.content = `${pName}, ${pCat}, Ayurvedic third party manufacturing, herbal products, Ayurway products, ${product.primaryUse}`;

            // 2. Canonical URL
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) { canonical = document.createElement('link'); canonical.rel = "canonical"; document.head.appendChild(canonical); }
            canonical.href = `https://www.ayurwaylifecare.com/products/${slug}`;

            // 3. JSON-LD Product Schema
            let schemaScript = document.getElementById('product-schema');
            if (!schemaScript) { schemaScript = document.createElement('script'); schemaScript.id = 'product-schema'; schemaScript.type = 'application/ld+json'; document.head.appendChild(schemaScript); }
            schemaScript.innerHTML = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": pName,
                "image": `https://www.ayurwaylifecare.com${product.image}`,
                "description": product.description,
                "brand": {
                    "@type": "Brand",
                    "name": "Ayurway Lifecare"
                },
                "category": pCat,
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "priceCurrency": "INR",
                    "itemCondition": "https://schema.org/NewCondition"
                }
            });
        }
        setActiveIdx(0);
        setShowZoom(false);
        window.scrollTo(0, 0);
    }, [slug, product]);

    if (!product) {
        return (
            <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <i className="bi bi-emoji-frown" style={{ fontSize: 48, color: 'var(--aw-charcoal-faint)' }} />
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.2rem' }}>Product Not Found</h2>
                <Link to="/products" className="btn-aw-outline text-decoration-none">Back to Products</Link>
            </main>
        );
    }

    const catLabel = categories.find(c => c.id === product.category)?.label || product.category;
    const images = product.images || [product.image];
    const activeImg = images[activeIdx];
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <main style={{ background: 'var(--aw-bg-soft)', minHeight: '100vh' }}>

            {/* Enquiry Modal */}
            <EnquiryModal
                open={showModal}
                onClose={() => setShowModal(false)}
                productName={product.name}
            />

            {/* Zoom Lightbox */}
            {showZoom && (
                <ImageLightbox
                    src={activeImg}
                    alt={product.name}
                    onClose={() => setShowZoom(false)}
                />
            )}

            {/* ── Breadcrumb ── */}
            <div style={{ background: '#fff', borderBottom: '1px solid var(--aw-border)', padding: '12px 0' }}>
                <div className="container">
                    <nav style={{ fontSize: 13, color: 'var(--aw-charcoal-muted)', fontFamily: 'Outfit, sans-serif' }}>
                        <Link to="/" style={{ color: 'var(--aw-charcoal-muted)', textDecoration: 'none' }}>Home</Link>
                        <span className="mx-2" style={{ color: 'var(--aw-charcoal-faint)' }}>/</span>
                        <Link to="/products" style={{ color: 'var(--aw-charcoal-muted)', textDecoration: 'none' }}>Products</Link>
                        <span className="mx-2" style={{ color: 'var(--aw-charcoal-faint)' }}>/</span>
                        <Link to={`/products?category=${product.category}`} style={{ color: 'var(--aw-charcoal-muted)', textDecoration: 'none' }}>{catLabel}</Link>
                        <span className="mx-2" style={{ color: 'var(--aw-charcoal-faint)' }}>/</span>
                        <span style={{ color: 'var(--aw-charcoal)' }}>{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* ── Main Detail ── */}
            <div className="container" style={{ padding: '40px 16px' }}>
                <div className="row g-5">

                    {/* Gallery */}
                    <div className="col-12 col-lg-5">
                        <div className="aw-detail-gallery">
                            {/* Clickable main image — opens zoom lightbox */}
                            <div
                                className="aw-detail-main-img aw-zoomable"
                                onClick={() => setShowZoom(true)}
                                title="Click to zoom"
                                role="button"
                                aria-label="Zoom image"
                                tabIndex={0}
                                onKeyDown={e => e.key === 'Enter' && setShowZoom(true)}
                            >
                                <ImgWithFallback src={activeImg} alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
                                <span className="aw-zoom-hint"><i className="bi bi-zoom-in" /> Click to zoom</span>
                            </div>
                            {images.length > 1 && (
                                <div className="aw-detail-thumbs">
                                    {images.map((img, i) => (
                                        <button key={i} onClick={() => setActiveIdx(i)}
                                            className={`aw-detail-thumb${i === activeIdx ? ' active' : ''}`}
                                            aria-label={`View image ${i + 1}`}>
                                            <ImgWithFallback src={img} alt={`${product.name} view ${i + 1}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="col-12 col-lg-7">
                        <div className="aw-detail-info">
                            {/* Category + Primary Use */}
                            <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                                <span className="aw-detail-cat-badge">{catLabel}</span>
                                {product.primaryUse && (
                                    <span className="aw-detail-use-badge">{product.primaryUse}</span>
                                )}
                            </div>

                            <h1 className="aw-detail-name">{product.name}</h1>
                            <p className="aw-detail-brand">By <strong>Ayurway Lifecare Pvt. Ltd.</strong></p>

                            {/* Description */}
                            {product.description && (
                                <p className="aw-detail-description">{product.description}</p>
                            )}

                            <div style={{ width: 48, height: 2, background: 'var(--aw-green-mid)', margin: '20px 0' }} />

                            {/* Packing + MOQ info */}
                            {(product.packing || product.moq) && (
                                <div className="aw-detail-meta">
                                    {product.packing && (
                                        <div className="aw-detail-meta-row">
                                            <i className="bi bi-box-seam" />
                                            <span><strong>Packing:</strong> {product.packing}</span>
                                        </div>
                                    )}
                                    {product.moq && (
                                        <div className="aw-detail-meta-row">
                                            <i className="bi bi-stack" />
                                            <span><strong>MOQ:</strong> {product.moq.toLocaleString()} units</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Price Table */}
                            {product.prices?.length > 0 && (
                                <div className="aw-price-table">
                                    <div className="aw-price-table-header">
                                        <span>Pack Size</span>
                                        <span>MRP (₹)</span>
                                    </div>
                                    {product.prices.map(({ size, mrp }) => (
                                        <div key={size} className="aw-price-table-row">
                                            <span>{size}</span>
                                            <span className="aw-price-mrp">₹{mrp.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="aw-detail-highlights" style={{ marginTop: 16 }}>
                                <h3>Product Highlights</h3>
                                <ul>
                                    <li><i className="bi bi-check-circle-fill" /><span>100% natural Ayurvedic formulation</span></li>
                                    <li><i className="bi bi-check-circle-fill" /><span>Manufactured in a GMP-certified facility</span></li>
                                    <li><i className="bi bi-check-circle-fill" /><span>ISO 22000:2018 quality certified</span></li>
                                    <li><i className="bi bi-check-circle-fill" /><span>No harmful chemicals or synthetic additives</span></li>
                                    <li><i className="bi bi-check-circle-fill" /><span>Tested for purity and potency in every batch</span></li>
                                </ul>
                            </div>

                            <p className="aw-detail-disclaimer">
                                <i className="bi bi-info-circle me-1" />
                                This product is manufactured under licence. For dosage and usage, consult a qualified healthcare practitioner.
                            </p>

                            {/* CTA — "Enquire Now" opens modal */}
                            <div className="d-flex flex-wrap gap-3 mt-4">
                                <button
                                    className="btn-aw-primary"
                                    onClick={() => setShowModal(true)}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                                >
                                    <i className="bi bi-envelope" />Enquire Now
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="btn-aw-outline"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                >
                                    <i className="bi bi-arrow-left" />Back
                                </button>
                            </div>

                            <div className="aw-detail-badges mt-4">
                                {['GMP Certified', 'ISO 22000:2018', 'Ayurvedic'].map(badge => (
                                    <span key={badge} className="aw-detail-badge">
                                        <i className="bi bi-shield-check" />{badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Related Products ── */}
            {related.length > 0 && (
                <div style={{ background: '#fff', borderTop: '1px solid var(--aw-border)', padding: '50px 0' }}>
                    <div className="container">
                        <div className="mb-4">
                            <span className="section-label">From the Same Range</span>
                            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.4rem' }}>Related Products</h2>
                        </div>
                        <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-lg-4">
                            {related.map(p => (
                                <div key={p.id} className="col">
                                    <Link to={`/products/${p.slug}`} className="text-decoration-none">
                                        <div className="aw-product-card">
                                            <div className="aw-product-img">
                                                <ImgWithFallback src={p.image} alt={p.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
                                            </div>
                                            <div className="aw-product-body">
                                                <div className="aw-product-cat">{catLabel}</div>
                                                <h3 className="aw-product-name">{p.name}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
