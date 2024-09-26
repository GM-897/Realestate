//Code contributed by-
//Vansh Kumar
//github.com/1shkumar
//vanshkr22@gmail.com
//vansh.kumar.ug21@nsut.ac.in


import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { generateText } from './Text_GenAI.js';
import { createClient } from '@supabase/supabase-js';
import { insertData } from './insertData.js';
import cors from 'cors';

dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

//Bonus task
app.post('/regenerate', async (req, res) => {
    const { highlightedText, option , Output} = req.body;
  

    const prompt = `Please regenerate the narrative flow by modifying ONLY the selection portion of the complete text.
    Do not regenerate any other aspect of the complete text and ONLY give the output.
    
    <COMPLETE TEXT>
    ${Output}
    </COMPLETE TEXT> 
    
    <SELECTED PORTION>
    ${highlightedText}
    </SELECTED PORTION>
    
    Please make the text of the selection portion ${option}
    
    Generate and return the complete text containing the modification, without providing any other information or sentences.`;
  
    try {

      const generatedResponse = await generateText(prompt);
      const regeneratedText = generatedResponse.openai.generated_text;
  
      res.json({ text: regeneratedText });
    } catch (error) {
      console.error('Error regenerating text:', error);
      res.status(500).send('Error regenerating text');
    }
});
  
app.post('/insert', async (req, res) => {
    const { Brand, Features, Tone, Length, Output } = req.body;
  
    try {
    
      const data = await insertData(Brand, Features, Tone, Length, Output);
  
      res.json({ message: 'Data inserted successfully', data });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data');
    }
});

app.post('/generate-brochure', async (req, res) => {
  const { Brand, Features, Tone, Length } = req.body;

  // Construct the prompt
  const prompt = `
  You are a copywriter at a marketing agency working on a brochure for a real estate developer.
  Generate a narrative flow for the real estate brochure keeping in mind the brand positioning and features of the property.
  
  <BRAND POSITIONING>
  ${Brand}
  </BRAND POSITIONING> 
  
  <FEATURES>
  ${Features}
  </FEATURES>
  
  Keep the tone of the narrative ${Tone}.
  Also make sure that the length of the copy is ${Length} sentences.
  `;

  try {
    
    const generatedResponse = await generateText(prompt);
    const generatedText = generatedResponse.openai.generated_text;

    res.json({ text: generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error generating or storing text');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
