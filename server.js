import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "32kb" }));

app.get("/", (_req, res) => {
  res.json({ service: "TikSave+ API", status: "online" });
});

app.post("/api/download", async (req, res) => {
  const { url, format = "MP4" } = req.body || {};

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "TikTok URL is required." });
  }

  // TikSave+ frontend expects this response shape.
  // Connect an authorized TikTok/content provider here.
  // This starter intentionally does not scrape TikTok or bypass
  // TikTok restrictions. It only validates the request and provides
  // the integration point for an authorized provider.
  if (!/^https?:\/\/(www\.)?(tiktok\.com|vt\.tiktok\.com)\//i.test(url)) {
    return res.status(400).json({ error: "Only TikTok URLs are accepted." });
  }

  return res.status(501).json({
    error: "Downloader provider is not configured.",
    message: "Set up an authorized TikTok/content API and return its permitted media URL as download_url.",
    format
  });
});

app.listen(PORT, () => {
  console.log(`TikSave+ API running on port ${PORT}`);
});
