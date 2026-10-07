/**
 * Your College Shortlist & Decision Workspace (#saved)
 * Section 19: Decision Workspace
 * 
 * Header: # Your College Shortlist
 * Subtitle: Organize your options before making the final decision.
 * Sections:
 * - BEST FIT: Primary targets
 * - GOOD OPTIONS: Strong alternatives
 * - BACKUP OPTIONS: Safer choices
 * Features clear "Move to..." tier controls, 5-second fact tiles, and action-needed deadline alerts.
 */

import { store } from '../state/store.js';
import { mockColleges } from '../data/mockColleges.js';
import { renderCollegeCard } from '../components/collegeCard.js';

export const savedView = {
  render() {
    const state = store.getState();
    const user = state.currentUser;
    const childName = user.childName || "Ananya Kumar";
    const childShort = childName.split(' ')[0];

    const savedIds = Array.from(state.savedCollegeIds);
    const savedColleges = mockColleges.filter(c => savedIds.includes(c.id));
    const deadlines = user.upcomingDeadlines || [];

    // Categorized buckets from user profile or smart distribution
    const categories = user.shortlistCategories || {
      best_fit: ["skcet"],
      good_options: ["rec", "kct"],
      backup_options: ["sairam"]
    };

    const bestFitColleges = mockColleges.filter(c => categories.best_fit.includes(c.id) && savedIds.includes(c.id));
    const goodOptionColleges = mockColleges.filter(c => categories.good_options.includes(c.id) && savedIds.includes(c.id));
    const backupColleges = mockColleges.filter(c => categories.backup_options.includes(c.id) && savedIds.includes(c.id));

    // Any saved colleges not in the 3 buckets get placed in good_options
    const uncategorizedColleges = savedColleges.filter(c => 
      !categories.best_fit.includes(c.id) && 
      !categories.good_options.includes(c.id) && 
      !categories.backup_options.includes(c.id)
    );
    if (uncategorizedColleges.length > 0) {
      goodOptionColleges.push(...uncategorizedColleges);
    }

    return `
      <div class="page-container">
        
        <!-- Header (Section 19) -->
        <header style="margin-bottom: 2rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; color:var(--primary-700); margin-bottom:0.35rem;">
                Family Decision Workspace
              </div>
              <h1 style="font-size:1.85rem; font-weight:800; color:var(--slate-900); margin:0 0 0.35rem;">
                Your College Shortlist
              </h1>
              <p style="font-size:1.05rem; color:var(--slate-600); margin:0;">
                Organize your options before making the final decision.
              </p>
            </div>

            ${savedColleges.length > 1 ? `
              <button class="btn btn-primary btn-sm" onclick="window.compareAllSaved()">
                📊 Compare Shortlist (${savedColleges.length} Colleges)
              </button>
            ` : ''}
          </div>
        </header>

        <!-- Deadlines Area: Action-Oriented (Section 7 & 19) -->
        <section class="card" style="padding:1.35rem 1.5rem; margin-bottom:2.25rem; border-left:4px solid #D97706; background:#FFFFFF;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <span style="font-size:1.25rem;">📅</span>
              <h2 style="font-size:1.2rem; margin:0; font-weight:800; color:var(--slate-900);">
                Application & Counselling Deadlines
              </h2>
            </div>
            <span class="badge badge-tag" style="font-weight:700;">${deadlines.length} Active Timelines</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${deadlines.map(d => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--slate-50); border:1px solid var(--slate-200); padding:0.85rem 1.15rem; border-radius:var(--radius-lg); flex-wrap:wrap; gap:0.85rem;">
                <div>
                  <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:2px;">
                    <span style="font-weight:800; font-size:0.95rem; color:var(--slate-900);">${d.title}</span>
                    <span class="badge" style="background:#FFFBEB; color:#92400E; border:1px solid #FDE68A; font-weight:800; font-size:0.7rem;">
                      ${d.status}
                    </span>
                  </div>
                  <div style="font-size:0.825rem; color:var(--slate-600);">${d.authority} • Closes: <strong>${d.deadline}</strong></div>
                </div>

                <div style="display:flex; align-items:center; gap:1.25rem;">
                  <div style="text-align:right;">
                    <div style="font-size:0.72rem; color:var(--slate-500); font-weight:600;">Time remaining</div>
                    <div style="font-size:1rem; font-weight:800; color:#92400E;">
                      ${d.daysRemaining} days left
                    </div>
                  </div>

                  <a href="${d.link}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="background:#FFFFFF; color:#92400E; border-color:#FCD34D;">
                    Official Portal ↗
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        ${savedColleges.length === 0 ? `
          <div class="card empty-state">
            <div class="empty-icon">⭐</div>
            <h3 class="empty-title">No colleges in shortlist yet</h3>
            <p class="empty-desc">Bookmark colleges as you explore to organize them into Best Fit, Good Options, and Backup tiers.</p>
            <a href="#discover" class="btn btn-primary btn-sm">Explore Colleges for ${childShort}</a>
          </div>
        ` : `

          <!-- TIER 1: BEST FIT (Primary targets) -->
          <section class="card" style="margin-bottom:2rem; border-top: 4px solid #065F46; padding:0; overflow:hidden;">
            <div style="padding:1.15rem 1.5rem; background:var(--slate-50); border-bottom:1px solid var(--slate-200); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <span style="font-size:1.2rem;">🥇</span>
                <div>
                  <h3 style="font-size:1.15rem; margin:0; font-weight:800; color:#065F46;">BEST FIT</h3>
                  <div style="font-size:0.8rem; color:var(--slate-500);">Primary targets matching cutoff range, budget, and branch preference</div>
                </div>
              </div>
              <span class="badge badge-tier-best">${bestFitColleges.length} Colleges</span>
            </div>

            <div style="padding:1.25rem;">
              ${bestFitColleges.length === 0 ? `
                <div style="padding:1.5rem; text-align:center; color:var(--slate-500); font-size:0.875rem;">
                  No colleges placed in Best Fit tier yet. Use the category mover buttons on any shortlisted college below.
                </div>
              ` : `
                <div class="grid-cards">
                  ${bestFitColleges.map(c => `
                    <div style="display:flex; flex-direction:column;">
                      ${renderCollegeCard(c)}
                      <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; border:1px solid var(--slate-200); border-top:none; border-radius:0 0 var(--radius-xl) var(--radius-xl); padding:0.65rem 1rem; font-size:0.78rem;">
                        <span style="color:var(--slate-600); font-weight:700;">Move to tier:</span>
                        <div style="display:flex; gap:0.4rem;">
                          <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:0.25rem 0.55rem;" onclick="window.moveShortlistCategory('${c.id}', 'good_options')">→ Good Options</button>
                          <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:0.25rem 0.55rem;" onclick="window.moveShortlistCategory('${c.id}', 'backup_options')">→ Backup Options</button>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </section>

          <!-- TIER 2: GOOD OPTIONS (Strong alternatives) -->
          <section class="card" style="margin-bottom:2rem; border-top: 4px solid var(--primary-700); padding:0; overflow:hidden;">
            <div style="padding:1.15rem 1.5rem; background:var(--slate-50); border-bottom:1px solid var(--slate-200); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <span style="font-size:1.2rem;">🥈</span>
                <div>
                  <h3 style="font-size:1.15rem; margin:0; font-weight:800; color:var(--primary-800);">GOOD OPTIONS</h3>
                  <div style="font-size:0.8rem; color:var(--slate-500);">Strong alternative institutions to include in single-window counselling choices</div>
                </div>
              </div>
              <span class="badge badge-tier-good">${goodOptionColleges.length} Colleges</span>
            </div>

            <div style="padding:1.25rem;">
              ${goodOptionColleges.length === 0 ? `
                <div style="padding:1.5rem; text-align:center; color:var(--slate-500); font-size:0.875rem;">
                  No colleges placed in Good Options tier yet.
                </div>
              ` : `
                <div class="grid-cards">
                  ${goodOptionColleges.map(c => `
                    <div style="display:flex; flex-direction:column;">
                      ${renderCollegeCard(c)}
                      <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; border:1px solid var(--slate-200); border-top:none; border-radius:0 0 var(--radius-xl) var(--radius-xl); padding:0.65rem 1rem; font-size:0.78rem;">
                        <span style="color:var(--slate-600); font-weight:700;">Move to tier:</span>
                        <div style="display:flex; gap:0.4rem;">
                          <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:0.25rem 0.55rem;" onclick="window.moveShortlistCategory('${c.id}', 'best_fit')">→ Best Fit</button>
                          <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:0.25rem 0.55rem;" onclick="window.moveShortlistCategory('${c.id}', 'backup_options')">→ Backup Options</button>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </section>

          <!-- TIER 3: BACKUP OPTIONS (Safer choices) -->
          <section class="card" style="margin-bottom:2rem; border-top: 4px solid #D97706; padding:0; overflow:hidden;">
            <div style="padding:1.15rem 1.5rem; background:var(--slate-50); border-bottom:1px solid var(--slate-200); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div style="display:flex; align-items:center; gap:0.6rem;">
                <span style="font-size:1.2rem;">🥉</span>
                <div>
                  <h3 style="font-size:1.15rem; margin:0; font-weight:800; color:#92400E;">BACKUP OPTIONS</h3>
                  <div style="font-size:0.8rem; color:var(--slate-500);">Safer choices with reliable admission cushion to guarantee peace of mind</div>
                </div>
              </div>
              <span class="badge badge-tier-backup">${backupColleges.length} Colleges</span>
            </div>

            <div style="padding:1.25rem;">
              ${backupColleges.length === 0 ? `
                <div style="padding:1.5rem; text-align:center; color:var(--slate-500); font-size:0.875rem;">
                  No colleges placed in Backup Options tier yet.
                </div>
              ` : `
                <div class="grid-cards">
                  ${backupColleges.map(c => `
                    <div style="display:flex; flex-direction:column;">
                      ${renderCollegeCard(c)}
                      <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; border:1px solid var(--slate-200); border-top:none; border-radius:0 0 var(--radius-xl) var(--radius-xl); padding:0.65rem 1rem; font-size:0.78rem;">
                        <span style="color:var(--slate-600); font-weight:700;">Move to tier:</span>
                        <div style="display:flex; gap:0.4rem;">
                          <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:0.25rem 0.55rem;" onclick="window.moveShortlistCategory('${c.id}', 'best_fit')">→ Best Fit</button>
                          <button class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:0.25rem 0.55rem;" onclick="window.moveShortlistCategory('${c.id}', 'good_options')">→ Good Options</button>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </section>

        `}

      </div>
    `;
  }
};
