import express from "express";
import cors from "cors";
<<<<<<< HEAD
// import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
// import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();
const port=5000;
=======
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();
>>>>>>> 21bfc8e17500e38d45349fb7fe658fe686bfb231

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// const token = process.env.GITHUB_TOKEN;
// const endpoint = "https://models.github.ai/inference";

app.get("/",async(req,res)=>{
  res.send("hello");
})

// app.post("/api/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;

//     const client = ModelClient(
//       endpoint,
//       new AzureKeyCredential(token),
//     );

//     const response = await client.path("/chat/completions").post({
//       body: {
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: userMessage }
//         ],
//         model: "openai/gpt-4o-mini"
//       }
//     });

//     if (isUnexpected(response)) {
//       return res.status(500).json({ error: response.body.error });
//     }

//     const aiResponse = response.body.choices[0].message.content;
//     res.json({ reply: aiResponse });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

app.listen(port, () => console.log("Server running on port 5000"));
=======
const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";

// app.get("/api",(req,res)=>{
//   res.send("Hello from AIAssistant server");
// });

app.post("/api/chat", async (req, res) => {
  
  try {
    const userMessage = req.body.message;

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
        model: "openai/gpt-4o-mini"
      }
    });

    if (isUnexpected(response)) {
      return res.status(500).json({ error: response.body.error });
    }

    const aiResponse = response.body.choices[0].message.content;
    res.json({ reply: aiResponse });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.listen(4000, () => console.log("localhost:4000 AIAssistant server started"));
>>>>>>> 21bfc8e17500e38d45349fb7fe658fe686bfb231
