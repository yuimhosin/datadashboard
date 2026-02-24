import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // DeepSeek Proxy API
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "DeepSeek API key not configured" });
    }

    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "你是一個戰略數據治理和行業研究助手。你對全球公共數據、CAC數據出境法規以及AI在貿易和養老產業中的應用有深入的了解。請根據用戶的查詢提供專業、數據驅動的見解。"
            },
            ...messages
          ],
          stream: false,
        }),
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("DeepSeek API Error:", error);
      res.status(500).json({ error: "Failed to fetch from DeepSeek" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
