const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/ongController.js');
const incController = require('./controllers/incidentController.js');
const profileController = require('./controllers/profileController.js');
const sessionController = require('./controllers/sessionController.js');


routes.get('/', (req, res) => {

    return res.json({
        "frase": "Hello word!"
    })
})

routes.get("/ongs", ongController.list);
routes.post("/ongs", ongController.create);

routes.get("/incidents", incController.list);
routes.post("/incidents", incController.create);
routes.delete("/incidents/:id", incController.delete);

routes.get("/profile", profileController.list);

routes.post("/sessions", sessionController.create);

module.exports = routes;