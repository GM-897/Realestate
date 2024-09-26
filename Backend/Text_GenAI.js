// import axios from "axios";

// const options = {
//   method: "POST",
//   url: "https://api.edenai.run/v2/text/generation",
//   headers: {
//     authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGZmNzcyMDQtZDI0ZS00YzQyLThhMDItODg3OTFlODcwNjBlIiwidHlwZSI6ImFwaV90b2tlbiJ9.VgtDSYHVcTvRMjA356ZeI7jSAKx4eUMis1dkFh0Ks68",
//   },
//   data: {
//     providers: "openai",
//     text: "write a story about a young man in 50words",
//     temperature: 0.2,
//     max_tokens: 250,
//     fallback_providers: "cohere",
//   },
// };

// axios
//   .request(options)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//Test successful

//Code contributed by-
//Vansh Kumar
//github.com/1shkumar
//vanshkr22@gmail.com
//vansh.kumar.ug21@nsut.ac.in

import axios from 'axios';

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGZmNzcyMDQtZDI0ZS00YzQyLThhMDItODg3OTFlODcwNjBlIiwidHlwZSI6ImFwaV90b2tlbiJ9.VgtDSYHVcTvRMjA356ZeI7jSAKx4eUMis1dkFh0Ks68";

export const generateText = async (prompt) => {
  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/text/generation',
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
    data: {
      providers: 'openai',
      text: prompt,
      temperature: 0.2,
      max_tokens: 250,
      fallback_providers: 'cohere',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};
