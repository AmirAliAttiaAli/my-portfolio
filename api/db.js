import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import * as defaultData from "../src/portfolioData.js";

// Check if we have Vercel KV connected (in Vercel production or local dev linked to KV)
const hasKv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const LOCAL_DB_PATH = path.join(process.cwd(), "api_local_db.json");

// Default portfolio schema fallback
const defaultSchema = {
  profile: defaultData.profile,
  stats: defaultData.stats,
  experience: defaultData.experience,
  projects: defaultData.projects,
  skills: defaultData.skills,
  education: defaultData.education,
  certifications: defaultData.certifications,
  roles: defaultData.roles || ["Data Scientist", "ML Engineer", "AI Researcher", "Deep Learning Dev", "GenAI Explorer"]
};

// GET PORTFOLIO CONFIG
export async function getPortfolioData() {
  if (hasKv) {
    try {
      const data = await kv.get("portfolio_data");
      if (data) return data;
    } catch (e) {
      console.error("Vercel KV Read Error:", e);
    }
  } else {
    // Local JSON File DB
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const fileContent = fs.readFileSync(LOCAL_DB_PATH, "utf8");
        const parsed = JSON.parse(fileContent);
        if (parsed.portfolio_data) return parsed.portfolio_data;
      } catch (e) {
        console.error("Local JSON Read Error:", e);
      }
    }
  }
  return defaultSchema;
}

// SAVE PORTFOLIO CONFIG
export async function savePortfolioData(data) {
  if (hasKv) {
    await kv.set("portfolio_data", data);
  } else {
    // Local JSON File DB
    let db = {};
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        db = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
      } catch {}
    }
    db.portfolio_data = data;
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2), "utf8");
  }
}

// GET CONTACT MESSAGES
export async function getMessages() {
  if (hasKv) {
    try {
      const messages = await kv.get("portfolio_messages");
      return messages || [];
    } catch (e) {
      console.error("Vercel KV Messages Read Error:", e);
      return [];
    }
  } else {
    // Local JSON File DB
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const db = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
        return db.messages || [];
      } catch {}
    }
    return [];
  }
}

// SAVE CONTACT MESSAGES (Overwrite list)
export async function saveMessages(messages) {
  if (hasKv) {
    await kv.set("portfolio_messages", messages);
  } else {
    // Local JSON File DB
    let db = {};
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        db = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
      } catch {}
    }
    db.messages = messages;
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2), "utf8");
  }
}
