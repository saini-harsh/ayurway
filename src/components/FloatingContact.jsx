import React, { useState } from 'react';

export default function FloatingContact() {
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success
    const [form, setForm] = useState({ name: '', phone: '' });

    const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        fetch('/send_email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                form_type: 'Callback Request',
                subject: 'New Callback Request'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setStatus('success');
                setForm({ name: '', phone: '' });
                setTimeout(() => {
                    setShowModal(false);
                    setStatus('idle');
                }, 3000);
            } else {
                alert(data.message || 'Error requesting callback. Please try again.');
                setStatus('idle');
            }
        })
        .catch(() => {
            alert('Could not connect to the server. Please check your internet or try again later.');
            setStatus('idle');
        });
    };

    return (
        <>
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 9999
            }}>
                {/* Request Callback Button */}
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'var(--aw-green-dark)',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Request a Callback"
                >
                    <i className="bi bi-person-lines-fill" style={{ fontSize: '24px' }}></i>
                </button>

                {/* Call Button */}
                <a
                    href="tel:+917087553268"
                    style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'var(--aw-green)',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        textDecoration: 'none',
                        transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Call Us"
                >
                    <i className="bi bi-telephone-fill" style={{ fontSize: '24px' }}></i>
                </a>

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/917087553268"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: '#25D366', // WhatsApp Green
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        textDecoration: 'none',
                        transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Chat on WhatsApp"
                >
                    <i className="bi bi-whatsapp" style={{ fontSize: '28px' }}></i>
                </a>
            </div>

            {/* Callback Request Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '30px',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '20px',
                                color: 'var(--aw-charcoal-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <h4 className="mb-3" style={{ color: 'var(--aw-charcoal)', fontWeight: 700 }}>Request a Callback</h4>

                        {status === 'success' ? (
                            <div className="text-center py-4">
                                <i className="bi bi-check-circle-fill mb-3 d-block" style={{ fontSize: '40px', color: 'var(--aw-green)' }}></i>
                                <h5 style={{ color: 'var(--aw-charcoal)' }}>Thank You!</h5>
                                <p style={{ color: 'var(--aw-charcoal-muted)', fontSize: '0.9rem' }}>We have received your details. Our team will call you back shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--aw-charcoal-muted)', marginBottom: '20px' }}>
                                    Leave your details below and one of our pharmaceutical experts will get back to you.
                                </p>
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={form.name}
                                        onChange={onChange}
                                        className="form-control" 
                                        required 
                                        placeholder="John Doe" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={form.phone}
                                        onChange={onChange}
                                        className="form-control" 
                                        required 
                                        placeholder="+91 70875 53268" 
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-aw-primary w-100"
                                    disabled={status === 'loading'}
                                    style={{ padding: '10px 0', fontSize: '1rem' }}
                                >
                                    {status === 'loading' ? 'Submitting...' : 'Request Callback'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
