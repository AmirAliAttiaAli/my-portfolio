export default function handler(req, res) {
  // Allow only POST method
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { username, password } = req.body || {};
  
  // Security Fix: Block default credentials in production mode
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || (process.env.NODE_ENV !== "production" ? "Admin_Amir_Secure_9921_DS" : "");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "P@ss_#$AmirTorad_2026_!@#_SecureVision_ML_AI" : "");

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return res.status(500).json({ success: false, error: "Administrative credentials are not set in environment variables." });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate standard Basic Authentication header value
    const token = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, error: "Incorrect username or password. Access denied." });
  }
}
