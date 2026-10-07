/**
 * Social / Community Feed View
 * College & student campus feed with rich post types, likes, comments, and sharing.
 */

import { postService } from '../services/postService.js';
import { store } from '../state/store.js';

export const communityView = {
  activeTab: "all", // 'all', 'following', 'trending', 'colleges', 'students', 'alumni'

  async render() {
    const posts = await postService.getPosts(this.activeTab);
    const user = store.getState().currentUser;

    return `
      <div class="page-container">
        
        <div class="community-container">
          
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700; color:var(--primary-700); margin-bottom:0.35rem;">
                Supporting Evidence & Real Voices
              </div>
              <h1 style="font-size:1.85rem; font-weight:800; color:var(--slate-900); margin-bottom:0.25rem;">
                Student & Alumni Experiences
              </h1>
              <p style="font-size:1rem; color:var(--slate-600); margin:0;">
                What do students and alumni actually experience here? Authentic perspectives on teaching, hostel safety, and placement reality.
              </p>
            </div>

            <button class="btn btn-primary btn-sm" onclick="window.openCreatePostModal()">
              ✍️ Create Post
            </button>
          </div>

          <!-- Feed Tabs -->
          <nav class="tab-nav">
            <button class="tab-item ${this.activeTab === 'all' ? 'active' : ''}" onclick="window.switchCommunityTab('all')">
              All Updates
            </button>
            <button class="tab-item ${this.activeTab === 'following' ? 'active' : ''}" onclick="window.switchCommunityTab('following')">
              Following
            </button>
            <button class="tab-item ${this.activeTab === 'trending' ? 'active' : ''}" onclick="window.switchCommunityTab('trending')">
              🔥 Trending
            </button>
            <button class="tab-item ${this.activeTab === 'colleges' ? 'active' : ''}" onclick="window.switchCommunityTab('colleges')">
              Colleges
            </button>
            <button class="tab-item ${this.activeTab === 'students' ? 'active' : ''}" onclick="window.switchCommunityTab('students')">
              Students
            </button>
            <button class="tab-item ${this.activeTab === 'alumni' ? 'active' : ''}" onclick="window.switchCommunityTab('alumni')">
              Alumni
            </button>
          </nav>

          <!-- Quick Post Trigger Box -->
          <div class="create-post-card">
            <img src="${user.avatar}" class="avatar-img" alt="${user.name}" />
            <div class="post-trigger-input" onclick="window.openCreatePostModal()">
              Share a question about cutoffs, campus life, or placements, ${user.name.split(' ')[0]}...
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.openCreatePostModal()">
              Post
            </button>
          </div>

          <!-- Posts Feed -->
          <div style="display:flex; flex-direction:column; gap:1.5rem;">
            ${posts.length === 0 ? `
              <div class="card empty-state">
                <p>No community updates under this filter.</p>
              </div>
            ` : posts.map(post => `
              <article class="post-card" id="post-${post.id}">
                <div class="post-author-row">
                  <div class="post-author-info">
                    <img src="${post.authorAvatar}" class="avatar-img" alt="${post.authorName}" />
                    <div>
                      <div class="post-author-name">
                        <span>${post.authorName}</span>
                        ${post.isVerified ? `
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="#059669"><circle cx="12" cy="12" r="10" fill="#059669"/><polyline points="9 12 11 14 15 10" stroke="#fff" stroke-width="2"/></svg>
                        ` : ''}
                      </div>
                      <div class="post-author-sub">
                        ${post.collegeName ? `<a href="#college-profile?id=${post.collegeId}">${post.collegeName}</a> • ` : ''}
                        <span>${post.authorRole}</span> • <span>${post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <span class="badge badge-tag">${post.type}</span>
                </div>

                <div class="post-content-text">${post.content}</div>

                ${post.image ? `
                  <img src="${post.image}" class="post-media-img" alt="Community media update" loading="lazy" />
                ` : ''}

                <!-- Engagement Bar -->
                <div class="post-engagement-bar">
                  <div style="display:flex; gap:0.5rem;">
                    <button class="engagement-btn ${post.likedByMe ? 'active-liked' : ''}" onclick="window.handleLikePost('${post.id}')">
                      <span>${post.likedByMe ? '❤️' : '🤍'}</span>
                      <span>${post.likes}</span>
                    </button>

                    <button class="engagement-btn" onclick="window.toggleCommentsView('${post.id}')">
                      <span>💬</span>
                      <span>${post.commentsCount || 0}</span>
                    </button>

                    <button class="engagement-btn" onclick="window.handleSharePost('${post.id}')">
                      <span>↗️</span>
                      <span>Share</span>
                    </button>
                  </div>

                  <button class="btn btn-ghost btn-sm" style="font-size:0.75rem; color:var(--slate-400);" onclick="window.handleReportPost('${post.id}')">
                    Report
                  </button>
                </div>

                <!-- Inline Comments Thread (if any) -->
                <div class="comments-thread" id="comments-${post.id}" style="${post.comments && post.comments.length > 0 ? 'display:flex;' : 'display:none;'}">
                  ${(post.comments || []).map(c => `
                    <div class="comment-bubble">
                      <div style="font-weight:700; color:var(--slate-800); font-size:0.8rem; margin-bottom:2px;">
                        ${c.author} <span style="font-weight:400; color:var(--slate-400); font-size:0.75rem;">• ${c.time}</span>
                      </div>
                      <div style="color:var(--slate-700);">${c.text}</div>
                    </div>
                  `).join('')}

                  <!-- Add comment input -->
                  <div style="display:flex; gap:0.5rem; margin-top:0.35rem;">
                    <input 
                      type="text" 
                      id="comment-input-${post.id}" 
                      class="form-control" 
                      style="font-size:0.85rem; padding:0.45rem 0.75rem;" 
                      placeholder="Write a reply as Mitra..." 
                      onkeydown="if(event.key==='Enter') window.handleAddComment('${post.id}')"
                    />
                    <button class="btn btn-primary btn-sm" onclick="window.handleAddComment('${post.id}')">
                      Reply
                    </button>
                  </div>
                </div>

              </article>
            `).join('')}
          </div>

        </div>

      </div>
    `;
  }
};
