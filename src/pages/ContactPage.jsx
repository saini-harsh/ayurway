/**
 * ContactPage.jsx — Bootstrap 5 + Custom CSS
 * Clean contact form (with validation) + company contact details panel.
 */
import { useState } from 'react';

const contactDetails = [
    {
        label: 'Email',
        value: 'support@ayurwaylifecare.com',
        href: 'mailto:support@ayurwaylifecare.com',
        icon: 'bi-envelope',
    },
    {
        label: 'Phone',
        value: '+91 70875 53268',
        href: 'tel:+917087553268',
        icon: 'bi-telephone',
    },
    {
        label: 'Address',
        value: 'Khasra No. 5, 14/2, near Ind Swift Ltd., Derabassi, Industrial Area Jawaharpur, Jawaharpur, Punjab 140507',
        href: 'https://maps.app.goo.gl/4aqzNmmZqXKjSZWP9',
        icon: 'bi-geo-alt',
    },
];

const INIT = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
    const [form, setForm] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required.';
        if (!form.email.trim()) e.email = 'Email address is required.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
        if (!form.subject.trim()) e.subject = 'Subject is required.';
        if (!form.message.trim()) e.message = 'Message cannot be empty.';
        return e;
    };

    const onChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);

        fetch('/send_email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                form_type: 'Contact Page'
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSubmitted(true);
                    setForm(INIT);
                } else {
                    alert(data.message || 'Error sending message. Please try again.');
                }
            })
            .catch(() => {
                alert('Could not connect to the server. Please check your internet or try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fields = [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
        { name: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
    ];

    return (
        <main style={{ background: '#fff' }}>

            {/* Page header */}
            <div className="aw-page-header">
                <div className="container">
                    <span className="section-label">Reach Out</span>
                    <h1 className="mb-2">Contact Us</h1>
                    <p>
                        Have a question, want to place a bulk order, or become a distributor?
                        Fill in the form below and we will get back to you promptly.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '64px 16px' }}>
                <div className="row g-5">

                    {/* ── Form ── */}
                    <div className="col-12 col-lg-7">
                        {submitted ? (
                            <div className="aw-success-box">
                                <div className="aw-success-icon">
                                    <i className="bi bi-check2" />
                                </div>
                                <h2 className="mb-2" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Message Sent!</h2>
                                <p className="mb-4" style={{ fontSize: 14, color: 'var(--aw-charcoal-muted)' }}>
                                    Thank you for reaching out. Our team will get back to you within 24–48 hours.
                                </p>
                                <button onClick={() => setSubmitted(false)} className="btn-aw-outline">
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} noValidate>
                                <div className="d-flex flex-column gap-4">
                                    {fields.map(({ name, label, type, placeholder }) => (
                                        <div key={name}>
                                            <label className="aw-form-label">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={form[name]}
                                                onChange={onChange}
                                                placeholder={placeholder}
                                                className={`aw-form-control${errors[name] ? ' is-invalid' : ''}`}
                                            />
                                            {errors[name] && <div className="aw-form-error">{errors[name]}</div>}
                                        </div>
                                    ))}
                                    <div>
                                        <label className="aw-form-label">Message</label>
                                        <textarea
                                            name="message"
                                            rows={5}
                                            value={form.message}
                                            onChange={onChange}
                                            placeholder="Tell us about your enquiry…"
                                            className={`aw-form-control${errors.message ? ' is-invalid' : ''}`}
                                            style={{ resize: 'none' }}
                                        />
                                        {errors.message && <div className="aw-form-error">{errors.message}</div>}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn-aw-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Sending...
                                                </>
                                            ) : 'Send Message'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* ── Contact Panel ── */}
                    <div className="col-12 col-lg-5">
                        <div className="aw-contact-panel">
                            <h2>Contact Information</h2>
                            <div className="d-flex flex-column gap-4">
                                {contactDetails.map(({ label, value, href, icon }) => (
                                    <div key={label} className="d-flex gap-3 align-items-start">
                                        <div className="aw-contact-detail-icon">
                                            <i className={`bi ${icon}`} />
                                        </div>
                                        <div>
                                            <span className="aw-contact-label">{label}</span>
                                            <div className="aw-contact-val">
                                                {href
                                                    ? <a href={href} className="text-decoration-none">{value}</a>
                                                    : <span>{value}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--aw-border)' }}>
                                <p style={{ fontSize: 12, color: 'var(--aw-charcoal-muted)', lineHeight: 1.7, margin: 0 }}>
                                    Business hours: Monday – Saturday, 9:00 AM – 6:00 PM IST.<br />
                                    We typically respond within 24–48 working hours.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
