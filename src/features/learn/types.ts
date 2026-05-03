import type { TrainingType } from '../../types/domain';

export type ConceptId = string;

export interface SectionContent {
  sectionId: TrainingType;
  title: string;
  subtitle: string;
  whySummary: string;
  whyDetails: string[];
  howSummary: string;
  howSteps: string[];
  tips: string[];
  relatedConcepts: ConceptId[];
  relatedGoals: GoalId[];
}

export interface ConceptContent {
  conceptId: ConceptId;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  relatedSections: TrainingType[];
}

export type GoalId = string;

export interface GoalEntry {
  goalId: GoalId;
  label: string;
  description: string;
  recommendedSections: TrainingType[];
  recommendedConcepts: ConceptId[];
}
