# Case Closed

A responsive mystery investigation game based on [SPEC.md](./SPEC.md). React and Vite power the client; Express provides the case API; Mongoose persists cases when MongoDB is configured. Gemini generation is optional for local development: without an API key, a built-in mystery generator keeps the complete flow playable.

## Run locally

1. Install Node.js 24.21.0 or newer (the deployment runtime is pinned in `.node-version`).
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and `GEMINI_API_KEY` as needed. Both are optional; without MongoDB, cases are held in server memory, and without Gemini the server generates a built-in mystery.
3. Run `npm install`, then `npm run dev`.
4. Open the Vite URL shown in the terminal. The API listens on port 3002 by default. If port 5173 is occupied, Vite will select another available port automatically.

For a production client build, run `npm run build`, then `npm start`. The Express server serves `dist/` and the API. Set `PORT` in `.env` to change the API port; Vite uses the same value for its `/api` proxy.

## Deploy on Render

The repository includes `render.yaml`. It configures one Node web service that builds the Vite client and serves the client and Express API together. The Blueprint uses Render's Free plan for a hobby/demo deployment; free web services sleep after 15 minutes without traffic and can take about a minute to wake. Their local filesystem is temporary, so connect MongoDB Atlas if cases need to survive restarts. See [Render's free service limits](https://render.com/docs/free).

1. Push the latest code to the `main` branch on GitHub.
2. In MongoDB Atlas, create a project, a Free cluster, and a database user. Choose a region near your Render region. From **Connect → Drivers**, copy the Node.js connection string and replace its password placeholder with the database user's password. Keep this URI private.
3. In Render, choose **New → Blueprint**, connect the `venkat842/AI_mystery` GitHub repository, and deploy the Blueprint from `main`. Render reads `render.yaml`; enter the Atlas URI for `MONGODB_URI` and your Google AI Studio key for `GEMINI_API_KEY` when prompted. The Gemini key is optional; without it the app uses its built-in case. Never put either secret in GitHub or in frontend code.
4. After the first deploy, open the Render service and choose **Connect → Outbound**. Copy the listed IP ranges. In Atlas **Network Access**, allow those CIDR ranges so the Render service can connect. Avoid `0.0.0.0/0`, which opens database network access from anywhere. Atlas requires both an allowed source IP and a database user.
5. In Render, trigger **Manual Deploy → Deploy latest commit** so the server reconnects to Atlas. Check the deploy logs for `MongoDB connected`.
6. Open the `onrender.com` URL shown in Render. Check `/health` for `{"status":"ok"}`, then create a mystery and verify the investigation flow.

The Blueprint sets the health check to `/health`, installs with `npm ci`, builds with `npm run build`, and starts with `npm start`. Render supplies `PORT` automatically. The app also limits case creation to five requests per client IP every 15 minutes to reduce accidental Gemini API usage. Gemini API usage may incur charges under Google's current terms; check its [API key guidance](https://ai.google.dev/gemini-api/docs/api-key) and usage limits before sharing a public link.

## API

- `POST /api/cases` — body `{ premise, difficulty }`; returns the active case without its hints, culprit, or solution.
- `GET /api/cases/:id` — retrieve a case while withholding hints and solution.
- `POST /api/cases/:id/clues/:clueId/discover` — reveal a clue.
- `POST /api/cases/:id/hints` — reveal the next hint and apply its score penalty.
- `POST /api/cases/:id/accuse` — body `{ suspectId }`; finalize and score the accusation.
- `GET /api/cases/:id/result` — retrieve the result only after an accusation.

Scoring, difficulty validation, case generation validation, and answer disclosure are server-side. Configure `GEMINI_API_KEY` to use Gemini. Configure `MONGODB_URI` to persist cases across restarts. The in-memory store is intended for local evaluation, not multi-instance deployment.
