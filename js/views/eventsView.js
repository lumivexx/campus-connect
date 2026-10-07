/**
 * Events View
 * Hackathons, symposiums, workshops, and technical competitions.
 */

import { eventService } from '../services/eventService.js';
import { store } from '../state/store.js';

export const eventsView = {
  activeCategory: "all",
  searchQuery: "",

  async render() {
    const events = await eventService.getEvents(this.activeCategory, null, this.searchQuery);

    return `
      <div class="page-container">
        
        <div class="events-container">
          
          <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; color:var(--primary-700); margin-bottom:0.35rem;">
                Student Growth & Hands-On Learning
              </div>
              <h1 style="font-size:1.85rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
                Campus Opportunities & Activities
              </h1>
              <p style="font-size:1rem; color:var(--slate-600); margin:0;">
                What opportunities will my child have on campus? Hackathons, research symposiums, and innovation challenges that foster career readiness.
              </p>
            </div>

            <button class="btn btn-primary btn-sm" onclick="window.openCreateEventModal()">
              + Host an Event
            </button>
          </div>

          <!-- Category Filter Pills & Search -->
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center; margin-bottom:1.5rem;">
            <div class="category-pills-scroll" style="padding:0; flex:1;">
              <button class="category-pill ${this.activeCategory === 'all' ? 'active' : ''}" onclick="window.switchEventCategory('all')">
                All Events
              </button>
              <button class="category-pill ${this.activeCategory === 'Hackathon' ? 'active' : ''}" onclick="window.switchEventCategory('Hackathon')">
                🚀 Hackathons
              </button>
              <button class="category-pill ${this.activeCategory === 'Symposium' ? 'active' : ''}" onclick="window.switchEventCategory('Symposium')">
                🏛️ Symposiums
              </button>
              <button class="category-pill ${this.activeCategory === 'Workshop' ? 'active' : ''}" onclick="window.switchEventCategory('Workshop')">
                🛠️ Workshops
              </button>
              <button class="category-pill ${this.activeCategory === 'Seminar' ? 'active' : ''}" onclick="window.switchEventCategory('Seminar')">
                🎙️ Masterclasses
              </button>
              <button class="category-pill ${this.activeCategory === 'Competition' ? 'active' : ''}" onclick="window.switchEventCategory('Competition')">
                ⚡ Competitions
              </button>
              <button class="category-pill ${this.activeCategory === 'Cultural' ? 'active' : ''}" onclick="window.switchEventCategory('Cultural')">
                🎭 Cultural
              </button>
            </div>

            <div class="search-input-wrapper" style="max-width:280px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                class="form-control" 
                style="padding-left:2.5rem; font-size:0.875rem;" 
                placeholder="Search events..." 
                value="${this.searchQuery}"
                oninput="window.handleEventSearch(this.value)"
              />
            </div>
          </div>

          <!-- Events Grid -->
          <div class="grid-cards">
            ${events.length === 0 ? `
              <div class="card empty-state" style="grid-column: 1 / -1;">
                <p>No events found for this filter combination.</p>
              </div>
            ` : events.map(evt => `
              <article class="event-card" id="event-${evt.id}">
                <div class="event-card-media">
                  <img src="${evt.image}" alt="${evt.title}" class="event-card-img" loading="lazy" />
                  <span class="badge badge-match-medium" style="position:absolute; top:12px; left:12px;">${evt.type}</span>
                  <span style="position:absolute; bottom:10px; right:12px; background:rgba(0,0,0,0.7); color:#fff; font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:var(--radius-sm); backdrop-filter:blur(4px);">
                    ${evt.registeredCount}/${evt.maxSeats} Registered
                  </span>
                </div>

                <div class="event-card-body">
                  <h3 class="event-title">
                    <a href="javascript:void(0)" onclick="window.openEventDetails('${evt.id}')">${evt.title}</a>
                  </h3>

                  <div class="event-meta-row">
                    <span>🏛️</span>
                    <a href="#college-profile?id=${evt.collegeId}" style="font-weight:600; color:var(--slate-800);">${evt.collegeName}</a>
                  </div>

                  <div class="event-meta-row">
                    <span>📅</span>
                    <span>${evt.date} • ${evt.time}</span>
                  </div>

                  <div class="event-meta-row">
                    <span>📍</span>
                    <span class="text-truncate">${evt.venue}</span>
                  </div>

                  <div style="background:var(--slate-50); border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:0.6rem; margin-top:0.65rem; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.75rem; color:var(--slate-500); font-weight:600;">Prizes / Rewards:</span>
                    <span style="font-size:0.8rem; font-weight:700; color:var(--primary-700);">${evt.prize}</span>
                  </div>
                </div>

                <div class="card-footer" style="gap:0.5rem;">
                  <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="window.openEventDetails('${evt.id}')">
                    Details
                  </button>
                  <button 
                    class="btn ${evt.isRegistered ? 'btn-secondary' : 'btn-primary'} btn-sm" 
                    style="flex:1;" 
                    onclick="window.handleRegisterEvent('${evt.id}')"
                  >
                    ${evt.isRegistered ? 'Registered ✓' : 'Register Now'}
                  </button>
                </div>
              </article>
            `).join('')}
          </div>

        </div>

      </div>
    `;
  }
};
