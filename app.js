//
import express from "express";
import routes from "./routes/routes.js";

const app = express();
app.use(express.json());


//known routes
app.use(routes);
//HERE FOR HANDLING UNCAUGHT ROUTES
app.all("*", (req, res) => {
    return res.status(200).json({
        message: `Can't find ${req.originalUrl} on this server😕, ensure the URL exists and try again.`,
        status: 404
    });
});


export default app;