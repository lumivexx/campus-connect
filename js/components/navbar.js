/**
 * Navigation Component - Parent-First Family Experience
 * Desktop Sidebar + Sticky Top Header + Mobile Bottom Navigation Bar
 */

import { store } from '../state/store.js';

export const navbar = {
  renderSidebar() {
    const state = store.getState();
    const user = state.currentUser;
    const currentRoute = state.currentRoute;
    const compareCount = state.compareCollegeIds.length;
    const unreadCount = state.unreadNotifs;
    const savedCount = state.savedCollegeIds.size;
    const isCollegeAdmin = user.role === "college_admin";
    const childName = user.childName || "Ananya Kumar";
    const childMarks = user.marks ? `${user.marks.percentage}%` : "88%";

    return `
      <aside class="app-sidebar" id="app-sidebar">
        <div>
          <div class="sidebar-header" style="cursor: pointer;" onclick="window.location.hash='#landing'">
            <div class="brand-logo" style="background: linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%);">CC</div>
            <div class="brand-text">
              <span class="brand-title">Campus Connect</span>
              <span class="brand-subtitle" style="color:#047857; font-size:0.68rem; letter-spacing:0.04em;">Family College Advisor</span>
            </div>
          </div>

          <!-- Active Child Indicator Card -->
          <div style="margin: 0.85rem 0.85rem 0.25rem; background: #F8FAFC; border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 0.65rem 0.85rem; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.68rem; text-transform: uppercase; color: var(--slate-500); font-weight: 700; letter-spacing:0.05em;">Evaluating for:</div>
              <div style="font-size: 0.875rem; font-weight: 800; color: var(--slate-900);">${childName}</div>
              <div style="font-size: 0.72rem; color: var(--slate-600); font-weight: 600;">Class 12 · ${childMarks} · CSE</div>
            </div>
            <button 
              class="btn btn-ghost btn-sm" 
              style="padding: 0.25rem 0.45rem; font-size: 0.72rem; color: var(--primary-700); font-weight: 700;" 
              onclick="window.toggleSwitchChild()"
              title="Switch Child"
            >
              Switch ⇄
            </button>
          </div>

          <nav class="sidebar-nav">
            <a href="#home" class="nav-link ${currentRoute === 'home' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Decision Dashboard</span>
            </a>

            <a href="#discover" class="nav-link ${currentRoute === 'discover' || currentRoute === 'college-profile' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Explore Colleges</span>
            </a>

            <a href="#ai-guide" class="nav-link ${currentRoute === 'ai-guide' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
              <span>Decision Assistant</span>
              <span class="nav-badge accent-ai">AI Advisor</span>
            </a>

            <a href="#saved" class="nav-link ${currentRoute === 'saved' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              <span>Your Shortlist</span>
              ${savedCount > 0 ? `<span class="nav-badge">${savedCount}</span>` : ''}
            </a>

            <a href="#compare" class="nav-link ${currentRoute === 'compare' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              <span>Compare Options</span>
              ${compareCount > 0 ? `<span class="nav-badge active-count">${compareCount}</span>` : ''}
            </a>

            <a href="#events" class="nav-link ${currentRoute === 'events' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Campus Opportunities</span>
            </a>

            <a href="#community" class="nav-link ${currentRoute === 'community' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>Student & Alumni Voices</span>
            </a>

            <a href="#notifications" class="nav-link ${currentRoute === 'notifications' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span>Deadlines & Alerts</span>
              ${unreadCount > 0 ? `<span class="nav-badge active-count">${unreadCount}</span>` : ''}
            </a>

            <a href="#profile" class="nav-link ${currentRoute === 'profile' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Family Profile</span>
            </a>

            <a href="#admin" class="nav-link ${currentRoute === 'admin' ? 'active' : ''}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>College Admin</span>
              ${isCollegeAdmin ? `<span class="nav-badge" style="background:#065F46;color:#fff;">Active</span>` : ''}
            </a>
          </nav>
        </div>

        <div class="sidebar-footer">
          <div class="user-quick-profile">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}" class="avatar-img" alt="${user.parentName || user.name}" />
            <div class="user-quick-info">
              <span class="user-quick-name text-truncate">${user.parentName || 'Ravi Kumar'}</span>
              <span class="user-quick-role">${isCollegeAdmin ? 'College Admin (SKCET)' : `Parent of ${childName}`}</span>
            </div>
          </div>

          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-secondary btn-sm" style="flex:1; font-size:0.75rem;" onclick="window.toggleRole()">
              ${isCollegeAdmin ? 'Switch to Parent' : 'Admin Portal'}
            </button>
            <a href="#auth" class="btn btn-ghost btn-sm" title="Account Access">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </a>
          </div>
        </div>
      </aside>
    `;
  },

  renderTopHeader() {
    const state = store.getState();
    const user = state.currentUser;
    const compareCount = state.compareCollegeIds.length;
    const unreadCount = state.unreadNotifs;
    const childName = user.childName || "Ananya";

    return `
      <header class="top-header">
        <div class="header-mobile-brand" onclick="window.location.hash='#home'" style="cursor:pointer;">
          <div class="brand-logo" style="width:34px; height:34px; font-size:0.95rem; background: linear-gradient(135deg, #1E3A8A, #0F172A);">CC</div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-weight:800; font-size:0.95rem; color:var(--slate-900); line-height:1.2;">Campus Connect AI</span>
            <span style="font-size:0.68rem; color:#065F46; font-weight:700;">Family College Companion</span>
          </div>
        </div>

        <div class="header-search">
          <div class="search-input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              id="global-search-input" 
              class="form-control" 
              placeholder="Search colleges, courses, or cities for ${childName} (e.g. SKCET, CSE, Coimbatore)..." 
              value="${state.globalSearchQuery || ''}"
              onkeydown="if(event.key==='Enter') window.handleGlobalSearch(this.value)"
            />
          </div>
        </div>

        <div class="header-actions">
          <div style="display:none; align-items:center; gap:0.35rem; background:var(--slate-100); padding:0.35rem 0.75rem; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; color:var(--slate-700);" class="child-badge-desktop">
            <span>🎓</span>
            <span>${childName} (${user.marks ? user.marks.percentage : '88'}%)</span>
            <button onclick="window.toggleSwitchChild()" style="margin-left:4px; color:var(--primary-700); font-size:0.75rem;" title="Switch child profile">⇄</button>
          </div>

          ${compareCount > 0 ? `
            <div class="compare-floating-pill" onclick="window.location.hash='#compare'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              <span>Compare (${compareCount}/3)</span>
            </div>
          ` : ''}

          <a href="#notifications" class="btn-icon" title="Notifications & Deadlines" style="position:relative;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            ${unreadCount > 0 ? `<span style="position:absolute; top:4px; right:4px; width:9px; height:9px; background:var(--primary-600); border-radius:50%; border:2px solid #fff;"></span>` : ''}
          </a>

          <a href="#profile" class="btn-icon" title="Family Profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </a>
        </div>
      </header>
    `;
  },

  renderMobileBottomNav() {
    const currentRoute = store.getState().currentRoute;

    return `
      <nav class="mobile-bottom-nav">
        <a href="#home" class="mobile-nav-item ${currentRoute === 'home' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Dashboard</span>
        </a>

        <a href="#discover" class="mobile-nav-item ${currentRoute === 'discover' || currentRoute === 'college-profile' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Explore</span>
        </a>

        <a href="#saved" class="mobile-nav-item ${currentRoute === 'saved' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          <span>Shortlist</span>
        </a>

        <a href="#ai-guide" class="mobile-nav-item mobile-ai-badge ${currentRoute === 'ai-guide' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
          <span>Assistant</span>
        </a>

        <a href="#profile" class="mobile-nav-item ${currentRoute === 'profile' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Profile</span>
        </a>
      </nav>
    `;
  }
};
