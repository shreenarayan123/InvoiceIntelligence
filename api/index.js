const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } =require("@google/generative-ai");
require('dotenv').config()

const app = express()
app.use(cors());



const upload = multer({ dest: 'uploads/' });

const giveDetails = async (text) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    You are an expert in extracting information from invoices.
    Here is the invoice text:
    
    ${text}
    
    Please extract the following details:
    - Customer Details
    - Products
    - Total Amount
    - just give specified data text format and json format
    - Do not use * or **
    `;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

app.post('/',upload.single('file'), async function (req, res) {
    
    if (!req.file) {
        console.log('No file received');
        return res.status(400).send('No file uploaded.');
    }

    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        
        const data = await pdf(dataBuffer);
       
        const promptText = data.text;
      
        const details = await giveDetails(promptText);
       
        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);
      
        res.json({details} );
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }


  


})

app.listen(3000, () => console.log('Server started on port 3000'));