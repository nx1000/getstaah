var config = {};

config.hotel = {};
config.staah = {};
config.web = {};

// config.hotel.hostname = "localhost";
// config.hotel.user = "staahdeal";
// config.hotel.pass = "123456789";
// config.hotel.database = "emerald";

config.hotel.hostname = "68.183.178.140";
config.hotel.user = "root";
config.hotel.pass = "p3nd3kar";
config.hotel.database = "emerald";

config.staah.username = "emerald@staah.com";
config.staah.password = "Umawera9696";
config.staah.hotel_id = "13815";
config.staah.interval = 10000;

config.web.port = process.env.WEB_PORT || 9090;

module.exports = config;