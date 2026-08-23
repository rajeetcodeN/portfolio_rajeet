
export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  longDescription?: string;
  architecture?: string[]; // Array of steps for the diagram
}

export interface Job {
  role: string;
  company: string;
  period: string;
  description: string;
  tools: string[];
  type: 'Production' | 'Internal' | 'Client' | 'Education' | 'Certification';
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  code: string;
  description: string;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  stack: string[];
  link: string;
  views?: number;
}