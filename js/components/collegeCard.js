/**
 * Reusable College Card Component - Parent Decision Companion
 * Unified across Home, Discover, Shortlist, and AI Recommendations.
 * Follows the 5-second parent decision hierarchy (Sections 8, 9, 10).
 */

import { store } from '../state/store.js';

export function getCollegeDecisionTier(collegeId) {
  if (collegeId === "skcet") {
    return {
      tier: "BEST FIT",
      badgeClass: "badge-tier-best",
      admissionLabel: "High fit",
      admissionDesc: "Historically within your child's range",
      costDisplay: "₹1.80L estimated",
      hostelDisplay: "Available (On-campus)",
      cutoffDisplay: "178.5 (Historical)",
      checklist: [
        "Within cutoff range",
        "Budget compatible",
        "Hostel available",
        "Strong placement record"
      ]
    };
  }
  if (collegeId === "rec" || collegeId === "kct" || collegeId === "cit" || collegeId === "bit" || collegeId === "gct") {
    return {
      tier: "GOOD OPTION",
      badgeClass: "badge-tier-good",
      admissionLabel: "Good option",
      admissionDesc: "Strong competitive alternative",
      costDisplay: "₹1.85L estimated",
      hostelDisplay: "Available (On-campus)",
      cutoffDisplay: "181.0 (Historical)",
      checklist: [
        "Close to cutoff range",
        "Budget compatible",
        "Hostel available",
        "Strong placement record"
      ]
    };
  }
  if (collegeId === "sairam" || collegeId === "tce") {
    return {
      tier: "BACKUP",
      badgeClass: "badge-tier-backup",
      admissionLabel: "Safe option",
      admissionDesc: "Safer admission buffer",
      costDisplay: "₹1.65L estimated",
      hostelDisplay: "Available (On-campus)",
      cutoffDisplay: "174.5 (Historical)",
      checklist: [
        "Comfortably within cutoff",
        "Budget-friendly option",
        "Hostel available",
        "Verified recruiters"
      ]
    };
  }
  // ssn, psg-tech, ceg-anna, vit-vellore
  return {
    tier: "STRETCH",
    badgeClass: "badge-tier-stretch",
    admissionLabel: "Possible (Stretch)",
    admissionDesc: "Competitive closing benchmark",
    costDisplay: "₹2.15L estimated",
    hostelDisplay: "Available (On-campus)",
    cutoffDisplay: "192.0 (Historical)",
    checklist: [
      "Competitive cutoff benchmark",
      "Moderate-to-high fee tier",
      "Hostel available",
      "Premier placement record"
    ]
  };
}

export function renderCollegeCard(college, recContext = null) {
  const isSaved = store.isCollegeSaved(college.id);
  const isInCompare = store.isInCompare(college.id);
  const tierInfo = getCollegeDecisionTier(college.id);

  const courseDisplay = recContext?.courseRecommended || college.popularCourses?.[0] || "B.E. Computer Science and Engineering";
  const closingCutoff = college.historicalCutoffsSummary?.cseGeneral ? college.historicalCutoffsSummary.cseGeneral.split('/')[0].trim() : tierInfo.cutoffDisplay.split(' ')[0];

  return `
    <article class="college-card" id="card-${college.id}">
      <div class="college-card-media">
        <img src="${college.bannerImage}" alt="${college.name} Campus" class="college-card-img" loading="lazy" />
        
        <div class="college-card-badge-row">
          <div style="display:flex; gap:0.4rem; align-items:center;">
            <span class="badge ${tierInfo.badgeClass}">${tierInfo.tier}</span>
            ${college.verified ? `
              <span class="badge badge-verified" title="Verified with official DoTE data">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Verified
              </span>
            ` : ''}
          </div>

          <span class="badge badge-rating">★ ${college.rating}</span>
        </div>

        <img src="${college.logo}" alt="${college.shortName} Logo" class="college-logo-overlap" />
      </div>

      <div class="college-card-content">
        <!-- Top: College Name, Decision Tier, Course -->
        <div style="margin-bottom: 0.35rem;">
          <h3 class="college-title">
            <a href="#college-profile?id=${college.id}">${college.name}</a>
          </h3>
          <div style="font-size:0.825rem; font-weight:700; color:var(--primary-700); margin-top:2px;">
            ${courseDisplay}
          </div>
        </div>

        <div class="college-location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${college.city}, ${college.state}</span>
          <span>•</span>
          <span style="font-weight:600; color:var(--slate-600);">${college.type}</span>
          <span>•</span>
          <span style="font-weight:700; color:var(--primary-800)">NIRF #${college.nirfRank}</span>
        </div>

        <!-- Four Key Parent Decision Facts (Section 8 & 10) -->
        <div class="college-metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Admission</span>
            <span class="metric-val" style="color:${tierInfo.tier === 'BEST FIT' ? '#065F46' : tierInfo.tier === 'STRETCH' ? '#5B21B6' : tierInfo.tier === 'BACKUP' ? '#92400E' : 'var(--primary-800)'}; font-weight:800;">
              ${tierInfo.admissionLabel}
            </span>
          </div>

          <div class="metric-item">
            <span class="metric-label">Annual Cost</span>
            <span class="metric-val" style="color:var(--slate-900);">
              ${tierInfo.costDisplay}
            </span>
          </div>

          <div class="metric-item">
            <span class="metric-label">Hostel</span>
            <span class="metric-val" style="color:#065F46;">
              ${college.hostelAvailable ? '✓ Available' : '✗ Off-campus'}
            </span>
          </div>

          <div class="metric-item">
            <span class="metric-label">2025 Closing Cutoff</span>
            <span class="metric-val" style="color:#92400E;">
              ${closingCutoff} <span style="font-size:0.7rem; font-weight:500; color:var(--slate-500);">(Historical)</span>
            </span>
          </div>
        </div>

        <!-- Decision Checklist (Section 8) -->
        <div class="parent-checklist-box" style="margin:0 0 1rem; padding:0.65rem 0.85rem;">
          <div class="checklist-grid" style="grid-template-columns: 1fr 1fr; gap:0.35rem;">
            ${tierInfo.checklist.map(item => `
              <div class="checklist-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Actions Hierarchy -->
        <div class="college-card-actions">
          <a href="#college-profile?id=${college.id}" class="btn btn-primary btn-sm" style="flex:1;">
            View details
          </a>

          <button 
            type="button" 
            class="btn btn-secondary btn-sm ${isInCompare ? 'active-compare' : ''}" 
            title="${isInCompare ? 'Remove from Compare' : 'Add to Compare'}" 
            onclick="window.handleCompareToggle('${college.id}')"
          >
            ${isInCompare ? 'Comparing ✓' : 'Compare'}
          </button>

          <button 
            type="button" 
            class="btn-icon ${isSaved ? 'active-save' : ''}" 
            title="${isSaved ? 'Remove from Shortlist' : 'Add to Shortlist'}" 
            onclick="window.handleSaveToggle('${college.id}')"
            aria-label="Shortlist ${college.name}"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}
