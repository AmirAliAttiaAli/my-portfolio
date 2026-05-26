import { getMessages, saveMessages } from "./db.js";

export default async function handler(req, res) {
  // Authorization verification (Protected)
  const authHeader = req.headers.authorization;
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || (process.env.NODE_ENV !== "production" ? "Admin_Amir_Secure_9921_DS" : "");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "P@ss_#$AmirTorad_2026_!@#_SecureVision_ML_AI" : "");

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Server configuration error: Admin credentials are not set." });
  }

  const expectedToken = "Basic " + Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString("base64");

  if (!authHeader || authHeader !== expectedToken) {
    return res.status(401).json({ error: "Unauthorized. Invalid admin session token." });
  }

  // GET: retrieve inbox messages
  if (req.method === "GET") {
    try {
      const messages = await getMessages();
      return res.status(200).json(messages);
    } catch (e) {
      console.error("GET Messages Error:", e);
      return res.status(500).json({ error: "Failed to retrieve inbox messages." });
    }
  }

  // DELETE: delete a message or clear the inbox
  if (req.method === "DELETE") {
    try {
      const { index, clearAll } = req.query;

      if (clearAll === "true") {
        await saveMessages([]);
        return res.status(200).json({ success: true, message: "Inbox cleared successfully." });
      }

      if (index !== undefined) {
        const idx = parseInt(index, 10);
        const messages = await getMessages();
        if (isNaN(idx) || idx < 0 || idx >= messages.length) {
          return res.status(400).json({ error: "Invalid message index." });
        }

        const updatedMessages = messages.filter((_, i) => i !== idx);
        await saveMessages(updatedMessages);
        return res.status(200).json({ success: true, message: "Message deleted successfully." });
      }

      return res.status(400).json({ error: "Missing delete operation parameters (index or clearAll)." });
    } catch (e) {
      console.error("DELETE Messages Error:", e);
      return res.status(500).json({ error: "Failed to delete message." });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
