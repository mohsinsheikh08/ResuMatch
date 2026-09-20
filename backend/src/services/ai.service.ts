import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  vertexai: false,
});

const technicalQuestionSchema = z.object({
  question: z
    .string()
    .describe("A technical interview question relevant to the job role"),
  intention: z
    .string()
    .describe("Why the interviewer asks this — what they want to assess"),
  answer: z
    .string()
    .describe("A strong, structured answer the candidate can use"),
});

const behavioralQuestionSchema = z.object({
  question: z
    .string()
    .describe("A behavioral question in STAR format"),
  intention: z
    .string()
    .describe("What the interviewer wants to learn from this question"),
  answer: z
    .string()
    .describe("A model STAR-format answer"),
});

const skillGapSchema = z.object({
  skill: z
    .string()
    .describe("A specific skill required by JD but weak or missing in resume"),
  severity: z
    .enum(["low", "medium", "high"])
    .describe("How critical this gap is"),
});

const preparationPlanSchema = z.object({
  day: z.number().describe("Day number starting from 1"),
  focus: z.string().describe("Main focus area for the day"),
  tasks: z.array(z.string()).describe("Specific tasks for the day"),
});

const interviewReportSchema = z.object({
  title: z
    .string()
    .max(80)
    .describe("Short title in format '<Role> at <Company>'"),
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Overall match score 0-100. Weighted: skills 35%, experience 25%, achievements 20%, education 10%, domain 10%."
    ),
  technicalQuestions: z
    .array(technicalQuestionSchema)
    .describe("5-7 technical questions with intention and model answer"),
  behavioralQuestions: z
    .array(behavioralQuestionSchema)
    .describe("3-5 behavioral questions with intention and model answer"),
  skillGaps: z
    .array(skillGapSchema)
    .describe("Skills required by JD but missing in resume, with severity"),
  preparationPlan: z
    .array(preparationPlanSchema)
    .describe("7-day preparation plan with daily focus and tasks"),
});

const InterviewReport = async (
  resume: string,
  selfDescription: string,
  jobDescription: string
) => {
  const prompt = `
# ROLE
You are a senior technical recruiter and interview coach with 15+ years of experience.

# TASK
Analyze the candidate against the job description and generate a comprehensive interview preparation report.

# INPUTS

## CANDIDATE RESUME
${resume || "NOT PROVIDED"}

## CANDIDATE SELF-DESCRIPTION
${selfDescription}

## JOB DESCRIPTION
${jobDescription}

# ANALYSIS RULES

## 1. Detect Field & Seniority
Identify industry and seniority level, and adapt language to that field.

## 2. Match Score (0-100)
Weighted rubric:
- Skills match (35%)
- Experience depth (25%)
- Achievements & impact (20%)
- Education & certifications (10%)
- Domain/industry fit (10%)

## 3. Technical Questions (5-7)
Domain-specific questions with intention and model answer.

## 4. Behavioral Questions (3-5)
STAR-format questions with intention and model answer.

## 5. Skill Gaps
Skills required by JD but missing in resume. Each with severity: low, medium, or high.

## 6. Preparation Plan (7 days)
Day-wise plan. Each day has a focus area and 3-5 specific tasks.

# TITLE RULES
Format: "<Role> at <Company>". If company unknown, use role only.

# OUTPUT RULES
- Return ONLY valid JSON
- Start with { and end with }
- No markdown fences
- Every array must have at least 1 item

# SCHEMA
{
  "title": string,
  "matchScore": number,
  "technicalQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "skillGaps": [
    { "skill": string, "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": string, "tasks": string[] }
  ]
}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
    },
  });

  const text = interaction.output_text;

  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  console.log("Gemini RAW:", text);

  const parsed = JSON.parse(text);
  const result = interviewReportSchema.parse(parsed);

  console.log("Validated:", result);
  return result;
};

export default InterviewReport;