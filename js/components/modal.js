/**
 * Modal Manager
 * Mounts and unmounts accessible popup dialogs.
 */

class ModalManager {
  constructor() {
    this.overlay = null;
    this.ensureOverlay();
  }

  ensureOverlay() {
    if (!this.overlay) {
      let el = document.getElementById("global-modal-overlay");
      if (!el) {
        el = document.createElement("div");
        el.id = "global-modal-overlay";
        el.className = "modal-overlay";
        el.innerHTML = `
          <div class="modal-container" id="global-modal-container">
            <div class="modal-header">
              <h3 class="modal-title" id="global-modal-title">Modal Title</h3>
              <button class="modal-close" id="global-modal-close" aria-label="Close modal">✕</button>
            </div>
            <div class="modal-body" id="global-modal-body"></div>
            <div class="modal-footer" id="global-modal-footer"></div>
          </div>
        `;
        document.body.appendChild(el);

        // Backdrop click to close
        el.addEventListener("click", (e) => {
          if (e.target === el) this.close();
        });

        // Close button
        el.querySelector("#global-modal-close").addEventListener("click", () => {
          this.close();
        });

        // ESC key to close
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && el.classList.contains("active")) {
            this.close();
          }
        });
      }
      this.overlay = el;
    }
  }

  open({ title, bodyHtml, footerHtml = "", maxWidth = "600px" }) {
    this.ensureOverlay();

    const titleEl = document.getElementById("global-modal-title");
    const bodyEl = document.getElementById("global-modal-body");
    const footerEl = document.getElementById("global-modal-footer");
    const containerEl = document.getElementById("global-modal-container");

    if (containerEl) containerEl.style.maxWidth = maxWidth;
    if (titleEl) titleEl.innerText = title;
    if (bodyEl) bodyEl.innerHTML = bodyHtml;

    if (footerEl) {
      if (footerHtml) {
        footerEl.innerHTML = footerHtml;
        footerEl.style.display = "flex";
      } else {
        footerEl.innerHTML = "";
        footerEl.style.display = "none";
      }
    }

    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    if (this.overlay) {
      this.overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}

export const modal = new ModalManager();
