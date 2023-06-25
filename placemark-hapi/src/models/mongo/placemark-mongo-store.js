import {Placemark} from "./placemark.js";

export const placemarkMongoStore = {
    async getAllPlacemarks() {
        const placemarks = await Placemark.find().lean();
        return placemarks;
    },

    async getCountPlacemarks(){
        const placemarks = await Placemark.countDocuments();
        return placemarks;
    },

    async getCountPlacemarksByCategory(category){
        const placemarks = await Placemark.countDocuments({ category: category});
        return placemarks
    },

    async getAllPlacemarksByCategory(category) {
        const placemarks = await Placemark.find({ category: category }).lean();
        return placemarks;
    },

    async getAllPlacemarksByName(name) {
        const placemarks = await Placemark.find({ name: {$regex: "^"+name}}).lean();
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

    async deletePlacemarkByUser(userid){
        try{
            await Placemark.deleteOne({ createdBy: userid});
        } catch(error){
            console.log("bad id")
        }
    },

    async deleteAllPlacemarks(){
        await Placemark.deleteMany({});
    },

    async updatePlacemark(placemark, updatedPlacemark){
        const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
        placemarkDoc.name = updatedPlacemark.name;
        placemarkDoc.description = updatedPlacemark.description;
        placemarkDoc.location.lng = updatedPlacemark.location.lng;
        placemarkDoc.location.lat = updatedPlacemark.location.lat;
        placemarkDoc.category = updatedPlacemark.category;
        await placemarkDoc.save();
    },

    async updatePlacemarkimg(updatedPlacemark, img) {
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.img.unshift(img);
        await placemark.save();
    },

    async deletePlacemarkimgs(updatedPlacemark) {
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.img = [];
        await placemark.save();
    },
}