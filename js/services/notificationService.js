/**
 * Notification Service
 * Manages admission deadline alerts, campus updates, and AI guidance tips.
 */

import { mockNotifications } from '../data/mockStudents.js';
import { api } from './api.js';

export const notificationService = {
  getNotificationsCache() {
    let notifs = api.getStorage("notifications");
    if (!notifs) {
      notifs = [...mockNotifications];
      api.setStorage("notifications", notifs);
    }
    return notifs;
  },

  async getNotifications() {
    await api.delay(100);
    return this.getNotificationsCache();
  },

  async markAsRead(id) {
    await api.delay(60);
    const notifs = this.getNotificationsCache();
    const item = notifs.find(n => n.id === id);
    if (item) {
      item.read = true;
      api.setStorage("notifications", notifs);
    }
    return notifs;
  },

  async markAllAsRead() {
    await api.delay(100);
    const notifs = this.getNotificationsCache().map(n => ({ ...n, read: true }));
    api.setStorage("notifications", notifs);
    return notifs;
  },

  getUnreadCount() {
    const notifs = this.getNotificationsCache();
    return notifs.filter(n => !n.read).length;
  }
};
