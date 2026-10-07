/**
 * Toast Component
 * Displays lightweight, animated feedback notifications.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.ensureContainer();
  }

  ensureContainer() {
    if (!this.container) {
      let el = document.getElementById("toast-container");
      if (!el) {
        el = document.createElement("div");
        el.id = "toast-container";
        el.className = "toast-container";
        document.body.appendChild(el);
      }
      this.container = el;
    }
  }

  show(message, type = "info", duration = 3500) {
    this.ensureContainer();

    const toast = document.createElement("div");
    toast.className = `toast-card ${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "warning") icon = "⚠️";
    if (type === "error") icon = "❌";

    toast.innerHTML = `
      <span>${icon}</span>
      <div style="flex:1">${message}</div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 250ms ease";
      setTimeout(() => {
        toast.remove();
      }, 250);
    }, duration);
  }
}

export const toast = new ToastManager();
