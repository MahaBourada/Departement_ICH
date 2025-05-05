// utils/translate.js
import axios from "axios";

export async function translateText(text) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4", // or gpt-4-turbo
      messages: [
        {
          role: "user",
          content: `Translate this from French to English: ${text}`,
        },
      ],
      temperature: 0.3,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}
