/**
 * Mock Response Service
 * Provides intelligent, contextual responses for demo purposes
 * No API calls, zero cost, consistent demo experience
 */

interface ResponsePattern {
  keywords: string[];
  responses: string[];
}

const RESPONSE_PATTERNS: ResponsePattern[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    responses: [
      "Hi! I'm Telli, your AI assistant for improving customer service conversations. I can help analyze tone, clarity, and empathy in agent interactions. What would you like to explore?",
      "Hello! I specialize in improving customer service quality. I can suggest tone adjustments, clarity fixes, or empathy improvements. How can I help today?",
    ]
  },
  {
    keywords: ['help', 'what can you do', 'capabilities', 'features'],
    responses: [
      "I can analyze customer service conversations and provide actionable feedback. I help with tone consistency, clarity improvements, and empathy enhancements. Want to see some suggestions?",
      "I specialize in three key areas: adjusting conversation tone, fixing unclear explanations, and boosting empathy. I can also run quality assurance checks on your transcripts. What interests you?",
    ]
  },
  {
    keywords: ['agent', 'conversation', 'call', 'transcript'],
    responses: [
      "I've reviewed the Sky Entertainment conversation. I can help improve the agent's tone, clarify complex explanations, or add more empathy. What would you like to focus on?",
      "Looking at this customer interaction, there are opportunities to improve clarity and empathy. I can suggest specific changes. Would you like to see my feedback?",
    ]
  },
  {
    keywords: ['quality', 'check', 'test', 'analyze', 'review'],
    responses: [
      "I can run quality assurance checks on tone consistency, brand safety, and grammar. I also provide targeted feedback on specific conversation moments. Want me to analyze something?",
      "Quality checks are one of my specialties! I can examine tone patterns, verify brand alignment, and spot clarity issues. What aspect should I focus on?",
    ]
  },
  {
    keywords: ['problem', 'issue', 'wrong', 'bad'],
    responses: [
      "I can help identify issues in the conversation. Common problems include inconsistent tone, unclear explanations, or low empathy. Would you like me to provide specific improvement suggestions?",
      "Let me help fix that. I can suggest tone adjustments, clarity improvements, or empathy boosts to address the issue. What should I focus on?",
    ]
  },
  {
    keywords: ['sky', 'entertainment', 'netflix', 'package'],
    responses: [
      "The Sky Entertainment explanation could be clearer. I can help simplify complex product details and improve how the agent communicates packages. Want to see a clarity fix?",
      "I notice the Sky package explanation needs work. I can suggest ways to make it more understandable and improve the overall clarity. Interested in feedback?",
    ]
  },
  {
    keywords: ['empathy', 'emotional', 'feeling', 'customer'],
    responses: [
      "Empathy is crucial in customer service. I can suggest ways to make the agent sound more understanding and patient. Would you like to see an empathy boost suggestion?",
      "Great point about empathy! I can help the agent acknowledge customer concerns more gracefully and respond with better emotional intelligence. Want specific examples?",
    ]
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'awesome', 'good'],
    responses: [
      "You're welcome! Let me know if you'd like to improve any other aspects of the conversation. I'm here to help with tone, clarity, or empathy adjustments.",
      "Happy to help! Feel free to ask for more feedback or quality checks anytime. I can analyze tone, fix clarity issues, or boost empathy.",
    ]
  }
];

// Fallback responses when no pattern matches
const FALLBACK_RESPONSES = [
  "I can help you improve customer service conversations. Try asking me to analyze the tone, fix clarity issues, or suggest empathy improvements.",
  "I specialize in improving agent conversations. I can help with tone adjustments, clarity fixes, or empathy boosts. What would you like to explore?",
  "I'm here to help improve your agent's performance. I can analyze conversations, suggest improvements, and run quality checks. How can I assist?",
  "Let me help enhance this conversation. I can work on tone consistency, clarity improvements, or adding more empathy. What interests you?",
];

// Responses that naturally guide users toward triggering the feedback system
const GUIDED_RESPONSES = [
  "Based on the conversation, I see opportunities to improve the tone and clarity. Would you like me to suggest some specific changes?",
  "I can help fix several aspects of this interaction. Want me to show you feedback on tone, clarity, and empathy?",
  "There are a few ways we could improve this conversation. I can suggest tone adjustments, clarity fixes, or empathy boosts. Interested?",
];

let responseIndex = 0;
let guidedResponseIndex = 0;

/**
 * Generates a contextual mock response based on user input
 */
export const generateMockResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Check each pattern for keyword matches
  for (const pattern of RESPONSE_PATTERNS) {
    const hasMatch = pattern.keywords.some(keyword =>
      lowerMessage.includes(keyword)
    );

    if (hasMatch) {
      // Rotate through available responses for variety
      const response = pattern.responses[responseIndex % pattern.responses.length];
      responseIndex++;
      return response;
    }
  }

  // Every 3rd fallback, use a guided response to nudge toward trigger words
  if (guidedResponseIndex % 3 === 2) {
    const response = GUIDED_RESPONSES[guidedResponseIndex % GUIDED_RESPONSES.length];
    guidedResponseIndex++;
    return response;
  }

  // Use regular fallback
  const response = FALLBACK_RESPONSES[guidedResponseIndex % FALLBACK_RESPONSES.length];
  guidedResponseIndex++;
  return response;
};

/**
 * Simulates typing delay for more realistic demo
 */
export const simulateTypingDelay = (text: string): number => {
  // Base delay + random variance (feels more human)
  const baseDelay = 800;
  const variance = Math.random() * 400;
  return baseDelay + variance;
};
