/**
 * Landing / Welcome View
 * Campus Connect AI - Parent-First College Decision Experience
 */

import { mockColleges } from '../data/mockColleges.js';
import { mockEvents } from '../data/mockEvents.js';

export const landingView = {
  render() {
    const featuredColleges = mockColleges.slice(0, 3);
    const featuredEvents = mockEvents.slice(0, 3);

    return `
      <div>
        <!-- Hero Section -->
        <section class="landing-hero">
          <div class="hero-pill">
            <span>👨‍👩‍👧</span>
            <span>Parent-First College Decision Companion</span>
          </div>

          <h1 class="hero-title">
            Find the right college with confidence.
          </h1>

          <p class="hero-subtitle">
            Explore colleges, compare admission options, understand total costs, and get personalized guidance for your child's journey — powered by verified historical data and responsible AI.
          </p>

          <div class="hero-ctas">
            <a href="#discover" class="btn btn-primary btn-lg">
              Find Colleges
            </a>
            <a href="#ai-guide" class="btn btn-secondary btn-lg" style="border: 1.5px solid var(--primary-300); color:var(--primary-700)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
              Try College Decision Assistant
            </a>
            <button class="btn btn-outline btn-lg" onclick="window.runGuidedDemoFlow()" title="One-click guided parent decision tour">
              🚀 Run Parent Decision Tour
            </button>
          </div>

          <!-- Hero Stat Highlights -->
          <div class="hero-stats-grid">
            <div class="hero-stat-card">
              <div class="hero-stat-num">500+</div>
              <div class="hero-stat-label">Verified Institutions</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">10 Yrs</div>
              <div class="hero-stat-label">Verified DoTE Cutoffs</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">100%</div>
              <div class="hero-stat-label">Fee & Hostel Transparency</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">Zero</div>
              <div class="hero-stat-label">False Admission Promises</div>
            </div>
          </div>
        </section>

        <!-- Parent Decision Pillars -->
        <section class="features-section">
          <div class="section-header">
            <div class="section-subtitle">Designed For Indian Families</div>
            <h2 class="section-title">The Critical Factors Parents Need To Evaluate</h2>
            <p style="color:var(--slate-600); max-width:650px; margin:0.5rem auto 0; font-size:0.95rem;">
              College decisions impact four years of your child's life and your family's hard-earned savings. We present clear, unbiased facts instead of glossy marketing brochures.
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-box">
              <div class="feature-icon-wrapper" style="background:#EFF6FF; color:var(--primary-700);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
              </div>
              <h3 style="margin-bottom:0.5rem;">5-Second Evaluation</h3>
              <p>Instant clarity on child score suitability, estimated annual tuition, hostel availability, and DoTE historical cutoffs on every college card.</p>
            </div>

            <div class="feature-box">
              <div class="feature-icon-wrapper" style="background:#FEF3C7; color:#B45309;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 style="margin-bottom:0.5rem;">Complete Fee Transparency</h3>
              <p>Breakdowns of tuition, exam fees, hostel room, mess deposit, and college transport so families face zero unexpected expenses.</p>
            </div>

            <div class="feature-box">
              <div class="feature-icon-wrapper" style="background:#ECFDF5; color:#047857;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3 style="margin-bottom:0.5rem;">Hostel, Commute & Safety</h3>
              <p>Verified hostel capacities, warden oversight, CCTV coverage, multi-cuisine mess plans, campus health centers, and GPS-tracked bus networks.</p>
            </div>

            <div class="feature-box">
              <div class="feature-icon-wrapper" style="background:#EFF6FF; color:#1D4ED8;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <h3 style="margin-bottom:0.5rem;">Historical Cutoffs Archive</h3>
              <p>10 years of DoTE counselling closing ranks segmented by quota category (OC, BC, BCM, MBC, SC, ST) with clear non-guarantee disclosures.</p>
            </div>

            <div class="feature-box">
              <div class="feature-icon-wrapper" style="background:#FEF2F2; color:#B91C1C;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 style="margin-bottom:0.5rem;">Shortlist & Deadline Tracker</h3>
              <p>Organize options into Best Fit, Good Options, and Backup Options with automatic alerts for counselling registration and document verification.</p>
            </div>

            <div class="feature-box">
              <div class="feature-icon-wrapper" style="background:#F0FDF4; color:#15803D;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 style="margin-bottom:0.5rem;">Responsible Decision AI</h3>
              <p>Every suggestion explains the exact 4-factor math (Academic 40%, Course 25%, Location 20%, Budget 15%) without commercial influence.</p>
            </div>
          </div>
        </section>

        <!-- Featured Colleges for Parents -->
        <section style="background-color:var(--white); padding:4rem 1.5rem; border-top:1px solid var(--slate-200); border-bottom:1px solid var(--slate-200);">
          <div style="max-width:1200px; margin:0 auto;">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
              <div>
                <div class="section-subtitle">Verified Institutional Profiles</div>
                <h2 class="section-title">Top Engineering Campuses in Tamil Nadu</h2>
              </div>
              <a href="#discover" class="btn btn-outline btn-sm">Explore All 12 Campuses →</a>
            </div>

            <div class="grid-cards">
              ${featuredColleges.map(c => `
                <div class="card card-hover" style="display:flex; flex-direction:column;">
                  <div style="height:150px; position:relative;">
                    <img src="${c.bannerImage}" alt="${c.name}" style="width:100%; height:100%; object-fit:cover;" />
                    <span class="badge badge-verified" style="position:absolute; top:12px; left:12px;">Verified Institution</span>
                    <span style="position:absolute; bottom:10px; right:12px; background:rgba(15,23,42,0.85); color:#fff; font-size:0.75rem; padding:2px 8px; border-radius:4px; font-weight:600;">
                      NIRF #${c.nirfRank}
                    </span>
                  </div>
                  <div class="card-body" style="flex:1;">
                    <h3 style="font-size:1.05rem; margin-bottom:0.25rem;">${c.name}</h3>
                    <div style="font-size:0.85rem; color:var(--slate-500); margin-bottom:0.75rem;">
                      📍 ${c.city} • TNEA Code: <strong>${c.tneaCode}</strong>
                    </div>

                    <!-- Parent Fact Summary -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.8rem; background:var(--slate-50); padding:0.65rem; border-radius:var(--radius-md); border:1px solid var(--slate-200); margin-bottom:0.75rem;">
                      <div>
                        <span style="color:var(--slate-500); font-size:0.7rem; display:block;">EST. TUITION</span>
                        <strong style="color:var(--slate-800); font-size:0.85rem;">${c.feeRange?.display || '₹1.75 - 1.95 L/yr'}</strong>
                      </div>
                      <div>
                        <span style="color:var(--slate-500); font-size:0.7rem; display:block;">HOSTEL ROOM</span>
                        <strong style="color:var(--slate-800); font-size:0.85rem;">${c.hostelFee ? ('₹' + c.hostelFee.toLocaleString('en-IN') + '/yr') : 'Available'}</strong>
                      </div>
                      <div>
                        <span style="color:var(--slate-500); font-size:0.7rem; display:block;">AVG SALARY</span>
                        <strong style="color:var(--primary-700); font-size:0.85rem;">${c.placements.avgPackage}</strong>
                      </div>
                      <div>
                        <span style="color:var(--slate-500); font-size:0.7rem; display:block;">2025 CUTOFF</span>
                        <strong style="color:#B45309; font-size:0.85rem;">${c.historicalCutoffsSummary.cseGeneral.split('/')[0]}</strong>
                      </div>
                    </div>

                    <div style="font-size:0.8rem; color:#047857; font-weight:600; display:flex; align-items:center; gap:4px;">
                      <span>✓</span>
                      <span>Safe Campus • Verified On-Campus Residence</span>
                    </div>
                  </div>
                  <div class="card-footer" style="display:flex; gap:0.5rem;">
                    <a href="#college-profile?id=${c.id}" class="btn btn-primary btn-sm" style="flex:1; text-align:center;">View Full Details</a>
                    <button class="btn btn-outline btn-sm" onclick="window.addCollegeToCompare('${c.id}')" title="Compare side by side">⚖️ Compare</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Parent Checklist Teaser -->
        <section class="features-section">
          <div style="max-width:960px; margin:0 auto; background:var(--white); border:1px solid var(--slate-200); border-radius:var(--radius-xl); padding:2.5rem; box-shadow:var(--shadow-sm);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; margin-bottom:1.5rem;">
              <div>
                <span class="badge badge-fit-high" style="margin-bottom:0.5rem; display:inline-block;">Family Decision Guide</span>
                <h2 style="font-size:1.6rem; margin-bottom:0.25rem;">The 5 Things To Check Before Submitting TNEA Choices</h2>
                <p style="color:var(--slate-600); font-size:0.9rem; margin:0;">Essential verification checklist recommended for parents during admissions.</p>
              </div>
              <a href="#ai-guide" class="btn btn-primary btn-sm">Ask AI Decision Assistant →</a>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
              <div style="display:flex; gap:0.75rem; align-items:flex-start; background:var(--slate-50); padding:1rem; border-radius:var(--radius-md);">
                <div style="width:24px; height:24px; border-radius:50%; background:#047857; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0;">1</div>
                <div>
                  <div style="font-weight:700; font-size:0.875rem; color:var(--slate-900);">Historical Cutoff Margin</div>
                  <div style="font-size:0.8rem; color:var(--slate-600); margin-top:2px;">Ensure your child's cutoff is within 1.5–2 marks of the past 3-year closing average for realistic choice ordering.</div>
                </div>
              </div>

              <div style="display:flex; gap:0.75rem; align-items:flex-start; background:var(--slate-50); padding:1rem; border-radius:var(--radius-md);">
                <div style="width:24px; height:24px; border-radius:50%; background:#047857; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0;">2</div>
                <div>
                  <div style="font-weight:700; font-size:0.875rem; color:var(--slate-900);">Total 4-Year Cost of Education</div>
                  <div style="font-size:0.8rem; color:var(--slate-600); margin-top:2px;">Factor in hostel mess dues, books, special lab fees, and transportation alongside basic tuition fees.</div>
                </div>
              </div>

              <div style="display:flex; gap:0.75rem; align-items:flex-start; background:var(--slate-50); padding:1rem; border-radius:var(--radius-md);">
                <div style="width:24px; height:24px; border-radius:50%; background:#047857; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0;">3</div>
                <div>
                  <div style="font-weight:700; font-size:0.875rem; color:var(--slate-900);">Median vs Highest Placement Package</div>
                  <div style="font-size:0.8rem; color:var(--slate-600); margin-top:2px;">Look at median salary (₹5.5L–₹6.5L) rather than one-off single student international offers.</div>
                </div>
              </div>

              <div style="display:flex; gap:0.75rem; align-items:flex-start; background:var(--slate-50); padding:1rem; border-radius:var(--radius-md);">
                <div style="width:24px; height:24px; border-radius:50%; background:#047857; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0;">4</div>
                <div>
                  <div style="font-weight:700; font-size:0.875rem; color:var(--slate-900);">Hostel Discipline & Medical Facilities</div>
                  <div style="font-weight:400; font-size:0.8rem; color:var(--slate-600); margin-top:2px;">Inspect residential wardens, curfew policies, 24/7 on-campus ambulance, and female student security protocols.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Responsible AI Pledge Banner -->
        <section style="background:var(--slate-900); color:var(--white); padding:3.5rem 1.5rem; text-align:center;">
          <div style="max-width:800px; margin:0 auto;">
            <div style="width:48px; height:48px; border-radius:50%; background:rgba(4, 120, 87, 0.25); color:#10B981; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 style="color:var(--white); font-size:1.85rem; margin-bottom:0.75rem;">Our Non-Negotiable Commitment to Honest Family Guidance</h2>
            <p style="color:var(--slate-400); font-size:0.95rem; margin-bottom:2rem; line-height:1.6;">
              Campus Connect AI will never claim guaranteed seat allotment, sell admission quotas, or accept paid institutional ranking bias. Every recommendation provides transparent mathematical factors based on verified DoTE counselling archives.
            </p>
            <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
              <a href="#home" class="btn btn-primary btn-lg">Open Family Dashboard</a>
              <a href="#ai-guide" class="btn btn-secondary btn-lg">Try Decision Assistant</a>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};
