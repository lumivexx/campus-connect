/**
 * College / Admin View (MVP Basic Version)
 * Simple institutional cockpit for verified colleges (e.g., SKCET).
 * Create posts, announce events, update cutoff seats, and monitor reach.
 */

import { mockColleges } from '../data/mockColleges.js';
import { store } from '../state/store.js';

export const adminView = {
  render() {
    // Current simulated college: Sri Krishna College of Engg & Tech (SKCET)
    const college = mockColleges.find(c => c.id === "skcet");

    return `
      <div class="page-container">
        
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
              <span class="badge badge-verified">✓ Verified College Administrator</span>
              <span style="font-size:0.8rem; color:var(--slate-500);">TNEA Code: ${college.tneaCode}</span>
            </div>
            <h1 style="font-size:1.85rem;">${college.name}</h1>
            <p style="font-size:0.9rem; color:var(--slate-600);">Institutional Portal • Manage campus updates, seats & hackathons</p>
          </div>

          <button class="btn btn-secondary btn-sm" onclick="window.toggleRole()">
            Switch to Student View (Mitra)
          </button>
        </div>

        <!-- Institutional Metric Counters -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:2rem;">
          <div class="card" style="padding:1.25rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--slate-500); font-weight:700;">STUDENT PROFILE VIEWS</div>
            <div style="font-size:1.75rem; font-weight:800; color:var(--primary-600);">14,820</div>
            <div style="font-size:0.75rem; color:#059669; font-weight:600;">↑ 22% this week</div>
          </div>

          <div class="card" style="padding:1.25rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--slate-500); font-weight:700;">ACTIVE STUDENT FOLLOWERS</div>
            <div style="font-size:1.75rem; font-weight:800; color:var(--slate-800);">3,410</div>
            <div style="font-size:0.75rem; color:var(--slate-500);">Mitra + 3,409 students</div>
          </div>

          <div class="card" style="padding:1.25rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--slate-500); font-weight:700;">EVENT REGISTRATIONS</div>
            <div style="font-size:1.75rem; font-weight:800; color:#D97706;">380</div>
            <div style="font-size:0.75rem; color:var(--slate-500);">HackFest 2026 (76% full)</div>
          </div>

          <div class="card" style="padding:1.25rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--slate-500); font-weight:700;">AI GUIDE RECOMMENDATIONS</div>
            <div style="font-size:1.75rem; font-weight:800; color:#7C3AED;">2,140</div>
            <div style="font-size:0.75rem; color:var(--slate-500);">Ranked #1 High Match in CSE</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
          
          <!-- Post Announcement Form -->
          <div class="card" style="padding:1.5rem;">
            <h2 style="font-size:1.2rem; margin-bottom:0.25rem;">Publish Campus Announcement</h2>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.25rem;">Broadcasts instantly to all students following SKCET</p>

            <form onsubmit="event.preventDefault(); window.handleAdminPublishPost();">
              <div class="form-group">
                <label class="form-label">Announcement Category</label>
                <select id="admin-post-type" class="form-select">
                  <option value="Announcement">Official Announcement</option>
                  <option value="Achievement">Placement Achievement</option>
                  <option value="Campus update">Research & Facilities</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Update Content</label>
                <textarea 
                  id="admin-post-content" 
                  class="form-control" 
                  rows="4" 
                  placeholder="e.g. SKCET inaugurates new AI & Cloud Computing Lab in partnership with Zoho..."
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-sm" style="width:100%;">
                Publish Post to Community Feed
              </button>
            </form>
          </div>

          <!-- Publish Event Form -->
          <div class="card" style="padding:1.5rem;">
            <h2 style="font-size:1.2rem; margin-bottom:0.25rem;">Host New Flagship Event</h2>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.25rem;">Publish to the national events discovery directory</p>

            <form onsubmit="event.preventDefault(); window.handleAdminPublishEvent();">
              <div class="form-group">
                <label class="form-label">Event Title</label>
                <input type="text" id="admin-evt-title" class="form-control" placeholder="e.g. CodeStorm 2026: 24-Hr Hackathon" />
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                <div class="form-group">
                  <label class="form-label">Type</label>
                  <select id="admin-evt-type" class="form-select">
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Symposium">Symposium</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Max Seats</label>
                  <input type="number" id="admin-evt-seats" class="form-control" value="250" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Prize / Incentive</label>
                <input type="text" id="admin-evt-prize" class="form-control" placeholder="₹1,00,000 Cash + Certificates" />
              </div>

              <button type="submit" class="btn btn-primary btn-sm" style="width:100%;">
                Publish Event
              </button>
            </form>
          </div>

        </div>

      </div>
    `;
  }
};
