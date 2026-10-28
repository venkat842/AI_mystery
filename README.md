# Case Closed

A responsive mystery investigation game based on [SPEC.md](./SPEC.md). React and Vite power the client; Express provides the case API; Mongoose persists cases when MongoDB is configured. Gemini generation is optional for local development: without an API key, a built-in mystery generator keeps the complete flow playable.

## Run locally

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and `GEMINI_API_KEY` as needed. Both are optional; without MongoDB, cases are held in server memory, and without Gemini the server generates a built-in mystery.
3. Run `npm install`, then `npm run dev`.
4. Open the Vite URL shown in the terminal. The API listens on port 3002 by default. If port 5173 is occupied, Vite will select another available port automatically.

For a production client build, run `npm run build`, then `npm start`. The Express server serves `dist/` and the API. Set `PORT` in `.env` to change the API port; Vite uses the same value for its `/api` proxy.

## API

- `POST /api/cases` — body `{ premise, difficulty }`; returns the active case without its hints, culprit, or solution.
- `GET /api/cases/:id` — retrieve a case while withholding hints and solution.
- `POST /api/cases/:id/clues/:clueId/discover` — reveal a clue.
- `POST /api/cases/:id/hints` — reveal the next hint and apply its score penalty.
- `POST /api/cases/:id/accuse` — body `{ suspectId }`; finalize and score the accusation.
- `GET /api/cases/:id/result` — retrieve the result only after an accusation.

Scoring, difficulty validation, case generation validation, and answer disclosure are server-side. Configure `GEMINI_API_KEY` to use Gemini. Configure `MONGODB_URI` to persist cases across restarts. The in-memory store is intended for local evaluation, not multi-instance deployment.
