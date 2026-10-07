/**
 * Notifications Center View
 * Campus Connect AI
 */

import { notificationService } from '../services/notificationService.js';
import { store } from '../state/store.js';

export const notificationsView = {
  async render() {
    const notifs = await notificationService.getNotifications();
    const unreadCount = store.getState().unreadNotifs;

    return `
      <div class="page-container">
        
        <div class="notifications-container">
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <h1 style="font-size:1.85rem; margin-bottom:0.25rem;">Notifications</h1>
              <p style="font-size:0.9rem; color:var(--slate-600);">
                Admission announcements, deadlines & college updates.
              </p>
            </div>

            ${unreadCount > 0 ? `
              <button class="btn btn-secondary btn-sm" onclick="window.markAllNotificationsRead()">
                Mark all as read (${unreadCount})
              </button>
            ` : ''}
          </div>

          <div style="display:flex; flex-direction:column; gap:0.85rem;">
            ${notifs.map(n => `
              <div 
                class="notif-card ${!n.read ? 'unread' : ''}" 
                onclick="window.handleNotificationClick('${n.id}', '${n.actionLink}')" 
                style="cursor:pointer;"
              >
                <div class="notif-icon-box">
                  ${n.type === 'event' ? '📅' : ''}
                  ${n.type === 'admission' ? '📢' : ''}
                  ${n.type === 'college' ? '🏛️' : ''}
                  ${n.type === 'ai' ? '🤖' : ''}
                  ${n.type === 'deadline' ? '⏰' : ''}
                </div>

                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.25rem;">
                    <div style="font-weight:700; color:var(--slate-900); font-size:0.95rem;">${n.title}</div>
                    <span style="font-size:0.75rem; color:var(--slate-400);">${n.timestamp}</span>
                  </div>
                  <p style="font-size:0.875rem; color:var(--slate-600); margin:0;">${n.message}</p>
                </div>
              </div>
            `).join('')}
          </div>

        </div>

      </div>
    `;
  }
};
