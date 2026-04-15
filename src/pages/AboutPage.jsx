/**
 * AboutPage.jsx — Bootstrap 5 + Custom CSS
 * Sections: Mission/Vision | Core Values | Certifications & Licenses
 */
import { certificates } from '../data/certificatesData';

const values = [
    { label: 'Purity', text: 'We use only carefully sourced, premium-grade herbs free from heavy metals and adulterants.' },
    { label: 'Efficacy', text: 'Our formulations are rooted in classical Ayurvedic texts and validated through rigorous quality testing.' },
    { label: 'Transparency', text: 'Clear labelling, honest claims, and easy access to our certifications — nothing hidden.' },
    { label: 'Responsibility', text: 'Sustainable sourcing practices and minimal-waste manufacturing for a healthier planet.' },
];

function CertCard({ cert }) {
    return (
        <div className="aw-cert-card">
            <span className="aw-cert-type">{cert.type}</span>
            <div>
                <h3 className="aw-cert-title">{cert.title}</h3>
                <p className="aw-cert-desc mt-2">{cert.description}</p>
            </div>
            <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="aw-cert-link text-decoration-none"
            >
                <i className="bi bi-file-earmark-pdf" style={{ fontSize: 15 }} />
                View Document
            </a>
        </div>
    );
}

export default function AboutPage() {
    return (
        <main style={{ background: '#fff' }}>

            {/* Page header */}
            <div className="aw-page-header">
                <div className="container">
                    <span className="section-label">Our Story</span>
                    <h1>About Us</h1>
                </div>
            </div>

            {/* ── Mission & Vision ── */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 col-md-6">
                            <span className="section-label">Mission</span>
                            <h2 className="mb-4" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                                Bridging Ancient Wisdom<br />with Modern Science
                            </h2>
                            <p className="mb-3" style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', lineHeight: 1.8 }}>
                                Ayurway Lifecare Pvt. Ltd. was founded with a single purpose: to bring the best of
                                Ayurveda to every household in a safe, effective, and accessible form. We believe that
                                health is a birthright, and that nature provides everything needed to maintain it.
                            </p>
                            <p style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', lineHeight: 1.8 }}>
                                Our team of Ayurvedic physicians, pharmacists, and quality assurance experts work
                                collaboratively to ensure that each product honours the integrity of traditional
                                formulations while meeting contemporary safety and efficacy standards.
                            </p>
                        </div>
                        <div className="col-12 col-md-6">
                            <span className="section-label">Vision</span>
                            <h2 className="mb-4" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                                Global Wellness Through<br />Ayurvedic Excellence
                            </h2>
                            <p className="mb-3" style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', lineHeight: 1.8 }}>
                                We envision Ayurway Lifecare as a globally recognised brand synonymous with
                                trustworthy Ayurvedic healthcare. Our goal is to expand internationally while
                                remaining anchored in the principles that define true Ayurveda.
                            </p>
                            <p style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)', lineHeight: 1.8 }}>
                                We partner with distributors, wellness practitioners, and healthcare professionals
                                who share our commitment to holistic, natural health solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section style={{ background: 'var(--aw-bg-soft)', borderTop: '1px solid var(--aw-border)', padding: '80px 0' }}>
                <div className="container">
                    <div className="mb-5">
                        <span className="section-label">What We Stand For</span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Our Core Values</h2>
                    </div>
                    <div className="row g-4">
                        {values.map(({ label, text }) => (
                            <div key={label} className="col-12 col-sm-6 col-lg-3">
                                <div className="aw-value-card">
                                    <div style={{ width: 32, height: 4, background: 'var(--aw-green-mid)', borderRadius: 4, marginBottom: 18 }} />
                                    <h3>{label}</h3>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Certifications ── */}
            <section style={{ padding: '80px 0', borderTop: '1px solid var(--aw-border)', background: 'var(--aw-bg-soft)' }}>
                <div className="container">
                    <div className="mb-5 text-center">
                        <span className="section-label">Quality Assurance</span>
                        <h2 className="mb-3" style={{ fontSize: '2rem', fontWeight: 700 }}>Certifications &amp; Licenses</h2>
                        <p className="mx-auto" style={{ fontSize: 15, color: 'var(--aw-charcoal-muted)', maxWidth: 600, lineHeight: 1.8 }}>
                            At Ayurway Lifecare, quality is our compass. We adhere to the highest regulatory standards,
                            ensuring safety and efficacy across our entire manufacturing range.
                        </p>
                    </div>

                    <div className="d-flex flex-wrap justify-content-center gap-4 py-4">
                        {certificates.map(cert => (
                            <div key={cert.id} className="text-center" style={{ width: '160px' }}>
                                <a
                                    href={cert.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-block text-decoration-none"
                                >
                                    <div
                                        className="aw-logo-wrapper mb-3"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            margin: '0 auto',
                                            background: '#fff',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                                            border: '1px solid var(--aw-border)',
                                            transition: 'all 0.3s ease',
                                            padding: '15px'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.borderColor = 'var(--aw-green-mid)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                                            e.currentTarget.style.borderColor = 'var(--aw-border)';
                                        }}
                                    >
                                        <img
                                            src={cert.logo}
                                            alt={cert.title}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                    {/* <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--aw-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {cert.title.split(' ')[0]}
                                    </h4>
                                    <span style={{ fontSize: '10px', color: 'var(--aw-charcoal-faint)', display: 'block', marginTop: '4px' }}>
                                        View Certificate
                                    </span> */}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
