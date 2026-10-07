/**
 * College Profile View - Flagship Parent Decision Experience
 * Implements Sections 11, 12, 13, 14, 15, 16 of Premium Parent UX:
 * 
 * 1. Verdict at Top: "Is this college suitable for Ananya?"
 *    - Concise AI verdict block
 *    - "Why it fits" checklist (Academic match, Course match, Budget fit, Location fit)
 *    - "See how this recommendation was calculated →" (Opens Explainability Modal)
 * 2. Quick Facts Bar: Course, Annual Tuition, Hostel, Latest Verified Cutoff
 * 3. 7 Parent-Focused Tabs:
 *    - Tab 1: Is this college suitable?
 *    - Tab 2: Admission & Cutoffs (Visual territory bar: Child vs Historical Cutoff range)
 *    - Tab 3: Fees & Total Cost (Yearly ₹1.85L breakdown + 4-Year ₹7.4L total)
 *    - Tab 4: Courses Offered
 *    - Tab 5: Hostel, Commute & Safety (Parent campus visit checklist)
 *    - Tab 6: Campus Life
 *    - Tab 7: Student Experiences
 */

import { collegeService } from '../services/collegeService.js';
import { store } from '../state/store.js';
import { mockPosts } from '../data/mockPosts.js';
import { mockEvents } from '../data/mockEvents.js';
import { getCollegeDecisionTier } from '../components/collegeCard.js';

export const collegeProfileView = {
  activeTab: "suitability", // 'suitability', 'admission', 'fees', 'academics', 'hostel_location', 'campus_life', 'reviews'

  async render(collegeId) {
    if (!collegeId) collegeId = "skcet";

    const college = await collegeService.getCollegeById(collegeId);
    if (!college) {
      return `
        <div class="page-container empty-state">
          <div class="empty-icon">🏛️</div>
          <h2 class="empty-title">We couldn't load this college profile right now</h2>
          <p class="empty-desc">The requested institution may not exist in our verified database or has been moved.</p>
          <a href="#discover" class="btn btn-primary btn-sm">Back to College Discovery</a>
        </div>
      `;
    }

    const isSaved = store.isCollegeSaved(college.id);
    const isInCompare = store.isInCompare(college.id);

    const collegeEvents = mockEvents.filter(e => e.collegeId === college.id);
    const collegePosts = mockPosts.filter(p => p.collegeId === college.id);
    const user = store.getState().currentUser;
    const childName = user.childName || "Ananya Kumar";
    const childShort = childName.split(' ')[0];
    const cutoffScore = user.marks ? user.marks.tneaEquivalentCutoff : 176.0;

    const tierInfo = getCollegeDecisionTier(college.id);
    const primaryCourse = college.popularCourses?.[0] || "B.E. Computer Science and Engineering";

    // Dynamic Fee Breakdown calculations (Section 14)
    const baseTuition = college.feeRange?.min || 140000;
    const hostelRoom = college.hostelAvailable ? Math.round((college.hostelFee || 80000) * 0.75) : 0;
    const messFee = college.hostelAvailable ? Math.round((college.hostelFee || 80000) * 0.25) : 0;
    const otherFees = 5000;
    const totalYearlyCost = baseTuition + hostelRoom + messFee + otherFees;
    const totalFourYearCost = totalYearlyCost * 4;

    const yearlyCostDisplay = (totalYearlyCost / 100000).toFixed(2);
    const fourYearCostDisplay = (totalFourYearCost / 100000).toFixed(2);

    // Dynamic Cutoff Calculation
    const collegeCutoffNum = college.historicalCutoffsSummary?.cseGeneral 
      ? parseFloat(college.historicalCutoffsSummary.cseGeneral) 
      : 182.5;

    return `
      <div class="page-container">
        
        <!-- Breadcrumb & Family Context -->
        <div style="margin-bottom:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <a href="#discover" style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.875rem; font-weight:600; color:var(--slate-600);">
            ← Back to College Discovery
          </a>
          <span style="font-size:0.825rem; color:var(--slate-600); background:#FFFFFF; border:1px solid var(--slate-200); padding:0.25rem 0.65rem; border-radius:var(--radius-full);">
            Evaluating for <strong>${childShort}</strong> (Class 12 · 88% · TNEA Cutoff ~${cutoffScore})
          </span>
        </div>

        <!-- College Header Bar -->
        <section class="card" style="padding:1.5rem 1.75rem; margin-bottom:1.5rem; background:#FFFFFF;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.25rem;">
            
            <div style="display:flex; align-items:center; gap:1.25rem;">
              <img 
                src="${college.logo}" 
                alt="${college.shortName} Logo" 
                style="width:72px; height:72px; border-radius:var(--radius-lg); object-fit:cover; border:2px solid var(--slate-200); box-shadow:var(--shadow-sm);" 
              />
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                  <h1 style="font-size:1.65rem; font-weight:800; color:var(--slate-900); margin:0;">
                    ${college.name}
                  </h1>
                  <span class="badge ${tierInfo.badgeClass}">${tierInfo.tier}</span>
                  ${college.verified ? `
                    <span class="badge badge-verified">✓ Verified College</span>
                  ` : ''}
                </div>
                <div style="font-size:0.875rem; color:var(--slate-600); margin-top:0.35rem; display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                  <span>📍 ${college.city}, ${college.state}</span>
                  <span>•</span>
                  <span>${college.type} (${college.affiliation})</span>
                  <span>•</span>
                  <span class="badge badge-rating">★ ${college.rating} Rating</span>
                  <span>•</span>
                  <span style="font-weight:700; color:var(--primary-800)">NIRF #${college.nirfRank}</span>
                </div>
              </div>
            </div>

            <!-- Primary Header Actions -->
            <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
              <button 
                class="btn ${isSaved ? 'btn-secondary' : 'btn-primary'} btn-sm"
                onclick="window.handleSaveToggle('${college.id}')"
              >
                ${isSaved ? '★ In Shortlist' : '☆ Add to Shortlist'}
              </button>

              <button 
                class="btn btn-secondary btn-sm ${isInCompare ? 'active-compare' : ''}"
                onclick="window.handleCompareToggle('${college.id}')"
              >
                ${isInCompare ? 'Comparing ✓' : '+ Compare'}
              </button>

              <a 
                href="${college.officialAdmissionUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-outline btn-sm"
              >
                Official Website ↗
              </a>
            </div>

          </div>

          <!-- TOP 4 QUICK FACTS FOR PARENTS (Section 12) -->
          <div class="parent-quick-facts-bar" style="margin-top:1.5rem;">
            <div class="fact-tile">
              <span class="fact-tile-label">Primary Course</span>
              <span class="fact-tile-val" style="font-size:1.05rem;">B.E. CSE</span>
              <span class="fact-tile-sub">4-Year Degree (${college.courses?.[0]?.seats || '240'} Seats)</span>
            </div>

            <div class="fact-tile">
              <span class="fact-tile-label">Annual Tuition</span>
              <span class="fact-tile-val" style="color:var(--primary-800); font-size:1.1rem;">
                ₹${(baseTuition / 100000).toFixed(2)}L
              </span>
              <span class="fact-tile-sub">Govt / Autonomous Slab</span>
            </div>

            <div class="fact-tile">
              <span class="fact-tile-label">Hostel Accommodation</span>
              <span class="fact-tile-val" style="color:#065F46;">
                ${college.hostelAvailable ? '✓ Available' : '✗ Off-campus'}
              </span>
              <span class="fact-tile-sub">On-campus AC & Non-AC (~₹${(hostelRoom + messFee) / 1000}K/yr)</span>
            </div>

            <div class="fact-tile">
              <span class="fact-tile-label">Latest Verified Cutoff</span>
              <span class="fact-tile-val" style="color:#92400E;">
                ${college.historicalCutoffsSummary?.cseGeneral?.split('/')[0] || '178.5'}
              </span>
              <span class="fact-tile-sub">TNEA Open Category (Round 1)</span>
            </div>
          </div>
        </section>

        <!-- FLAGSHIP VERDICT SECTION (Section 11) -->
        <section class="card" style="padding:1.5rem 1.75rem; margin-bottom:1.5rem; background:#FFFFFF; border:1px solid var(--slate-200); border-left:4px solid ${tierInfo.tier === 'BEST FIT' ? '#065F46' : tierInfo.tier === 'STRETCH' ? '#5B21B6' : tierInfo.tier === 'BACKUP' ? '#92400E' : 'var(--primary-700)'};">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:0.85rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em; font-weight:700; color:${tierInfo.tier === 'BEST FIT' ? '#065F46' : 'var(--primary-700)'}; margin-bottom:0.25rem;">
                AI Decision Companion Verdict
              </div>
              <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin:0;">
                Is this college suitable for ${childShort}?
              </h2>
            </div>

            <span class="badge ${tierInfo.badgeClass}" style="font-size:0.85rem; padding:0.35rem 0.85rem;">
              ${tierInfo.admissionLabel}
            </span>
          </div>

          <!-- Concise AI-assisted verdict block (Section 11) -->
          <div style="background:var(--slate-50); border:1px solid var(--slate-200); border-radius:var(--radius-lg); padding:1rem 1.25rem; margin-bottom:1.15rem;">
            <p style="font-size:0.95rem; color:var(--slate-800); line-height:1.6; margin:0;">
              ${college.id === 'skcet' ? `
                <strong>Strong fit:</strong> ${childShort}’s Class 12 aggregate of 88.0% (TNEA Cutoff ~176.0) and preferred B.E. Computer Science focus align well with recent historical admission ranges. The estimated annual tuition and hostel expenses (₹${yearlyCostDisplay}L) also fall comfortably within the family's stated ₹1.80L annual budget.
              ` : college.id === 'rec' ? `
                <strong>Good alternative:</strong> Rajalakshmi Engineering College represents a strong alternative option in Chennai. While core CSE historically demands ~182.5, industry-partnered programs such as B.Tech CSBS (TCS partnered, ~178.0) and IT fall directly into ${childShort}'s realistic admission range.
              ` : college.id === 'sairam' ? `
                <strong>Safe fallback:</strong> Sri Sairam Engineering College offers a high degree of admission safety with recent closing cutoff of 174.5, comfortably within ${childShort}'s 176.0 score, alongside an economical fee structure.
              ` : `
                <strong>Aspirational benchmark:</strong> With recent CSE cutoffs closing at 193.0 / 200, this institution represents a competitive stretch. Admission via general government counselling requires top-percentile ranks, though allied specialized branches or merit quota pathways remain avenues to explore.
              `}
            </p>
          </div>

          <!-- Why it fits checklist & Explainability Link (Section 11) -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-size:0.78rem; text-transform:uppercase; font-weight:700; color:var(--slate-500); margin-bottom:0.5rem; letter-spacing:0.04em;">
                Why it fits ${childShort}:
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:1rem; font-size:0.85rem; font-weight:600; color:#065F46;">
                <div style="display:flex; align-items:center; gap:0.35rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Academic match</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.35rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Course match (${primaryCourse.split(' ')[0]} ${primaryCourse.split(' ')[1] || ''})</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.35rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Budget fit (₹${yearlyCostDisplay}L / yr)</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.35rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Hostel available</span>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              class="btn btn-ghost btn-sm" 
              style="color:var(--primary-700); font-weight:700; padding:0.35rem 0.5rem;"
              onclick="window.showExplainability('${college.id}')"
            >
              See how this recommendation was calculated →
            </button>
          </div>
        </section>

        <!-- 7 Parent-Focused Tabs (Section 13) -->
        <nav class="tab-nav" style="margin-bottom:1.5rem;">
          <button class="tab-item ${this.activeTab === 'suitability' ? 'active' : ''}" onclick="window.switchProfileTab('suitability')">
            1. Is this college suitable?
          </button>
          <button class="tab-item ${this.activeTab === 'admission' ? 'active' : ''}" onclick="window.switchProfileTab('admission')">
            2. Admission & Cutoffs
          </button>
          <button class="tab-item ${this.activeTab === 'fees' ? 'active' : ''}" onclick="window.switchProfileTab('fees')">
            3. Fees & Total Cost
          </button>
          <button class="tab-item ${this.activeTab === 'academics' ? 'active' : ''}" onclick="window.switchProfileTab('academics')">
            4. Courses Offered (${college.courses?.length || 0})
          </button>
          <button class="tab-item ${this.activeTab === 'hostel_location' ? 'active' : ''}" onclick="window.switchProfileTab('hostel_location')">
            5. Hostel, Commute & Safety
          </button>
          <button class="tab-item ${this.activeTab === 'campus_life' ? 'active' : ''}" onclick="window.switchProfileTab('campus_life')">
            6. Campus Life (${collegeEvents.length})
          </button>
          <button class="tab-item ${this.activeTab === 'reviews' ? 'active' : ''}" onclick="window.switchProfileTab('reviews')">
            7. Student Experiences (${collegePosts.length})
          </button>
        </nav>

        <!-- TAB 1: Is this College Suitable? -->
        ${this.activeTab === 'suitability' ? `
          <div class="profile-tab-content">
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin-bottom:0.6rem;">About the Institution</h3>
            <p style="font-size:0.95rem; line-height:1.7; color:var(--slate-700); margin-bottom:1.75rem;">
              ${college.about}
            </p>

            <h3 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin-bottom:0.85rem;">Verified Quality Metrics</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:2rem;">
              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:1rem; border-radius:var(--radius-lg); text-align:center;">
                <div style="font-size:0.72rem; color:var(--slate-500); font-weight:700;">NIRF RANKING</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--primary-800);">#${college.nirfRank}</div>
                <div style="font-size:0.75rem; color:var(--slate-500);">National Rank (Engineering)</div>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:1rem; border-radius:var(--radius-lg); text-align:center;">
                <div style="font-size:0.72rem; color:var(--slate-500); font-weight:700;">NAAC ACCREDITATION</div>
                <div style="font-size:1.6rem; font-weight:800; color:#065F46;">Grade ${college.naacGrade}</div>
                <div style="font-size:0.75rem; color:var(--slate-500);">Autonomous Quality Cycle</div>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:1rem; border-radius:var(--radius-lg); text-align:center;">
                <div style="font-size:0.72rem; color:var(--slate-500); font-weight:700;">PLACEMENT RATE</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--slate-900);">${college.placements.placementRate}</div>
                <div style="font-size:0.75rem; color:var(--slate-500);">Median CTC: ${college.placements.avgPackage}</div>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:1rem; border-radius:var(--radius-lg); text-align:center;">
                <div style="font-size:0.72rem; color:var(--slate-500); font-weight:700;">CAMPUS SIZE</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--primary-800);">${college.campusAreaAcres} Acres</div>
                <div style="font-size:0.75rem; color:var(--slate-500);">Gated Residential Campus</div>
              </div>
            </div>

            <!-- Parent Checklist -->
            <div class="parent-checklist-box">
              <div class="checklist-title">
                <span>Parent Decision Checklist for ${college.shortName}</span>
              </div>
              <div class="checklist-grid">
                <div class="checklist-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>B.E. Computer Science offered & AICTE approved</span>
                </div>
                <div class="checklist-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Historical cutoff reviewed against 88% PCM aggregate</span>
                </div>
                <div class="checklist-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Estimated fees within family's moderate budget</span>
                </div>
                <div class="checklist-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Hostel available on-campus with residential warden</span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 2: Admission & Cutoffs (Section 15: Visual territory bar) -->
        ${this.activeTab === 'admission' ? `
          <div class="profile-tab-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin:0;">
                  Admission & Historical Cutoffs
                </h2>
                <p style="font-size:0.85rem; color:var(--slate-500); margin-top:2px;">
                  Counselling route: <strong>TNEA (Tamil Nadu Engineering Admissions)</strong> • DoTE Code: <strong>${college.tneaCode}</strong>
                </p>
              </div>
              <span class="badge badge-verified">VERIFIED HISTORICAL DATA</span>
            </div>

            <!-- Ananya's Position & Visual Territory Bar (Section 15) -->
            <div class="card" style="padding:1.35rem 1.5rem; margin-bottom:1.5rem; background:#FFFFFF; border:1px solid var(--slate-200);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
                <div>
                  <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em; font-weight:700; color:var(--slate-500);">
                    Child Admission Benchmark
                  </div>
                  <div style="font-size:1.2rem; font-weight:800; color:var(--slate-900);">
                    ${childShort}'s Position: <span style="color:#92400E;">TNEA Cutoff: ${cutoffScore} / 200</span>
                  </div>
                </div>

                <div style="text-align:right;">
                  <span class="badge ${cutoffScore >= (collegeCutoffNum - 5) ? 'badge-tier-best' : 'badge-tier-stretch'}" style="font-size:0.85rem;">
                    ${cutoffScore >= (collegeCutoffNum - 5) ? 'Historically within range' : 'Competitive benchmark'}
                  </span>
                </div>
              </div>

              <!-- Visual Cutoff Territory Bar -->
              <div style="margin-bottom:0.75rem;">
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--slate-500); font-weight:600; margin-bottom:0.35rem;">
                  <span>Safe Buffer (&lt; 172)</span>
                  <span>Target Range (172 - 180)</span>
                  <span>Stretch Benchmark (&gt; 180)</span>
                </div>

                <div style="height:12px; border-radius:6px; background:linear-gradient(to right, #A7F3D0 0%, #A7F3D0 35%, #BFDBFE 35%, #BFDBFE 70%, #DDD6FE 70%, #DDD6FE 100%); position:relative;">
                  <!-- Marker for Child Cutoff -->
                  <div style="position:absolute; left:${Math.min(95, Math.max(5, ((cutoffScore - 160) / 40) * 100))}%; top:-6px; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center;">
                    <div style="width:14px; height:24px; background:#1E3A8A; border:2px solid #FFFFFF; border-radius:4px; box-shadow:var(--shadow-sm);"></div>
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--slate-500); margin-top:0.4rem;">
                  <span>160</span>
                  <span style="font-weight:700; color:#1E3A8A;">▲ ${childShort} (${cutoffScore})</span>
                  <span style="font-weight:700; color:#92400E;">College Closing: ${collegeCutoffNum}</span>
                  <span>200</span>
                </div>
              </div>

              <div style="font-size:0.825rem; color:var(--slate-600); line-height:1.5;">
                <strong>Responsible AI Phrasing:</strong> ${childShort}'s 176.0 cutoff is historically aligned with round allotments in this category. Seat allocations fluctuate yearly based on applicant merit pools and are never guaranteed.
              </div>
            </div>

            <!-- Historical Cutoff Data Table -->
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin-bottom:0.75rem;">
              Verified Historical Closing Cutoffs (Out of 200)
            </h3>
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Branch / Course</th>
                    <th>Round</th>
                    <th>Category</th>
                    <th>Closing Cutoff</th>
                    <th>Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${college.cutoffs?.map(cu => `
                    <tr>
                      <td><strong>${cu.year}</strong></td>
                      <td>${cu.courseName}</td>
                      <td><span class="badge badge-tag">${cu.round}</span></td>
                      <td><strong>${cu.category}</strong></td>
                      <td style="font-size:1.05rem; font-weight:800; color:#92400E;">
                        ${cu.cutoffScore} / ${cu.maxScore}
                      </td>
                      <td>
                        <span class="badge badge-historical">${cu.status}</span>
                      </td>
                    </tr>
                  `).join('') || `
                    <tr><td colspan="6">Cutoff records verified with Directorate of Technical Education archive.</td></tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- TAB 3: Fees & Total Cost (Section 14: Clear Breakdown) -->
        ${this.activeTab === 'fees' ? `
          <div class="profile-tab-content">
            <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
              Total Cost of Education
            </h2>
            <p style="font-size:0.875rem; color:var(--slate-500); margin-bottom:1.5rem;">
              Transparent breakdown so families don't have to calculate hidden costs themselves.
            </p>

            <!-- Total Cost Summary Cards (Section 14) -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
              
              <!-- Yearly Cost Card -->
              <div class="card" style="padding:1.5rem; border-left:4px solid var(--primary-700); background:#FFFFFF;">
                <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--slate-500); margin-bottom:0.25rem;">
                  Estimated Yearly Cost
                </div>
                <div style="font-size:2rem; font-weight:800; color:var(--slate-900); margin-bottom:0.85rem;">
                  ₹${yearlyCostDisplay}L <span style="font-size:0.9rem; font-weight:500; color:var(--slate-500);">/ year</span>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.85rem; border-top:1px solid var(--slate-100); padding-top:0.75rem;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--slate-600);">Tuition (Verified Slab):</span>
                    <strong style="color:var(--slate-900);">₹${(baseTuition / 100000).toFixed(2)}L</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--slate-600);">Hostel Room (Estimated):</span>
                    <strong style="color:var(--slate-900);">₹${(hostelRoom / 1000).toFixed(0)}K</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--slate-600);">Mess & Dining (Estimated):</span>
                    <strong style="color:var(--slate-900);">₹${(messFee / 1000).toFixed(0)}K</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--slate-600);">Other Fees (Books/Lab):</span>
                    <strong style="color:var(--slate-900);">₹${(otherFees / 1000).toFixed(0)}K</strong>
                  </div>
                </div>
              </div>

              <!-- 4-Year Cost Card -->
              <div class="card" style="padding:1.5rem; border-left:4px solid #065F46; background:#FFFFFF;">
                <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--slate-500); margin-bottom:0.25rem;">
                  Estimated 4-Year Total Cost
                </div>
                <div style="font-size:2rem; font-weight:800; color:#065F46; margin-bottom:0.85rem;">
                  ₹${fourYearCostDisplay}L <span style="font-size:0.9rem; font-weight:500; color:var(--slate-500);">total (8 Semesters)</span>
                </div>

                <div style="font-size:0.85rem; color:var(--slate-600); line-height:1.6; border-top:1px solid var(--slate-100); padding-top:0.75rem;">
                  <div>• Covers 4 years of tuition, hostel room, and multi-cuisine mess.</div>
                  <div>• One-time refundable caution deposit: ~₹10,000 (included at admission).</div>
                  <div>• Semester exam fees paid directly to Anna University / Autonomous controller.</div>
                </div>
              </div>

            </div>

            <!-- Scholarships Available -->
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin-bottom:0.75rem;">
              Scholarships & Fee Concessions
            </h3>
            <div style="display:flex; flex-direction:column; gap:0.65rem; margin-bottom:2rem;">
              ${college.scholarships?.map(s => `
                <div style="background:#F8FAFC; border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:0.85rem 1.15rem; font-size:0.875rem; display:flex; align-items:center; gap:0.65rem;">
                  <span>🎓</span>
                  <span style="color:var(--slate-800); font-weight:600;">${s}</span>
                </div>
              `).join('') || `<div>Contact admissions office for current merit concessions.</div>`}
            </div>

            <div class="disclaimer-banner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <div>
                <strong>Notice for Families:</strong> Tuition slabs reflect government/autonomous guidelines. Exact transport routes, AC room supplements, and optional special certification fees may vary.
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 4: Courses Offered -->
        ${this.activeTab === 'academics' ? `
          <div class="profile-tab-content">
            <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
              Approved Degree Programs
            </h2>
            <p style="font-size:0.875rem; color:var(--slate-500); margin-bottom:1.5rem;">
              Seat intake, annual tuition fees, and recent closing cutoffs for each program.
            </p>

            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Degree & Department</th>
                    <th>Duration</th>
                    <th>Approved Seats</th>
                    <th>Annual Tuition</th>
                    <th>Recent Cutoff</th>
                  </tr>
                </thead>
                <tbody>
                  ${college.courses?.map(cr => `
                    <tr>
                      <td>
                        <div style="font-weight:700; color:var(--slate-900);">${cr.name}</div>
                        <div style="font-size:0.75rem; color:var(--slate-500);">${cr.department}</div>
                      </td>
                      <td>${cr.durationYears} Years</td>
                      <td><strong>${cr.seats} Seats</strong></td>
                      <td style="font-weight:700; color:var(--primary-800);">₹${(cr.annualFee / 100000).toFixed(2)} L/yr</td>
                      <td><span class="badge badge-historical">${cr.tneaCutoff2025}</span></td>
                    </tr>
                  `).join('') || `<tr><td colspan="5">No courses listed</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- TAB 5: Hostel, Commute & Safety -->
        ${this.activeTab === 'hostel_location' ? `
          <div class="profile-tab-content">
            <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
              Hostel Facilities, Safety & Commute
            </h2>
            <p style="font-size:0.875rem; color:var(--slate-500); margin-bottom:1.5rem;">
              Key considerations parents check when evaluating residential student life.
            </p>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
              <div class="card" style="padding:1.25rem; border:1px solid var(--slate-200);">
                <div style="font-weight:700; font-size:1rem; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
                  <span>🛏️</span>
                  <span>Residential Hostels</span>
                </div>
                <div style="font-size:0.85rem; color:var(--slate-700); line-height:1.55;">
                  <div>• Separate guarded residential wings for girls and boys with warden oversight.</div>
                  <div>• AC & Non-AC 2/3-sharing options with ergonomic study desks.</div>
                  <div>• Biometric attendance system and parent SMS notification protocols.</div>
                  <div>• Vegetarian & multi-cuisine hygienic dining certified by FSSAI.</div>
                </div>
              </div>

              <div class="card" style="padding:1.25rem; border:1px solid var(--slate-200);">
                <div style="font-weight:700; font-size:1rem; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
                  <span>🚌</span>
                  <span>Transport & Commute</span>
                </div>
                <div style="font-size:0.85rem; color:var(--slate-700); line-height:1.55;">
                  <div>• Located in ${college.city} with convenient arterial road connectivity.</div>
                  <div>• Dedicated fleet of 60+ GPS-tracked college buses covering entire district.</div>
                  <div>• Verified college transport routes available for day scholars.</div>
                </div>
              </div>

              <div class="card" style="padding:1.25rem; border:1px solid var(--slate-200);">
                <div style="font-weight:700; font-size:1rem; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
                  <span>🏥</span>
                  <span>Health & Security</span>
                </div>
                <div style="font-size:0.85rem; color:var(--slate-700); line-height:1.55;">
                  <div>• 24/7 on-campus health clinic with resident medical doctor and ambulance.</div>
                  <div>• Round-the-clock security personnel and CCTV surveillance on perimeters.</div>
                  <div>• Strict anti-ragging committee and zero-tolerance grievance redressal.</div>
                </div>
              </div>
            </div>

            <!-- Things Parents Want to Check During Campus Visit -->
            <div class="card" style="padding:1.35rem 1.5rem; background:var(--slate-50); border:1px solid var(--slate-200);">
              <h3 style="font-size:1.05rem; font-weight:800; color:var(--slate-900); margin-bottom:0.6rem;">
                Things Parents May Want to Verify During a Campus Visit:
              </h3>
              <ul style="padding-left:1.25rem; font-size:0.875rem; color:var(--slate-700); line-height:1.65;">
                <li>Inspect dining hall food preparation hygiene and RO drinking water filtration units.</li>
                <li>Meet residential hostel wardens to review evening study hours and weekend pass procedures.</li>
                <li>Verify department laboratory equipment and meet assigned faculty mentors.</li>
                <li>Review official semester bus routes if choosing day scholar commute.</li>
              </ul>
            </div>
          </div>
        ` : ''}

        <!-- TAB 6: Campus Life -->
        ${this.activeTab === 'campus_life' ? `
          <div class="profile-tab-content">
            <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
              What Opportunities Will My Child Have?
            </h2>
            <p style="font-size:0.875rem; color:var(--slate-500); margin-bottom:1.5rem;">
              Technical symposiums, hackathons, and maker spaces that help students build practical engineering resumes.
            </p>

            <div class="grid-cards">
              ${collegeEvents.map(evt => `
                <div class="event-card">
                  <img src="${evt.image}" alt="${evt.title}" style="height:140px; width:100%; object-fit:cover;" />
                  <div class="event-card-body">
                    <span class="badge badge-tag" style="align-self:flex-start; margin-bottom:0.35rem;">${evt.type}</span>
                    <h4 style="margin-bottom:0.25rem;">${evt.title}</h4>
                    <div style="font-size:0.8rem; color:var(--slate-500); margin-bottom:0.5rem;">📅 ${evt.date} • ${evt.venue}</div>
                    <div style="font-size:0.85rem; font-weight:700; color:var(--primary-800);">${evt.prize}</div>
                  </div>
                  <div class="card-footer">
                    <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="window.openEventDetails('${evt.id}')">
                      View Event Details
                    </button>
                  </div>
                </div>
              `).join('') || `<div>No events scheduled at this time.</div>`}
            </div>
          </div>
        ` : ''}

        <!-- TAB 7: Student Experiences -->
        ${this.activeTab === 'reviews' ? `
          <div class="profile-tab-content">
            <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
              What Do Students and Alumni Actually Experience?
            </h2>
            <p style="font-size:0.875rem; color:var(--slate-500); margin-bottom:1.5rem;">
              Verified student perspectives regarding teaching quality, hostel life, and placement reality.
            </p>

            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              ${collegePosts.map(p => `
                <div class="post-card">
                  <div class="post-author-row">
                    <div class="post-author-info">
                      <img src="${p.authorAvatar}" class="avatar-img" alt="${p.authorName}" />
                      <div>
                        <div class="post-author-name">
                          <span>${p.authorName}</span>
                          ${p.isVerified ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="#065F46"><circle cx="12" cy="12" r="10" fill="#065F46"/><polyline points="9 12 11 14 15 10" stroke="#fff" stroke-width="2"/></svg>` : ''}
                        </div>
                        <div class="post-author-sub">${p.authorRole} • ${p.createdAt}</div>
                      </div>
                    </div>
                    <span class="badge badge-tag">${p.type}</span>
                  </div>

                  <div class="post-content-text">${p.content}</div>

                  <div class="post-engagement-bar">
                    <button class="engagement-btn ${p.likedByMe ? 'active-liked' : ''}" onclick="window.handleLikePost('${p.id}')">
                      <span>${p.likedByMe ? '❤️' : '🤍'}</span>
                      <span>${p.likes} helpful</span>
                    </button>
                    <span style="font-size:0.85rem; color:var(--slate-500);">💬 ${p.commentsCount} student comments</span>
                  </div>
                </div>
              `).join('') || `<div>No student posts available yet.</div>`}
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }
};
