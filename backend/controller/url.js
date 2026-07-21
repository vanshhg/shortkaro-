const shortid = require("shortid");
const URL = require("../models/url");

// Create a new short URL
async function GenerateNewshortURL(req, res) {
    try {
        const body = req.body;

        if (!body || !body.url) {
            return res.status(400).json({
                error: "URL is required",
            });
        }

        const shortID = shortid.generate();

        const data = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        console.log("New URL Created:", data);

        return res.status(201).json({
            id: shortID,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

// Get analytics
async function handleGetanalytics(req, res) {
    try {
        const result = await URL.findOne({
            shortId: req.params.shortId,
        });

        if (!result) {
            return res.status(404).json({
                error: "Short URL not found",
            });
        }

        return res.json({
            totalclicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

module.exports = {
    GenerateNewshortURL,
    handleGetanalytics,
};