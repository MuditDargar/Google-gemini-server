// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai") 
require('dotenv').config();
const express= require('express');
const bodyparser= require('body-parser');
const app= express();
app.use(express.json());
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send('hello world gemini');
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "what is the thermalconductivity  ";
const generate =async(prompt)=>{
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    }
    catch(err){
        console.error(err);
    }
}

// generate();

app.get('/api/content', async (req, res) => {
try{
    const data=req.body.question ;
    const result=await generate(data);
    res.json({  data: result });
}
catch(err){
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
}
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
   
})