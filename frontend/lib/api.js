import apiClient from './config/axios';

const api = {
  fetchPosts: async () => {
    const { data } = await apiClient.get('/posts');
    return data;
  },

  fetchPost: async (slug) => {
    const { data } = await apiClient.get(`/posts/${slug}`);
    return data;
  },

  fetchRelatedPosts: async (slug) => {
    try {
      const { data } = await apiClient.get(`/posts/${slug}/related`);
      return data;
    } catch (err) {
      console.error(`Error fetching related posts for ${slug}:`, err);
      return [];
    }
  },

  fetchComments: async (slug) => {
    try {
      const { data } = await apiClient.get(`/posts/${slug}/comments`);
      return data;
    } catch (err) {
      console.error(`Error fetching comments for ${slug}:`, err);
      return [];
    }
  },

  postComment: async (slug, commentData) => {
    const { data } = await apiClient.post(`/posts/${slug}/comments`, commentData);
    return data;
  },

  fetchGuides: async () => {
    try {
      const { data } = await apiClient.get('/posts/guides/all');
      return data;
    } catch (err) {
      console.error('Error fetching guides:', err);
      return [];
    }
  },
};

export default api;
