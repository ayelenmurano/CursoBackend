const config = {};

let clientID = "249923326905355";
let clientSecret = "2d813974f9043c70e42c536e95e2eb47";

for (let i in process.argv) {
    if (process.argv[i].includes("clientID")) {
        clientID = process.argv[i]
    }

    if (process.argv[i].includes("clientSecret")) {
        clientSecret = process.argv[i]
    }
}

config.facebook = {
    clientID : clientID,
    clientSecret : clientSecret,
}

module.exports = config;