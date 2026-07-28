const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const fail = (message) => {
  console.error(`SMOKE FAIL: ${message}`);
  process.exit(1);
};

const assertStatus = async (response, allowedStatuses, label) => {
  if (!allowedStatuses.includes(response.status)) {
    const body = await response.text();
    fail(`${label} returned ${response.status}. Body: ${body}`);
  }
};

const run = async () => {
  const home = await fetch(`${baseUrl}/`);
  await assertStatus(home, [200], "GET /");

  const lead = await fetch(`${baseUrl}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Smoke Test User",
      email: "smoke@example.com",
      company: "Zakaa QA",
      message: "Smoke test lead submission for deployment readiness.",
      source: "unknown",
    }),
  });
  await assertStatus(lead, [200], "POST /api/lead");

  const assessment = await fetch(`${baseUrl}/api/assessment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyName: "Smoke Test Org",
      employeeRange: "21-100",
      primaryCloud: "aws",
      monthlyBudget: "5000",
      priorities: ["security", "resilience"],
      timeline: "30-days",
      language: "en",
    }),
  });
  await assertStatus(assessment, [200], "POST /api/assessment");

  const chat = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "en",
      messages: [{ role: "user", content: "Do you provide cloud migration services?" }],
    }),
  });
  await assertStatus(chat, [200], "POST /api/chat");

  const metrics = await fetch(`${baseUrl}/api/ops/metrics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ windowMinutes: 15 }),
  });
  await assertStatus(metrics, [200, 401, 403], "POST /api/ops/metrics");

  const alerts = await fetch(`${baseUrl}/api/ops/alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ windowMinutes: 15 }),
  });
  await assertStatus(alerts, [200, 401, 403], "POST /api/ops/alerts");

  console.log("SMOKE PASS: core routes are healthy.");
};

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  fail(`Unhandled error: ${message}`);
});
