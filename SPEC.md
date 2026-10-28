A. Project Requirements
Project overview and problem statement.
Target users and expected user experience.
Core features and optional enhancements.
Technology stack: React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, and Gemini API.
Project limitations and final deliverables.
B. User Flow
Document the complete journey:
User opens the website.
User enters a mystery premise and selects a difficulty level.
Gemini generates the mystery, suspects, clues, and hints.
User investigates and discovers clues.
User requests hints if needed.
User accuses a suspect.
The application reveals the verdict, culprit, explanation, and score.
User can start another mystery.
C. UI and Page Specifications
Define the purpose and essential elements of each page:
Home: Project introduction and start button.
Create Mystery: Premise input and difficulty selector.
Investigation Room: Story, suspect cards, clues, hints, and progress.
Accusation: Suspect selection and submission.
Results: Verdict, score, culprit, and explanation.
Specify loading states, error messages, navigation, and responsive behavior. Students may use Stitch AI to generate an initial UI design, then document how each screen maps to the project requirements.
D. Backend and Database Design
Document the API endpoints, request and response formats, validation rules, and error handling.
Suggested endpoints:
POST /api/cases — Generate a mystery.
GET /api/cases/:id — Retrieve an active mystery.
POST /api/cases/:id/clues/:clueId/discover — Discover a clue.
POST /api/cases/:id/hints — Request a hint.
POST /api/cases/:id/accuse — Submit an accusation.
GET /api/cases/:id/result — Retrieve the completed result.
Define a database model containing the mystery title, story, difficulty, suspects, clues, hints, player progress, accusation, and score.
Security requirement: Keep the culprit and solution on the backend until the player submits an accusation.
E. AI Behavior and Scoring Rules
Specify the expected Gemini output format and validate generated responses before saving them.
Difficulty
Suspects
Clues
Hints
Easy
3
5
2
Medium
4
7
3
Hard
5
9
3

Define scoring rules in the spec sheet:
Correct accusation: Easy 100, Medium 150, Hard 200 points.
Each discovered clue: +5 points.
Each hint used: −10 points.
Minimum score: 0.
Require a logically consistent solution supported by the clues. Scoring and validation must happen on the backend.
F. Acceptance Criteria
Define clear conditions that determine whether the project is complete:
Users can generate mysteries at all three difficulty levels.
Players can investigate, request hints, and submit accusations.
The solution is not revealed prematurely.
Scores are calculated and validated by the backend.
Results display the correct culprit and explanation.
The application works on the deployed website.
Spec sheet deliverable: A complete SPEC.md that another developer or AI coding assistant can follow without major clarification.

