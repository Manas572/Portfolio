import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const model = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-20b";

function createGroqClient() {
  const apiKey = (process.env.GROQ_API || process.env.GROQ_API_KEY)?.trim();
  if (!apiKey) return null;

  // The Groq SDK appends /openai/v1/chat/completions, so use only the origin
  // even when GROQ_API_URL contains the complete endpoint.
  const configuredUrl = process.env.GROQ_API_URL?.trim();
  const baseURL = configuredUrl ? new URL(configuredUrl).origin : undefined;

  return new Groq({
    apiKey,
    ...(baseURL ? { baseURL } : {}),
  });
}

const helperPath = path.join(process.cwd(), "src/app/api/helper");

const systemPrompt = fs.readFileSync(
  path.join(helperPath, "systemprompt.txt"),
  "utf-8",
);

const data = {
  about: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/about.json"), "utf-8"),
  ),

  contact: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/contact.json"), "utf-8"),
  ),
  dsa: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/dsa.json"), "utf-8"),
  ),
  education: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/education.json"), "utf-8"),
  ),
  experience: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/experience.json"), "utf-8"),
  ),
  projects: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/project.json"), "utf-8"),
  ),
  skills: JSON.parse(
    fs.readFileSync(path.join(helperPath, "data/skills.json"), "utf-8"),
  ),
};

const tools = [
  {
    type: "function",
    function: {
      name: "get_about",
      description:
        "Get an overall profile of Manas, including his background, technical focus, major achievements, and general strengths.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_contact",
      description: "Get Manas's public contact information.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_dsa",
      description: "Get Manas's competitive programming and DSA achievements.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_education",
      description: "Get Manas's educational information.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_experience",
      description: "Get Manas's professional experience.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_projects",
      description: "Get Manas's projects.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_skills",
      description: "Get Manas's technical skills.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];

const toolData = {
  get_about: data.about,
  get_contact: data.contact,
  get_dsa: data.dsa,
  get_education: data.education,
  get_experience: data.experience,
  get_projects: data.projects,
  get_skills: data.skills,
};

export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { success: false, error: "A non-empty message is required" },
        { status: 400 },
      );
    }

    const groq = createGroqClient();
    if (!groq) {
      return NextResponse.json(
        { success: false, error: "The AI service is not configured" },
        { status: 503 },
      );
    }

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ];

    let response = await groq.chat.completions.create({
      model,
      messages,
      tools,
      tool_choice: "auto",
    });

    const assistantMessage = response.choices[0].message;

    messages.push(assistantMessage);

    if (assistantMessage.tool_calls) {
      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function.name;

        const result = toolData[toolName];

        if (!result) {
          throw new Error(`Unknown tool: ${toolName}`);
        }

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }

      response = await groq.chat.completions.create({
        model,
        messages,
        tools,
      });
    }

    return NextResponse.json({
      success: true,
      response: response.choices[0].message.content,
    });
  } catch (error) {
    const providerStatus = Number.isInteger(error?.status) ? error.status : null;
    const detail = error instanceof Error ? error.message : "Unknown error";
    const message = providerStatus === 401
      ? "Groq rejected the API key. Check GROQ_API in .env and restart the dev server."
      : providerStatus === 404
        ? "Groq could not find the configured model or endpoint. Check GROQ_MODEL and GROQ_API_URL."
        : providerStatus === 429
          ? "Groq rate limit or quota reached. Try again later or check your Groq account."
          : "The AI request failed. Check the Next.js server log for details.";

    console.error(
      "Groq API request failed:",
      providerStatus ?? "no provider status",
      detail,
    );

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 502 },
    );
  }
}
