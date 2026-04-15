import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

export default function BlogDetailPage() {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (post) {
            document.title = `${post.title} | AYURWAY LIFECARE`;
        } else {
            document.title = 'Post Not Found | AYURWAY LIFECARE';
        }
    }, [post]);

    if (!post) {
        return (
            <main className="container py-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Blog Post Not Found</h2>
                <p className="mb-4">The article you are looking for does not exist or has been moved.</p>
                <Link to="/blog" className="btn-aw-primary text-decoration-none">Return to Blog</Link>
            </main>
        );
    }

    return (
        <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', paddingBottom: '80px' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">

                        {/* Meta */}
                        <div className="mb-4 text-center">
                            <span className="badge bg-soft text-green px-3 py-2 rounded-pill mb-3" style={{ fontSize: '0.85rem', color: 'var(--aw-green)', backgroundColor: 'var(--aw-green-light)' }}>
                                {post.date}
                            </span>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--aw-charcoal)', lineHeight: 1.2, marginBottom: '20px' }}>
                                {post.title}
                            </h1>
                            <div className="d-flex align-items-center justify-content-center gap-2" style={{ color: 'var(--aw-charcoal-muted)', fontSize: '0.95rem' }}>
                                <span>By <strong>{post.author}</strong></span>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="mb-5" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
                            <img src={post.image} alt={post.title} className="w-100" style={{ objectFit: 'cover', maxHeight: '500px' }} />
                        </div>

                        {/* Content */}
                        <div
                            className="blog-content"
                            style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--aw-charcoal)' }}
                        >
                            {/* Render paragraph by paragraph by splitting newlines */}
                            {post.content.split('\n').map((paragraph, idx) => (
                                paragraph.trim() !== '' && (
                                    <p key={idx} className="mb-4">{paragraph}</p>
                                )
                            ))}
                        </div>

                        <hr className="my-5" style={{ borderColor: 'var(--aw-border)' }} />

                        <div className="text-center">
                            <Link to="/blog" className="btn-aw-outline text-decoration-none d-inline-flex align-items-center gap-2">
                                <i className="bi bi-arrow-left"></i> Back to Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
