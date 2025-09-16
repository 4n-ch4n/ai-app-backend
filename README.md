# Nest AI

This is a backend application built with NestJS that leverages the power of Google's Gemini Pro to offer AI-driven services.

## Features

- **Orthography and Grammar Correction**: An endpoint that takes a text prompt and returns corrections, a user score, and a message.
- **Pros and Cons Discussion**: An endpoint that provides a balanced discussion of the pros and cons of a given topic.
- **Pros and Cons Discussion (Streaming)**: A streaming version of the pros and cons discussion endpoint.
- **Translation**: An endpoint that translates text from one language to another.
- **Text-to-Audio Generation**: An endpoint that converts text into an audio file and saves it to cloud storage.
- **Audio-to-Text Conversion**: An endpoint that transcribes audio files into text.

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

    Copy the `.env.template` file in the root of the project and add your environment variables:

```env
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY

SPACE_REGION=YOUR_S3_REGION
SPACE_URL=YOUR_S3_URL
SPACE_ACCESS_KEY=YOUR_S3_ACCESS_KEY
SPACE_SECRET_KEY=YOUR_S3_SECRET_KEY
SPACE_BUCKET=YOUR_S3_BUCKET_NAME
SPACE_CDN_URL=YOUR_S3_CDN_URL 
```### Running the Application

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

---

#### `POST /ai/text-to-audio`

Converts the given text into an audio file and returns the URL to access it.

**Request Body:**

```json
{
  "prompt": "Hello, this is a test of the text-to-audio service.",
  "voice": "echo"
}
```
*Note: The `voice` property is optional*

**Successful Response (`200 OK`):**

```
  https://d3fgeazrn9lle8.cloudfront.net/audios/1757983742592.wav
```

---

#### `GET /ai/text-to-audio/:fileId`

Retrieves a previously generated audio file.

**URL Parameters:**

- `fileId` (string, required): The ID of the audio file to retrieve (e.g., `1715887872123.wav`).

---

#### `POST /ai/audio-to-text`

Transcribes the given audio file into text.

**Request Body:**

This endpoint uses `multipart/form-data`.

- `file`: The audio file to transcribe.
- `prompt` (optional): A text prompt to guide the transcription.

**Successful Response (`201 Created`):**

```json
{
  "task": "transcribe",
  "language": "english",
  "duration": 5.2,
  "text": "Hello, this is a test of the audio to text service.",
  "segments": [
    {
      "id": 0,
      "seek": 0,
      "start": 0.0,
      "end": 5.2,
      "text": "Hello, this is a test of the audio to text service."
    }
  ]
}
```

