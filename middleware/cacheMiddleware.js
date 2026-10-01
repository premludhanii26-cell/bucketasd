let cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const method = req.method;

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        console.log("Modifying data... Clearing cache!");
        cache = {}; 
        return next();
    }

    if (method === "GET") {
        const cachedEntry = cache[key];
        const currentTime = Date.now();

        if (cachedEntry && (currentTime - cachedEntry.timestamp < 60000)) {
            res.set("X-Cache", "HIT");
            return res.json(cachedEntry.data);
        }

        res.set("X-Cache", "MISS"); 

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            cache[key] = {
                data: body,
                timestamp: currentTime
            };
            return originalJson(body);
        };
    }
    
    next();
}

module.exports = cacheMiddleware;