import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
    placemarkUrl: serviceUrl,

    async createUser(user){
        const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
        return res.data;
    },

    async getUser(id){
        const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
        return res.data;
    },

    async getAllUsers(){
        try{
            const res = await axios.get(`${this.placemarkUrl}/api/users`);
            return res.data;
        } catch (e) {
            return null;
        }
    },

    async deleteAllUsers(){
        const res = await axios.delete(`${this.placemarkUrl}/api/users`);
        return res.data;
    },

    async createPlacemark(id, placemark){
        const res = await axios.post(`${this.placemarkUrl}/api/users/${id}/placemarks`, placemark);
        return res.data;
    },

    async getPlacemark(id){
        const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
        return res.data;
    },

    async getAllPlacemarks(){
        try{
            const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
            return res.data;
        } catch (e) {
            return null;
        }
    },

    async deletePlacemark(id) {
        const res = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
        return res;
    },

    async deleteAllPlacemarks(){
        const res = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
        return res.data;
    },

    async authenticate(user){
        const res = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
        return res.data;
    },

    async clearAuth(){
        axios.defaults.headers.common["Authorization"] = "";
    }
}
