const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: "Too many requests" }
});

module.exports = apiLimiter;
