import { getMessages, saveMessages } from "./db.js";

export default async function handler(req, res) {
  // Allow only POST method for contact submission
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, message } = req.body || {};

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message." });
  }

  // Security checks: Validate field lengths to prevent DB overflow attacks
  if (name.length > 100) {
    return res.status(400).json({ error: "Name must be 100 characters or less." });
  }
  if (email.length > 150) {
    return res.status(400).json({ error: "Email must be 150 characters or less." });
  }
  if (message.length > 3000) {
    return res.status(400).json({ error: "Message must be 3000 characters or less." });
  }

  // Basic email format verification
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address format." });
  }

  try {
    const messages = await getMessages();
    const newMsg = {
      name,
      email,
      message,
      date: new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }) // Local Cairo time
    };

    messages.unshift(newMsg); // Prepend to inbox
    await saveMessages(messages);

    return res.status(200).json({ success: true, message: "Your message was sent successfully." });
  } catch (e) {
    console.error("POST Contact Error:", e);
    return res.status(500).json({ error: "Failed to process contact submission." });
  }
}
