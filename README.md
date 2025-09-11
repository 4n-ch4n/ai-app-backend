# Nest AI

This is a backend application built with NestJS that leverages the power of Google's Gemini Pro to offer AI-driven services.

## Features

- **Orthography and Grammar Correction**: An endpoint that takes a text prompt and returns corrections, a user score, and a message.
- **Pros and Cons Discussion**: An endpoint that provides a balanced discussion of the pros and cons of a given topic.
- **Pros and Cons Discussion (Streaming)**: A streaming version of the pros and cons discussion endpoint.
- **Translation**: An endpoint that translates text from one language to another.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- A Google AI API Key. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository**

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file in the root of the project and add your Google API Key:

    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
    ```

### Running the Application

-   **Development mode**
    ```bash
    npm run start:dev
    ```
    The application will run in watch mode, automatically restarting on file changes.

-   **Production build**
    ```bash
    npm run build
    npm run start:prod
    ```

The API will be available at `http://localhost:3000`.

## API Endpoints

### AI Module

#### `POST /ai/orthography-check`

Checks the spelling and grammar of the provided text.

**Request Body:**

```json
{
  "prompt": "Thiss is a text withh somee errors."
}
```

**Successful Response (`200 OK`):**

```json
{
  "userScore": 90,
  "errors": [
    "Thiss -> This",
    "withh -> with",
    "somee -> some"
  ],
  "message": "Excellent! You've done a great job, but there are a few things to improve."
}
```

---

#### `POST /ai/pros-cons-discusser`

Provides a balanced discussion of the pros and cons for a given topic.

**Request Body:**

```json
{
  "prompt": "Should I learn React or Angular?"
}
```

**Successful Response (`200 OK`):**

The response will be a string containing the discussion.

---

#### `POST /ai/pros-cons-discusser-stream`

Provides a streaming response for a pros and cons discussion. This is useful for long-running requests.

**Request Body:**

```json
{
  "prompt": "What are the pros and cons of remote work?"
}
```

**Successful Response (`200 OK`):**

The response is a stream of text chunks.

---

#### `POST /ai/translate`

Translates text to a specified language.

**Request Body:**

```json
{
  "prompt": "Hello world",
  "lang": "French"
}
```

**Successful Response (`200 OK`):**

```json
{
    "message": "Bonjour le monde"
}
```
