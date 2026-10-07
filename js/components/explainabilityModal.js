/**
 * Explainability Modal Component
 * Section 16: Responsible AI Explainability
 * "Why this fits Ananya"
 * 4-Factor Weighted Model: Academic Fit (40%), Course Match (25%), Location (20%), Budget (15%)
 */

import { modal } from './modal.js';
import { store } from '../state/store.js';

export function openExplainabilityModal(rec) {
  const exp = rec.explainability || {
    academicWeight: 40,
    academicScore: 92,
    courseWeight: 25,
    courseScore: 96,
    locationWeight: 20,
    locationScore: 90,
    budgetWeight: 15,
    budgetScore: 94,
    totalScore: 93
  };

  const user = store.getState().currentUser;
  const childName = user.childName || "Ananya Kumar";
  const childShort = childName.split(' ')[0];
  const cutoffScore = user.marks ? user.marks.tneaEquivalentCutoff : 176.0;

  const html = `
    <div style="display:flex; flex-direction:column; gap:1.25rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; background:var(--slate-50); padding:1rem 1.25rem; border-radius:var(--radius-lg); border:1px solid var(--slate-200);">
        <div>
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--primary-700); font-weight:700; letter-spacing:0.04em;">
            Transparent 4-Factor Decision Model
          </div>
          <div style="font-size:1.25rem; font-weight:800; color:var(--slate-900); margin-top:2px;">
            ${rec.college.name}
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:1.75rem; font-weight:800; color:#065F46;">${rec.matchPercentage || 92}%</div>
          <div style="font-size:0.72rem; color:var(--slate-500); font-weight:600;">Suitability Index</div>
        </div>
      </div>

      <p style="font-size:0.875rem; color:var(--slate-600); line-height:1.55; margin:0;">
        Our parent advisory engine computes recommendations by evaluating ${childShort}’s academic position (Class 12: 88.0% · Cutoff ~${cutoffScore}) against historical DoTE Tamil Nadu counselling cutoffs and your stated family parameters.
      </p>

      <!-- 4 Factor Breakdown (Section 16) -->
      <div style="display:flex; flex-direction:column; gap:0.95rem; background:#FFFFFF; border:1px solid var(--slate-200); border-radius:var(--radius-lg); padding:1rem 1.25rem;">
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.35rem;">
            <span style="color:var(--slate-800);">1. Academic Fit (${exp.academicWeight}% Weight)</span>
            <span style="color:#065F46; font-weight:800;">${exp.academicScore} / 100</span>
          </div>
          <div style="height:8px; background:var(--slate-100); border-radius:4px; overflow:hidden;">
            <div style="width:${exp.academicScore}%; height:100%; background:#065F46; border-radius:4px;"></div>
          </div>
          <div style="font-size:0.75rem; color:var(--slate-500); margin-top:0.25rem;">
            ${rec.academicProfileFit || `${cutoffScore} cutoff benchmarked against historical closing records`}
          </div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.35rem;">
            <span style="color:var(--slate-800);">2. Course Alignment (${exp.courseWeight}% Weight)</span>
            <span style="color:var(--primary-800); font-weight:800;">${exp.courseScore} / 100</span>
          </div>
          <div style="height:8px; background:var(--slate-100); border-radius:4px; overflow:hidden;">
            <div style="width:${exp.courseScore}%; height:100%; background:var(--primary-700); border-radius:4px;"></div>
          </div>
          <div style="font-size:0.75rem; color:var(--slate-500); margin-top:0.25rem;">
            Matches desired department: ${rec.courseRecommended || "B.E. Computer Science and Engineering"}
          </div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.35rem;">
            <span style="color:var(--slate-800);">3. Location & Safety (${exp.locationWeight}% Weight)</span>
            <span style="color:#5B21B6; font-weight:800;">${exp.locationScore} / 100</span>
          </div>
          <div style="height:8px; background:var(--slate-100); border-radius:4px; overflow:hidden;">
            <div style="width:${exp.locationScore}%; height:100%; background:#5B21B6; border-radius:4px;"></div>
          </div>
          <div style="font-size:0.75rem; color:var(--slate-500); margin-top:0.25rem;">
            Located in ${rec.college.city}, Tamil Nadu with verified residential hostel
          </div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.35rem;">
            <span style="color:var(--slate-800);">4. Budget Compatibility (${exp.budgetWeight}% Weight)</span>
            <span style="color:#92400E; font-weight:800;">${exp.budgetScore} / 100</span>
          </div>
          <div style="height:8px; background:var(--slate-100); border-radius:4px; overflow:hidden;">
            <div style="width:${exp.budgetScore}%; height:100%; background:#D97706; border-radius:4px;"></div>
          </div>
          <div style="font-size:0.75rem; color:var(--slate-500); margin-top:0.25rem;">
            Estimated tuition within stated family tier: ${rec.feeEstimate || rec.college.feeRange?.display || "Moderate"}
          </div>
        </div>
      </div>

      <!-- Data Source & Audit Trace (Section 16) -->
      <div style="background:var(--slate-50); border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:0.85rem 1rem; font-size:0.825rem; color:var(--slate-600);">
        <div style="font-weight:700; color:var(--slate-800); margin-bottom:0.25rem;">Data Source & Audit Timestamp:</div>
        <div><strong>Data Source:</strong> ${rec.dataSource || "Directorate of Technical Education (DoTE) Tamil Nadu Official Allotment Archive"}</div>
        <div><strong>Last checked:</strong> ${rec.dataAuditDate || "August 2025"}</div>
      </div>

      <!-- Non-Guaranteed Responsible AI Notice (Section 16 & 31) -->
      <div class="disclaimer-banner warning">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <div>
          <strong>Responsible AI Notice:</strong> Recommendations are advisory estimates based on historical cutoffs and student preferences. They do <u>not</u> imply or guarantee admission or allotment in the upcoming counselling cycle. Always check official DoTE Tamil Nadu counselling bulletins.
        </div>
      </div>
    </div>
  `;

  modal.open({
    title: `Why this fits ${childShort}`,
    bodyHtml: html,
    footerHtml: `
      <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">Close</button>
      <a href="#college-profile?id=${rec.college.id}" class="btn btn-primary btn-sm" onclick="window.closeModal()">View College Details</a>
    `,
    maxWidth: "580px"
  });
}
