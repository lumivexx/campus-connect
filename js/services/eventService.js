/**
 * Event Service
 * Manages upcoming hackathons, symposiums, workshops, and registrations.
 */

import { mockEvents } from '../data/mockEvents.js';
import { api } from './api.js';

export const eventService = {
  getEventsCache() {
    let events = api.getStorage("events");
    if (!events || events.length === 0) {
      events = [...mockEvents];
      api.setStorage("events", events);
    }
    return events;
  },

  async getEvents(category = "all", collegeFilter = null, searchQuery = "") {
    await api.delay(180);
    let events = this.getEventsCache();

    if (collegeFilter) {
      events = events.filter(e => e.collegeId === collegeFilter);
    }

    if (category && category !== "all") {
      events = events.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      events = events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.collegeName.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return events;
  },

  async getEventById(id) {
    await api.delay(100);
    const events = this.getEventsCache();
    return events.find(e => e.id === id) || null;
  },

  async toggleRegister(eventId) {
    await api.delay(120);
    const events = this.getEventsCache();
    const event = events.find(e => e.id === eventId);
    if (!event) return null;

    if (event.isRegistered) {
      event.isRegistered = false;
      event.registeredCount = Math.max(0, event.registeredCount - 1);
    } else {
      event.isRegistered = true;
      event.registeredCount += 1;
    }

    api.setStorage("events", events);
    return event;
  },

  async createEvent(eventData) {
    await api.delay(200);
    const events = this.getEventsCache();
    const newEvent = {
      id: "evt-" + Date.now(),
      collegeId: eventData.collegeId || "skcet",
      collegeName: eventData.collegeName || "Sri Krishna College of Engg & Tech",
      title: eventData.title,
      type: eventData.type || "Workshop",
      category: eventData.category || "Workshop",
      date: eventData.date || "2026-11-10",
      time: eventData.time || "10:00 AM IST",
      venue: eventData.venue || "Campus Auditorium",
      eligibility: eventData.eligibility || "All engineering students",
      registrationDeadline: eventData.registrationDeadline || "2026-11-05",
      prize: eventData.prize || "Certificates & Goodies",
      registeredCount: 0,
      maxSeats: parseInt(eventData.maxSeats) || 200,
      isRegistered: false,
      image: eventData.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80",
      description: eventData.description || "Official campus event hosted on Campus Connect AI.",
      tags: [eventData.category || "Campus", "Event"],
      contactEmail: eventData.contactEmail || "events@campus.edu"
    };

    events.unshift(newEvent);
    api.setStorage("events", events);
    return newEvent;
  }
};
