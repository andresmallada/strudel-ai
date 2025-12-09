import { useState, useRef, useEffect } from 'react';
import { generateStrudelCode, getLLMConfig, saveLLMConfig, getAPIKey, saveAPIKey, isUsingEnvConfig } from '../../../ai/llmService';
import { Textbox } from '../textbox/Textbox';
import cx from '@src/cx.mjs';

export function AITab({ context }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [history, setHistory] = useState([]);
  
  // Settings state
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [model, setModel] = useState('');
  
  const textareaRef = useRef(null);
  
  // Load settings on mount
  useEffect(() => {
    setApiKey(getAPIKey());
    const config = getLLMConfig();
    setApiUrl(config.apiUrl);
    setModel(config.model);
  }, []);
  
  // Get current code from editor
  const getCurrentCode = () => {
    const editorRef = context.editorRef?.current;
    
    // StrudelMirror has an 'editor' property which is the CodeMirror instance
    const editor = editorRef?.editor;
    console.log('[AITab] editor:', editor);
    console.log('[AITab] editor.state:', editor?.state);
    
    // Get code from CodeMirror state
    const code = editor?.state?.doc?.toString() || '';
    console.log('[AITab] Code found:', code);
    return code;
  };
  
  // Set code in editor and evaluate
  const setCodeAndRun = (code) => {
    if (context.editorRef?.current) {
      context.editorRef.current.setCode(code);
      // Small delay to ensure code is set before evaluation
      setTimeout(() => {
        context.editorRef.current.evaluate();
      }, 100);
    }
  };
  
  // Handle generate request
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const currentCode = getCurrentCode();
      const generatedCode = await generateStrudelCode(prompt, currentCode);
      
      // Add to history
      setHistory(prev => [...prev, { prompt, code: generatedCode }]);
      
      // Set code and run
      setCodeAndRun(generatedCode);
      
      // Clear prompt
      setPrompt('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle clear
  const handleClear = () => {
    if (context.editorRef?.current) {
      context.editorRef.current.setCode('');
      // Stop if playing
      if (context.started) {
        context.handleTogglePlay();
      }
    }
    setHistory([]);
    setPrompt('');
    setError('');
  };
  
  // Handle settings save
  const handleSaveSettings = () => {
    saveAPIKey(apiKey);
    saveLLMConfig({ apiUrl, model });
    setShowSettings(false);
  };
  
  // Handle key press (Enter to submit)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };
  
  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">AI Agent</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm text-foreground opacity-70 hover:opacity-100 px-2 py-1 rounded border border-foreground border-opacity-30"
        >
          {showSettings ? 'Back' : 'Settings'}
        </button>
      </div>
      
      {showSettings ? (
        /* Settings Panel */
        <div className="flex flex-col gap-4 flex-grow overflow-auto">
          {isUsingEnvConfig() && (
            <div className="text-sm text-green-500 p-2 bg-green-500 bg-opacity-10 rounded">
              ✓ Using configuration from .env file
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground opacity-70">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={isUsingEnvConfig() ? "(configured in .env)" : "sk-..."}
              className="w-full p-2 rounded bg-background text-foreground border border-foreground border-opacity-30"
            />
            <p className="text-xs text-foreground opacity-50">
              {isUsingEnvConfig() 
                ? "API key loaded from .env. Enter a value here to override."
                : "Set PUBLIC_LLM_API_KEY in .env or enter your key here."}
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground opacity-70">API URL</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.openai.com/v1/chat/completions"
              className="w-full p-2 rounded bg-background text-foreground border border-foreground border-opacity-30"
            />
            <p className="text-xs text-foreground opacity-50">
              Use OpenAI or any compatible endpoint (Anthropic, local LLMs, etc.)
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground opacity-70">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="gpt-4o-mini"
              className="w-full p-2 rounded bg-background text-foreground border border-foreground border-opacity-30"
            />
          </div>
          
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-foreground text-background rounded hover:opacity-80 mt-2"
          >
            Save Settings
          </button>
        </div>
      ) : (
        /* Main Interface */
        <>
          {/* History */}
          {history.length > 0 && (
            <div className="flex flex-col gap-1 border-b border-foreground border-opacity-20 pb-2 flex-shrink-0">
              <span className="text-xs text-foreground opacity-50">History ({history.length}):</span>
              <div className="flex flex-col gap-1 max-h-24 overflow-y-auto pr-2">
                {history.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="text-xs text-foreground opacity-70 cursor-pointer hover:opacity-100 hover:bg-gray-500 hover:bg-opacity-30 p-1 rounded truncate flex-shrink-0"
                    onClick={() => setCodeAndRun(item.code)}
                    title={item.prompt}
                  >
                    {idx + 1}. {item.prompt}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Area */}
          <div className="flex flex-col gap-2 flex-grow">
            <label className="text-sm text-foreground opacity-70">
              Describe what you want to create or modify:
            </label>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Create a 4/4 techno beat with kick, hi-hats and clap"
              className="flex-grow min-h-[100px] p-3 rounded bg-background text-foreground border border-foreground border-opacity-30 resize-none"
              disabled={isLoading}
            />
            
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-500 bg-opacity-10 rounded">
                {error}
              </div>
            )}
            
            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className={cx(
                  "flex-grow px-4 py-2 rounded font-medium",
                  isLoading || !prompt.trim() 
                    ? "bg-foreground bg-opacity-30 text-foreground opacity-50 cursor-not-allowed" 
                    : "bg-foreground text-background hover:opacity-80"
                )}
              >
                {isLoading ? 'Generating...' : 'Generate & Run'}
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded border border-foreground border-opacity-30 text-foreground hover:bg-foreground hover:bg-opacity-10"
              >
                Clear All
              </button>
            </div>
            
            {/* Help Text */}
            <p className="text-xs text-foreground opacity-50 mt-2">
              Press Enter to generate. The AI will consider your current code when making modifications.
              {!getAPIKey() && (
                <span className="text-yellow-500 ml-1">
                  Configure PUBLIC_LLM_API_KEY in .env or set it in Settings.
                </span>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
