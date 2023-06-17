// @ts-nocheck
import axios from "axios";
import {latestPlacemark, user} from "../store";

export const placemarkService = {
    baseUrl: "http://localhost:4000",

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                });
                localStorage.placemark = JSON.stringify({email:email, token:response.data.token});
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
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
    },

    async signup(firstName, lastName, email, password) {
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
        const donationCredentials = localStorage.donation;
        if (donationCredentials) {
            const savedUser = JSON.parse(donationCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token,
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async getAllPlacemarks(){
        try{
            const response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async addPlacemark(placemark) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/placemarks`, placemark);
            const createdplacemark = {
                name: placemark.name,
                description: placemark.description,
                location: {
                    lat: placemark.location.lat,
                    lng: placemark.location.lng,
                },
                category: placemark.category,
            }
            latestPlacemark.set(createdplacemark);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async getPlacemark(id){
        try{
            const response = await axios.get(`${this.baseUrl}/api/placemarks/${id}`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async getAnalytics(){
        try{
            const response = await axios.get(`${this.baseUrl}/api/analytics`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async getAllImages(){
        try{
            const response = await axios.get(`${this.baseUrl}/api/allimages`);
            return response.data;
        } catch(error){
            return [];
        }
    },
};

