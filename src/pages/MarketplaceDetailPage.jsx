/**
 * MarketplaceDetailPage.jsx — THE ULTIMATE SEO & GEO RANKING MACHINE
 * Fully compliant with Google Guidelines for E-E-A-T and Search intent.
 */
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { marketplaceLinks } from '../data/marketplaceData';
import { uniqueMarketplaceContent } from '../data/marketplaceContent';

export default function MarketplaceDetailPage() {
  const { slug } = useParams();
  const data = marketplaceLinks.find(item => item.slug === slug);
  const uniqueData = uniqueMarketplaceContent[slug];

  useEffect(() => {
    if (data) {
      const kw = data.title;
      const desc = uniqueData ? uniqueData.intro.replace(/<[^>]*>?/gm, '').substring(0, 160) : `${data.usp} - Leading manufacturer for ${kw}.`;

      // 1. DYNAMIC META TITLE & DESCRIPTION
      document.title = `${kw} | Ayurway Lifecare Pvt. Ltd.`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
      metaDesc.content = desc;

      let metaKeys = document.querySelector('meta[name="keywords"]');
      if (!metaKeys) { metaKeys = document.createElement('meta'); metaKeys.name = "keywords"; document.head.appendChild(metaKeys); }
      metaKeys.content = `${kw}, Ayurvedic third party manufacturing, herbal product manufacturer, Ayurway Lifecare, ${data.city || 'India'}`;

      // 2. DYNAMIC CANONICAL TAG
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = "canonical"; document.head.appendChild(canonical); }
      canonical.href = `https://www.ayurwaylifecare.com/marketplace/${slug}`;

      // 3. ADVANCED JSON-LD SCHEMA (Google AEO/SEO)
      let schemaScript = document.getElementById('marketplace-schema');
      if (!schemaScript) { schemaScript = document.createElement('script'); schemaScript.id = 'marketplace-schema'; schemaScript.type = 'application/ld+json'; document.head.appendChild(schemaScript); }
      schemaScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": kw,
        "serviceType": "Ayurvedic Third Party Manufacturing",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Ayurway Lifecare Pvt. Ltd.",
          "image": "https://www.ayurwaylifecare.com/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jawaharpur, Derabassi",
            "addressLocality": "Mohali",
            "addressRegion": "Punjab",
            "postalCode": "140507",
            "addressCountry": "IN"
          },
          "telephone": "+91-7087553268"
        },
        "description": desc,
        "areaServed": data.city || "India",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      });

      window.scrollTo(0, 0);
    }
  }, [data, slug, uniqueData]);

  if (!data) return <Navigate to="/marketplace" replace />;

  const keyword = data.title;
  const { category, city, localFact, usp } = data;

  // ── SEO COMPONENT BLOCKS ──

  const BlockIntro = () => (
    <div className="mb-5">
      <h2 className="mb-4 text-success fw-bold h3">{uniqueData ? uniqueData.h2_1 : `Leading ${keyword} Excellence`}</h2>
      <div
        className="seo-text"
        dangerouslySetInnerHTML={{ __html: uniqueData ? uniqueData.intro : `<p>Ayurway Lifecare is the definitive partner for ${keyword}. Our facility in ${city || 'India'} bridges the gap between nature and clinical precision.</p>` }}
      />
      {uniqueData && <div className="seo-text mt-4" dangerouslySetInnerHTML={{ __html: uniqueData.p1 }} />}
    </div>
  );

  const BlockQuality = () => (
    <div className="mb-5">
      <h3 className="mb-3 fw-bold underline-custom h4">{uniqueData ? uniqueData.h2_2 : "Uncompromising Quality Control"}</h3>
      <div
        className="seo-text"
        dangerouslySetInnerHTML={{ __html: uniqueData ? uniqueData.p2 : `<p>When searching for ${keyword}, quality is the only benchmark that matters. Our labs monitor every stage of production.</p>` }}
      />
      <div className="my-5 p-4 bg-light rounded-4 border-start border-success border-5 shadow-sm">
        <h4 className="fw-bold mb-3 h6 text-success text-uppercase">Technical Specification Table:</h4>
        <div className="table-responsive">
          <table className="table table-sm table-borderless small mb-0">
            <tbody>
              <tr><td className="fw-bold text-muted" style={{ width: '140px' }}>Service Focus</td><td>{keyword}</td></tr>
              <tr><td className="fw-bold text-muted">Certifications</td><td>WHO-GMP, ISO 22000, AYUSH</td></tr>
              <tr><td className="fw-bold text-muted">USP</td><td>{usp}</td></tr>
              <tr><td className="fw-bold text-muted">Region Capability</td><td>{city || 'Global'} / PAN India</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const BlockScaling = () => (
    <div className="mb-5">
      <h3 className="mb-3 fw-bold underline-custom h4">Market Readiness & Scaling</h3>
      <p className="seo-text">
        Success in the wellness industry is about more than just a great formula—it's about supply chain reliability. For <strong>{keyword}</strong>, we provide the industrial backbone you need to scale without friction.
      </p>
      <div className="bg-success text-white p-5 rounded-4 mt-4 shadow-lg border-0 position-relative quote-card">
        <div className="z-1 position-relative">
          <p className="mb-0 fs-5 lh-base fw-light italic" dangerouslySetInnerHTML={{ __html: uniqueData ? uniqueData.conclusion : `"Our mission for ${keyword} is to deliver nature's potency with modern safety."` }} />
        </div>
      </div>
    </div>
  );

  return (
    <main className="marketplace-detail-page bg-white pb-5">
      <section className="py-5 bg-dark position-relative overflow-hidden mb-5 hero-section-custom">
        <div className="container py-lg-5 z-1 position-relative">
          <div className="row align-items-center">
            <div className="col-lg-7 order-2 order-lg-1">
              <h1 className="display-3 fw-bold text-white mb-4 lh-sm animate-title" style={{ maxWidth: '900px' }}>{keyword}</h1>
              <p className="lead text-white opacity-75 mb-5 fs-4" style={{ maxWidth: '750px' }}>{usp} WHO-GMP Certified High-Volume Production Hub.</p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#inquiry" className="btn btn-success btn-lg px-5 rounded-pill border-0 fw-bold py-3 shadow-lg" style={{ background: '#2e7d52' }}>Inquire Now</a>
                <Link to="/contact" className="btn btn-outline-light btn-lg px-5 rounded-pill py-3 fw-bold">Contact Factory</Link>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 mb-4 mb-lg-0 text-center animate-hero-img">
              <img
                src="/images/marketplace/hero-herbal.png"
                alt={`Premium 3D Ayurvedic Capsules jumping out for ${keyword}`}
                className="img-fluid floating-img drop-shadow-white"
                style={{ maxHeight: '450px' }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="seo-wrapper bg-white">
              <BlockIntro />
              <BlockQuality />
              <BlockScaling />

              <div className="mt-5 pt-5 border-top">
                <h3 className="fw-bold mb-4 h4">Expert Business Consultation: {keyword}</h3>
                <div className="row g-4">
                  {[
                    { q: `How does ${keyword} benefit my brand?`, a: "Choosing our third-party model allows you to leverage our WHO-GMP infrastructure without any capital investment, enabling you to focus entirely on marketing and sales." },
                    { q: "What are the minimum order quantities?", a: "We support emerging brands with flexible Low MOQs. This allows you to test market demand before committing to large-scale inventory." },
                    { q: "Is packaging design included?", a: "Yes, our in-house creative team handles everything from regulatory-compliant label design to high-end aesthetic packaging for your entire product range." }
                  ].map((faq, idx) => (
                    <div className="col-md-6" key={idx}>
                      <div className="p-4 bg-light rounded-4 h-100 border transition-all hover-shadow">
                        <h5 className="fw-bold h6 text-success d-flex align-items-center">
                          <i className="bi bi-patch-question-fill me-2 opacity-50"></i>
                          {faq.q}
                        </h5>
                        <p className="small text-muted mb-0 lh-base">{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sticky-top shadow-xl" style={{ top: '100px' }}>
              <div className="card shadow-lg border-0 rounded-4 mb-4 overflow-hidden" id="inquiry">
                <div className="bg-success text-center py-4 text-white p-2">
                  <h4 className="fw-bold mb-0 h5">B2B Quick Inquiry</h4>
                  <p className="small mb-0 opacity-75">Connect with our R&D Team</p>
                </div>
                <div className="card-body p-4 p-md-5">
                  <form className="row g-4">
                    <div className="col-12"><input type="text" className="form-control bg-light border-0 p-3 rounded-3" placeholder="Full Name" required /></div>
                    <div className="col-12"><input type="tel" className="form-control bg-light border-0 p-3 rounded-3" placeholder="WhatsApp / Phone" required /></div>
                    <div className="col-12"><textarea className="form-control bg-light border-0 p-3 rounded-3" rows="4" placeholder={`Message regarding ${keyword}`} required></textarea></div>
                    <div className="col-12"><button type="submit" className="btn btn-success w-100 rounded-pill py-3 fw-bold fs-5 shadow" style={{ background: '#2e7d52' }}>Request Callback</button></div>
                  </form>
                </div>
              </div>
              <div className="card border-0 bg-dark text-white rounded-4 p-4 text-center">
                <h5 className="fw-bold text-success mb-2">Export Ready</h5>
                <p className="small opacity-75 mb-0">Our facility is equipped for global regulatory compliance including USA, EU, and Gulf standards. ISO 22000 Certified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .marketplace-detail-page { font-family: 'Poppins', sans-serif; }
        .marketplace-detail-page h1, .marketplace-detail-page h2, .marketplace-detail-page h3 { font-family: 'Outfit', sans-serif; }
        .underline-custom { position: relative; display: inline-block; margin-bottom: 2rem; padding-bottom: 15px; }
        .underline-custom::after { content: ''; position: absolute; left: 0; bottom: 0; height: 4px; width: 60px; background: #2e7d52; border-radius: 2px; }
        .seo-text p, .seo-text { font-size: 1.15rem; line-height: 2; color: #444; margin-bottom: 1.5rem; text-align: justify; }
        .seo-text strong { color: #2e7d52; font-weight: 700; }
        .hover-shadow:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.05); transform: translateY(-3px); }
        .hover-scale-img { transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .hover-scale-img:hover { transform: scale(1.05); }
        .animate-title { animation: fadeInUp 0.8s ease-out; }
        .hero-section-custom { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
        .floating-img { animation: float 6s ease-in-out infinite; }
        .drop-shadow-white { filter: drop-shadow(0 0 15px rgba(255,255,255,0.15)); }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .quote-card::before { content: '"'; position: absolute; top: 10px; left: 20px; font-size: 8rem; opacity: 0.1; color: #fff; font-family: serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .display-3 { font-size: 2.5rem !important; } .seo-text { text-align: left; } }
      `}} />
    </main>
  );
}
