var config = {};

config.hotel = {};
config.staah = {};
config.web = {};

config.hotel.hostname = "localhost";
config.hotel.user = "staahdeal";
config.hotel.pass = "123456789";
config.hotel.database = "emerald";

config.staah.username = "PMSEmerald";
config.staah.password = "Emerald1213";
config.staah.hotel_id = "3096";
config.staah.interval = 10000;

config.web.port = process.env.WEB_PORT || 9090;

module.exports = config;