/**
 * Auth & Onboarding View
 * Supports Login, Signup, Forgot Password, and 3-Step Family Onboarding.
 * Campus Connect AI - Parent-First College Decision Experience
 */

import { authService } from '../services/authService.js';
import { store } from '../state/store.js';
import { toast } from '../components/toast.js';

export const authView = {
  activeTab: "login", // 'login', 'signup', 'forgot', 'onboarding'
  onboardingStep: 1,

  onboardingData: {
    childName: "Ananya Kumar",
    percentage: "88.0",
    cutoff: "176.0",
    preferredCourse: "B.E. Computer Science and Engineering",
    preferredLocation: "Tamil Nadu",
    budgetTier: "Moderate",
    maxAnnualFee: 200000,
    hostelRequired: true
  },

  render() {
    const routeParams = store.getState().routeParams;
    if (routeParams && routeParams.tab) {
      this.activeTab = routeParams.tab;
    }

    return `
      <div class="page-container" style="display:flex; justify-content:center; align-items:center; min-height:75vh;">
        <div style="max-width:520px; width:100%;">
          
          <div style="text-align:center; margin-bottom:1.5rem;">
            <div class="brand-logo" style="margin: 0 auto 0.75rem; width:48px; height:48px; font-size:1.35rem; background:linear-gradient(135deg, #1E3A8A, #1D4ED8);">CC</div>
            <h1 style="font-size:1.75rem; font-weight:800; color:var(--slate-900);">Campus Connect AI</h1>
            <p style="font-size:0.9rem; color:var(--slate-600);">Empowering families to make confident college decisions</p>
          </div>

          <div class="card" style="padding:2rem;">
            ${this.activeTab === 'login' ? this.renderLogin() : ''}
            ${this.activeTab === 'signup' ? this.renderSignup() : ''}
            ${this.activeTab === 'forgot' ? this.renderForgotPassword() : ''}
            ${this.activeTab === 'onboarding' ? this.renderOnboarding() : ''}
          </div>

          <div style="text-align:center; margin-top:1.5rem;">
            <a href="#home" style="font-size:0.875rem; color:var(--slate-600); font-weight:600;">← Return to Family Dashboard</a>
          </div>

        </div>
      </div>
    `;
  },

  renderLogin() {
    return `
      <div>
        <h2 style="font-size:1.35rem; margin-bottom:0.25rem;">Parent & Family Sign In</h2>
        <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.5rem;">Access your child's shortlist, verified cutoffs & AI guidance</p>

        <form id="login-form" onsubmit="window.handleLoginForm(event)">
          <div class="form-group">
            <label class="form-label">Parent Email Address</label>
            <input type="email" id="login-email" class="form-control" required value="ravi.kumar@example.com" placeholder="parent@domain.com" />
          </div>

          <div class="form-group">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label class="form-label">Password</label>
              <a href="javascript:void(0)" onclick="window.switchAuthTab('forgot')" style="font-size:0.8rem; font-weight:600;">Forgot?</a>
            </div>
            <input type="password" id="login-password" class="form-control" required value="Demo@12345" placeholder="••••••••" />
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.75rem; margin-top:0.5rem;">
            Sign In to Family Dashboard
          </button>
        </form>

        <div style="margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid var(--slate-100); text-align:center; font-size:0.875rem; color:var(--slate-600);">
          First time navigating admissions? 
          <a href="javascript:void(0)" onclick="window.switchAuthTab('signup')" style="font-weight:700;">Create Family Profile</a>
        </div>
      </div>
    `;
  },

  renderSignup() {
    return `
      <div>
        <h2 style="font-size:1.35rem; margin-bottom:0.25rem;">Create Family Account</h2>
        <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.5rem;">Set up your child's profile for personalized cutoff matching</p>

        <form id="signup-form" onsubmit="window.handleSignupForm(event)">
          <div class="form-group">
            <label class="form-label">Parent / Guardian Name</label>
            <input type="text" id="signup-name" class="form-control" required value="Ravi Kumar" placeholder="e.g. Ravi Kumar" />
          </div>

          <div class="form-group">
            <label class="form-label">Parent Email Address</label>
            <input type="email" id="signup-email" class="form-control" required value="ravi.kumar@example.com" placeholder="ravi.kumar@example.com" />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="signup-password" class="form-control" required value="Secret123" placeholder="••••••••" />
          </div>

          <div class="form-group">
            <label class="form-label">Child's Education Status</label>
            <select id="signup-class" class="form-select">
              <option value="Class 12 Completed" selected>Class 12 Completed (2025/2026 Batch)</option>
              <option value="Class 12 Appearing">Class 12 Appearing</option>
              <option value="Polytechnic Diploma">Polytechnic Diploma (Lateral Entry)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Target Degree Program</label>
            <select id="signup-course" class="form-select">
              <option value="B.E. Computer Science and Engineering" selected>B.E. Computer Science and Engineering</option>
              <option value="B.Tech Artificial Intelligence & Data Science">B.Tech Artificial Intelligence & Data Science</option>
              <option value="B.Tech Information Technology">B.Tech Information Technology</option>
              <option value="B.E. Electronics & Communication">B.E. Electronics & Communication</option>
              <option value="B.E. Mechanical Engineering">B.E. Mechanical Engineering</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Preferred Location / State</label>
            <input type="text" id="signup-location" class="form-control" value="Tamil Nadu (Coimbatore / Chennai)" placeholder="e.g. Tamil Nadu" />
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.75rem; margin-top:0.5rem;">
            Create Account & Continue →
          </button>
        </form>

        <div style="margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid var(--slate-100); text-align:center; font-size:0.875rem; color:var(--slate-600);">
          Already have an account? 
          <a href="javascript:void(0)" onclick="window.switchAuthTab('login')" style="font-weight:700;">Sign In</a>
        </div>
      </div>
    `;
  },

  renderForgotPassword() {
    return `
      <div>
        <h2 style="font-size:1.35rem; margin-bottom:0.25rem;">Reset Password</h2>
        <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.5rem;">Enter your email to receive a password reset instructions</p>

        <form onsubmit="event.preventDefault(); window.handleForgotReset();">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="forgot-email" class="form-control" required value="ravi.kumar@example.com" />
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.75rem; margin-top:0.5rem;">
            Send Reset Instructions
          </button>
        </form>

        <div style="margin-top:1.5rem; text-align:center;">
          <a href="javascript:void(0)" onclick="window.switchAuthTab('login')" style="font-size:0.875rem; font-weight:600;">← Back to Sign In</a>
        </div>
      </div>
    `;
  },

  renderOnboarding() {
    const step = this.onboardingStep;

    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <div>
            <span class="badge badge-ai">Step ${step} of 3</span>
            <h2 style="font-size:1.25rem; margin-top:0.25rem;">Child Profile Setup</h2>
          </div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--primary-600);">${Math.round((step / 3) * 100)}% Complete</div>
        </div>

        ${step === 1 ? `
          <div>
            <h3 style="font-size:1.05rem; margin-bottom:0.35rem;">1. Child's Academic Scores</h3>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.25rem;">Marks are benchmarked against 10 years of DoTE TNEA cutoff data</p>

            <div class="form-group" style="margin-bottom:0.75rem;">
              <label class="form-label">Child's Name</label>
              <input type="text" id="ob-childname" class="form-control" value="${this.onboardingData.childName}" />
            </div>

            <div class="form-group" style="margin-bottom:0.75rem;">
              <label class="form-label">Class 12 Overall Percentage (%)</label>
              <input type="number" id="ob-percentage" class="form-control" step="0.1" value="${this.onboardingData.percentage}" />
            </div>

            <div class="form-group">
              <label class="form-label">TNEA Equivalent Cutoff (Out of 200)</label>
              <input type="number" id="ob-cutoff" class="form-control" step="0.5" value="${this.onboardingData.cutoff}" />
              <span style="font-size:0.75rem; color:var(--slate-500);">Calculated as: Maths (100) + Physics (50) + Chemistry (50)</span>
            </div>

            <button type="button" class="btn btn-primary" style="width:100%; margin-top:1rem;" onclick="window.nextOnboardingStep()">
              Next: Preferences →
            </button>
          </div>
        ` : ''}

        ${step === 2 ? `
          <div>
            <h3 style="font-size:1.05rem; margin-bottom:0.35rem;">2. Target Branch & Campus Location</h3>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.25rem;">Which branches and geographic regions are preferred?</p>

            <div class="form-group" style="margin-bottom:0.75rem;">
              <label class="form-label">Preferred Degree Program</label>
              <select id="ob-course" class="form-select">
                <option value="B.E. Computer Science and Engineering" selected>B.E. Computer Science and Engineering</option>
                <option value="B.Tech Artificial Intelligence and Data Science">B.Tech Artificial Intelligence and Data Science</option>
                <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                <option value="B.E. Electronics and Communication">B.E. Electronics and Communication</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Preferred Region</label>
              <select id="ob-location" class="form-select">
                <option value="Tamil Nadu (Coimbatore / Chennai)" selected>Tamil Nadu (Coimbatore / Chennai)</option>
                <option value="Coimbatore Hub">Coimbatore Region</option>
                <option value="Chennai IT Corridor">Chennai Region</option>
                <option value="Madurai / Southern TN">Madurai / Southern TN</option>
              </select>
            </div>

            <div style="display:flex; gap:0.75rem; margin-top:1rem;">
              <button type="button" class="btn btn-secondary" style="flex:1" onclick="window.prevOnboardingStep()">Back</button>
              <button type="button" class="btn btn-primary" style="flex:2" onclick="window.nextOnboardingStep()">Next: Budget & Hostel →</button>
            </div>
          </div>
        ` : ''}

        ${step === 3 ? `
          <div>
            <h3 style="font-size:1.05rem; margin-bottom:0.35rem;">3. Family Budget & Hostel Safety</h3>
            <p style="font-size:0.85rem; color:var(--slate-500); margin-bottom:1.25rem;">Align financial boundaries and living accommodations</p>

            <div class="form-group" style="margin-bottom:0.75rem;">
              <label class="form-label">Annual Tuition Budget Tier</label>
              <select id="ob-budget" class="form-select">
                <option value="Moderate" selected>Moderate (₹1.50 L - 2.00 L / year)</option>
                <option value="Low">Govt Subsidized (< ₹1.00 L / year)</option>
                <option value="Flexible">Flexible (Up to ₹2.50 L / year)</option>
              </select>
            </div>

            <div style="display:flex; align-items:center; gap:0.75rem; background:var(--slate-50); padding:0.85rem; border-radius:var(--radius-md); margin-bottom:1.25rem; border:1px solid var(--slate-200);">
              <input type="checkbox" id="ob-hostel" checked style="width:18px; height:18px; accent-color:var(--primary-600);" />
              <label for="ob-hostel" style="font-size:0.875rem; font-weight:600; cursor:pointer;">
                Require Safe On-Campus Hostel Accommodation
              </label>
            </div>

            <div style="display:flex; gap:0.75rem;">
              <button type="button" class="btn btn-secondary" style="flex:1" onclick="window.prevOnboardingStep()">Back</button>
              <button type="button" class="btn btn-primary" style="flex:2" onclick="window.finishOnboarding()">
                Complete & Go to Dashboard 🎉
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }
};
