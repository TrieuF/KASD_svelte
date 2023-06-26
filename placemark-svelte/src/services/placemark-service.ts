import axios from "axios";
import {latestPlacemark, user} from "../store";
import type {Placemark} from "./placemark-type";

export const placemarkService = {
    baseUrl: "http://localhost:4000",
    //baseUrl: "https://placemark-svelte-cu58.onrender.com",

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                    id: response.data.id
                });
                localStorage.placemark = JSON.stringify({
                    email: email,
                    token: response.data.token,
                    id: response.data.id
                });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async logout() {
        user.set({
            email: "",
            token: "",
            id: "",
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
    },

    async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                isAdmin: false
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    reload() {
        const placemarkCredentials = localStorage.placemark;
        if (placemarkCredentials) {
            const savedUser = JSON.parse(placemarkCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token,
                id: savedUser.id
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async getAllPlacemarks(): Promise<Placemark[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async addPlacemark(id: string, placemark: Placemark): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/${id}/placemarks`, placemark);
            const newplacemark = {
                name: placemark.name,
                description: placemark.description,
                location: {
                    lat: placemark.location.lat,
                    lng: placemark.location.lng,
                },
                category: placemark.category,
                _id: response.data._id
            }
            latestPlacemark.set(newplacemark);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async getPlacemark(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/placemarks/${id}`);
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async getAnalytics() {
        try {
            const response = await axios.get(`${this.baseUrl}/api/analytics`);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getAllImages() {
        try {
            const response = await axios.get(`${this.baseUrl}/api/allimages`);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async deleteImages(id: string): Promise<boolean> {
        try {
            const response = await axios.delete(`${this.baseUrl}/api/placemarks/${id}/deleteimages`);
            return response.data;
        } catch (error) {
            return false;
        }
    },

    async uploadImages(id: string, uploadedfiles: File[]): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/placemarks/${id}/uploadimages`, uploadedfiles);
            return response.data;
        } catch (error) {
            return false;
        }
    },

    async deletePlacemark(id: string) {
        try {
            const placemarkCredentials = localStorage.placemark;
            if (placemarkCredentials) {
                const savedUser = JSON.parse(placemarkCredentials);
                console.log(savedUser)
                const res = await axios.delete(`${this.baseUrl}/api/placemarks/${id}`, {data: savedUser});
                return res.status == 204;
            }
            return false;
        } catch (error) {
            return false;
        }
    },

    async editPlacemark(id: string, placemarktochange: Placemark) {
        try {
            const res = await axios.post(`${this.baseUrl}/api/placemarks/${id}`, placemarktochange);
            return res;
        } catch (error) {
            return false;
        }
    },

    async getAllPlacemarksByName(name: string){
        try {
            const res = await axios.get(`${this.baseUrl}/api/placemarks/name/${name}`);
            return res.data;
        } catch (error) {
            return [];
        }
    },

    async getAllPlacemarksByCategory(category: string){
        try {
            const res = await axios.get(`${this.baseUrl}/api/placemarks/category/${category}`);
            return res.data;
        } catch (error) {
            return [];
        }
    }
};

