export interface TranscriptMessage {
  id: string;
  sender: 'AI' | 'User' | 'Agent'; // 'Agent' represents the human support agent in the transcript
  text: string;
  isFocus?: boolean; // Highlighted with dashed border
}

export interface FeedbackItem {
  id: string;
  number: number;
  title: string;
  description: string;
  transcript?: TranscriptMessage[]; // Optional, allows specific items to have specific transcripts
}

export interface FeedbackAction {
  id: string;
  title: string;
  description: string;
  transcript: TranscriptMessage[];
  status: 'pending' | 'fixing' | 'fixed' | 'ignored';
}

export interface ChatMessage {
  id: string;
  sender: 'System' | 'User';
  text?: string;
  component?: 'FeedbackCard' | 'FeedbackList';
  data?: any; // Flexible payload for component data
}