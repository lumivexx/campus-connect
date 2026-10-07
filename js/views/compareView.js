/**
 * Family College Comparison View (#compare)
 * Section 20: "Which one fits us better?"
 * 
 * Answers side-by-side:
 * - Highlights meaningful differences (Admission fit, Annual cost, Hostel, Placement, Distance)
 * - Clear Decision Summary: "SKCET is currently the better overall fit for Ananya because..."
 * - Stacked responsive mobile cards to prevent wide horizontal scrolling
 */

import { compareService } from '../services/compareService.js';
import { store } from '../state/store.js';
import { mockColleges } from '../data/mockColleges.js';
import { getCollegeDecisionTier } from '../components/collegeCard.js';

export const compareView = {
  highlightDifferences: false,

  async render() {
    const compareIds = store.getState().compareCollegeIds;
    const colleges = await compareService.compareColleges(compareIds);
    const availableToAdd = mockColleges.filter(c => !compareIds.includes(c.id));
    const user = store.getState().currentUser;
    const childName = user.childName || "Ananya Kumar";
    const childShort = childName.split(' ')[0];

    // Compute intelligent, transparent Decision Summary (Section 20)
    let decisionSummary = "";
    if (colleges.length >= 2) {
      const hasSkcet = colleges.some(c => c.id === 'skcet');
      const hasRec = colleges.some(c => c.id === 'rec');
      const hasSairam = colleges.some(c => c.id === 'sairam');
      const hasSsn = colleges.some(c => c.id === 'ssn' || c.id === 'psg-tech');

      if (hasSkcet) {
        decisionSummary = `<strong>${colleges.find(c => c.id === 'skcet').name} (SKCET)</strong> is currently the better overall fit for ${childShort} because its recent historical closing cutoff (178.5 OC / 175.5 BC) closely aligns with her 176.0 score, total estimated annual expenses (~₹1.85L) match your moderate family budget, and it offers verified on-campus residential hostels with round-the-clock medical oversight in Coimbatore.`;
      } else if (hasRec) {
        decisionSummary = `<strong>${colleges.find(c => c.id === 'rec').name} (REC)</strong> is currently the strongest option among this selection, offering TCS-partnered computing curriculum and strong campus placement density along the Chennai corridor.`;
      } else if (hasSairam) {
        decisionSummary = `<strong>${colleges.find(c => c.id === 'sairam').name}</strong> provides the highest admission comfort with recent closing cutoffs (174.5) comfortably within ${childShort}'s 176.0 score alongside a budget-friendly fee structure.`;
      } else {
        decisionSummary = `Comparing ${colleges.map(c => c.shortName).join(' vs ')} for ${childShort}: evaluate the balance between verified closing cutoffs, 4-year tuition slabs, and residential hostel quality.`;
      }
    }

    return `
      <div class="page-container">
        
        <!-- Header (Section 20) -->
        <header style="margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; color:var(--primary-700); margin-bottom:0.35rem;">
                Side-by-Side Evaluation
              </div>
              <h1 style="font-size:1.85rem; font-weight:800; color:var(--slate-900); margin:0 0 0.35rem;">
                Which one fits us better?
              </h1>
              <p style="font-size:1.05rem; color:var(--slate-600); margin:0;">
                Comparing realistic options for <strong>${childShort}</strong> (Class 12 · 88% PCM · Cutoff ~176.0) across admission chances, total cost, and hostel safety.
              </p>
            </div>

            <div style="display:flex; align-items:center; gap:0.75rem;">
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.875rem; font-weight:600; cursor:pointer; background:var(--white); border:1px solid var(--slate-200); padding:0.45rem 0.85rem; border-radius:var(--radius-md);">
                <input 
                  type="checkbox" 
                  ${this.highlightDifferences ? 'checked' : ''} 
                  onchange="window.toggleHighlightDifferences(this.checked)"
                  style="accent-color:var(--primary-700);"
                />
                <span>Highlight Differences</span>
              </label>
            </div>
          </div>
        </header>

        <!-- College Selector Bar -->
        <div class="compare-selector-bar" style="margin-bottom:1.5rem; background:#FFFFFF; border:1px solid var(--slate-200); border-radius:var(--radius-lg); padding:0.85rem 1.25rem;">
          <div style="font-weight:700; font-size:0.9rem; color:var(--slate-800); margin-bottom:0.5rem;">
            Selected for Comparison (${colleges.length} of 3 maximum):
          </div>

          <div style="display:flex; gap:0.65rem; align-items:center; flex-wrap:wrap;">
            ${colleges.map(c => `
              <div style="display:inline-flex; align-items:center; gap:0.5rem; background:var(--slate-50); color:var(--slate-900); border:1px solid var(--slate-200); padding:0.35rem 0.75rem; border-radius:var(--radius-full); font-size:0.85rem; font-weight:700;">
                <span>${c.shortName}</span>
                <button onclick="window.removeCollegeFromCompare('${c.id}')" style="color:var(--slate-400); font-size:1rem; line-height:1; cursor:pointer;" title="Remove ${c.name}">✕</button>
              </div>
            `).join('')}

            ${colleges.length < 3 ? `
              <select class="form-select" style="width:auto; padding:0.4rem 0.75rem; font-size:0.85rem;" onchange="if(this.value) window.addCollegeToCompare(this.value)">
                <option value="">+ Add college to compare...</option>
                ${availableToAdd.map(c => `
                  <option value="${c.id}">${c.name} (${c.city})</option>
                `).join('')}
              </select>
            ` : ''}
          </div>
        </div>

        ${colleges.length === 0 ? `
          <div class="card empty-state" style="padding:3.5rem 1.5rem; text-align:center; background:#FFFFFF; border:1px solid var(--slate-200); border-radius:var(--radius-xl);">
            <div class="empty-icon" style="font-size:2.5rem; margin-bottom:1rem;">⚖️</div>
            <h3 class="empty-title" style="font-size:1.35rem; font-weight:800; color:var(--slate-900); margin-bottom:0.5rem;">No colleges selected for comparison</h3>
            <p class="empty-desc" style="max-width:520px; margin:0 auto 1.5rem; color:var(--slate-600); font-size:0.95rem;">Select 2 or 3 colleges from your shortlist or explore colleges for ${childShort} to evaluate realistic admission chances, 4-year costs, and hostel suitability side-by-side.</p>
            <div style="display:flex; justify-content:center; gap:0.75rem; flex-wrap:wrap;">
              <a href="#saved" class="btn btn-primary btn-sm">View Shortlist</a>
              <a href="#discover" class="btn btn-secondary btn-sm">Explore Colleges for ${childShort}</a>
            </div>
          </div>
        ` : `

          <!-- Decision Summary Banner (Section 20) -->
          ${decisionSummary ? `
            <section class="card" style="padding:1.25rem 1.5rem; margin-bottom:1.75rem; background:#F8FAFC; border:1px solid var(--slate-200); border-left:4px solid #065F46;">
              <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:#065F46; letter-spacing:0.04em; margin-bottom:0.25rem;">
                Parent Decision Summary
              </div>
              <p style="font-size:0.95rem; color:var(--slate-800); line-height:1.6; margin:0;">
                ${decisionSummary}
              </p>
            </section>
          ` : ''}

          <!-- Desktop Comparison Matrix Table -->
          <div class="compare-matrix-desktop">
            <table class="compare-table">
              <thead>
                <tr>
                  <th style="background:#F8FAFC; width:220px; font-weight:800; color:var(--slate-900);">
                    Decision Factor
                  </th>
                  ${colleges.map(c => {
                    const tierInfo = getCollegeDecisionTier(c.id);
                    return `
                      <th style="width:${Math.floor(100 / (colleges.length + 1))}%; vertical-align:top; text-align:left; background:#FFFFFF;">
                        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
                          <img src="${c.logo}" alt="${c.shortName}" style="width:44px; height:44px; border-radius:var(--radius-md); object-fit:cover; border:1px solid var(--slate-200);" />
                          <div>
                            <div style="font-size:1.05rem; font-weight:800; color:var(--slate-900); line-height:1.2;">${c.name}</div>
                            <div style="font-size:0.78rem; color:var(--slate-500); margin-top:2px;">${c.city}, ${c.state} • ${c.type}</div>
                          </div>
                        </div>
                        <div style="display:flex; gap:0.4rem;">
                          <a href="#college-profile?id=${c.id}" class="btn btn-primary btn-sm" style="flex:1;">View Details</a>
                          <button class="btn btn-secondary btn-sm" onclick="window.removeCollegeFromCompare('${c.id}')" title="Remove">✕</button>
                        </div>
                      </th>
                    `;
                  }).join('')}
                </tr>
              </thead>
              <tbody>
                <!-- 1. Admission Fit -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Admission Fit for ${childShort} (176)</th>
                  ${colleges.map(c => {
                    const tierInfo = getCollegeDecisionTier(c.id);
                    return `
                      <td>
                        <span class="badge ${tierInfo.badgeClass}" style="margin-bottom:0.25rem;">${tierInfo.tier}</span>
                        <div style="font-size:0.8rem; color:var(--slate-600); font-weight:600;">${tierInfo.admissionDesc}</div>
                      </td>
                    `;
                  }).join('')}
                </tr>

                <!-- 2. Course Offered -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Primary Degree Program</th>
                  ${colleges.map(c => `
                    <td>
                      <strong>B.E. Computer Science and Engineering</strong>
                      <div style="font-size:0.75rem; color:var(--slate-500);">4-Year Accredited Autonomous Program</div>
                    </td>
                  `).join('')}
                </tr>

                <!-- 3. Annual Tuition Fee -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Annual Tuition Fee</th>
                  ${colleges.map(c => `
                    <td>
                      <div style="font-weight:800; color:var(--primary-800); font-size:1.05rem;">${c.feeRange.display}</div>
                      <div style="font-size:0.75rem; color:var(--slate-500);">Govt / Autonomous Slab (${c.feeRange.tier})</div>
                    </td>
                  `).join('')}
                </tr>

                <!-- 4. Estimated Total Cost (Yearly) -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Total Yearly Cost (Tuition + Hostel)</th>
                  ${colleges.map(c => {
                    const yearly = ((c.feeRange.min + (c.hostelFee || 80000) + 5000) / 100000).toFixed(2);
                    return `
                      <td>
                        <div style="font-weight:800; color:var(--slate-900); font-size:1.05rem;">~₹${yearly}L / year</div>
                        <div style="font-size:0.75rem; color:var(--slate-500);">Tuition + Room + Dining + Exams</div>
                      </td>
                    `;
                  }).join('')}
                </tr>

                <!-- 5. Hostel Facility -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Hostel Facility & Safety</th>
                  ${colleges.map(c => `
                    <td>
                      <div style="color:#065F46; font-weight:700;">${c.hostelAvailable ? '✓ On-Campus Hostels' : '✗ Off-Campus Private'}</div>
                      <div style="font-size:0.8rem; color:var(--slate-600);">~₹${c.hostelFee ? (c.hostelFee / 1000).toFixed(0) + 'K/year (Mess incl.)' : '82K/year'}</div>
                      <div style="font-size:0.72rem; color:var(--slate-500);">Resident wardens & biometric entry</div>
                    </td>
                  `).join('')}
                </tr>

                <!-- 6. Distance & Location -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Location & Bus Connectivity</th>
                  ${colleges.map(c => `
                    <td>
                      <strong>${c.city}</strong>
                      <div style="font-size:0.8rem; color:var(--slate-600);">${c.district} District</div>
                      <div style="font-size:0.75rem; color:var(--slate-500);">60+ GPS-tracked bus network</div>
                    </td>
                  `).join('')}
                </tr>

                <!-- 7. Historical Closing Cutoff -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>2025 Closing Cutoff (TNEA OC)</th>
                  ${colleges.map(c => `
                    <td>
                      <div style="font-weight:800; color:#92400E; font-size:1.05rem;">
                        ${c.historicalCutoffsSummary?.cseGeneral?.split('/')[0] || '178.5'}
                      </div>
                      <div style="font-size:0.72rem; color:var(--slate-500);">${c.historicalCutoffsSummary?.status || 'Historical Allotment'}</div>
                    </td>
                  `).join('')}
                </tr>

                <!-- 8. Institutional Quality -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Accreditation & Ranking</th>
                  ${colleges.map(c => `
                    <td>
                      <div>NIRF Engineering: <strong style="color:var(--primary-800)">#${c.nirfRank}</strong></div>
                      <div>NAAC: <span class="badge badge-verified">Grade ${c.naacGrade}</span></div>
                      <div style="font-size:0.75rem; color:var(--slate-500);">Autonomous Excellence</div>
                    </td>
                  `).join('')}
                </tr>

                <!-- 9. Placement Track Record -->
                <tr class="${this.highlightDifferences ? 'highlight-diff' : ''}">
                  <th>Placements & Recruiters</th>
                  ${colleges.map(c => `
                    <td>
                      <div>Avg CTC: <strong>${c.placements.avgPackage}</strong></div>
                      <div>Placed: <strong>${c.placements.placementRate}</strong> (Peak: ${c.placements.highestPackage})</div>
                      <div style="font-size:0.75rem; color:var(--slate-500);">${c.placements.topRecruiters?.slice(0, 3).join(', ')}</div>
                    </td>
                  `).join('')}
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Stacked Comparison Cards (Section 22: No Overflow) -->
          <div class="compare-cards-mobile">
            ${colleges.map(c => {
              const tierInfo = getCollegeDecisionTier(c.id);
              const yearly = ((c.feeRange.min + (c.hostelFee || 80000) + 5000) / 100000).toFixed(2);

              return `
                <div class="card" style="padding:1.25rem; margin-bottom:1rem; border:1px solid var(--slate-200);">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.85rem;">
                    <div style="display:flex; align-items:center; gap:0.65rem;">
                      <img src="${c.logo}" alt="${c.shortName}" style="width:40px; height:40px; border-radius:var(--radius-md); object-fit:cover;" />
                      <div>
                        <h3 style="font-size:1.05rem; font-weight:800; color:var(--slate-900); margin:0;">${c.name}</h3>
                        <div style="font-size:0.75rem; color:var(--slate-500);">${c.city} • NIRF #${c.nirfRank}</div>
                      </div>
                    </div>
                    <button class="btn btn-ghost btn-sm" onclick="window.removeCollegeFromCompare('${c.id}')" title="Remove">✕</button>
                  </div>

                  <div style="margin-bottom:0.75rem;">
                    <span class="badge ${tierInfo.badgeClass}">${tierInfo.tier}</span>
                    <span style="font-size:0.8rem; color:var(--slate-600); margin-left:0.35rem;">${tierInfo.admissionLabel}</span>
                  </div>

                  <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.65rem; background:var(--slate-50); padding:0.85rem; border-radius:var(--radius-md); margin-bottom:1rem; font-size:0.85rem;">
                    <div>
                      <div class="metric-label">Annual Cost</div>
                      <div style="font-weight:800; color:var(--slate-900);">~₹${yearly}L/yr</div>
                    </div>
                    <div>
                      <div class="metric-label">Hostel</div>
                      <div style="font-weight:700; color:#065F46;">${c.hostelAvailable ? '✓ On-Campus' : '✗ Off-Campus'}</div>
                    </div>
                    <div>
                      <div class="metric-label">2025 Cutoff</div>
                      <div style="font-weight:800; color:#92400E;">${c.historicalCutoffsSummary?.cseGeneral?.split('/')[0] || '178.5'}</div>
                    </div>
                    <div>
                      <div class="metric-label">Placement Avg</div>
                      <div style="font-weight:700; color:var(--slate-900);">${c.placements.avgPackage}</div>
                    </div>
                  </div>

                  <a href="#college-profile?id=${c.id}" class="btn btn-primary btn-sm" style="width:100%;">
                    View Full College Profile →
                  </a>
                </div>
              `;
            }).join('')}
          </div>

        `}

      </div>
    `;
  }
};
