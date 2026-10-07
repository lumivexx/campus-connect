/**
 * Campus Connect AI - Main Application Controller & Router
 * Ties together state, services, components, and views.
 * Full mobile-first responsive interactions and Section 22 Demo Flow support.
 */

import { store } from './state/store.js';
import { navbar } from './components/navbar.js';
import { toast } from './components/toast.js';
import { modal } from './components/modal.js';
import { openExplainabilityModal } from './components/explainabilityModal.js';

// Import Views
import { landingView } from './views/landingView.js';
import { authView } from './views/authView.js';
import { homeView } from './views/homeView.js';
import { discoveryView } from './views/discoveryView.js';
import { collegeProfileView } from './views/collegeProfileView.js';
import { aiGuideView } from './views/aiGuideView.js';
import { compareView } from './views/compareView.js';
import { communityView } from './views/communityView.js';
import { eventsView } from './views/eventsView.js';
import { savedView } from './views/savedView.js';
import { profileView } from './views/profileView.js';
import { notificationsView } from './views/notificationsView.js';
import { adminView } from './views/adminView.js';

// Services
import { postService } from './services/postService.js';
import { eventService } from './services/eventService.js';
import { authService } from './services/authService.js';
import { aiService } from './services/aiService.js';
import { notificationService } from './services/notificationService.js';
import { mockColleges } from './data/mockColleges.js';

class App {
  constructor() {
    this.appEl = document.getElementById('app');
    this.initRouter();
    this.setupGlobalHandlers();
    this.setupStoreSubscriber();
  }

  initRouter() {
    window.addEventListener('hashchange', () => this.handleRoute());
    // Initial route handling
    if (!window.location.hash) {
      window.location.hash = '#landing';
    } else {
      this.handleRoute();
    }
  }

  parseHash() {
    const raw = window.location.hash.slice(1) || 'landing';
    const [path, queryString] = raw.split('?');
    const params = {};
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }
    return { path, params };
  }

  handleRoute() {
    const { path, params } = this.parseHash();
    store.setRoute(path, params);
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupStoreSubscriber() {
    store.subscribe((state, eventKey) => {
      // Re-render views on state change
      if (['savedColleges', 'compareColleges', 'followedColleges', 'notifications', 'currentUser'].includes(eventKey)) {
        this.render();
      }
    });
  }

  async render() {
    const state = store.getState();
    const currentRoute = state.currentRoute;
    const params = state.routeParams;

    // View content resolver
    let viewContent = '';

    try {
      switch (currentRoute) {
        case 'landing':
          viewContent = landingView.render();
          break;
        case 'auth':
          viewContent = authView.render();
          break;
        case 'home':
          viewContent = homeView.render();
          break;
        case 'discover':
          viewContent = await discoveryView.render();
          break;
        case 'college-profile':
          viewContent = await collegeProfileView.render(params.id || 'skcet');
          break;
        case 'ai-guide':
          viewContent = aiGuideView.render();
          break;
        case 'compare':
          viewContent = await compareView.render();
          break;
        case 'community':
          viewContent = await communityView.render();
          break;
        case 'events':
          viewContent = await eventsView.render();
          break;
        case 'saved':
          viewContent = savedView.render();
          break;
        case 'profile':
          viewContent = profileView.render();
          break;
        case 'notifications':
          viewContent = await notificationsView.render();
          break;
        case 'admin':
          viewContent = adminView.render();
          break;
        default:
          viewContent = landingView.render();
      }
    } catch (err) {
      console.error('Error rendering route:', currentRoute, err);
      viewContent = `
        <div class="page-container empty-state">
          <h2>An error occurred loading this view</h2>
          <p>${err.message}</p>
          <a href="#home" class="btn btn-primary">Return Home</a>
        </div>
      `;
    }

    // Assemble the complete shell:
    // If landing page or auth page, we can show a top header with navigation and full-width layout
    // Otherwise show full dashboard shell (Sidebar on desktop, Top Header, Content, Bottom Nav on mobile)
    const isSpecialLayout = currentRoute === 'landing' || currentRoute === 'auth';

    if (isSpecialLayout) {
      this.appEl.innerHTML = `
        <div style="min-height:100vh; display:flex; flex-direction:column; width:100%;">
          ${navbar.renderTopHeader()}
          <main style="flex:1;">
            ${viewContent}
          </main>
          ${navbar.renderMobileBottomNav()}
        </div>
      `;
    } else {
      this.appEl.innerHTML = `
        ${navbar.renderSidebar()}
        <div class="main-wrapper">
          ${navbar.renderTopHeader()}
          <main>
            ${viewContent}
          </main>
          ${navbar.renderMobileBottomNav()}
        </div>
      `;
    }
  }

  setupGlobalHandlers() {
    // Modal Helpers
    window.closeModal = () => modal.close();

    // Shortlist Toggle
    window.handleSaveToggle = (collegeId) => {
      const saved = store.toggleSaveCollege(collegeId);
      const col = mockColleges.find(c => c.id === collegeId);
      const name = col ? col.shortName : "College";
      toast.show(saved ? `★ Saved ${name} to your shortlist` : `Removed ${name} from shortlist`, saved ? 'success' : 'info');
    };

    // Compare Toggle
    window.handleCompareToggle = (collegeId) => {
      if (store.isInCompare(collegeId)) {
        store.removeFromCompare(collegeId);
        toast.show("Removed from comparison list", "info");
      } else {
        const res = store.addToCompare(collegeId);
        if (res.success) {
          toast.show(res.message, "success");
        } else {
          toast.show(res.message, "warning");
        }
      }
    };

    // Follow Toggle
    window.handleFollowToggle = (collegeId) => {
      const followed = store.toggleFollowCollege(collegeId);
      const col = mockColleges.find(c => c.id === collegeId);
      const name = col ? col.shortName : "College";
      toast.show(followed ? `✓ Following updates from ${name}` : `Unfollowed ${name}`, followed ? 'success' : 'info');
    };

    // Role Switch (Student Mitra vs College Admin)
    window.toggleRole = () => {
      const currentRole = store.getState().currentUser.role;
      const target = currentRole === "student" ? "college_admin" : "student";
      authService.switchRole(target);
      toast.show(target === "college_admin" ? "Switched to College Administrator Mode (SKCET)" : "Switched to Student Mode (Mitra Sundaram)", "success");
      if (target === "college_admin") {
        window.location.hash = "#admin";
      } else {
        window.location.hash = "#home";
      }
    };

    // Global Search
    window.handleGlobalSearch = (query) => {
      if (!query || query.trim() === '') return;
      discoveryView.filters.query = query;
      window.location.hash = '#discover';
    };

    // Discovery Filters & Sorting
    window.handleDiscoverySearch = (query) => {
      discoveryView.filters.query = query;
      discoveryView.page = 1;
      this.render();
    };

    window.handleFilterChange = (key, value) => {
      discoveryView.filters[key] = value;
      discoveryView.page = 1;
      this.render();
    };

    window.handleSortChange = (sortBy) => {
      discoveryView.sortBy = sortBy;
      discoveryView.page = 1;
      this.render();
    };

    window.clearAllFilters = () => {
      discoveryView.filters = {
        query: "",
        course: "all",
        city: "all",
        maxFee: 400000,
        type: "all",
        minRating: 0,
        hostelRequired: false
      };
      discoveryView.page = 1;
      this.render();
      toast.show("Filters cleared", "info");
    };

    window.loadMoreColleges = () => {
      discoveryView.page += 1;
      this.render();
    };

    window.filterByCategory = (category) => {
      discoveryView.filters.query = category;
      window.location.hash = '#discover';
    };

    // College Profile Tab Switcher
    window.switchProfileTab = (tab) => {
      collegeProfileView.activeTab = tab;
      this.render();
    };

    window.viewCourseDetails = (courseId) => {
      toast.show("Course curriculum details loaded below", "info");
    };

    // Compare Screen Handlers
    window.toggleHighlightDifferences = (checked) => {
      compareView.highlightDifferences = checked;
      this.render();
    };

    window.addCollegeToCompare = (collegeId) => {
      const res = store.addToCompare(collegeId);
      if (res.success) {
        toast.show(res.message, "success");
      } else {
        toast.show(res.message, "warning");
      }
    };

    window.removeCollegeFromCompare = (collegeId) => {
      store.removeFromCompare(collegeId);
      toast.show("Removed from comparison", "info");
    };

    window.compareAllSaved = () => {
      const savedIds = Array.from(store.getState().savedCollegeIds).slice(0, 3);
      savedIds.forEach(id => store.addToCompare(id));
      window.location.hash = '#compare';
    };

    // Social Community Handlers
    window.switchCommunityTab = (tab) => {
      communityView.activeTab = tab;
      this.render();
    };

    window.handleLikePost = async (postId) => {
      const updated = await postService.toggleLike(postId);
      if (updated) {
        this.render();
      }
    };

    window.toggleCommentsView = (postId) => {
      const el = document.getElementById(`comments-${postId}`);
      if (el) {
        el.style.display = el.style.display === 'none' ? 'flex' : 'none';
      }
    };

    window.handleAddComment = async (postId) => {
      const input = document.getElementById(`comment-input-${postId}`);
      if (!input || !input.value.trim()) return;
      const text = input.value.trim();
      input.value = '';
      await postService.addComment(postId, text, store.getState().currentUser.name);
      toast.show("Comment posted!", "success");
      this.render();
    };

    window.handleSharePost = (postId) => {
      toast.show("Shareable link copied to clipboard!", "success");
    };

    window.handleReportPost = async (postId) => {
      const res = await postService.reportPost(postId, "Inappropriate content or spam");
      toast.show(res.message, "info");
    };

    window.openCreatePostModal = (collegeId = null) => {
      const user = store.getState().currentUser;
      const html = `
        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Posting as: ${user.name}</label>
            <select id="modal-post-type" class="form-select">
              <option value="Question">Question / TNEA Guidance</option>
              <option value="Student experience">Student Experience / Review</option>
              <option value="Campus update">Campus Life Update</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Post Content</label>
            <textarea id="modal-post-text" class="form-control" rows="4" placeholder="Ask a question about cutoffs, campus culture, hostel, or placements..."></textarea>
          </div>
        </div>
      `;

      modal.open({
        title: "Create Community Post",
        bodyHtml: html,
        footerHtml: `
          <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">Cancel</button>
          <button class="btn btn-primary btn-sm" onclick="window.submitNewPost('${collegeId || ''}')">Publish Post</button>
        `
      });
    };

    window.submitNewPost = async (collegeId) => {
      const type = document.getElementById('modal-post-type').value;
      const content = document.getElementById('modal-post-text').value;
      if (!content || !content.trim()) {
        toast.show("Please write some content for your post", "warning");
        return;
      }

      await postService.createPost({
        content,
        type,
        collegeId: collegeId || null
      });

      modal.close();
      toast.show("Your post has been published to the community!", "success");
      window.location.hash = '#community';
      this.render();
    };

    // Events Handlers
    window.switchEventCategory = (cat) => {
      eventsView.activeCategory = cat;
      this.render();
    };

    window.handleEventSearch = (query) => {
      eventsView.searchQuery = query;
      this.render();
    };

    window.handleRegisterEvent = async (eventId) => {
      const updated = await eventService.toggleRegister(eventId);
      if (updated) {
        toast.show(updated.isRegistered ? `Registered for ${updated.title}! Check confirmation in notifications.` : `Cancelled registration for ${updated.title}`, updated.isRegistered ? 'success' : 'info');
        this.render();
      }
    };

    window.openEventDetails = async (eventId) => {
      const evt = await eventService.getEventById(eventId);
      if (!evt) return;

      const html = `
        <div style="display:flex; flex-direction:column; gap:1rem;">
          <img src="${evt.image}" alt="${evt.title}" style="width:100%; height:200px; object-fit:cover; border-radius:var(--radius-lg);" />
          
          <div>
            <span class="badge badge-match-medium">${evt.type}</span>
            <h2 style="font-size:1.3rem; margin:0.5rem 0 0.25rem;">${evt.title}</h2>
            <div style="font-size:0.85rem; color:var(--slate-500);">Hosted by <strong>${evt.collegeName}</strong></div>
          </div>

          <p style="font-size:0.9rem; color:var(--slate-700); line-height:1.6;">${evt.description}</p>

          <div style="background:var(--slate-50); padding:1rem; border-radius:var(--radius-md); font-size:0.85rem; display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <div><strong>Date:</strong> ${evt.date}</div>
            <div><strong>Time:</strong> ${evt.time}</div>
            <div style="grid-column:span 2;"><strong>Venue:</strong> ${evt.venue}</div>
            <div style="grid-column:span 2;"><strong>Eligibility:</strong> ${evt.eligibility}</div>
            <div style="grid-column:span 2; color:var(--primary-700); font-weight:700;"><strong>Prize Pool:</strong> ${evt.prize}</div>
          </div>
        </div>
      `;

      modal.open({
        title: "Event Details",
        bodyHtml: html,
        footerHtml: `
          <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">Close</button>
          <button class="btn btn-primary btn-sm" onclick="window.handleRegisterEvent('${evt.id}'); window.closeModal();">
            ${evt.isRegistered ? 'Registered ✓' : 'Register Now'}
          </button>
        `
      });
    };

    window.openCreateEventModal = () => {
      const html = `
        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Event Title</label>
            <input type="text" id="new-evt-title" class="form-control" placeholder="e.g. InnoHacks 2026" />
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select id="new-evt-cat" class="form-select">
              <option value="Hackathon">Hackathon</option>
              <option value="Symposium">Symposium</option>
              <option value="Workshop">Workshop</option>
              <option value="Competition">Competition</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Date & Venue</label>
            <input type="date" id="new-evt-date" class="form-control" value="2026-11-15" />
          </div>
          <div class="form-group">
            <label class="form-label">Prize / Cash Award</label>
            <input type="text" id="new-evt-prize" class="form-control" placeholder="₹1,00,000 Cash Pool" />
          </div>
        </div>
      `;

      modal.open({
        title: "Host Campus Event",
        bodyHtml: html,
        footerHtml: `
          <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">Cancel</button>
          <button class="btn btn-primary btn-sm" onclick="window.submitNewEvent()">Publish Event</button>
        `
      });
    };

    window.submitNewEvent = async () => {
      const title = document.getElementById('new-evt-title').value;
      const category = document.getElementById('new-evt-cat').value;
      const date = document.getElementById('new-evt-date').value;
      const prize = document.getElementById('new-evt-prize').value;

      if (!title) {
        toast.show("Please enter an event title", "warning");
        return;
      }

      await eventService.createEvent({
        title,
        category,
        type: category,
        date,
        prize
      });

      modal.close();
      toast.show("Event published to national calendar!", "success");
      window.location.hash = '#events';
      this.render();
    };

    // AI College Guide Conversational Engine Handlers
    window.handleChatInputSubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById('ai-chat-input');
      if (!input || !input.value.trim()) return;
      const val = input.value.trim();
      input.value = '';
      this.processAIChatTurn(val);
    };

    window.handleChatQuickReply = (text) => {
      this.processAIChatTurn(text);
    };

    window.resetAIChat = () => {
      store.setAIChatMessages([]);
      aiGuideView.currentStepIndex = 0;
      aiGuideView.recommendations = null;
      store.setAIRecommendations(null);
      this.render();
      toast.show("Conversation restarted", "info");
    };

    window.fastTrackRecommendations = async () => {
      aiGuideView.isThinking = true;
      this.render();

      const user = store.getState().currentUser;
      const childName = user.childName || "Ananya";
      const score = (user.marks && user.marks.percentage) ? `${user.marks.percentage}%` : "88%";

      const recs = await aiService.generateRecommendations({
        course: user.preferredCourse || "B.E. Computer Science and Engineering",
        score: score,
        location: user.preferredLocation || "Tamil Nadu",
        budget: user.budget?.tier || "Moderate"
      });

      aiGuideView.isThinking = false;
      aiGuideView.recommendations = recs;
      store.setAIRecommendations(recs);
      this.render();

      toast.show(`✨ Generated parent decision recommendations for ${childName} (${score} Cutoff)!`, "success");

      // Auto-scroll to results
      setTimeout(() => {
        const el = document.getElementById('recommendations-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    window.askParentAIQuestion = async (queryOrId) => {
      const item = aiService.parentQuickQuestions.find(q => q.id === queryOrId);
      const promptText = item ? item.prompt : queryOrId;
      if (window.location.hash !== '#ai-guide') {
        window.location.hash = '#ai-guide';
        await new Promise(r => setTimeout(r, 150));
      }
      await this.processAIChatTurn(promptText);
    };

    window.toggleSwitchChild = async (childId = null) => {
      const user = store.getState().currentUser;
      const currentChildId = user.activeChildId || "child-ananya";
      const targetId = childId || (currentChildId === "child-ananya" ? "child-mitra" : "child-ananya");
      const updatedUser = await authService.switchChild(targetId);
      store.updateCurrentUser(updatedUser);
      const childName = updatedUser.childName || "Child";
      toast.show(`Switched active profile to ${childName}`, "success");
      this.render();
    };

    window.moveShortlistCategory = async (collegeId, category) => {
      const updatedUser = await authService.updateShortlistCategory(collegeId, category);
      store.updateCurrentUser(updatedUser);
      const labels = {
        best_fit: "Best Fit",
        good_options: "Good Options",
        backup_options: "Backup Options"
      };
      toast.show(`Moved to ${labels[category] || category}`, "success");
      this.render();
    };

    window.showExplainability = (collegeId) => {
      const recs = aiGuideView.recommendations || store.getState().aiRecommendations;
      if (recs && Array.isArray(recs)) {
        const item = recs.find(r => r.college && r.college.id === collegeId);
        if (item) {
          openExplainabilityModal(item);
          return;
        }
      }
      const college = mockColleges.find(c => c.id === collegeId);
      if (college) {
        openExplainabilityModal({
          college: college,
          matchPercentage: college.id === 'skcet' ? 94 : college.id === 'rec' ? 88 : college.id === 'sairam' ? 85 : 72,
          explainability: {
            academicWeight: 40,
            academicScore: college.id === 'skcet' ? 95 : college.id === 'rec' ? 89 : college.id === 'sairam' ? 94 : 65,
            courseWeight: 25,
            courseScore: 96,
            locationWeight: 20,
            locationScore: college.city === 'Coimbatore' ? 92 : 88,
            budgetWeight: 15,
            budgetScore: college.id === 'psg-tech' ? 75 : 92,
            totalScore: college.id === 'skcet' ? 94 : college.id === 'rec' ? 88 : 85
          }
        });
      }
    };

    // Notifications Handlers
    window.markAllNotificationsRead = async () => {
      await notificationService.markAllAsRead();
      store.updateUnreadNotifs(0);
      toast.show("All notifications marked as read", "info");
      this.render();
    };

    window.handleNotificationClick = async (notifId, actionLink) => {
      await notificationService.markAsRead(notifId);
      store.updateUnreadNotifs(notificationService.getUnreadCount());
      if (actionLink) {
        window.location.hash = actionLink;
      }
    };

    // Profile Edit Handlers
    window.toggleEditProfile = () => {
      profileView.isEditing = !profileView.isEditing;
      this.render();
    };

    window.handleSaveProfileChanges = async (e) => {
      e.preventDefault();
      const course = document.getElementById('pref-course').value;
      const location = document.getElementById('pref-location').value;
      const budgetTier = document.getElementById('pref-budget').value;

      await authService.updateProfile({
        preferredCourse: course,
        preferredLocation: location,
        budget: {
          ...store.getState().currentUser.budget,
          tier: budgetTier
        }
      });

      profileView.isEditing = false;
      toast.show("Profile preferences updated successfully!", "success");
      this.render();
    };

    // Admin View Actions
    window.handleAdminPublishPost = async () => {
      const type = document.getElementById('admin-post-type').value;
      const content = document.getElementById('admin-post-content').value;
      if (!content || !content.trim()) {
        toast.show("Please enter announcement text", "warning");
        return;
      }

      await postService.createPost({
        content,
        type,
        collegeId: "skcet",
        collegeName: "Sri Krishna College of Engg & Tech",
        authorName: "Sri Krishna College of Engg & Tech",
        authorRole: "Verified College",
        isVerified: true
      });

      document.getElementById('admin-post-content').value = '';
      toast.show("Announcement broadcasted live to community!", "success");
    };

    window.handleAdminPublishEvent = async () => {
      const title = document.getElementById('admin-evt-title').value;
      const type = document.getElementById('admin-evt-type').value;
      const prize = document.getElementById('admin-evt-prize').value;
      const seats = document.getElementById('admin-evt-seats').value;

      if (!title) {
        toast.show("Please enter an event title", "warning");
        return;
      }

      await eventService.createEvent({
        title,
        type,
        category: type,
        prize,
        maxSeats: seats,
        collegeId: "skcet",
        collegeName: "Sri Krishna College of Engg & Tech"
      });

      document.getElementById('admin-evt-title').value = '';
      toast.show("Event published to students calendar!", "success");
    };

    // Auth screen tab switcher
    window.switchAuthTab = (tab) => {
      authView.activeTab = tab;
      this.render();
    };

    window.handleLoginForm = async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      try {
        await authService.login(email, password);
        toast.show("Welcome back, Mitra!", "success");
        window.location.hash = "#home";
      } catch (err) {
        toast.show(err.message, "error");
      }
    };

    window.handleSignupForm = async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const classLevel = document.getElementById('signup-class').value;
      const preferredCourse = document.getElementById('signup-course').value;
      const location = document.getElementById('signup-location').value;

      try {
        await authService.signup({ name, email, password, classLevel, preferredCourse, location });
        toast.show("Account created! Let's set up your profile.", "success");
        authView.activeTab = "onboarding";
        authView.onboardingStep = 1;
        this.render();
      } catch (err) {
        toast.show(err.message, "error");
      }
    };

    window.handleForgotReset = () => {
      toast.show("Password reset link has been dispatched to your email.", "info");
      authView.activeTab = "login";
      this.render();
    };

    window.nextOnboardingStep = () => {
      authView.onboardingStep = Math.min(3, authView.onboardingStep + 1);
      this.render();
    };

    window.prevOnboardingStep = () => {
      authView.onboardingStep = Math.max(1, authView.onboardingStep - 1);
      this.render();
    };

    window.finishOnboarding = async () => {
      await authService.completeOnboarding({
        childName: "Ananya Kumar",
        percentage: 88.0,
        cutoff: 176.0,
        preferredCourse: "B.E. Computer Science and Engineering",
        preferredLocation: "Tamil Nadu",
        budgetTier: "Moderate",
        hostelRequired: true
      });
      toast.show("Family Profile Setup Complete! Welcome to Campus Connect AI.", "success");
      window.location.hash = "#home";
    };

    // Guided Demo Tour (Section 22 Flow - Parent Edition)
    window.runGuidedDemoFlow = async () => {
      toast.show("🚀 Launching Parent Decision Evaluation Demo Tour...", "info", 2000);
      
      // Step 1: Navigate to AI Guide
      window.location.hash = "#ai-guide";
      await new Promise(r => setTimeout(r, 600));

      // Step 2: Auto generate recommendations for Ananya (88% CSE)
      await window.fastTrackRecommendations();
      await new Promise(r => setTimeout(r, 1000));

      // Step 3: Toast notification showing the demo steps completed
      toast.show("Demo Flow: Matched SKCET (High Fit) + REC (Good Fit) for Ananya's 176.0 Cutoff!", "success", 4000);
    };
  }

  async processAIChatTurn(userText) {
    const user = store.getState().currentUser;
    const childName = user.childName || "Ananya";
    const messages = store.getState().aiChatMessages || [];
    messages.push({ role: 'user', text: userText });
    store.setAIChatMessages(messages);

    aiGuideView.currentStepIndex += 1;
    aiGuideView.isThinking = true;
    this.render();

    // Scroll chat to bottom
    setTimeout(() => {
      const container = document.getElementById('ai-chat-messages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);

    await new Promise(r => setTimeout(r, 400)); // Simulated thinking

    // Check if user asked one of the parent quick questions or specific topics
    const qLower = userText.toLowerCase();
    let specificReply = null;

    if (qLower.includes("fit my child's marks") || qLower.includes("suitable for ananya") || qLower.includes("88%")) {
      specificReply = `
        <div class="ai-response-structure">
          <div class="ai-res-section">
            <span class="ai-res-heading">Short answer</span>
            <p><strong>Sri Krishna College of Engg & Tech (SKCET, Coimbatore)</strong> and <strong>Rajalakshmi Engineering College (REC, Chennai)</strong> represent your child's strongest realistic targets for B.E. Computer Science.</p>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">Why</span>
            <ul>
              <li>${childName}'s 176.0 cutoff directly aligns with recent closing benchmarks at SKCET (178.5 OC / 175.5 BC).</li>
              <li>REC's TCS-partnered CSBS program closed at 178.0, offering strong industry placement density.</li>
              <li>SSN (193.0) and PSG Tech (194.5) remain competitive aspirational benchmarks.</li>
            </ul>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">What to verify</span>
            <ul>
              <li>Confirm your child's exact community quota rank in the DoTE counselling schedule.</li>
              <li>Review Round 2 allotment lists for specialized computing branches (AI&DS, IT).</li>
            </ul>
          </div>
          <div class="ai-res-next-step">
            <span class="ai-res-heading" style="color:#065F46;">Next step</span>
            <p>Review the 4 Best Fit and Good Option cards refreshed below and add them to your Shortlist.</p>
          </div>
        </div>
      `;
    } else if (qLower.includes("affordable") || qLower.includes("1.8 lakh") || qLower.includes("budget")) {
      specificReply = `
        <div class="ai-response-structure">
          <div class="ai-res-section">
            <span class="ai-res-heading">Short answer</span>
            <p><strong>SKCET Coimbatore</strong> offers government-subsidized autonomous tuition at ~₹1.45L/year, keeping total annual tuition and hostel expenses around <strong>₹1.85L</strong>.</p>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">Why</span>
            <ul>
              <li>State-regulated single-window counselling seats cap tuition fees at transparent autonomous rates.</li>
              <li>On-campus hostel accommodation is ~₹82,000/year inclusive of 4 daily meals, avoiding external PG surges.</li>
              <li>Economical alternatives like Sri Sairam offer similar cost structures around ₹1.65L/year.</li>
            </ul>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">What to verify</span>
            <ul>
              <li>Check whether lab manuals, semester exam fees, and caution deposits are billed separately.</li>
              <li>Inquire about First Graduate scholarship concessions if ${childName} is eligible.</li>
            </ul>
          </div>
          <div class="ai-res-next-step">
            <span class="ai-res-heading" style="color:#065F46;">Next step</span>
            <p>Inspect the Total Cost Breakdown in SKCET's profile Fees tab for estimated 4-year calculations.</p>
          </div>
        </div>
      `;
    } else if (qLower.includes("hostel") || qLower.includes("safe")) {
      specificReply = `
        <div class="ai-response-structure">
          <div class="ai-res-section">
            <span class="ai-res-heading">Short answer</span>
            <p><strong>SKCET Coimbatore</strong> features one of the most structured on-campus residential setups with biometric check-in, resident faculty wardens, and an on-campus clinic.</p>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">Why</span>
            <ul>
              <li>Enclosed 52-acre gated campus with 24/7 security personnel and complete perimeter CCTV coverage.</li>
              <li>Resident wardens stay inside residential wings; evening study hours and weekend leave require parent SMS approval.</li>
              <li>24/7 medical center with resident doctor and tie-ups with Coimbatore specialty hospitals.</li>
            </ul>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">What to verify</span>
            <ul>
              <li>Hostel curfew timings (typically 6:30 PM for residential students) and emergency leave procedures.</li>
              <li>Dining hall water filtration reports and daily vegetarian hygiene standards.</li>
            </ul>
          </div>
          <div class="ai-res-next-step">
            <span class="ai-res-heading" style="color:#065F46;">Next step</span>
            <p>Review the "Hostel, Commute & Safety" tab on SKCET's profile for the campus visit checklist.</p>
          </div>
        </div>
      `;
    } else if (qLower.includes("compare skcet") || (qLower.includes("skcet") && qLower.includes("rec"))) {
      specificReply = `
        <div class="ai-response-structure">
          <div class="ai-res-section">
            <span class="ai-res-heading">Short answer</span>
            <p><strong>SKCET Coimbatore</strong> offers higher cutoff alignment for ${childName} and lower living expenses, while <strong>REC Chennai</strong> offers proximity to the Chennai OMR technology corridor.</p>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">Why</span>
            <ul>
              <li>SKCET has a 93% placement rate with ₹7.8 LPA average package, driven heavily by Zoho, Amazon, and product firms.</li>
              <li>REC has a 90% placement rate with ₹6.8 LPA average package and a curriculum co-developed with TCS.</li>
              <li>Both are autonomous institutions accredited with NAAC 'A' / 'A++'.</li>
            </ul>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">What to verify</span>
            <ul>
              <li>Travel logistics: Coimbatore campus connectivity vs Chennai suburban commute.</li>
              <li>Hostel availability vs daily transport bus network.</li>
            </ul>
          </div>
          <div class="ai-res-next-step">
            <span class="ai-res-heading" style="color:#065F46;">Next step</span>
            <p>Open the side-by-side comparison page to inspect meaningful differences side-by-side.</p>
          </div>
        </div>
      `;
    } else if (qLower.includes("verify before applying") || qLower.includes("checklist")) {
      specificReply = `
        <div class="ai-response-structure">
          <div class="ai-res-section">
            <span class="ai-res-heading">Short answer</span>
            <p>Independently verify autonomous accreditation, all-inclusive 4-year living expenses, verified median salaries, and hostel security before submitting your TNEA choice list.</p>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">Why</span>
            <ul>
              <li>Tuition quotes often omit hostel room rent, mess fees, and autonomous exam fees.</li>
              <li>Placement brochures frequently highlight outlier packages rather than the median salary.</li>
              <li>Seat allotments depend strictly on choice list sequence during single-window counselling.</li>
            </ul>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">What to verify</span>
            <ul>
              <li>Request the official audited 5-year NIRF institutional placement data.</li>
              <li>Confirm residential warden oversight and female student curfew protocols.</li>
              <li>Ensure your choice list includes at least 2 safe backup options.</li>
            </ul>
          </div>
          <div class="ai-res-next-step">
            <span class="ai-res-heading" style="color:#065F46;">Next step</span>
            <p>Use the Parent Decision Checklist provided on every college profile before final choice locking.</p>
          </div>
        </div>
      `;
    } else if (qLower.includes("backup") || qLower.includes("safe")) {
      specificReply = `
        <div class="ai-response-structure">
          <div class="ai-res-section">
            <span class="ai-res-heading">Short answer</span>
            <p>Keep <strong>Sri Sairam Engineering College</strong> (Chennai) and <strong>Bannari Amman Institute of Technology</strong> (BIT) as high-probability, high-comfort backup options.</p>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">Why</span>
            <ul>
              <li>Sairam's CSE historical cutoff sits at 174.5, providing a safe 1.5-mark buffer below ${childName}'s 176.0 score.</li>
              <li>BIT offers extensive tech incubation infrastructure with comfortable cutoff breathing room.</li>
              <li>Both institutions boast verified 85%+ campus placement records and safe hostels.</li>
            </ul>
          </div>
          <div class="ai-res-section">
            <span class="ai-res-heading">What to verify</span>
            <ul>
              <li>Commute preferences: Sathyamangalam residential living vs Chennai suburban commute.</li>
              <li>Seat intake across core CSE vs allied IT/AI branches.</li>
            </ul>
          </div>
          <div class="ai-res-next-step">
            <span class="ai-res-heading" style="color:#065F46;">Next step</span>
            <p>Move Sairam to the "BACKUP OPTIONS" tier in your Shortlist workspace.</p>
          </div>
        </div>
      `;
    }

    aiGuideView.isThinking = false;

    if (specificReply) {
      messages.push({
        role: 'bot',
        text: specificReply,
        presets: ["Compare SKCET vs REC", "What should parents verify before applying?", "Show all recommendations"]
      });
      store.setAIChatMessages(messages);

      // Auto generate/ensure recommendations are ready
      const recs = await aiService.generateRecommendations({
        course: user.preferredCourse || "B.E. Computer Science and Engineering",
        score: "88%",
        location: "Tamil Nadu",
        budget: "Moderate"
      });
      aiGuideView.recommendations = recs;
      store.setAIRecommendations(recs);
      this.render();

      setTimeout(() => {
        const el = document.getElementById('recommendations-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    const stepIndex = aiGuideView.currentStepIndex;
    if (stepIndex < aiService.conversationSteps.length) {
      const nextStep = aiService.conversationSteps[stepIndex];
      messages.push({
        role: 'bot',
        text: nextStep.question,
        presets: nextStep.presets
      });
      store.setAIChatMessages(messages);
      this.render();
    } else {
      // Completed all steps! Generate recommendations
      messages.push({
        role: 'bot',
        text: `Thank you, Ravi! I have analyzed ${childName}'s 88% score (TNEA Cutoff 176.0) against verified DoTE counselling seat allotments and your family's preferences. Here are your personalized parent recommendation tiers below:`,
        presets: []
      });
      store.setAIChatMessages(messages);

      const recs = await aiService.generateRecommendations({
        course: user.preferredCourse || "B.E. Computer Science and Engineering",
        score: "88%",
        location: user.preferredLocation || "Tamil Nadu",
        budget: user.budget?.tier || "Moderate"
      });

      aiGuideView.recommendations = recs;
      store.setAIRecommendations(recs);
      this.render();

      toast.show(`Recommendations generated for ${childName}!`, "success");

      setTimeout(() => {
        const el = document.getElementById('recommendations-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
