/**
 * College Decision Assistant View (#ai-guide)
 * Family Decision AI Assistant designed for parents and students.
 * 
 * Explains WHY colleges are recommended across 4 tiers:
 * - BEST FIT
 * - GOOD FIT
 * - STRETCH (ASPIRATIONAL)
 * - ALTERNATIVE (SAFE OPTION)
 */

import { aiService } from '../services/aiService.js';
import { store } from '../state/store.js';
import { openExplainabilityModal } from '../components/explainabilityModal.js';
import { toast } from '../components/toast.js';

export const aiGuideView = {
  currentStepIndex: 0,
  isThinking: false,
  recommendations: null,

  init() {
    const savedRecs = store.getState().aiRecommendations;
    if (savedRecs) {
      this.recommendations = savedRecs;
    }
  },

  render() {
    this.init();
    const chatMessages = store.getState().aiChatMessages;
    const user = store.getState().currentUser;
    const childName = user.childName || "Ananya";

    return `
      <div class="page-container">
        
        <!-- Header -->
        <div style="text-align:center; max-width:760px; margin:0 auto 1.75rem;">
          <div class="hero-pill" style="margin-bottom:0.6rem; background:#ECFDF5; border-color:#A7F3D0; color:#065F46;">
            <span>👨‍👩‍👧</span>
            <span>Family Decision Support</span>
          </div>
          <h1 style="font-size:2.1rem; color:var(--slate-900); margin-bottom:0.35rem;">College Decision Assistant</h1>
          <p style="font-size:1.05rem; color:var(--slate-600); margin:0;">
            Ask anything about choosing the right college for your child.
          </p>
        </div>

        <!-- Responsible AI Disclaimer Banner -->
        <div class="disclaimer-banner" style="max-width:960px; margin:0 auto 1.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div>
            <strong>Responsible AI Notice:</strong> Recommendations are advisory estimates based on DoTE Tamil Nadu historical counselling allotments and parent-stated preferences. AI guidance does <u>not</u> guarantee admission. Current year cutoffs depend on official counselling announcements.
          </div>
        </div>

        <!-- Parent Quick Questions Grid -->
        <div style="max-width:960px; margin:0 auto 1.5rem; background:#FFFFFF; border:1px solid var(--slate-200); border-radius:var(--radius-xl); padding:1.25rem 1.5rem; box-shadow:var(--shadow-xs);">
          <div style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:var(--slate-500); letter-spacing:0.04em; margin-bottom:0.65rem;">
            Quick Questions Parents Often Ask:
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${aiService.parentQuickQuestions.map(q => `
              <button 
                class="btn btn-secondary btn-sm" 
                style="font-size:0.8rem; padding:0.4rem 0.75rem; border-radius:var(--radius-full); background:#F8FAFC;" 
                onclick="window.askParentAIQuestion('${q.id}')"
              >
                <span>💬</span>
                <span>${q.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="ai-guide-container">
          
          <!-- Chat Window -->
          <div class="ai-chat-card">
            
            <div class="card-header" style="background:#fff; border-bottom:1px solid var(--slate-200);">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <div style="width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, #1E3A8A, #1D4ED8); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem;">
                  AI
                </div>
                <div>
                  <div style="font-weight:700; font-size:0.95rem; color:var(--slate-900);">College Decision Assistant</div>
                  <div style="font-size:0.75rem; color:#047857; display:flex; align-items:center; gap:4px; font-weight:600;">
                    <span style="width:6px; height:6px; background:#059669; border-radius:50%; display:inline-block;"></span>
                    Online • TNEA 2025 Archive & Verified College Dataset
                  </div>
                </div>
              </div>

              <button class="btn btn-ghost btn-sm" onclick="window.resetAIChat()" title="Restart conversation">
                Restart ↺
              </button>
            </div>

            <div class="ai-chat-messages" id="ai-chat-messages">
              <!-- Initial Welcome Message -->
              <div class="chat-bubble bot">
                <div class="chat-avatar" style="background:#1E3A8A; color:#fff;">AI</div>
                <div class="chat-content-box">
                  Hello! I’m your College Decision Assistant. I help families evaluate institutions across Tamil Nadu based on academic fit, fees, hostel accommodation, and placement density.
                  <div style="margin-top:0.75rem; font-weight:700; color:var(--primary-800);">
                    Let's find the best fit for ${childName}. Which degree program or engineering branch is your child looking to pursue?
                  </div>
                  
                  <div class="quick-replies-tray">
                    <button class="quick-reply-btn" onclick="window.handleChatQuickReply('B.E. Computer Science and Engineering')">B.E. Computer Science</button>
                    <button class="quick-reply-btn" onclick="window.handleChatQuickReply('B.Tech Artificial Intelligence and Data Science')">AI & Data Science</button>
                    <button class="quick-reply-btn" onclick="window.handleChatQuickReply('B.Tech Information Technology')">Information Technology</button>
                    <button class="quick-reply-btn" onclick="window.handleChatQuickReply('B.E. Electronics and Communication')">B.E. ECE</button>
                  </div>
                </div>
              </div>

              <!-- Message Stream -->
              ${chatMessages.map(msg => `
                <div class="chat-bubble ${msg.role}">
                  <div class="chat-avatar" style="${msg.role === 'bot' ? 'background:#1E3A8A; color:#fff;' : 'background:var(--slate-200);'}">${msg.role === 'bot' ? 'AI' : 'P'}</div>
                  <div class="chat-content-box">
                    <div>${msg.text}</div>
                    ${msg.presets && msg.presets.length > 0 ? `
                      <div class="quick-replies-tray">
                        ${msg.presets.map(p => `
                          <button class="quick-reply-btn" onclick="window.handleChatQuickReply('${p}')">${p}</button>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}

              ${this.isThinking ? `
                <div class="chat-bubble bot" id="thinking-indicator">
                  <div class="chat-avatar" style="background:#1E3A8A; color:#fff;">AI</div>
                  <div class="ai-thinking-box" style="background:#EFF6FF; color:#1E40AF;">
                    <span>Evaluating DoTE historical cutoffs & fee compatibility</span>
                    <div class="thinking-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Input Box -->
            <form class="ai-chat-input-row" onsubmit="window.handleChatInputSubmit(event)">
              <input 
                type="text" 
                id="ai-chat-input" 
                class="form-control" 
                placeholder="Type your answer or family requirement (e.g. 88%, Coimbatore, Moderate budget, safe hostel)..." 
                autocomplete="off"
              />
              <button type="submit" class="btn btn-primary" id="ai-chat-send-btn">
                Send ↵
              </button>
            </form>

          </div>

          <!-- Recommendations Section -->
          ${this.recommendations ? this.renderRecommendationsList() : `
            <div style="text-align:center; padding:2.25rem 1.5rem; background:var(--white); border:1px solid var(--slate-200); border-radius:var(--radius-xl); box-shadow:var(--shadow-xs);">
              <div style="font-size:2.25rem; margin-bottom:0.5rem;">👨‍👩‍👧</div>
              <h3 style="font-size:1.2rem; color:var(--slate-900); margin-bottom:0.35rem;">Answer the 5 quick questions above</h3>
              <p style="font-size:0.875rem; color:var(--slate-500); max-width:480px; margin:0 auto 1.25rem;">
                Our assistant will evaluate historical cutoffs and generate transparent Best Fit, Good Fit, and Alternative cards for your child.
              </p>
              <button class="btn btn-primary btn-sm" onclick="window.fastTrackRecommendations()">
                ⚡ Load Recommendations for ${childName} (88% CSE TN)
              </button>
            </div>
          `}

        </div>

      </div>
    `;
  },

  renderRecommendationsList() {
    const recs = this.recommendations;
    const user = store.getState().currentUser;
    const childName = user.childName || "Ananya";

    return `
      <section class="recommendations-wrapper" id="recommendations-section">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:#047857; letter-spacing:0.04em;">Curated Family Advisory</div>
            <h2 style="font-size:1.6rem; color:var(--slate-900); margin:0.25rem 0 0.2rem;">Recommended Options for ${childName}</h2>
            <p style="font-size:0.875rem; color:var(--slate-600); margin:0;">
              Evaluating Class 12 Score: <strong>88%</strong> (Cutoff ~176) • <strong>B.E. Computer Science</strong> • <strong>Tamil Nadu</strong>
            </p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.fastTrackRecommendations()">
            Recalculate ↺
          </button>
        </div>

        <div style="display:flex; flex-direction:column; gap:1.75rem;">
          ${recs.map((r, index) => {
            const isSaved = store.isCollegeSaved(r.college.id);
            const isInCompare = store.isInCompare(r.college.id);

            let readinessBadgeClass = "badge-fit-good";
            if (r.admissionReadiness.includes("HIGH FIT")) readinessBadgeClass = "badge-fit-high";
            else if (r.admissionReadiness.includes("ASPIRATIONAL")) readinessBadgeClass = "badge-fit-stretch";
            else if (r.matchCategory.includes("ALTERNATIVE")) readinessBadgeClass = "badge-fit-alt";

            return `
              <div class="recommendation-card" id="rec-card-${r.college.id}" style="border: 1.5px solid var(--slate-200);">
                <div class="rec-header" style="background:#F8FAFC;">
                  <div style="display:flex; align-items:center; gap:0.85rem;">
                    <img src="${r.college.logo}" alt="${r.college.name}" style="width:48px; height:48px; border-radius:var(--radius-md); object-fit:cover; border:1px solid var(--slate-200);" />
                    <div>
                      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                        <h3 style="font-size:1.25rem; font-weight:800; margin:0;">
                          <a href="#college-profile?id=${r.college.id}">${r.college.name}</a>
                        </h3>
                        <span class="badge ${readinessBadgeClass}">${r.matchCategory} (${r.matchPercentage}%)</span>
                      </div>
                      <div style="font-size:0.825rem; color:var(--slate-500); margin-top:2px;">
                        ${r.college.city}, ${r.college.state} • ${r.college.type} • NIRF #${r.college.nirfRank} • NAAC ${r.college.naacGrade}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button class="btn btn-ghost btn-sm" style="color:var(--primary-700); font-weight:700;" onclick="window.showExplainability('${r.college.id}')">
                      💡 Why are we recommending this?
                    </button>
                  </div>
                </div>

                <div class="rec-body">
                  <!-- Headline & Admission Readiness Summary -->
                  <div style="font-weight:700; color:var(--slate-900); margin-bottom:0.4rem; font-size:1.05rem;">
                    ${r.headline}
                  </div>

                  <div style="background:#F8FAFC; border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:0.75rem 1rem; margin-bottom:1rem; font-size:0.875rem;">
                    <div style="font-weight:700; color:#1E3A8A; margin-bottom:2px;">How realistic is this option?</div>
                    <div style="color:var(--slate-700);">${r.readinessSummary}</div>
                  </div>

                  <!-- Match Quality Breakdown -->
                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.65rem; margin-bottom:1.25rem; text-align:center;">
                    <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.6rem; border-radius:var(--radius-md);">
                      <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">ACADEMIC FIT</div>
                      <div style="font-size:0.95rem; font-weight:800; color:#047857;">${r.matchDimensions.academicFit}</div>
                    </div>
                    <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.6rem; border-radius:var(--radius-md);">
                      <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">COURSE FIT</div>
                      <div style="font-size:0.95rem; font-weight:800; color:var(--primary-700);">${r.matchDimensions.courseFit}</div>
                    </div>
                    <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.6rem; border-radius:var(--radius-md);">
                      <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">LOCATION</div>
                      <div style="font-size:0.95rem; font-weight:800; color:var(--slate-800);">${r.matchDimensions.location}</div>
                    </div>
                    <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.6rem; border-radius:var(--radius-md);">
                      <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">BUDGET</div>
                      <div style="font-size:0.95rem; font-weight:800; color:#B45309;">${r.matchDimensions.budget}</div>
                    </div>
                    <div style="background:var(--slate-50); border:1px solid var(--slate-200); padding:0.6rem; border-radius:var(--radius-md);">
                      <div style="font-size:0.7rem; color:var(--slate-500); font-weight:700;">HOSTEL</div>
                      <div style="font-size:0.95rem; font-weight:800; color:#047857;">${r.matchDimensions.hostel}</div>
                    </div>
                  </div>

                  <!-- Key Reasons -->
                  <div style="margin-bottom:1.25rem;">
                    <div style="font-size:0.78rem; text-transform:uppercase; font-weight:700; color:var(--slate-500); margin-bottom:0.5rem;">Why this matches your criteria:</div>
                    <div class="rec-reasons-list" style="margin:0;">
                      ${r.reasons.map(reason => `
                        <div class="rec-reason-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span>${reason}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Parent Decision Checklist -->
                  <div class="parent-checklist-box">
                    <div class="checklist-title">
                      <span>Parent Decision Checklist for ${r.college.shortName}</span>
                    </div>
                    <div class="checklist-grid">
                      <div class="checklist-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Course verified: ${r.courseRecommended.split('/')[0]}</span>
                      </div>
                      <div class="checklist-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Historical Cutoff: ${r.academicProfileFit.split('vs')[1] || 'Reviewed'}</span>
                      </div>
                      <div class="checklist-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Fee estimate: ${r.feeEstimate}</span>
                      </div>
                      <div class="checklist-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Hostel: ${r.hostelEstimate}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Actions Bar -->
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; padding-top:1rem; border-top:1px solid var(--slate-100);">
                    <div style="font-size:0.75rem; color:var(--slate-500);">
                      Audited: <strong>${r.dataAuditDate}</strong> • Source: <strong>${r.dataSource}</strong>
                    </div>

                    <div style="display:flex; gap:0.5rem;">
                      <a href="#college-profile?id=${r.college.id}" class="btn btn-primary btn-sm">
                        View College Profile →
                      </a>
                      <button 
                        class="btn btn-secondary btn-sm ${isInCompare ? 'active-compare' : ''}" 
                        onclick="window.handleCompareToggle('${r.college.id}')"
                      >
                        ${isInCompare ? 'In Compare ✓' : '+ Compare'}
                      </button>
                      <button 
                        class="btn btn-secondary btn-sm ${isSaved ? 'active-save' : ''}" 
                        onclick="window.handleSaveToggle('${r.college.id}')"
                      >
                        ${isSaved ? 'In Shortlist ★' : 'Save to Shortlist ☆'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
};
