import { useState } from "react";
import "./App.css"; //npm run dev
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "sk-None-F12mwiACArPLaQYxLWDdT3BlbkFJ3qP6w588xlQwRlx5qyio"; //secure -> environment variable

const API_KEY_GIMINI = "AIzaSyC_mES25WmidYYOkqu7eS7TTlg-NP6amUc";
function App() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [error, setError] = useState("");

  // const handelOpenAPI = async () => {
  //   console.log('called');

  //   const APIBody ={
  //     "model": "gpt-3.5-turbo",
  //     "messages": [
  //       {
  //         "role": "system",
  //         "content": "You" + tweet
  //       },
  //     ],
  //     "temperature": 0.7,
  //     "max_tokens": 100,
  //     "top_p": 1
  //   }

  //   try {
  //     const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": "Bearer " + API_KEY
  //       },
  //       body: JSON.stringify(APIBody)
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       if (errorData.error && errorData.error.code === "insufficient_quota") {
  //         setSentiment("You have exceeded your quota. Please check your plan or billing details.");
  //       } else {
  //         setSentiment("An error occurred. Please try again later.");
  //       }
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log('data---->', data);
  //     setSentiment(data.choices[0].message.content); // Adjust based on the API response structure
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Optional: Display a more generic error message to the user
  //   }
  // };

  const genAI = new GoogleGenerativeAI(API_KEY_GIMINI);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handelOpenAPI = () => {
    setError(""); // Clear previous errors
    async function run() {
      try {
        const prompt = tweet;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        setSentiment(text);
      } catch (err) {
        console.error("API Error:", err);
        if (err.response && err.response.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError("An error occurred. Please check the console.");
        }
      }
    }
    run();
  };

  return (
    <>
      <div className="App">
        <div>
          <textarea
            onChange={(e) => setTweet(e.target.value)}
            placeholder="Paste your tweet here!"
            cols={50}
            rows={10}
          />
        </div>
        <div>
          <button onClick={handelOpenAPI}>
            Get The Tweet Sentiment Form OpenAI API
          </button>
          {sentiment !== "" ? <h3>This Tweet IS: {sentiment}</h3> : null}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
