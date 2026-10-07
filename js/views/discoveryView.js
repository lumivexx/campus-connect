/**
 * College Discovery View
 * Multi-faceted search, deep filtering, sorting, responsive college cards,
 * pagination, and interactive shortlist/compare toggles.
 */

import { collegeService } from '../services/collegeService.js';
import { renderCollegeCard } from '../components/collegeCard.js';
import { store } from '../state/store.js';

export const discoveryView = {
  filters: {
    query: "",
    course: "all",
    city: "all",
    maxFee: 400000,
    type: "all",
    minRating: 0,
    hostelRequired: false
  },
  sortBy: "recommended",
  page: 1,
  pageSize: 9,

  async render() {
    const res = await collegeService.getColleges(this.filters, this.sortBy, this.page, this.pageSize);
    const colleges = res.items;
    const total = res.total;
    const hasMore = res.hasMore;

    return `
      <div class="page-container">
        
        <!-- Header & Search -->
        <div style="margin-bottom:2rem;">
          <h1 style="font-size:1.85rem; margin-bottom:0.35rem;">Discover Colleges</h1>
          <p style="font-size:0.95rem; color:var(--slate-600); margin-bottom:1.25rem;">
            Explore verified colleges in Tamil Nadu & South India with historical cutoffs, accredited rankings, and fees.
          </p>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <div class="search-input-wrapper" style="flex:1; min-width:260px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                id="discovery-search-input" 
                class="form-control" 
                placeholder="Search by college name, course or city (e.g. SKCET, Coimbatore, CSE)..."
                value="${this.filters.query}"
                oninput="window.handleDiscoverySearch(this.value)"
              />
            </div>

            <div style="min-width:180px;">
              <select class="form-select" onchange="window.handleSortChange(this.value)">
                <option value="recommended" ${this.sortBy === 'recommended' ? 'selected' : ''}>Sort: Recommended</option>
                <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>Rating: High to Low</option>
                <option value="fee-low" ${this.sortBy === 'fee-low' ? 'selected' : ''}>Fee: Low to High</option>
                <option value="fee-high" ${this.sortBy === 'fee-high' ? 'selected' : ''}>Fee: High to Low</option>
                <option value="nirf" ${this.sortBy === 'nirf' ? 'selected' : ''}>NIRF Rank: Top First</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Main Discovery Grid & Sidebar -->
        <div class="discovery-layout">
          
          <!-- Filter Panel -->
          <aside class="filters-sidebar">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; border-bottom:1px solid var(--slate-100); padding-bottom:0.75rem;">
              <span style="font-weight:800; font-size:1.05rem;">Filter Criteria</span>
              <button class="btn btn-ghost btn-sm" onclick="window.clearAllFilters()" style="color:var(--primary-600);">Clear All</button>
            </div>

            <!-- Program / Course -->
            <div class="form-group">
              <label class="form-label">Degree & Branch</label>
              <select class="form-select" onchange="window.handleFilterChange('course', this.value)">
                <option value="all" ${this.filters.course === 'all' ? 'selected' : ''}>All Courses</option>
                <option value="Computer Science" ${this.filters.course === 'Computer Science' ? 'selected' : ''}>B.E. Computer Science</option>
                <option value="Artificial Intelligence" ${this.filters.course === 'Artificial Intelligence' ? 'selected' : ''}>B.Tech AI & Data Science</option>
                <option value="Information Technology" ${this.filters.course === 'Information Technology' ? 'selected' : ''}>B.Tech Information Tech</option>
                <option value="Electronics" ${this.filters.course === 'Electronics' ? 'selected' : ''}>B.E. Electronics & Comm (ECE)</option>
                <option value="Mechanical" ${this.filters.course === 'Mechanical' ? 'selected' : ''}>B.E. Mechanical Engineering</option>
              </select>
            </div>

            <!-- Region / City -->
            <div class="form-group">
              <label class="form-label">City / District</label>
              <select class="form-select" onchange="window.handleFilterChange('city', this.value)">
                <option value="all" ${this.filters.city === 'all' ? 'selected' : ''}>All Locations</option>
                <option value="Coimbatore" ${this.filters.city === 'Coimbatore' ? 'selected' : ''}>Coimbatore</option>
                <option value="Chennai" ${this.filters.city === 'Chennai' ? 'selected' : ''}>Chennai</option>
                <option value="Madurai" ${this.filters.city === 'Madurai' ? 'selected' : ''}>Madurai</option>
                <option value="Vellore" ${this.filters.city === 'Vellore' ? 'selected' : ''}>Vellore</option>
                <option value="Sathyamangalam" ${this.filters.city === 'Sathyamangalam' ? 'selected' : ''}>Sathyamangalam / Erode</option>
              </select>
            </div>

            <!-- Fee Range Slider -->
            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label class="form-label">Max Annual Fee</label>
                <span style="font-size:0.85rem; font-weight:700; color:var(--primary-700)">₹${(this.filters.maxFee / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input 
                type="range" 
                min="50000" 
                max="400000" 
                step="25000" 
                value="${this.filters.maxFee}" 
                oninput="window.handleFilterChange('maxFee', this.value)" 
                style="accent-color:var(--primary-600); width:100%;"
              />
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--slate-400);">
                <span>₹50K</span>
                <span>₹4.0L+</span>
              </div>
            </div>

            <!-- College Type -->
            <div class="form-group">
              <label class="form-label">Institution Type</label>
              <select class="form-select" onchange="window.handleFilterChange('type', this.value)">
                <option value="all" ${this.filters.type === 'all' ? 'selected' : ''}>All Types</option>
                <option value="Autonomous" ${this.filters.type === 'Autonomous' ? 'selected' : ''}>Autonomous</option>
                <option value="Government" ${this.filters.type === 'Government' ? 'selected' : ''}>Govt Aided / State Univ</option>
                <option value="Deemed" ${this.filters.type === 'Deemed' ? 'selected' : ''}>Deemed University</option>
              </select>
            </div>

            <!-- Rating -->
            <div class="form-group">
              <label class="form-label">Minimum Rating</label>
              <select class="form-select" onchange="window.handleFilterChange('minRating', this.value)">
                <option value="0" ${this.filters.minRating === 0 ? 'selected' : ''}>Any Rating</option>
                <option value="4.5" ${this.filters.minRating === 4.5 ? 'selected' : ''}>4.5 ★ & Above</option>
                <option value="4.7" ${this.filters.minRating === 4.7 ? 'selected' : ''}>4.7 ★ & Above</option>
              </select>
            </div>

            <!-- Amenities -->
            <div style="padding-top:0.75rem; border-top:1px solid var(--slate-100);">
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.875rem; font-weight:600; cursor:pointer;">
                <input 
                  type="checkbox" 
                  ${this.filters.hostelRequired ? 'checked' : ''} 
                  onchange="window.handleFilterChange('hostelRequired', this.checked)"
                  style="accent-color:var(--primary-600);"
                />
                <span>Hostel Accommodation Available</span>
              </label>
            </div>

          </aside>

          <!-- Results Grid Area -->
          <main>
            <div class="discovery-results-header">
              <div style="font-size:0.9rem; color:var(--slate-600);">
                Showing <strong>${colleges.length}</strong> of <strong>${total}</strong> verified institutions
              </div>
            </div>

            ${colleges.length === 0 ? `
              <div class="empty-state card" style="padding:3rem 1.5rem; background:#FFFFFF;">
                <div class="empty-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3 class="empty-title">No matching colleges yet</h3>
                <p class="empty-desc">Try widening your location, budget, or course preferences to view available institutions.</p>
                <div style="display:flex; gap:0.5rem;">
                  <button class="btn btn-primary btn-sm" onclick="window.clearAllFilters()">Clear Filters</button>
                  <a href="#profile" class="btn btn-secondary btn-sm">Adjust Preferences</a>
                </div>
              </div>
            ` : `
              <div class="grid-cards">
                ${colleges.map(col => renderCollegeCard(col)).join('')}
              </div>

              ${hasMore ? `
                <div style="text-align:center; margin-top:2.5rem;">
                  <button class="btn btn-secondary btn-lg" onclick="window.loadMoreColleges()">
                    Load More Colleges (${total - colleges.length} remaining)
                  </button>
                </div>
              ` : ''}
            `}
          </main>

        </div>

      </div>
    `;
  }
};
