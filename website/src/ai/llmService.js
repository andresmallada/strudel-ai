/**
 * LLM Service for Strudel AI
 * Handles communication with OpenAI-compatible LLM APIs
 * 
 * Configuration priority:
 * 1. localStorage (user overrides from UI)
 * 2. Environment variables (.env file)
 * 3. Default values
 */

import systemPrompt from './strudel_system_prompt.txt?raw';

// Environment variables (from .env file)
// Astro uses PUBLIC_ prefix for client-side env vars
const ENV_CONFIG = {
  apiKey: import.meta.env.PUBLIC_LLM_API_KEY || '',
  apiUrl: import.meta.env.PUBLIC_LLM_API_URL || 'https://api.openai.com/v1/chat/completions',
  model: import.meta.env.PUBLIC_LLM_MODEL || 'gpt-4o-mini',
};

// Debug: log if env is loaded (remove in production)
if (typeof window !== 'undefined') {
  console.log('[Strudel AI] ENV config loaded:', {
    hasApiKey: !!ENV_CONFIG.apiKey,
    apiUrl: ENV_CONFIG.apiUrl,
    model: ENV_CONFIG.model
  });
}

// Default configuration
const DEFAULT_CONFIG = {
  apiUrl: ENV_CONFIG.apiUrl,
  model: ENV_CONFIG.model,
  //maxTokens: 4096,
  temperature: 0.3, 
};

/**
 * Get LLM configuration
 * Priority: localStorage > .env > defaults
 */
export function getLLMConfig() {
  const stored = localStorage.getItem('strudel-ai-config');
  if (stored) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    } catch (e) {
      console.error('Failed to parse LLM config:', e);
    }
  }
  return DEFAULT_CONFIG;
}

/**
 * Save LLM configuration to localStorage (overrides .env)
 */
export function saveLLMConfig(config) {
  localStorage.setItem('strudel-ai-config', JSON.stringify(config));
}

/**
 * Get API key
 * Priority: localStorage > .env
 */
export function getAPIKey() {
  return localStorage.getItem('strudel-ai-api-key') || ENV_CONFIG.apiKey;
}

/**
 * Save API key to localStorage (overrides .env)
 */
export function saveAPIKey(key) {
  localStorage.setItem('strudel-ai-api-key', key);
}

/**
 * Check if API key is configured (either in .env or localStorage)
 */
export function isAPIKeyConfigured() {
  return !!(getAPIKey());
}

/**
 * Check if using .env configuration
 */
export function isUsingEnvConfig() {
  return !!ENV_CONFIG.apiKey && !localStorage.getItem('strudel-ai-api-key');
}

/**
 * Clean the LLM response to extract pure Strudel code
 */
function cleanResponse(text) {
  // Remove markdown code blocks if present
  let cleaned = text.trim();
  
  // Remove ```javascript or ```js or ``` blocks
  cleaned = cleaned.replace(/^```(?:javascript|js|strudel)?\n?/i, '');
  cleaned = cleaned.replace(/\n?```$/i, '');
  
  // Remove any leading/trailing whitespace again
  cleaned = cleaned.trim();
  
  return cleaned;
}

/**
 * Generate Strudel code using LLM
 * @param {string} userRequest - Natural language description
 * @param {string} currentCode - Current code in the editor (for context)
 * @returns {Promise<string>} - Generated Strudel code
 */
export async function generateStrudelCode(userRequest, currentCode = '') {
  const config = getLLMConfig();
  const apiKey = getAPIKey();
  
  if (!apiKey) {
    throw new Error('API key not configured. Please set your API key in the AI Agent settings.');
  }
  
  // Build the user message with context if available
  let userMessage = userRequest;
  if (currentCode && currentCode.trim()) {
    userMessage = `Current code in editor:
\`\`\`
${currentCode}
\`\`\`

User request: ${userRequest}

If modifying, return the COMPLETE code including existing parts AND your additions. Use stack() to combine patterns if needed.`;
  }
  
  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: userMessage
    }
  ];
  
  // Debug: mostrar qué se envía al LLM
  console.log('[Strudel AI] === MENSAJE ENVIADO AL LLM ===');
  console.log('[Strudel AI] Código actual en editor:', currentCode ? `\n${currentCode}` : '(vacío)');
  console.log('[Strudel AI] Petición del usuario:', userRequest);
  console.log('[Strudel AI] Mensaje completo:', userMessage);
  console.log('[Strudel AI] ================================');
  
  try {
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages,
        max_tokens: config.maxTokens,
        temperature: config.temperature
      })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;
    
    if (!generatedText) {
      throw new Error('No response generated from LLM');
    }
    
    return cleanResponse(generatedText);
  } catch (error) {
    console.error('LLM API Error:', error);
    throw error;
  }
}
