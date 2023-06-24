import {initializeApp, applicationDefault, cert} from 'firebase-admin/app';
import {getFirestore, Timestamp, FieldValue, Filter} from 'firebase-admin/firestore';
import serviceAccount from "../../../kasd-svelte-89aa3f21b818.json" assert {type: "json"};

let db;
let usersRef;
let placemarksRef;

export function connectFirebase() {
    initializeApp({
        credential: cert(serviceAccount)
    });
    db = getFirestore();
    usersRef = db.collection("users")
    placemarksRef = db.collection("placemarks")
}

export const userFireStore = {
    async getAllUsers() {
        const us = await usersRef.get();
        if (us.empty) {
            console.log("no matching doc")
            return;
        }
        let a = [];

        us.forEach(doc => {
            a.push({
                _id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().firstName,
                password: doc.data().password,
                email: doc.data().email,
                isAdmin: doc.data().isAdmin
            })
        })
        return a;
    },

    async getCountUsers() {
        const users = await usersRef.count().get();
        return users;
    },

    async getUserById(id) {
        if (id) {
            const doc = await usersRef.doc(id).get();
            const a = {
                _id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().firstName,
                password: doc.data().password,
                email: doc.data().email,
                isAdmin: doc.data().isAdmin
            }
            return a;
        }
        return null;
    },

    async addUser(user) {
        const uObj = await usersRef.add(user);
        const u = await this.getUserById(uObj.id);
        return u;
    },

    async getUserByEmail(email) {
        const u = await usersRef.where("email", '==', email).limit(1).get();
        if (u.empty) {
            console.log("no matching doc")
            return;
        }
        let a;

        u.forEach(doc => {
            a = {
                _id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().firstName,
                password: doc.data().password,
                email: doc.data().email,
                isAdmin: doc.data().isAdmin
            }
        })
        return a;
    },

    async isAdmin(id) {
        const u = this.getUserById(id);
        return u.isAdmin;
    },

    async deleteUserById(id) {
        try {
            await usersRef.doc(id).delete();
        } catch (error) {
            console.log("this is a bad id");
        }
    },

    async deleteAllUsers() {
        await usersRef.delete();
    }
};


export const placemarkFireStore = {
    async getAllPlacemarks() {
        const placemarks = await placemarksRef.get();
        if (placemarks.empty) {
            console.log("no matching doc")
            return;
        }
        let a = [];

        placemarks.forEach(doc => {
            a.push({
                _id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                location: {
                    lat: doc.data().location.lat,
                    lng: doc.data().location.lng
                },
                createdBy: doc.data().createdBy,
                category: doc.data().category,
                img: doc.data().img
            })
        })
        return a;
    },

    async getCountPlacemarks() {
        const placemarks = await placemarksRef.count().get();
        return placemarks;
    },

    async getCountPlacemarksByCategory(category) {
        const placemarks = await placemarksRef.where("category", '==', category).count().get();
        return placemarks
    },

    async getAllPlacemarksByCategory(category) {
        const placemarks = await placemarksRef.where("category", '==', category).get();
        if (placemarks.empty) {
            console.log("no matching doc")
            return;
        }
        let a = [];

        placemarks.forEach(doc => {
            a.push({
                _id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                location: {
                    lat: doc.data().location.lat,
                    lng: doc.data().location.lng
                },
                createdBy: doc.data().createdBy,
                category: doc.data().category,
                img: doc.data().img
            })
        })
        return a;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await placemarksRef.doc(id).get();
            if (placemark.empty) {
                console.log("no matching doc")
                return;
            }
            let a;
            a = {
                _id: placemark.id,
                name: placemark.data().name,
                description: placemark.data().description,
                location: {
                    lat: placemark.data().location.lat,
                    lng: placemark.data().location.lng
                },
                createdBy: placemark.data().createdBy,
                category: placemark.data().category,
                img: placemark.data().img
            }
            return a;
        }
        return null;
    },

    async addPlacemark(userid, placemark) {
        placemark.createdBy = userid;
        const pObj = await placemarksRef.add(placemark);
        const p = await this.getPlacemarkById(pObj.id);
        return p;
    },

    async getPlacemarksByUserId(id) {
        const placemarks = await placemarksRef.where("createdBy", '==', id).get();
        if (placemarks.empty) {
            console.log("no matching doc")
            return;
        }
        let a = [];

        placemarks.forEach(doc => {
            a.push({
                _id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                location: {
                    lat: doc.data().location.lat,
                    lng: doc.data().location.lng
                },
                createdBy: doc.data().createdBy,
                category: doc.data().category,
                img: doc.data().img
            })
        })
        return a;
    },

    async deletePlacemark(id) {
        try {
            await placemarksRef.doc(id).delete();
        } catch (error) {
            console.log("bad id")
        }
    },

    async deletePlacemarkByUser(userid) {
        try {
            console.log("not needed actually")
        } catch (error) {
            console.log("bad id")
        }
    },

    async deleteAllPlacemarks() {
        await placemarksRef.delete();
    },

    async updatePlacemark(placemark, updatedPlacemark) {
        try {
            await db.runTransaction(async (t) => {
                const placemarkDoc = await placemarksRef.doc(placemark._id).get()
                t.update(placemarkDoc, {
                    name: updatedPlacemark.name,
                    description: updatedPlacemark.description,
                    location: {lat: updatedPlacemark.location.lng, lng: updatedPlacemark.location.lat},
                    category: updatedPlacemark.category
                });
            });
            console.log("Transaction success!");
        } catch (e) {
            console.log("Transaction failed!");
        }
    },

    async updatePlacemarkimg(updatedPlacemark, img) {
        try {
            await db.runTransaction(async (t) => {
                const placemarkDoc = await placemarksRef.doc(updatedPlacemark._id).get()
                const newimg = placemarkDoc.img.unshift(img);
                t.update(placemarkDoc, {
                    img: newimg
                });
            });
            console.log("Transaction success!");
        } catch (e) {
            console.log("Transaction failed!");
        }
    },

    async deletePlacemarkimgs(updatedPlacemark) {
        try {
            await db.runTransaction(async (t) => {
                const placemarkDoc = await placemarksRef.doc(updatedPlacemark._id).get()
                t.update(placemarkDoc, {
                    img: []
                });
            });
            console.log("Transaction success!");
        } catch (e) {
            console.log("Transaction failed!");
        }
    },
}