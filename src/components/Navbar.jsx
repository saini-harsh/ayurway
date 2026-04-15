/**
 * Navbar.jsx — Bootstrap 5 + Custom CSS
 * Sticky top navbar with brand logo, nav links, and Enquiry CTA.
 */
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products', end: false },
    { to: '/about', label: 'About Us', end: false },
    { to: '/accreditations', label: 'Accreditations', end: false },
    { to: '/blog', label: 'Blog', end: false },
    { to: '/contact', label: 'Contact', end: false },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Top Ribbon */}
            <div className="d-none d-lg-block" style={{ backgroundColor: 'var(--aw-green-dark)', color: 'rgba(255,255,255,0.85)', fontSize: '12.5px', padding: '8px 0', letterSpacing: '0.03em' }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-clock me-2" style={{ color: 'var(--aw-green-border)' }}></i>
                        Mon–Sat | 9:30 AM – 6:00 PM
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <a href="tel:+917087553268" className="text-decoration-none d-flex align-items-center" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}>
                            <i className="bi bi-telephone-fill me-2" style={{ color: 'var(--aw-green-border)' }}></i>
                            +91 70875 53268
                        </a>
                        <a href="mailto:support@ayurwaylifecare.com" className="text-decoration-none d-flex align-items-center" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}>
                            <i className="bi bi-envelope-fill me-2" style={{ color: 'var(--aw-green-border)' }}></i>
                            support@ayurwaylifecare.com
                        </a>
                    </div>
                </div>
            </div>

            <nav className="aw-navbar">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between" style={{ height: 64 }}>

                        {/* Brand */}
                        <Link to="/" className="navbar-brand-wrap text-decoration-none" onClick={() => setOpen(false)}>
                            <div className="brand-main">AYURWAY</div>
                            <div className="brand-sub">Lifecare</div>
                        </Link>

                        {/* Desktop links */}
                        <div className="d-none d-md-flex align-items-center gap-4">
                            {navLinks.map(({ to, label, end }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={end}
                                    className={({ isActive }) => `aw-nav-link text-decoration-none${isActive ? ' active' : ''}`}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>

                        {/* CTA — desktop */}
                        <div className="d-none d-md-block">
                            <Link to="/contact" className="btn-aw-primary text-decoration-none" style={{ fontSize: 13 }}>
                                Enquiry Now
                            </Link>
                        </div>

                        {/* Hamburger — mobile */}
                        <button
                            className="d-md-none border-0 bg-transparent p-1"
                            onClick={() => setOpen(o => !o)}
                            aria-label="Toggle menu"
                            style={{ cursor: 'pointer' }}
                        >
                            <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: 22, color: 'var(--aw-charcoal)' }} />
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {open && (
                        <div className="d-md-none border-top py-3" style={{ borderColor: 'var(--aw-border)' }}>
                            <div className="d-flex flex-column gap-3">
                                {navLinks.map(({ to, label, end }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        end={end}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            `text-decoration-none px-2 font-body fw-medium${isActive ? ' text-green' : ''}`
                                        }
                                        style={{ fontSize: 14, color: isActive => isActive ? 'var(--aw-green)' : 'var(--aw-charcoal-mid)' }}
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                                <Link
                                    to="/contact"
                                    onClick={() => setOpen(false)}
                                    className="btn-aw-primary text-decoration-none align-self-start"
                                    style={{ fontSize: 13 }}
                                >
                                    Enquiry Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
