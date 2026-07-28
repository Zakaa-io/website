const baseUrl = process.env.E2E_BASE_URL ?? "http://localhost:3000";

const adminEmail = process.env.AUTH_ADMIN_EMAIL ?? "admin@example.com";
const adminPassword = process.env.AUTH_ADMIN_PASSWORD ?? "change-me";
const viewerEmail = process.env.AUTH_VIEWER_EMAIL ?? "viewer@example.com";
const viewerPassword = process.env.AUTH_VIEWER_PASSWORD ?? "change-me";
const simulatorBearer = process.env.SIMULATOR_BEARER_TOKEN ?? "";
const portalBearer = process.env.PORTAL_AGENT_BEARER_TOKEN ?? "";

const fail = (message) => {
  console.error(`E2E FAIL: ${message}`);
  process.exit(1);
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

const parseSetCookie = (response) => {
  const setCookie = response.headers.get("set-cookie");
  if (!setCookie) return "";
  return setCookie.split(";")[0] ?? "";
};

const requestJson = async ({ path, method = "POST", body = {}, cookie = "", headers = {} }) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
      ...headers,
    },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  return { response, payload };
};

const waitForJob = async (jobId, timeoutMs = 30000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const { response, payload } = await requestJson({
      path: "/api/jobs/status",
      method: "POST",
      body: { jobId },
    });
    if (!response.ok) fail(`Job status check failed for ${jobId}`);
    if (payload.status === "completed") return payload;
    if (payload.status === "failed") fail(`Job ${jobId} failed: ${payload.error}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  fail(`Job ${jobId} did not complete within ${timeoutMs}ms.`);
};

const run = async () => {
  const home = await fetch(`${baseUrl}/`);
  assert(home.status === 200, "GET / must return 200.");

  const viewerLogin = await requestJson({
    path: "/api/auth/login",
    body: { email: viewerEmail, password: viewerPassword },
  });
  assert(viewerLogin.response.status === 200, "Viewer login failed.");
  const viewerCookie = parseSetCookie(viewerLogin.response);
  assert(Boolean(viewerCookie), "Viewer session cookie missing.");

  const metrics = await requestJson({
    path: "/api/ops/metrics",
    body: { windowMinutes: 15 },
    cookie: viewerCookie,
  });
  assert(metrics.response.status === 200, "Viewer should access metrics.");

  const alertsViewer = await requestJson({
    path: "/api/ops/alerts",
    body: { windowMinutes: 15 },
    cookie: viewerCookie,
  });
  assert(alertsViewer.response.status === 403, "Viewer should be blocked from alerts.");

  const adminLogin = await requestJson({
    path: "/api/auth/login",
    body: { email: adminEmail, password: adminPassword },
  });
  assert(adminLogin.response.status === 200, "Admin login failed.");
  const adminCookie = parseSetCookie(adminLogin.response);
  assert(Boolean(adminCookie), "Admin session cookie missing.");

  const alertsAdmin = await requestJson({
    path: "/api/ops/alerts",
    body: { windowMinutes: 15 },
    cookie: adminCookie,
  });
  assert(alertsAdmin.response.status === 200, "Admin should access alerts.");

  const lead = await requestJson({
    path: "/api/lead",
    body: {
      name: "Regression Lead",
      email: "regression@example.com",
      company: "Zakaa QA",
      message: "Need urgent migration and security hardening support for cloud workloads.",
      source: "cta",
    },
  });
  assert(lead.response.status === 200, "Lead submission failed.");

  const assessment = await requestJson({
    path: "/api/assessment",
    body: {
      companyName: "Regression Org",
      employeeRange: "21-100",
      primaryCloud: "aws",
      monthlyBudget: "10000",
      priorities: ["security", "resilience"],
      timeline: "30-days",
      language: "en",
    },
  });
  assert(assessment.response.status === 200, "Assessment generation failed.");

  const chat = await requestJson({
    path: "/api/chat",
    body: {
      language: "en",
      messages: [{ role: "user", content: "Do you support 24/7 incident response?" }],
    },
  });
  assert(chat.response.status === 200, "Chat response failed.");

  const simulationJob = await requestJson({
    path: "/api/demo-simulator",
    body: { scenario: "cpu-spike", environment: "production", async: true },
    headers: simulatorBearer ? { Authorization: `Bearer ${simulatorBearer}` } : {},
  });
  assert(simulationJob.response.status === 202, "Async simulator job was not accepted.");
  assert(typeof simulationJob.payload?.jobId === "string", "Async simulator jobId missing.");
  const simulationResult = await waitForJob(simulationJob.payload.jobId);
  assert(simulationResult.result?.scenario, "Async simulator result missing scenario.");

  const triageJob = await requestJson({
    path: "/api/portal-agent",
    body: {
      ticketTitle: "Critical outage in checkout service",
      ticketDescription: "Checkout service is down and customers cannot complete payment.",
      affectedService: "checkout-api",
      async: true,
    },
    headers: portalBearer ? { Authorization: `Bearer ${portalBearer}` } : {},
  });
  assert(triageJob.response.status === 202, "Async portal triage job was not accepted.");
  assert(typeof triageJob.payload?.jobId === "string", "Async portal triage jobId missing.");
  const triageResult = await waitForJob(triageJob.payload.jobId);
  assert(triageResult.result?.severity, "Async portal triage result missing severity.");

  const logout = await requestJson({ path: "/api/auth/logout", body: {} });
  assert(logout.response.status === 200, "Logout failed.");

  console.log("E2E PASS: Regression workflow checks succeeded.");
};

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  fail(`Unhandled regression error: ${message}`);
});
