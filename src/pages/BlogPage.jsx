import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

export default function BlogPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog | AYURWAY LIFECARE';
    }, []);

    return (
        <main style={{ backgroundColor: 'var(--aw-bg-soft)', minHeight: '100vh' }}>
            <div className="aw-page-header">
                <div className="container text-center">
                    <span className="section-label mb-2 d-inline-block">Insights & Knowledge</span>
                    <h1>Our Blog</h1>
                    <p className="mx-auto mt-3">
                        Stay updated on Ayurvedic manufacturing trends, health tips, and industry insights.
                    </p>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    {blogPosts.map(post => (
                        <div key={post.id} className="col-12 col-md-6 col-lg-4">
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
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span style={{ fontSize: '0.8rem', color: 'var(--aw-green)', fontWeight: 600 }}>{post.date}</span>
                                    </div>
                                    <Link to={`/blog/${post.slug}`} className="text-decoration-none">
                                        <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--aw-charcoal)', lineHeight: 1.4 }}>
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--aw-charcoal-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                                        {post.excerpt}
                                    </p>
                                    <Link to={`/blog/${post.slug}`} className="btn-aw-outline text-decoration-none" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                        Read Article
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
