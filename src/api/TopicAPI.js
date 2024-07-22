import { api } from "./configs/AxiosConfigs"

export const TopicAPI = {
    get: async (visibility = true) => {

        const data = await api.get(`/items?visibility=${visibility}`);
        return data;

    },

    getById: async (id) => {
        const data = await api.get(`/items/${id}`);
        return data;
    },

    create: async (topicData) => {
        try {
            const data = await api.post('/items', topicData);
            return data;
        } catch (error) {
            throw new Error('Failed to create new topic', error);
        }
    },

    update: async (id, topicData) => {
        const data = await api.put(`/items/${id}`, topicData);
        return data
    },

    delete: async (id) => {
        const data = await api.delete(`/items/${id}`);
        return data;
    },

    updateVisibility: async (id, visibility) => {
        const data = await api.patch(`/items/${id}?visibility=${visibility}`);
        return data;
    },
}