import express from "express";
const newsRouter = express.Router();

const apiKey = process.env.API_KEY;
if(!apiKey){
  console.log("Please set the API_KEY environment variable with a valid newsapi.org apiKey and restart the server!");
  process.exit(0);
}

const baseUrl = 'https://newsapi.org/v2/top-headlines';

function addApiKey(queryObject){
    return {...queryObject, apiKey: apiKey}
}
// router.get('/', async (req, res) => {
//     res.send("GET called");    
// });

export function createUrlFromQueryObject(queryObjectWithApiKey) {
    const queryString = new URLSearchParams(queryObjectWithApiKey).toString();
    const url = baseUrl + "?" + queryString;
    return url;
}

export async function fetchData(url) {
    let data = null;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

newsRouter.get('/', async (req, res) => {
    let fixedQueryObject = {
        "country": "us",
        "q": "news"
    }
    let queryObject = addApiKey(fixedQueryObject);
    let url = createUrlFromQueryObject(queryObject);
    let newsArticles = await fetchData(url);
    res.send(newsArticles);
    console.log("newsRouter GET completed");
});

// router.post('/', async (req, res) => {
//     res.send("POST called");  
// });
newsRouter.post('/', async (req, res) => {
    let query = req.body;
    let queryObjectWithApiKey = addApiKey(query);
    let url = createUrlFromQueryObject(queryObjectWithApiKey);
    let newsArticles = await fetchData(url);
    res.send(newsArticles);  
    console.log("newsRouter POST completed");
});


export default newsRouter;