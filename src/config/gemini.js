import axios from "axios"

async function generateAnswer(prompt) {

try {

  const response = await axios({
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC6OUY_KEYDxd5RedHEBBPzFBT0E6Uj92I",

    method: "post",
    data: {
      "contents": [
        { "parts": [{ "text": prompt }] }
      ]
    }
  })

  // console.log(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  const finalData = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
  console.log(finalData);
  return finalData;
  
} catch (error) {
  console.error("Error:", error);
  return null;
}

    
}

export default generateAnswer;