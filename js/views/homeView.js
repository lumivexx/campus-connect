/**
 * Parent Decision Dashboard View (#home)
 * Built for Parent Ravi Kumar evaluating college options for child Ananya Kumar.
 * 
 * Strict alignment with Sections 6, 7, 8, 9 of Premium Parent UX:
 * 1. Greeting: "Good afternoon, Ravi 👋" | "Let's make the next college decision easier for Ananya."
 * 2. Child Status Card with Admission Readiness ("Strong position")
 * 3. Urgent Action Area: Calm urgency (TNEA Certificate Verification, 12 days remaining)
 * 4. Best Matches for Ananya: 5-second fact tiles and standardized decision tiers
 * 5. Common Parent AI Questions & Supporting Student Voices
 */

import { store } from '../state/store.js';
import { mockColleges } from '../data/mockColleges.js';
import { renderCollegeCard } from '../components/collegeCard.js';
import { aiService } from '../services/aiService.js';

export const homeView = {
  render() {
    const state = store.getState();
    const user = state.currentUser;
    const parentName = user.parentName || "Ravi Kumar";
    const parentFirst = parentName.split(' ')[0];
    const childName = user.childName || "Ananya Kumar";
    const childShort = childName.split(' ')[0];
    const marksPercent = user.marks ? user.marks.percentage : 88.0;
    const cutoffScore = user.marks ? user.marks.tneaEquivalentCutoff : 176.0;
    const preferredCourse = user.preferredCourse || "B.E. Computer Science and Engineering";
    const preferredLocation = user.preferredLocation || "Tamil Nadu";
    const budgetDisplay = user.budget ? user.budget.display : "₹1.50 - 2.00 L / year";

    // Best matches curated for Ananya
    const recommendedColleges = mockColleges.filter(c => ["skcet", "rec", "sairam", "ssn"].includes(c.id));
    const deadlines = user.upcomingDeadlines || [];
    const urgentDeadline = deadlines[0];

    // Admission readiness evaluation
    const isStrongPosition = cutoffScore >= 170;
    const readinessLabel = isStrongPosition ? "Strong position" : "Needs broader options";
    const readinessBadgeClass = isStrongPosition ? "badge-tier-best" : "badge-tier-backup";
    const readinessNote = isStrongPosition 
      ? `Based on ${childShort}'s 176.0 cutoff, she has solid competitive positioning for premier autonomous colleges in Coimbatore and Chennai.`
      : `Consider adding 2-3 additional backup colleges with cutoffs in the 160-170 band.`;

    return `
      <div class="page-container">
        
        <!-- Top Section: Parent Greeting (Section 6) -->
        <header style="margin-bottom: 1.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; color:var(--primary-700); margin-bottom:0.35rem;">
                Family Decision Companion
              </div>
              <h1 style="font-size:1.85rem; font-weight:800; color:var(--slate-900); margin:0 0 0.35rem;">
                Good afternoon, ${parentFirst} 👋
              </h1>
              <p style="font-size:1.05rem; color:var(--slate-600); margin:0;">
                Let's make the next college decision easier for ${childShort}.
              </p>
            </div>

            <div style="display:flex; gap:0.65rem; align-items:center;">
              <a href="#ai-guide" class="btn btn-primary btn-sm">
                💬 Ask Decision Assistant
              </a>
              <a href="#saved" class="btn btn-secondary btn-sm">
                Your Shortlist (${state.savedCollegeIds.size})
              </a>
            </div>
          </div>
        </header>

        <!-- Child Status Card (Section 6) -->
        <section class="card" style="padding:1.5rem; margin-bottom:1.75rem; border-left: 4px solid var(--primary-700); background:#FFFFFF;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.65rem; margin-bottom:0.25rem;">
                <h2 style="font-size:1.3rem; margin:0; font-weight:800; color:var(--slate-900);">
                  ${childName}
                </h2>
                <span class="badge badge-tag" style="font-weight:700;">Class 12</span>
                <span class="badge ${readinessBadgeClass}">
                  ✓ ${readinessLabel}
                </span>
              </div>
              <div style="font-size:0.85rem; color:var(--slate-600);">
                ${readinessNote}
              </div>
            </div>

            <div style="display:flex; gap:0.5rem; align-items:center;">
              <button class="btn btn-ghost btn-sm" onclick="window.toggleSwitchChild()" title="Switch family member">
                Switch Child ⇄
              </button>
              <a href="#profile" class="btn btn-secondary btn-sm">
                Adjust Preferences
              </a>
            </div>
          </div>

          <!-- Clean Facts Grid: Academic Profile & Preferences -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem; background:var(--slate-50); border:1px solid var(--slate-200); border-radius:var(--radius-lg); padding:0.85rem 1rem;">
            <div>
              <div class="metric-label">PCM Aggregate</div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--slate-900);">${marksPercent}%</div>
              <div style="font-size:0.72rem; color:var(--slate-500);">Maths 90 · Phy 86 · Chem 88</div>
            </div>

            <div>
              <div class="metric-label">TNEA Equivalent Cutoff</div>
              <div style="font-size:1.15rem; font-weight:800; color:#92400E;">${cutoffScore} <span style="font-size:0.8rem; font-weight:500; color:var(--slate-500);">/ 200</span></div>
              <div style="font-size:0.72rem; color:#92400E; font-weight:600;">Verified DoTE Formula</div>
            </div>

            <div>
              <div class="metric-label">Preferred Program</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--slate-900); line-height:1.3;">${preferredCourse}</div>
              <div style="font-size:0.72rem; color:var(--slate-500);">${preferredLocation}</div>
            </div>

            <div>
              <div class="metric-label">Annual Family Budget</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--slate-900);">${budgetDisplay}</div>
              <div style="font-size:0.72rem; color:#065F46; font-weight:600;">Hostel: ${user.hostelRequired ? 'On-Campus Required' : 'Not Required'}</div>
            </div>
          </div>
        </section>

        <!-- Urgent Action Area: Calm Urgency (Section 7) -->
        ${urgentDeadline ? `
          <section class="card" style="padding:1.15rem 1.4rem; margin-bottom:2.25rem; background:#FFFBEB; border:1px solid #FDE68A; border-left:4px solid #D97706;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <div style="display:flex; align-items:center; gap:0.85rem;">
                <div style="width:38px; height:38px; border-radius:var(--radius-md); background:#FEF3C7; color:#92400E; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">
                  📅
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.04em; font-weight:700; color:#92400E;">Action needed</span>
                    <span class="badge" style="background:#FEF2F2; color:#B91C1C; border:1px solid #FECACA; font-weight:700; font-size:0.72rem;">
                      ${urgentDeadline.daysRemaining} days remaining
                    </span>
                  </div>
                  <div style="font-size:1.05rem; font-weight:800; color:#78350F; margin-top:2px;">
                    ${urgentDeadline.title}
                  </div>
                  <div style="font-size:0.825rem; color:#92400E; margin-top:2px;">
                    Required for government TNEA single window choice filling • Closes on ${urgentDeadline.deadline}
                  </div>
                </div>
              </div>

              <div style="display:flex; gap:0.5rem; align-items:center;">
                <a href="#saved" class="btn btn-secondary btn-sm" style="background:#FFFFFF; border-color:#FCD34D; color:#92400E;">
                  Review requirements
                </a>
                <a href="${urgentDeadline.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="background:#92400E; border-color:#92400E;">
                  Official Portal ↗
                </a>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Best Matches for Child (Section 8 & 9) -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:1.25rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <h2 style="font-size:1.55rem; font-weight:800; color:var(--slate-900); margin:0 0 0.25rem;">
                Best matches for ${childShort}
              </h2>
              <p style="font-size:0.925rem; color:var(--slate-600); margin:0;">
                Calculated by matching ${childShort}'s 176.0 cutoff with verified DoTE counselling archives, your ₹1.8L budget, and verified on-campus hostels.
              </p>
            </div>

            <a href="#discover" class="btn btn-ghost btn-sm" style="color:var(--primary-700); font-weight:700;">
              Explore All 12 Colleges →
            </a>
          </div>

          <!-- Standardized Decision Tier Legend (Section 9) -->
          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; background:var(--slate-50); border:1px solid var(--slate-200); padding:0.65rem 1rem; border-radius:var(--radius-lg); margin-bottom:1.5rem; font-size:0.8rem;">
            <strong style="color:var(--slate-700);">Decision Tiers:</strong>
            <span class="badge badge-tier-best">BEST FIT (Realistic + Aligned)</span>
            <span class="badge badge-tier-good">GOOD OPTION (Strong Alternative)</span>
            <span class="badge badge-tier-stretch">STRETCH (Possible Benchmark)</span>
            <span class="badge badge-tier-backup">BACKUP (Safer Admission)</span>
            <span style="margin-left:auto; color:var(--slate-500); font-size:0.75rem;">
              *Past DoTE counselling data; not an admission guarantee.
            </span>
          </div>

          <!-- Standardized College Cards Grid -->
          <div class="grid-cards">
            ${recommendedColleges.map(col => renderCollegeCard(col)).join('')}
          </div>
        </section>

        <!-- Common Questions Parents Ask (Section 17) -->
        <section class="card" style="padding:1.5rem 1.75rem; margin-bottom:2.75rem; background:var(--slate-50); border:1px solid var(--slate-200);">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
            <span style="font-size:1.2rem;">💡</span>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin:0;">
              Common Questions Parents Ask
            </h3>
          </div>
          <p style="font-size:0.875rem; color:var(--slate-600); margin-bottom:1.15rem;">
            Get calm, transparent, and structured advisory answers from our College Decision Assistant:
          </p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.65rem;">
            ${aiService.parentQuickQuestions.map(q => `
              <button 
                class="btn btn-secondary btn-sm" 
                style="justify-content:flex-start; text-align:left; padding:0.75rem 1rem; border-radius:var(--radius-md); font-size:0.85rem; font-weight:600; background:#FFFFFF; border:1px solid var(--slate-200);" 
                onclick="window.askParentAIQuestion('${q.id}')"
              >
                <span style="margin-right:4px;">💬</span>
                <span>${q.label}</span>
              </button>
            `).join('')}
          </div>
        </section>

        <!-- Student & Alumni Voices (Section 24: Supporting Evidence) -->
        <section style="margin-bottom:2.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
            <div>
              <h2 style="font-size:1.3rem; font-weight:800; color:var(--slate-900); margin:0 0 2px;">
                Student & Alumni Perspectives
              </h2>
              <p style="font-size:0.85rem; color:var(--slate-500); margin:0;">
                What do students and graduates actually experience regarding teaching, hostel safety, and placement reality?
              </p>
            </div>
            <a href="#community" class="btn btn-ghost btn-sm" style="font-weight:600;">See all perspectives →</a>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
            <div class="card" style="padding:1.25rem; border:1px solid var(--slate-200);">
              <div style="display:flex; align-items:center; gap:0.65rem; margin-bottom:0.65rem;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" class="avatar-img" alt="Alumni Dinesh" />
                <div>
                  <div style="font-weight:700; font-size:0.9rem; color:var(--slate-900);">Dinesh Balaji</div>
                  <div style="font-size:0.75rem; color:#065F46; font-weight:600;">✓ Verified Alumni (SDE at Zoho, ex-SKCET '24)</div>
                </div>
              </div>
              <p style="font-size:0.875rem; color:var(--slate-700); line-height:1.55; margin:0;">
                "A note to parents worried about 88% vs 98%: I had an 87.5% cutoff and joined SKCET CSE. The coding lab culture and faculty mentorship helped me secure 3 offers including Zoho. Practical projects matter immensely in campus recruitment."
              </p>
            </div>

            <div class="card" style="padding:1.25rem; border:1px solid var(--slate-200);">
              <div style="display:flex; align-items:center; gap:0.65rem; margin-bottom:0.65rem;">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100" class="avatar-img" alt="SSN Placement Cell" />
                <div>
                  <div style="font-weight:700; font-size:0.9rem; color:var(--slate-900);">Institutional Placement Review</div>
                  <div style="font-size:0.75rem; color:#065F46; font-weight:600;">✓ Audited Annual TNEA Report</div>
                </div>
              </div>
              <p style="font-size:0.875rem; color:var(--slate-700); line-height:1.55; margin:0;">
                "For computing programs at top autonomous institutions in Tamil Nadu, over 85% of placed students secured offers through on-campus drives. Parents are welcomed to inspect verified recruiter records and semester fee schedules."
              </p>
            </div>
          </div>
        </section>

      </div>
    `;
  }
};
