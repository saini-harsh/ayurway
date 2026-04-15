/**
 * MarketplacePage.jsx
 * Listing all SEO promotion paths for Ayurvedic manufacturing
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { marketplaceLinks } from '../data/marketplaceData';

export default function MarketplacePage() {
  return (
    <div className="marketplace-page">
      {/* Header section */}
      <section className="py-5 bg-light border-bottom">
        <div className="container py-4">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3 text-dark">Marketplace</h1>
              <p className="lead text-muted">
                Explore our specialized Ayurvedic manufacturing and third-party services across India.
                We provide premium WHO-GMP and ISO certified solutions for herbal wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of SEO links */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {marketplaceLinks.map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <Link 
                  to={`/marketplace/${item.slug}`} 
                  className="card h-100 shadow-sm text-decoration-none border-0 overflow-hidden hover-lift transition-all"
                  style={{ borderRadius: '15px' }}
                >
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                    </div>
                    <div>
                      <h5 className="card-title mb-0 fs-6 fw-semibold text-dark">{item.title}</h5>
                      <small className="text-muted mt-1 d-block">Click to explore service details</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
        }
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
        .marketplace-page .card {
          border: 1px solid rgba(0,0,0,.05) !important;
          background: #fff;
        }
        .marketplace-page .card:hover {
          border-color: #2e7d52 !important;
        }
      `}} />
    </div>
  );
}
