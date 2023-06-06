export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret",
            isAdmin: true,
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "secret",
            isAdmin: true,
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "secret",
            isAdmin: true,
        },
    },
    placemarks: {
        _model: "Placemark",
        pyramid: {
            name: "Great Pyramid of Giza",
            description: "a big pyramid",
            location: {
                lat: 29.97942,
                lng: 31.13430,
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
        wall: {
            name: "Great Wall of China",
            description: "a really long wall",
            location: {
                lat: 40.44170,
                lng: 116.56647,
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
        taj: {
            name: "Taj Mahal",
            description: "big marble mausoleum",
            location: {
                lat: 27.17523,
                lng: 78.04214
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
        petra: {
            name: "Petra",
            description: "2000 year old city in Jordan",
            location: {
                lat: 30.32851,
                lng: 35.44432,
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
        macchu: {
            name: "Machu Picchu",
            description: "hilltop ruins in Peru",
            location: {
                lat: -13.22613,
                lng: -72.49707,
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
        maya: {
            name: "Chichén Itzá",
            description: "Maya pyramid",
            location: {
                lat: 20.68444,
                lng: -88.56776,
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
        colosseum: {
            name: "Colosseum",
            description: "big gladiator arena",
            location: {
                lat: 41.89104,
                lng: 12.49137,
            },
            category: "Wonder-of-the-World",
            img: "",
            createdBy: "->users.bart"
        },
    },
}
