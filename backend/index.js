const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 8001;
const URL = require('./models/url');
const {connectMdB} = require('./connect')
const urlRoute = require('./routes/url');
app.use(express.json());
app.use(cors());



app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

connectMdB("mongodb://localhost:27017/short-url").then(() => {
    console.log("MongoDB Connected");
})


app.listen(PORT, ()=> console.log(`Server Started at: ${PORT}`));