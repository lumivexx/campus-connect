/**
 * Family Profile View (#profile)
 * Section 21: Family Profile & Decision Parameters
 * 
 * Hierarchy:
 * - Parent: Ravi Kumar
 * - Child: Ananya Kumar (Class 12, 88% PCM, TNEA 176) with 1-click child switcher (Ananya ⇄ Mitra)
 * - Preferences: Preferred Course, Budget, Location, Hostel, Commute (with inline editing)
 * - Transparent AI Decision Advisory Audit Trail
 */

import { store } from '../state/store.js';
import { mockColleges } from '../data/mockColleges.js';

export const profileView = {
  isEditing: false,

  render() {
    const user = store.getState().currentUser;
    const activeChildId = user.activeChildId || 'child-ananya';
    const children = user.children || [
      {
        id: "child-ananya",
        name: "Ananya Kumar",
        relationship: "Daughter",
        classLevel: "Class 12 Completed",
        board: "CBSE",
        stream: "Science (PCM)",
        marks: user.marks || { percentage: 88.0, maths: 90, physics: 86, chemistry: 88, tneaEquivalentCutoff: 176.0 },
        preferredCourse: user.preferredCourse || "B.E. Computer Science and Engineering",
        preferredLocation: user.preferredLocation || "Tamil Nadu",
        preferredCities: user.preferredCities || ["Coimbatore", "Chennai"],
        budget: user.budget || { tier: "Moderate", display: "₹1.50L - ₹2.00L / year" },
        hostelRequired: user.hostelRequired !== false
      }
    ];

    const activeChild = children.find(c => c.id === activeChildId) || children[0];
    const followedIds = Array.from(store.getState().followedCollegeIds);
    const followedColleges = mockColleges.filter(c => followedIds.includes(c.id));

    return `
      <div class="page-container">
        
        <div style="max-width:920px; margin:0 auto;">
          
          <!-- Page Header -->
          <header style="margin-bottom:1.5rem;">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; color:var(--primary-700); margin-bottom:0.35rem;">
              Family Academic Record
            </div>
            <h1 style="font-size:1.85rem; font-weight:800; color:var(--slate-900); margin:0 0 0.35rem;">
              Family Decision Profile
            </h1>
            <p style="font-size:1rem; color:var(--slate-600); margin:0;">
              Active academic benchmarks and family preferences driving all college suitability recommendations.
            </p>
          </header>

          <!-- 1. PARENT SECTION (Section 21) -->
          <div class="card" style="padding:1.5rem 1.75rem; margin-bottom:1.5rem; background:#FFFFFF; border-left:4px solid var(--primary-800);">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:700; color:var(--primary-800); margin-bottom:0.5rem;">
              Parent Account
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <div style="display:flex; align-items:center; gap:1rem;">
                <img 
                  src="${user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}" 
                  alt="${user.parentName || user.name}" 
                  style="width:58px; height:58px; border-radius:var(--radius-full); object-fit:cover; border:2px solid var(--slate-200);" 
                />
                <div>
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin:0;">
                      ${user.parentName || 'Ravi Kumar'}
                    </h2>
                    <span class="badge badge-verified">Verified Parent</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--slate-600); margin-top:2px;">
                    ${user.email || 'ravi.kumar@gmail.com'} • ${user.phone || '+91 98401 23456'}
                  </div>
                </div>
              </div>

              <!-- Child Switcher (Section 21) -->
              <div style="background:var(--slate-50); border:1px solid var(--slate-200); border-radius:var(--radius-lg); padding:0.6rem 0.85rem;">
                <div style="font-size:0.7rem; font-weight:700; color:var(--slate-500); text-transform:uppercase; margin-bottom:0.35rem;">
                  Switch Active Child Profile:
                </div>
                <div style="display:flex; gap:0.4rem;">
                  ${children.map(ch => `
                    <button 
                      class="btn ${ch.id === activeChildId ? 'btn-primary' : 'btn-secondary'} btn-sm"
                      style="font-size:0.8rem; padding:0.35rem 0.75rem;"
                      onclick="window.toggleSwitchChild('${ch.id}')"
                    >
                      ${ch.id === activeChildId ? '✓ ' : ''}${ch.name}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- 2. CHILD SECTION (Section 21) -->
          <div class="card" style="padding:1.5rem 1.75rem; margin-bottom:1.5rem; background:#FFFFFF; border-left:4px solid #065F46;">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:700; color:#065F46; margin-bottom:0.5rem;">
              Evaluating for Child
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
              <div>
                <h2 style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin:0;">
                  ${activeChild.name}
                </h2>
                <div style="font-size:0.825rem; color:var(--slate-500); margin-top:2px;">
                  Class 12 Completed (${activeChild.board}) • Stream: ${activeChild.stream} • Year of Passing: 2025
                </div>
              </div>
              <span class="badge badge-tier-best">Verified Academic Record</span>
            </div>

            <!-- Child Scorecard Grid (Section 21: Class 12, 88% PCM, TNEA 176) -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.75rem; text-align:center;">
              <div style="background:#EFF6FF; border:1px solid #BFDBFE; padding:0.85rem; border-radius:var(--radius-md);">
                <div style="font-size:0.7rem; color:var(--primary-800); font-weight:700;">PCM AGGREGATE</div>
                <div style="font-size:1.6rem; font-weight:800; color:var(--primary-800);">${activeChild.marks.percentage}%</div>
                <div style="font-size:0.7rem; color:var(--primary-700); font-weight:600;">Distinction</div>
              </div>

              <div style="background:#FFFBEB; border:1px solid #FDE68A; padding:0.85rem; border-radius:var(--radius-md);">
                <div style="font-size:0.7rem; color:#92400E; font-weight:700;">TNEA CUTOFF</div>
                <div style="font-size:1.6rem; font-weight:800; color:#92400E;">${activeChild.marks.tneaEquivalentCutoff} <span style="font-size:0.85rem; font-weight:600;">/ 200</span></div>
                <div style="font-size:0.7rem; color:#92400E; font-weight:600;">DoTE Tamil Nadu</div>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.85rem; border-radius:var(--radius-md);">
                <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">MATHEMATICS</div>
                <div style="font-size:1.4rem; font-weight:800; color:var(--slate-900);">${activeChild.marks.maths} / 100</div>
                <div style="font-size:0.7rem; color:var(--slate-500);">Full weightage</div>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.85rem; border-radius:var(--radius-md);">
                <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">PHYSICS</div>
                <div style="font-size:1.4rem; font-weight:800; color:var(--slate-900);">${activeChild.marks.physics} / 100</div>
                <div style="font-size:0.7rem; color:var(--slate-500);">50% weightage</div>
              </div>

              <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.85rem; border-radius:var(--radius-md);">
                <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">CHEMISTRY</div>
                <div style="font-size:1.4rem; font-weight:800; color:var(--slate-900);">${activeChild.marks.chemistry} / 100</div>
                <div style="font-size:0.7rem; color:var(--slate-500);">50% weightage</div>
              </div>
            </div>
          </div>

          <!-- 3. PREFERENCES SECTION (Section 21) -->
          <div class="card" style="padding:1.5rem 1.75rem; margin-bottom:1.5rem; background:#FFFFFF;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
              <div>
                <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:700; color:var(--slate-500); margin-bottom:0.25rem;">
                  Family Parameters
                </div>
                <h2 style="font-size:1.25rem; font-weight:800; color:var(--slate-900); margin:0;">
                  Admission Preferences
                </h2>
              </div>

              <button 
                class="btn ${this.isEditing ? 'btn-primary' : 'btn-secondary'} btn-sm"
                onclick="window.toggleEditProfile()"
              >
                ${this.isEditing ? 'Cancel Edit' : '✏️ Edit Preferences'}
              </button>
            </div>

            ${this.isEditing ? `
              <form id="edit-preferences-form" onsubmit="window.handleSaveProfileChanges(event)">
                <div class="form-group" style="margin-bottom:1rem;">
                  <label class="form-label">Preferred Course</label>
                  <input type="text" id="pref-course" class="form-control" value="${activeChild.preferredCourse}" />
                </div>

                <div class="form-group" style="margin-bottom:1rem;">
                  <label class="form-label">Location / Region</label>
                  <input type="text" id="pref-location" class="form-control" value="${activeChild.preferredLocation}" />
                </div>

                <div class="form-group" style="margin-bottom:1rem;">
                  <label class="form-label">Budget Tier</label>
                  <select id="pref-budget" class="form-select">
                    <option value="Moderate" ${activeChild.budget.tier === 'Moderate' ? 'selected' : ''}>Moderate (₹1.50L - ₹2.00L / year)</option>
                    <option value="Low" ${activeChild.budget.tier === 'Low' ? 'selected' : ''}>Subsidized / Govt (< ₹1.00L / year)</option>
                    <option value="High" ${activeChild.budget.tier === 'High' ? 'selected' : ''}>Flexible / Higher (> ₹2.20L / year)</option>
                  </select>
                </div>

                <div style="display:flex; gap:0.5rem;">
                  <button type="submit" class="btn btn-primary btn-sm">Save Preferences ✓</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="window.toggleEditProfile()">Cancel</button>
                </div>
              </form>
            ` : `
              <!-- Preferences Display Grid (Section 21) -->
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.85rem;">
                <div style="background:var(--slate-50); padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid var(--slate-200);">
                  <div class="metric-label">Preferred Course</div>
                  <div style="font-weight:800; color:var(--slate-900); font-size:0.95rem; margin-top:2px;">
                    ${activeChild.preferredCourse}
                  </div>
                </div>

                <div style="background:var(--slate-50); padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid var(--slate-200);">
                  <div class="metric-label">Annual Budget</div>
                  <div style="font-weight:800; color:var(--slate-900); font-size:0.95rem; margin-top:2px;">
                    ${activeChild.budget.display}
                  </div>
                </div>

                <div style="background:var(--slate-50); padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid var(--slate-200);">
                  <div class="metric-label">Location Preference</div>
                  <div style="font-weight:800; color:var(--slate-900); font-size:0.95rem; margin-top:2px;">
                    ${activeChild.preferredLocation} (${activeChild.preferredCities.join(', ')})
                  </div>
                </div>

                <div style="background:var(--slate-50); padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid var(--slate-200);">
                  <div class="metric-label">Hostel Requirement</div>
                  <div style="font-weight:800; color:#065F46; font-size:0.95rem; margin-top:2px;">
                    ${activeChild.hostelRequired ? '✓ Required (On-Campus)' : 'Not Required'}
                  </div>
                </div>

                <div style="background:var(--slate-50); padding:0.85rem 1rem; border-radius:var(--radius-md); border:1px solid var(--slate-200);">
                  <div class="metric-label">Commute</div>
                  <div style="font-weight:800; color:var(--slate-900); font-size:0.95rem; margin-top:2px;">
                    Residential Hostel / College Bus Network
                  </div>
                </div>
              </div>
            `}
          </div>

          <!-- AI Decision Advisory Audit History -->
          <div class="card" style="padding:1.5rem 1.75rem; background:#FFFFFF;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <div>
                <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:700; color:var(--slate-500); margin-bottom:0.25rem;">
                  Audit Trace
                </div>
                <h2 style="font-size:1.25rem; font-weight:800; color:var(--slate-900); margin:0;">
                  AI Decision Advisory Audit Trail
                </h2>
              </div>
              <a href="#ai-guide" class="btn btn-secondary btn-sm">New Query →</a>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${(user.recommendationHistory || [
                { date: "2026-03-28", course: "B.E. Computer Science", score: "88% (Cutoff 176.0)", topPick: "SKCET Coimbatore (Best Fit)" },
                { date: "2026-03-15", course: "B.E. Computer Science", score: "88%", topPick: "Rajalakshmi Engineering College (Good Option)" }
              ]).map(h => `
                <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.75rem 1rem; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
                  <div>
                    <div style="font-weight:800; color:var(--slate-900);">${h.course} • ${h.score}</div>
                    <div style="color:var(--slate-500); font-size:0.75rem;">Top Match: <strong>${h.topPick || 'SKCET Coimbatore'}</strong> • ${new Date(h.date).toLocaleDateString()}</div>
                  </div>
                  <a href="#ai-guide" class="btn btn-ghost btn-sm" style="color:var(--primary-700); font-weight:700;">View Advisory →</a>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  }
};
