import fs from 'fs';
import express from "express";
const queriesRouter = express.Router();

// queriesRouter.get('/', async (req, res) => {
//     res.send("GET called");    
// });


queriesRouter.get('/', (req, res) => {
    try {
        const data = fs.readFileSync('queries.json', 'utf8');
        res.status(200).send(data);
    } catch (err) {
        if (res.status)
            console.error(err);
        res.status(404).send("queries.json file not found");
    }
    console.log("queriesRouter GET completed");
});
// queriesRouter.post('/', async (req, res) => {
//     res.send("POST called");  
// });

queriesRouter.post('/', (req, res) => {
    const queryArray = req.body;
    const data = JSON.stringify(queryArray, null, 2);
    try {
        fs.writeFileSync('queries.json', data);
        console.log('query array saved to queries.json');
        res.status(200).send("query array saved");
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
    console.log("queriesRouter POST completed");
});

export default queriesRouter;