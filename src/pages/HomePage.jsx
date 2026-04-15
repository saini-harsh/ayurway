/**
 * HomePage.jsx — Bootstrap 5 + Custom CSS
 * Sections: Hero | Stats Bar | Brand Overview | Product Categories | CTA
 */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { blogPosts } from '../data/blogData';
import { certificates } from '../data/certificatesData';

const categoryCards = [
    {
        title: 'Syrups',
        count: '27+',
        desc: 'Complete range of Ayurvedic syrups for immunity, digestion, liver, diabetes, and more.',
        link: '/products?category=syrups',
    },
    {
        title: 'Tablets & Capsules',
        count: '21+',
        desc: 'Single-herb and compound formulations in tablet and capsule forms for targeted wellness.',
        link: '/products?category=tablets',
    },
    {
        title: 'Powders',
        count: '5+',
        desc: 'Scientifically formulated herbal powders for collagen, diabetes, constipation, and more.',
        link: '/products?category=powders',
    },
    {
        title: 'Drops',
        count: '3+',
        desc: "Gentle, effective drops specially designed for children's health and immunity.",
        link: '/products?category=drops',
    },
];

const stats = [
    { value: '140+', label: 'Formulations Developed' },
    { value: '30', label: 'Day Average Turnaround' },
    { value: '100%', label: 'In-House R&D' },
    { value: '100%', label: 'Batch-Wise Documentation' },
];

const features = [
    { heading: 'Ayurvedic supplements', body: 'View All Products', link: '/products' },
    { heading: 'Nutraceutical supplements', body: 'Coming Soon', link: '/products?category=nutraceutical' },
    { heading: 'Herbal personal care', body: 'Coming Soon', link: '/products?category=personalcare' },
    { heading: 'Spices and Mixtures', body: 'Coming Soon', link: '/products?category=spices' },
];

const whyUsItems = [
    { title: '48-Hour Packaging Finalisation', desc: 'Primary packaging artwork is reviewed, finalised and sent for printing within 48 hours of PO confirmation.' },
    { title: '30-Day Safety Inventory', desc: 'We maintain at least one month of key raw material inventory to avoid production disruption.' },
    { title: 'Multi-Vendor Packaging Network', desc: 'We work with multiple approved packaging suppliers to ensure flexibility in design, material, and delivery timelines.' },
    { title: 'IP-Grade Inputs Only', desc: 'All flavours and bases are IP-grade and supported by Certificates of Analysis (COA).' },
    { title: 'Heritage Herb Sourcing', desc: 'Ayurvedic herbs are sourced from suppliers with over 25 years of industry presence.' },
    { title: 'Global Flavour Partnerships', desc: 'We use flavour systems from global industry leaders with over 90 years of expertise.' }
];

export default function HomePage() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [certSlideIndex, setCertSlideIndex] = useState(0);
    const mfgImages = [
        '/images/1.png',
        '/images/2.png',
        '/images/3.png'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % mfgImages.length);
        }, 5000); // Slower interval for manufacturing
        return () => clearInterval(timer);
    }, [mfgImages.length]);

    // Slider for Certifications
    const nextCert = () => setCertSlideIndex((prev) => (prev + 1) % certificates.length);
    const prevCert = () => setCertSlideIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

    return (
        <main>

            {/* ── Manufacturing Banner Section ── */}
            <section className="container mt-4 mb-5">
                <div
                    className="row align-items-center g-0 position-relative"
                    style={{
                        backgroundColor: '#d6f4dc',
                        borderRadius: '24px',
                        padding: '50px',
                        minHeight: '480px',
                        overflow: 'hidden'
                    }}
                >
                    <div className="col-12 col-md-7 position-relative" style={{ zIndex: 2 }}>
                        <h2 style={{ color: 'var(--aw-green-dark)', fontSize: '3rem', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>
                            Manufacturing Shouldn’t Be<br />
                            Your Brand’s Biggest Risk.
                        </h2>
                        <p style={{ color: 'var(--aw-charcoal)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '30px', maxWidth: '480px', lineHeight: 1.4 }}>
                            70% of brands face batch inconsistency, delayed production and poor service on ever order
                        </p>
                        <Link to='/contact'><button
                            className="btn-aw-primary"
                            style={{
                                borderRadius: '30px',
                                padding: '14px 32px',
                                fontSize: '1.05rem',
                                fontWeight: '600',
                                marginBottom: '20px'
                            }}
                        >
                            Request Manufacturing Consultation
                        </button></Link>

                        <div>                        <div className="d-flex justify-content-between align-items-start mt-4" style={{ width: '100%', maxWidth: '600px' }}>
                            <div className="d-flex flex-column align-items-center text-center px-1" style={{ flex: 1 }}>
                                <div className="mb-2" style={{ color: 'var(--aw-green)' }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6" /><path d="M10 9h4" /><path d="m5 20 2-10 2-4V3h6v3l2 4 2 10z" /></svg>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', lineHeight: 1.3 }}>140+ Validated<br />Formulations</span>
                            </div>
                            <div className="d-flex flex-column align-items-center text-center px-1" style={{ flex: 1 }}>
                                <div className="mb-2" style={{ color: 'var(--aw-green)' }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', lineHeight: 1.3 }}>WHO-GMP | AYUSH<br />FSSAI Certified</span>
                            </div>
                            <div className="d-flex flex-column align-items-center text-center px-1" style={{ flex: 1 }}>
                                <div className="mb-2" style={{ color: 'var(--aw-green)' }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M4 20V8l8-4 8 4v12" /><path d="M12 20v-8h4v8" /><path d="M9 12v-2" /></svg>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', lineHeight: 1.3 }}>10,000 Units/Day<br />Capacity</span>
                            </div>
                            <div className="d-flex flex-column align-items-center text-center px-1" style={{ flex: 1 }}>
                                <div className="mb-2" style={{ color: 'var(--aw-green)' }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', lineHeight: 1.3 }}>100% Batch-Wise<br />Documentation</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Right side background image placeholder area */}
                    <div className="col-12 col-md-6 d-none d-md-block position-absolute" style={{ right: 0, bottom: 0, height: '100%' }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url(/images/man_stretching_green.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top right',
                            backgroundRepeat: 'no-repeat',
                            opacity: 1,
                            pointerEvents: 'none',
                            borderTopRightRadius: '24px',
                            borderBottomRightRadius: '24px',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
                            maskImage: 'linear-gradient(to right, transparent 0%, black 20%)'
                        }}></div>
                    </div>
                </div>
            </section>

            {/* ── Hero ── */}
            <section className="aw-hero">
                <div className="container">
                    <div className="row align-items-center g-4">
                        {/* Left — text */}
                        <div className="col-12 col-md-6">
                            <span className="section-label">Leading Ayurvedic & Nutraceutical Manufacturing Partner</span>
                            <h1 className="mb-4">
                                AYURWAY<br />
                                <span className="accent">LIFECARE</span>
                            </h1>
                            <p className="mb-4" style={{ fontSize: 16, color: 'var(--aw-charcoal-muted)', maxWidth: 480, lineHeight: 1.75 }}>
                                We are a WHO, GMP, AYUSH and FSSAI certified Ayurvedic and nutraceutical manufacturing company specialising in syrups, tablets, capsules, powders, oils and liquid formulations. We combine traditional Ayurvedic knowledge with process-controlled, compliance-driven manufacturing systems designed for quality-focused brands.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Link to="/products" className="btn-aw-primary text-decoration-none">Explore Products</Link>
                                <Link to="/contact" className="btn-aw-outline text-decoration-none">Get in Touch</Link>
                            </div>
                        </div>

                        {/* Right — banner image */}
                        <div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center">
                            <img
                                src="/images/banner.png"
                                alt="Ayurway Lifecare – Herbal Formulations"
                                className="aw-hero-banner-img"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats bar ── */}
            <div className="aw-stats-bar">
                <div className="container">
                    <div className="row g-3 text-center">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="col-6 col-sm-3">
                                <div className="aw-stat-value">{value}</div>
                                <div className="aw-stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Certifications & Manufacturing Unit ── */}
            <section className="py-5" style={{ background: '#fcfcfc', borderTop: '1px solid var(--aw-border)' }}>
                <div className="container py-4">
                    <div className="row g-5 align-items-start">
                        {/* Left: Certifications Slider */}
                        <div className="col-12 col-md-6">
                            <div className="mb-4 text-center text-md-start">
                                <span className="section-label">Trust Assured</span>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Our Certifications</h2>
                            </div>

                            <div style={{ position: 'relative', padding: '0 40px' }}>
                                <div className="row g-2 justify-content-center">
                                    {[0, 1].map((offset) => {
                                        const cert = certificates[(certSlideIndex + offset) % certificates.length];
                                        return (
                                            <div
                                                key={`${cert.id}-${offset}`}
                                                className={`col-12 col-md-6 ${offset === 1 ? 'd-none d-md-block' : ''}`}
                                            >
                                                <Link
                                                    to="/accreditations"
                                                    className="d-block text-decoration-none"
                                                >
                                                    <div style={{
                                                        width: '100%',
                                                        aspectRatio: '2/3',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                                                        border: '1px solid var(--aw-border)',
                                                        background: '#fff',
                                                        padding: '10px',
                                                        position: 'relative',
                                                        transition: 'transform 0.2s',
                                                    }}
                                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                    >
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: '4px',
                                                            overflow: 'hidden',
                                                            pointerEvents: 'none',
                                                            backgroundColor: '#f8f9fa'
                                                        }}>
                                                            <iframe
                                                                src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                                                width="100%"
                                                                height="100%"
                                                                style={{ border: 'none', display: 'block' }}
                                                                title={cert.title}
                                                            />
                                                        </div>
                                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} />
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Controls */}
                                <button
                                    onClick={prevCert}
                                    style={{
                                        position: 'absolute', top: '50%', left: '-10px', transform: 'translateY(-50%)',
                                        background: 'rgba(255,255,255,0.9)', border: '1px solid var(--aw-border)', borderRadius: '50%',
                                        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                    }}>
                                    <i className="bi bi-chevron-left" style={{ color: 'var(--aw-charcoal)', fontSize: '14px' }}></i>
                                </button>
                                <button
                                    onClick={nextCert}
                                    style={{
                                        position: 'absolute', top: '50%', right: '-10px', transform: 'translateY(-50%)',
                                        background: 'rgba(255,255,255,0.9)', border: '1px solid var(--aw-border)', borderRadius: '50%',
                                        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                    }}>
                                    <i className="bi bi-chevron-right" style={{ color: 'var(--aw-charcoal)', fontSize: '14px' }}></i>
                                </button>

                                {/* Indicators */}
                                <div className="mt-3 d-flex justify-content-center gap-2">
                                    {certificates.map((_, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setCertSlideIndex(idx)}
                                            style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                background: certSlideIndex === idx ? 'var(--aw-green)' : 'rgba(0,0,0,0.1)',
                                                cursor: 'pointer', transition: 'all 0.3s'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Manufacturing Unit Slider */}
                        <div className="col-12 col-md-6">
                            <div className="mb-4 text-center text-md-start">
                                <span className="section-label">Quality Assured</span>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Our Manufacturing Unit</h2>
                            </div>
                            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', position: 'relative' }}>
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                                    {mfgImages.map((src, index) => (
                                        <img
                                            key={src}
                                            src={src}
                                            alt="Manufacturing Unit"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: slideIndex === index ? 1 : 0,
                                                transition: 'opacity 0.8s ease-in-out'
                                            }}
                                        />
                                    ))}
                                </div>
                                {/* Controls */}
                                <button
                                    onClick={() => setSlideIndex(prev => (prev - 1 + mfgImages.length) % mfgImages.length)}
                                    style={{
                                        position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)',
                                        background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%',
                                        width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10
                                    }}>
                                    <i className="bi bi-chevron-left" style={{ color: 'var(--aw-charcoal)' }}></i>
                                </button>
                                <button
                                    onClick={() => setSlideIndex(prev => (prev + 1) % mfgImages.length)}
                                    style={{
                                        position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)',
                                        background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%',
                                        width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10
                                    }}>
                                    <i className="bi bi-chevron-right" style={{ color: 'var(--aw-charcoal)' }}></i>
                                </button>
                                {/* Indicators */}
                                <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                                    {mfgImages.map((_, idx) => (
                                        <div key={idx} onClick={() => setSlideIndex(idx)}
                                            style={{
                                                width: '10px', height: '10px', borderRadius: '50%', background: slideIndex === idx ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'background 0.3s'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Brand Overview ── */}
            <section className="py-5" style={{ padding: '80px 0' }}>
                <div className="container py-4">
                    <div className="row g-5 align-items-center">
                        <div className="col-12 col-md-6">
                            <span className="section-label">What we offer</span>
                            <h2 className="mb-4" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                                Quality, Consistency and Reliability
                            </h2>
                            <p className="mb-3" style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', lineHeight: 1.8 }}>
                                Ayurway Lifecare is backed by supplement industry marketers, operational strategists, and seasoned manufacturing professionals.


                            </p>
                            <div className="mb-4" style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', lineHeight: 1.8 }}>
                                With leadership experience spanning:
                                <ul>
                                    <li>15+ years in supplement marketing</li>
                                    <li>Enterprise systems design from McKinsey</li>
                                    <li>10+ years in Ayurvedic production</li>
                                </ul>
                                Our facility was designed to solve the same problems growing brands struggle with — from batch inconsistency to scaling without operational chaos.
                            </div>
                            <Link to="/about" className="btn-aw-outline text-decoration-none">Read More</Link>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row g-3">
                                {features.map(({ heading, body, link }) => (
                                    <div key={heading} className="col-6">
                                        <Link to={link || '#'} className="text-decoration-none d-block h-100">
                                            <div
                                                className="aw-feature-card h-100"
                                                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <span className="divider-green" />
                                                <h4 style={{ color: 'var(--aw-charcoal)' }}>{heading}</h4>
                                                <p style={{ color: 'var(--aw-charcoal-muted)' }}>{body}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Us / Manufacturing ── */}
            <section className="py-5" style={{ backgroundColor: 'var(--aw-bg-soft)', padding: '80px 0', borderTop: '1px solid var(--aw-border)' }}>
                <div className="container py-4">
                    <div className="row g-5 align-items-center">
                        <div className="col-12 col-lg-6">
                            <span className="section-label">Why Us</span>
                            <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 700 }}>Ayurvedic Third Party Manufacturing</h2>

                            <p className="mb-3" style={{ fontSize: '1.05rem', color: 'var(--aw-charcoal)', fontWeight: 600, lineHeight: 1.7 }}>
                                Most manufacturers talk about quality. We build systems to deliver it consistently.
                            </p>
                            <p className="mb-5" style={{ fontSize: '0.95rem', color: 'var(--aw-charcoal-muted)', lineHeight: 1.7 }}>
                                At Ayurway Lifecare, our operations are structured to reduce delays, minimise variability, and support brand growth without disruption.
                            </p>

                            <div className="row g-4">
                                {whyUsItems.map((item, idx) => (
                                    <div key={idx} className="col-12 col-sm-6">
                                        <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--aw-charcoal)', marginBottom: '6px' }}>
                                            <i className="bi bi-circle-fill me-2" style={{ color: 'var(--aw-green)', fontSize: '0.5rem', verticalAlign: 'middle', transform: 'translateY(-2px)' }}></i>
                                            {item.title}
                                        </h5>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--aw-charcoal-muted)', margin: 0, paddingLeft: '20px', lineHeight: 1.5 }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <img
                                src="/images/why_us_ayurvedic.png"
                                alt="Ayurvedic Manufacturing"
                                className="img-fluid"
                                style={{ borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Product Categories ── */}
            <section style={{ backgroundColor: '#fff', borderTop: '1px solid var(--aw-border)', padding: '80px 0' }}>
                <div className="container">
                    <div className="mb-5">
                        <span className="section-label">Our Range</span>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Product Categories</h2>
                    </div>
                    <div className="row g-4">
                        {categoryCards.map(({ title, count, desc, link }) => (
                            <div key={title} className="col-12 col-sm-6 col-lg-3">
                                <Link to={link} className="aw-cat-card text-decoration-none">
                                    <div className="d-flex justify-content-between align-items-end mb-3">
                                        <h3>{title}</h3>
                                        <span className="count">{count}</span>
                                    </div>
                                    <span className="divider-green" />
                                    <p>{desc}</p>
                                    <div className="view-link mt-3">View Products →</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Latest Articles ── */}
            <section className="py-5" style={{ backgroundColor: '#fcfcfc', borderTop: '1px solid var(--aw-border)' }}>
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <span className="section-label">Insights</span>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Latest Articles</h2>
                        </div>
                        <Link to="/blog" className="btn-aw-outline text-decoration-none d-none d-sm-inline-block">View All</Link>
                    </div>
                    <div className="row g-4">
                        {blogPosts.slice(0, 3).map(post => (
                            <div key={post.id} className="col-12 col-md-4">
                                <div className="aw-blog-card h-100" style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid var(--aw-border)' }}>
                                    <Link to={`/blog/${post.slug}`}>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                backgroundImage: `url(${post.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderBottom: '1px solid var(--aw-border)'
                                            }}
                                        />
                                    </Link>
                                    <div className="p-4">
                                        <div className="mb-2">
                                            <span style={{ fontSize: '0.8rem', color: 'var(--aw-green)', fontWeight: 600 }}>{post.date}</span>
                                        </div>
                                        <Link to={`/blog/${post.slug}`} className="text-decoration-none">
                                            <h3 className="mb-3" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--aw-charcoal)', lineHeight: 1.4 }}>
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--aw-charcoal-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ padding: '80px 0', borderTop: '1px solid var(--aw-border)' }}>
                <div className="container text-center">
                    <span className="section-label">Get in Touch</span>
                    <h2 className="mb-3" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Ready to Partner With Us?</h2>
                    <p className="mb-4 mx-auto" style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', maxWidth: 500, lineHeight: 1.8 }}>
                        Whether you are a distributor, healthcare professional, or individual customer,
                        we are here to answer your queries and support your wellness journey.
                    </p>
                    <Link to="/contact" className="btn-aw-primary text-decoration-none">Contact Us</Link>
                </div>
            </section>

        </main >
    );
}
