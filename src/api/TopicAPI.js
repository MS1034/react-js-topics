import { api } from "./configs/AxiosConfigs"

export const TopicAPI = {
    get: async (visibility = true) => {
        try {
            const response = await api.get(`/items?visibility=${visibility}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch topics: ' + error.message, error);
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/items/${id}`);
            return response.data;
        } catch (error) {
            handleAPIError(`Failed to fetch topic with id ${id}`, error);
        }
    },

    create: async (topicData) => {
        try {
            const response = await api.post('/items', topicData);
            return response.data;
        } catch (error) {
            handleAPIError('Failed to create new topic', error);
        }
    },

    update: async (id, topicData) => {
        try {
            const response = await api.put(`/items/${id}`, topicData);
            return response.data;
        } catch (error) {
            handleAPIError(`Failed to update topic with id ${id}`, error);
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/items/${id}`);
            return response.data;
        } catch (error) {
            handleAPIError(`Failed to delete topic with id ${id}`, error);
        }
    },

    updateVisibility: async (id, visibility) => {
        try {
            const response = await api.patch(`/items/${id}?visibility=${visibility}`);
            return response.data;
        } catch (error) {
            handleAPIError(`Failed to update visibility for topic with id ${id}`, error);
        }
    },
}