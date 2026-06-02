import { readFile } from "node:fs/promises";

const templatePath = new URL("../supabase/email-templates/confirm-signup.html", import.meta.url);
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = process.env.SUPABASE_PROJECT_REF;

if (!accessToken || !projectRef) {
  console.error(
    [
      "Missing Supabase Management API settings.",
      "Run with:",
      "SUPABASE_ACCESS_TOKEN=your-token SUPABASE_PROJECT_REF=your-project-ref npm run supabase:email-template"
    ].join("\n")
  );
  process.exit(1);
}

const body = await readFile(templatePath, "utf8");

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    mailer_subjects_confirmation: "Confirm your BriskLegal account",
    mailer_templates_confirmation_content: body
  })
});

const resultText = await response.text();

if (!response.ok) {
  console.error(`Supabase template update failed: ${response.status} ${response.statusText}`);
  console.error(resultText);
  process.exit(1);
}

console.log("BriskLegal confirm-signup email template applied to Supabase.");
