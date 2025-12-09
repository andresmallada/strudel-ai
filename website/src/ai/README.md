# Strudel AI Agent

Generate music patterns using natural language! This feature allows you to describe what you want to create and an AI will generate the corresponding Strudel code.

## Setup

### 1. Get an API Key

The AI Agent works with any OpenAI-compatible API. You can use:

- **OpenAI**: Get your API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic Claude**: Via compatible proxy
- **Local LLMs**: Using [LM Studio](https://lmstudio.ai/), [Ollama](https://ollama.ai/), or similar

### 2. Configure via .env (Recommended)

1. Copy `.env.example` to `.env` in the `website/` folder
2. Edit `.env` and set your values:

```bash
# Required: Your API key
PUBLIC_LLM_API_KEY=sk-your-api-key-here

# Optional: API endpoint (defaults to OpenAI)
PUBLIC_LLM_API_URL=https://api.openai.com/v1/chat/completions

# Optional: Model name (defaults to gpt-4o-mini)
PUBLIC_LLM_MODEL=gpt-4o-mini
```

3. Restart the dev server (`pnpm run dev`)

### Alternative: Configure via UI

1. Open Strudel REPL
2. Click on the **"ai"** tab in the panel
3. Click **"Settings"**
4. Enter your API key and configuration

> **Note**: UI settings override `.env` settings. If you have both configured, the UI values take precedence.

### 3. Start Creating!

1. Type a description in natural language, e.g.:
   - "Create a 4/4 techno beat with kick on every beat"
   - "Add hi-hats on the off-beats"
   - "Make a chill lo-fi beat with jazzy chords"
2. Press **Enter** or click **"Generate & Run"**
3. The code will be generated and automatically executed

## Features

- **Context-aware**: When you have existing code, the AI considers it for modifications
- **History**: Click on previous prompts to restore their code
- **Clear All**: Removes code from editor and clears history

## Tips for Better Results

1. **Be specific**: "Add a snare on beats 2 and 4" is better than "add drums"
2. **Use musical terms**: The AI understands tempo, scales, chords, time signatures
3. **Iterate**: Start simple, then ask for modifications
4. **Reference existing elements**: "Make the hi-hats faster" works if hi-hats exist

## Example Prompts

- "Create a simple house beat at 120 BPM"
- "Add a bassline in C minor"
- "Make the pattern more complex with syncopation"
- "Add reverb and delay to everything"
- "Create a melodic pattern using the pentatonic scale"
- "Add some randomness to the hi-hats"

## Customizing the System Prompt

The AI's behavior is controlled by `strudel_system_prompt.txt` in this folder. You can edit this file to:

- Add new pattern examples
- Include specific sample banks
- Customize the AI's response style
- Add genre-specific knowledge

## Supported LLM Providers

| Provider | API URL | Notes |
|----------|---------|-------|
| OpenAI | `https://api.openai.com/v1/chat/completions` | Default |
| Azure OpenAI | `https://YOUR_RESOURCE.openai.azure.com/...` | Enterprise |
| LM Studio | `http://localhost:1234/v1/chat/completions` | Local |
| Ollama | `http://localhost:11434/v1/chat/completions` | Local |
| Together AI | `https://api.together.xyz/v1/chat/completions` | Cloud |
| Groq | `https://api.groq.com/openai/v1/chat/completions` | Fast inference |

## Troubleshooting

### "API key not configured"
Go to Settings in the AI tab and enter your API key.

### "API request failed: 401"
Your API key is invalid or expired. Check your provider's dashboard.

### "API request failed: 429"
Rate limit exceeded. Wait a moment and try again.

### Code doesn't run
The AI sometimes generates invalid code. Try rephrasing your request or being more specific.

## Privacy

- Your API key is stored in your browser's localStorage
- Requests go directly to your configured LLM provider
- No data is sent to Strudel servers
