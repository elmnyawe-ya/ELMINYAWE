
import type { AIMessage } from '../types';

// OpenRouter models configuration
const OPENROUTER_MODELS = [
  {
    id: 'tngtech/deepseek-r1t2-chimera:free',
    apiKey: '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',
    name: 'DeepSeek R1T2 Chimera'
  },
  {
    id: 'z-ai/glm-4.5-air:free',
    apiKey: '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',
    name: 'GLM 4.5 Air'
  },
  {
    id: 'tngtech/deepseek-r1t-chimera:free',
    apiKey: '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',
    name: 'DeepSeek R1T Chimera'
  }
];

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const getAIChatResponse = async (messages: AIMessage[], modelId: string): Promise<string> => {
  try {
    // Find the model configuration
    const modelConfig = OPENROUTER_MODELS.find(m => m.id === modelId) || OPENROUTER_MODELS[0];
    
    // Format messages for OpenRouter API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    // Make API call to OpenRouter
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${modelConfig.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ELMINYAWE Developer Hub'
      },
      body: JSON.stringify({
        model: modelConfig.id,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    
    throw new Error('Invalid response format from OpenRouter API');
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    
    // Fallback to mock response
    const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

    if (lastUserMessage.includes('hello') || lastUserMessage.includes('hi')) {
      return "Hello! I'm ELMINYAWE AI, powered by OpenRouter. How can I assist you today?";
    }
    if (lastUserMessage.includes('code')) {
      return "I can help you with code! Here's a futuristic JavaScript example:\n\n```javascript\nconst elminyawe = {\n  theme: 'black-red',\n  effects: ['holographic', 'glitch'],\n  cursor: 'programming-symbols'\n};\n```";
    }
    if (lastUserMessage.includes('elminyawe')) {
      return "ELMINYAWE is a cutting-edge developer hub featuring AI-powered chat, holographic effects, and a stunning black & red theme. It's where innovation meets design!";
    }
    
    return `Error: ${error instanceof Error ? error.message : String(error)}\n\nPlease check your internet connection or try again later.`;
  }
};

// Export available models
export const getAvailableModels = () => {
  return OPENROUTER_MODELS.map(model => ({
    id: model.id,
    name: model.name
  }));
};
