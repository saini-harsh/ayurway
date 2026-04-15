/**
 * Footer.jsx — Bootstrap 5 + Custom CSS
 * Dark footer: Brand | Quick Links | Contact Info
 */
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="aw-footer">
            <div className="container">
                <div className="row g-5">

                    {/* Brand */}
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                            <div className="brand-main">AYURWAY</div>
                            <div className="brand-sub mt-1">Lifecare</div>
                        </div>
                        <p style={{ maxWidth: 280 }}>
                            Premium Ayurvedic health products crafted with natural formulations to support holistic wellness.
                        </p>
                        <div className="footer-dot-row">
                            <span className="footer-dot" style={{ background: '#2e7d52' }} />
                            <span className="footer-dot" style={{ background: '#4d9e6a' }} />
                            <span className="footer-dot" style={{ background: '#5cba8a' }} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-6 col-md-4">
                        <div className="aw-footer-heading">Quick Links</div>
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/products', label: 'Products' },
                                { to: '/about', label: 'About Us' },
                                { to: '/marketplace', label: 'Marketplace' },
                                { to: '/contact', label: 'Contact' },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-decoration-none">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-6 col-md-4">
                        <div className="aw-footer-heading">Contact</div>
                        <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                            <li>
                                <span style={{ fontSize: 9, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 2 }}>Email</span>
                                <a href="mailto:support@ayurwaylifecare.com" className="text-decoration-none" style={{ fontSize: 13, color: '#999' }}>
                                    support@ayurwaylifecare.com
                                </a>
                            </li>
                            <li>
                                <span style={{ fontSize: 9, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 2 }}>Phone</span>
                                <a href="tel:+917087553268" className="text-decoration-none" style={{ fontSize: 13, color: '#999' }}>
                                    +91 70875 53268
                                </a>
                            </li>
                            <li>
                                <span style={{ fontSize: 9, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 2 }}>Address</span>
                                <a href="https://maps.app.goo.gl/4aqzNmmZqXKjSZWP9" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#999', lineHeight: 1.6 }}>
                                    Khasra No. 5, 14/2, near Ind Swift Ltd., Derabassi, Industrial Area Jawaharpur, Jawaharpur, Punjab 140507
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="aw-footer-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                    <p className='text-white'>© {new Date().getFullYear()} Ayurway Lifecare Pvt. Ltd. All rights reserved. Design and Promoted by <a className='text-white' href="https://www.24digitalindia.com/">24 Digital India</a></p>
                    <p>ISO 22000:2018 Certified &nbsp;|&nbsp; GMP Licensed</p>
                </div>
            </div>
        </footer>
    );
}
