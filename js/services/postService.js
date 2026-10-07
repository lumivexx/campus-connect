/**
 * Community Post Service
 * Handles social feed interactions: tab filtering, liking, commenting,
 * creating posts as Mitra or College Admin, and reporting posts.
 */

import { mockPosts } from '../data/mockPosts.js';
import { api } from './api.js';

export const postService = {
  getPostsCache() {
    let posts = api.getStorage("posts");
    if (!posts || posts.length === 0) {
      posts = [...mockPosts];
      api.setStorage("posts", posts);
    }
    return posts;
  },

  async getPosts(filterTab = "all", collegeFilter = null) {
    await api.delay(180);
    let posts = this.getPostsCache();

    if (collegeFilter) {
      posts = posts.filter(p => p.collegeId === collegeFilter);
    }

    if (filterTab === "following") {
      // Colleges followed by student: skcet, psg-tech
      posts = posts.filter(p => ["skcet", "psg-tech"].includes(p.collegeId) || p.authorRole.includes("Alumni"));
    } else if (filterTab === "colleges") {
      posts = posts.filter(p => p.authorRole.includes("College") || p.authorRole.includes("Department"));
    } else if (filterTab === "students") {
      posts = posts.filter(p => p.authorRole.includes("Student") || p.authorRole.includes("Aspirant"));
    } else if (filterTab === "alumni") {
      posts = posts.filter(p => p.authorRole.includes("Alumni"));
    } else if (filterTab === "trending") {
      posts = [...posts].sort((a, b) => b.likes - a.likes);
    }

    return posts;
  },

  async toggleLike(postId) {
    await api.delay(80);
    const posts = this.getPostsCache();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    if (post.likedByMe) {
      post.likedByMe = false;
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedByMe = true;
      post.likes += 1;
    }

    api.setStorage("posts", posts);
    return post;
  },

  async addComment(postId, commentText, authorName = "Mitra Sundaram") {
    await api.delay(120);
    const posts = this.getPostsCache();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    const newComment = {
      id: "c-" + Date.now(),
      author: authorName,
      text: commentText,
      time: "Just now"
    };

    if (!post.comments) post.comments = [];
    post.comments.unshift(newComment);
    post.commentsCount = post.comments.length;

    api.setStorage("posts", posts);
    return post;
  },

  async createPost(postData) {
    await api.delay(200);
    const posts = this.getPostsCache();

    const newPost = {
      id: "post-" + Date.now(),
      authorName: postData.authorName || "Mitra Sundaram",
      authorRole: postData.authorRole || "Class 12 Aspirant (88%)",
      authorHandle: postData.authorHandle || "@mitra_tech",
      authorAvatar: postData.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      collegeId: postData.collegeId || null,
      collegeName: postData.collegeName || null,
      isVerified: postData.isVerified || false,
      type: postData.type || "Question",
      tag: postData.tag || "Campus Life",
      createdAt: "Just now",
      timestamp: new Date().toISOString(),
      content: postData.content,
      image: postData.image || null,
      likes: 0,
      likedByMe: false,
      commentsCount: 0,
      comments: [],
      sharesCount: 0
    };

    posts.unshift(newPost);
    api.setStorage("posts", posts);
    return newPost;
  },

  async reportPost(postId, reason) {
    await api.delay(100);
    return { success: true, message: `Post reported for: ${reason}. Our moderators will review it.` };
  }
};
