import { useEffect } from 'react';
import { certificates } from '../data/certificatesData';

export default function AccreditationsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Accreditations | AYURWAY LIFECARE';
    }, []);

    return (
        <main>
            {/* ── Page Banner ── */}
            <div className="aw-page-header">
                <div className="container text-center">
                    <span className="section-label mb-2 d-inline-block">Commitment to Quality</span>
                    <h1>Our Accreditations</h1>
                    <p className="mx-auto mt-3">
                        We adhere to the strictest global standards of manufacturing, ensuring every
                        product is safe, potent, and of the highest quality.
                    </p>
                </div>
            </div>

            {/* ── Certificates Grid ── */}
            <section className="py-5 bg-soft">
                <div className="container py-4">
                    <div className="row g-4 justify-content-center">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="col-12 col-md-6 col-lg-4">
                                <div
                                    className="aw-cert-card text-center h-100"
                                    style={{
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                        border: '1px solid var(--aw-border)',
                                        background: '#fff',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        position: 'relative'
                                    }}
                                >
                                    <div
                                        className="aw-pdf-wrapper"
                                        style={{
                                            width: '100%',
                                            aspectRatio: '1/1.4',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                    >
                                        <iframe
                                            src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: 'none',
                                                display: 'block'
                                            }}
                                            title={cert.title}
                                        />
                                    </div>

                                    {/* Overlay to further prevent interaction if needed */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 2,
                                            cursor: 'default'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
