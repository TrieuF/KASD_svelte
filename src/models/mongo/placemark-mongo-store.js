import {Placemark} from "./placemark.js";

export const placemarkMongoStore = {
    async getAllPlacemarks() {
        const placemarks = await Placemark.find().lean();
        return placemarks;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean();
            return placemark;
        }
        return null;
    },

    async addPlacemark(userid , placemark){
        placemark.createdBy = userid;
        const newPlacemark = new Placemark(placemark);
        const pObj = await newPlacemark.save();
        const p = await this.getPlacemarkById(pObj._id);
        return p;
    },

    async addPlacemarknoUser( placemark){
        const newPlacemark = new Placemark(placemark);
        const pObj = await newPlacemark.save();
        const p = await this.getPlacemarkById(pObj._id);
        return p;
    },

    async getPlacemarksByUserId(id){
        const placemarks = await Placemark.findOne({ createdBy: id}).lean();
        return placemarks;
    },

    async deletePlacemark(id){
        try{
            await Placemark.deleteOne({ _id: id});
        } catch(error){
            console.log("bad id")
        }
    },

    async deleteAllPlacemarks(){
        await Placemark.deleteMany({});
    }
}