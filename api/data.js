import { getPortfolioData, savePortfolioData } from "./db.js";

export default async function handler(req, res) {
  // GET method: retrieve portfolio configuration
  if (req.method === "GET") {
    try {
      const data = await getPortfolioData();
      return res.status(200).json(data);
    } catch (e) {
      console.error("GET Data Error:", e);
      return res.status(500).json({ error: "Failed to load portfolio data." });
    }
  }

  // POST method: update portfolio configuration (Protected)
  if (req.method === "POST") {
    const authHeader = req.headers.authorization;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Admin_Amir_Secure_9921_DS";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "P@ss_#$AmirTorad_2026_!@#_SecureVision_ML_AI";

    const expectedToken = "Basic " + Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString("base64");

    if (!authHeader || authHeader !== expectedToken) {
      return res.status(401).json({ error: "Unauthorized. Invalid admin session token." });
    }

    try {
      if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({ error: "Invalid data body." });
      }

      await savePortfolioData(req.body);
      return res.status(200).json({ success: true, message: "Portfolio configuration saved successfully." });
    } catch (e) {
      console.error("POST Data Error:", e);
      return res.status(500).json({ error: "Failed to save portfolio data." });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
