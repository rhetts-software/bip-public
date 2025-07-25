import { AuditObject } from "./types";
import { Filter } from "bad-words";
import { getCensored } from "./dal";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function censorWithGemini(input: string): Promise<boolean> {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash", // or "models/gemini-1.5-pro"
  });

  const prompt = `
You are an auto-mod. Your job is to check whether a message has inappropriate words or ASCII art. Is this acceptable? (respond only yes or no)

Message: ${input}
`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  console.log(text);
  return text.toLowerCase().includes("no");
}

export function calculateAge(birthDate: string | Date): number {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}
export function dateToUserFriendlyString(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) {
    return "Just now";
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  } else if (diffHr < 24) {
    return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  } else if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek === 1 ? "" : "s"} ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }
}
export function returnExpiry(date: Date) {
  const today = new Date();
  if (today.valueOf() >= date.valueOf()) {
    return "Expired";
  } else {
    return (
      "Expires " +
      date.toLocaleTimeString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  }
}
export function sizeToUserFriendlyString(size: number) {
  return size < 1024
    ? `${size} B`
    : size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function auditObjectToHref(object: AuditObject) {
  if (object.post) {
    return `/app/posts/${object.post.id}`;
  }
  if (object.comment) {
    return `/app/posts/${object.comment.post_id}`;
  }
  return "/app";
}
export function auditObjectToUserFriendlyString(object: AuditObject) {
  if (object.post) {
    return `"${object.post.title}" (Post ID: ${object.post.id})`;
  }
  if (object.comment) {
    return `"${object.comment.content.slice(0, 10)}" on post "${
      object.comment.post_title
    }" (Post ID: ${object.comment.post_id})`;
  }
}

export function encodeSafeBase64(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeSafeBase64(input: string): string {
  const base64 = input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
  console.log(
    "Decoded filename:",
    Buffer.from(base64, "base64").toString("utf8")
  );
  return Buffer.from(base64, "base64").toString("utf8");
}

function maskWord(word: string): string {
  const cleaned = word.replace(/\s+/g, "");
  if (cleaned.length <= 2) return "*".repeat(cleaned.length);
  return (
    cleaned[0] + "*".repeat(cleaned.length - 2) + cleaned[cleaned.length - 1]
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function censorInput(input: string): Promise<string> {
  if (!input) return "";

  // First, use Gemini AI to check for inappropriate content
  const isProfaneAI = await censorWithGemini(input);
  if (isProfaneAI) {
    // If Gemini says it's profane, mask the whole input
    return "[removed]";
  }

  // Fallback to bad-words and custom word masking
  const filter = new Filter();
  const customWords = await getCensored();
  const customWordList = customWords.map((w: any) => w.word);
  filter.addWords(...customWordList);

  // First: handle exact bad words
  for (const word of new Set([...filter.list, ...customWordList])) {
    const exactRegex = new RegExp(`\\b${escapeRegex(word)}\\b`, "gi");
    input = input.replace(exactRegex, (match) => maskWord(match));
  }

  // Second: handle spaced-out bad words (e.g., f u c k)
  for (const word of new Set([...filter.list, ...customWordList])) {
    // Escape each letter for regex safety
    const spacedPattern = word
      .split("")
      .map((char: string) => `${escapeRegex(char)}[\\s]*`)
      .join("");
    const spacedRegex = new RegExp(spacedPattern, "gi");

    input = input.replace(spacedRegex, (match) => maskWord(match));
  }

  return input;
}
export function secondsToString(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? "" : "s"}`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days === 1 ? "" : "s"}`;
  }
}
