# 🎵 Strudel AI Agent Fork

> *"I wanted to make music with Strudel, but reading documentation is for people with patience. So I made an AI do it for me. Using AI. It's AIs all the way down."*

## 🤖 What is this?

This is a fork of [Strudel](https://strudel.cc) (the amazing live coding music environment) with an **AI Agent** that generates Strudel code from natural language descriptions.

**Plot twist:** This entire fork was built using AI (Windsurf + Claude Sonnet 4). Yes, I used AI to build an AI agent. The snake is eating its own tail. The recursion is beautiful.

### The Origin Story

Picture this: A lazy afternoon, scrolling through TikTok, stumbling upon cool Strudel live coding videos. "That looks fun!" I thought. Then I saw the documentation. Mini-notation? Euclidean rhythms? Banks? 

*Nah.*

What if I could just tell an AI "make a techno beat with some acid bass" and it would figure out all that syntax nonsense for me?

**3 hours of vibe coding later:** Here we are.

---

## ✨ What's New (vs Original Strudel)

| Feature | Description |
|---------|-------------|
| 🤖 **AI Agent Tab** | New panel tab where you describe music in plain English |
| 🧠 **LLM Integration** | Connects to OpenAI-compatible APIs (GPT-4, Claude, local LLMs) |
| 📝 **Engineered System Prompt** | 200+ lines of carefully crafted prompt with Strudel knowledge |
| 🎯 **Grounded Generation** | Anti-hallucination rules to prevent invalid code |
| 📚 **Music Theory Context** | The AI knows scales, chords, BPM, time signatures |
| 🔄 **Iterative Building** | Add to existing code without losing previous patterns |
| 💾 **History Panel** | Track and replay your AI-generated patterns |
| ⚙️ **Configurable via .env** | API keys and settings without touching code |

---

## 🛠️ How It Works

```
You: "Create a techno beat with 909 drums and acid bassline"
     ↓
AI Agent: *reads 200 lines of Strudel documentation I embedded*
     ↓
Strudel Code: stack(
               s("bd*4").bank("RolandTR909"),
               s("~ sd ~ sd").bank("RolandTR909"),
               note("c2 c2 c2 eb2").s("sawtooth").lpf(800)
             )
     ↓
🎵 Music plays automatically
```

The AI has been trained (via prompt engineering) to:
- ✅ Always use `.s("sawtooth")` with `note()` (or it's silence)
- ✅ Apply `.bank()` only to drums, not synths
- ✅ Keep multiplication inside quotes (`s("bd*4")` not `s("bd")*4`)
- ✅ Preserve existing code when adding new elements
- ✅ Use only real Strudel samples and functions
- ❌ NOT hallucinate non-existent sounds like "noise_burst"
- ❌ NOT use broken functions like `.every()`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer
- [pnpm](https://pnpm.io/installation)
- An OpenAI API key (or compatible: Anthropic, local LLMs, Azure)

### Installation

```bash
# Clone this fork
git clone https://github.com/andresmallada/strudel-ai.git
cd strudel-ai

# Install dependencies
pnpm i

# Configure AI Agent (required for AI features)
cd website
cp .env.example .env
# Edit .env with your API key:
# PUBLIC_LLM_API_KEY=sk-your-key-here
# PUBLIC_LLM_API_URL=https://api.openai.com/v1/chat/completions
# PUBLIC_LLM_MODEL=gpt-4o-mini

# Start development server (from root folder)
cd ..
pnpm dev
```

### Usage

1. Open `http://localhost:4321` in your browser
2. Click the **AI** tab in the bottom panel
3. Type what you want: *"Create a chill lo-fi beat with piano and vinyl crackle"*
4. Press Enter or click Generate
5. 🎵 Enjoy your AI-generated music

> **Note:** The AI Agent requires an API key. Without it, you can still use all original Strudel features normally.

---

## 🧪 Prompt Engineering Highlights

The system prompt (`website/src/ai/strudel_system_prompt.txt`) includes:

### Anti-Hallucination Rules
```
❌ DON'T use note() without .s() - it won't produce sound
❌ DON'T multiply patterns outside quotes like s("bd")*2 - causes NaN error
❌ DON'T apply .bank() to stacks containing synths - causes "sound not found"
❌ DON'T use .every() - it causes errors in Strudel
❌ DON'T invent sample names - only use documented ones
```

### Music Knowledge
- Mini-notation reference (sequences, rests, euclidean rhythms)
- Available synths: sawtooth, square, triangle, sine, piano
- Drum samples: bd, sd, hh, oh, cp, rim, tom
- Sound banks: RolandTR808, RolandTR909, RolandTR707
- Effects: lpf, hpf, delay, room, gain, pan
- Scales and chords syntax
- BPM/CPS conversion formulas

### Working Examples
The prompt includes tested, working code examples that the LLM can reference.

---

## 📊 Vibe Coding Stats

| Metric | Value |
|--------|-------|
| Human-written code | ~5% |
| AI-generated code | ~95% |
| Documentation read | 0 pages |
| TikTok videos watched | Too many |
| "It works!" moments | 47 |
| "Why doesn't this work?" moments | 312 |
| Cups of coffee | ☕☕☕☕ |

### Tools Used
- **IDE:** [Windsurf](https://codeium.com/windsurf) (Cursor alternative)
- **LLM:** Claude Sonnet 4 (via Windsurf's Cascade)
- **Patience:** Minimal
- **Understanding of what I'm doing:** Questionable

---

## 🎯 Why This Exists

This project is a **meta-demonstration** of AI-assisted development:

1. **AI building AI tools** - Used an AI coding assistant to build an AI music assistant
2. **Vibe coding is real** - You can build functional software by describing what you want
3. **Prompt engineering matters** - The difference between "it works" and "it hallucinates garbage" is in the system prompt
4. **Documentation is optional** - If you're lazy enough, AI will read it for you

Is this the future? Probably. Is it terrifying? A little. Does it make cool music? **Absolutely.**

---

## 📚 Original Strudel Resources

- **Try it online:** <https://strudel.cc>
- **Documentation:** <https://strudel.cc/learn>
- **Technical Blog Post:** <https://loophole-letters.vercel.app/strudel>
- **1 Year of Strudel:** <https://loophole-letters.vercel.app/strudel1year>
- **2 Years of Strudel:** <https://strudel.cc/blog/#year-2>

---

## 🌐 Community

There is a **#strudel** channel on the TidalCycles Discord: <https://discord.com/invite/HGEdXmRkzT>

You can also ask questions on the Tidal Club forum: <https://club.tidalcycles.org/>

Mastodon: <a rel="me" href="https://social.toplap.org/@strudel">social.toplap.org/@strudel</a>

---

## 🙏 Credits

- **Original Strudel** - [strudel.cc](https://strudel.cc) | [Codeberg](https://codeberg.org/uzu/strudel)
  - Created by the amazing Strudel/TidalCycles community
  - All the actual hard work of building a live coding environment
  - See [full list of contributors](https://codeberg.org/uzu/strudel/activity/contributors)
  
- **This Fork** - The "I don't want to read docs" edition
  - 95% generated by Claude Sonnet 4 via Windsurf
  - 5% human debugging and crying
  - 100% powered by laziness and curiosity

---

## 📜 License

Same as original Strudel - [AGPL-3.0](LICENSE)

---

## 🤔 FAQ

**Q: Is this cheating?**  
A: It's called "working smarter, not harder." Also yes.

**Q: Did you learn anything about Strudel?**  
A: Against my will, yes. Turns out you absorb knowledge when debugging AI-generated code.

**Q: Should I use this in production?**  
A: Should you use *anything* I made in production? The answer is always "probably not."

**Q: Can I contribute?**  
A: Sure! Just describe what you want to add in natural language and let the AI do the rest. That's the spirit of this project.

---

*Made with 🎵, 🤖, and a concerning amount of delegation to AI*
