import { httpClient } from "@/core/axios/httpClient";

const ENDPOINT = "/instructors";

export const instructorsService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
    return res;
  },

  create: async (payload: object) => {
    const res = await httpClient.post(`${ENDPOINT}/create`, payload);
    return res;
  },

  update: async (id: string, payload: object) => {
    const res = await httpClient.put(`${ENDPOINT}/${id}`, payload);
    return res;
  },

  delete: async (id: string) => {
    const res = await httpClient.delete(`${ENDPOINT}/${id}`);
    return res;
  },
};