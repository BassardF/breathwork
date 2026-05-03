import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { SECTIONS } from '../content/sections';
import { CONCEPTS } from '../content/concepts';
import { GOALS } from '../content/goals';
import type { GoalId } from '../types';
import { LearnArticle } from './LearnArticle';

const ALL_GOAL: GoalId = '__all__';

export function LearnOverview() {
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get('section');
  const conceptParam = searchParams.get('concept');

  const [activeGoal, setActiveGoal] = useState<GoalId>(ALL_GOAL);

  const visibleGoal = GOALS.find((g) => g.goalId === activeGoal);

  const filteredSections = useMemo(() => {
    if (activeGoal === ALL_GOAL) return SECTIONS;
    return SECTIONS.filter((s) => s.relatedGoals.includes(activeGoal));
  }, [activeGoal]);

  const filteredConcepts = useMemo(() => {
    if (activeGoal === ALL_GOAL) return CONCEPTS;
    return CONCEPTS.filter((c) => {
      const goal = GOALS.find((g) => g.goalId === activeGoal);
      if (!goal) return true;
      return goal.recommendedConcepts.includes(c.conceptId);
    });
  }, [activeGoal]);

  return (
    <div className="space-y-8">
      <Card className="space-y-5">
        <div>
          <p className="text-sm font-medium text-white">What do you want to work on?</p>
          <p className="text-xs text-slate-500 mt-1">
            Select a goal to see relevant training sections and physiology concepts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGoal(ALL_GOAL)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              activeGoal === ALL_GOAL
                ? 'bg-sky-200 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            All
          </button>
          {GOALS.map((goal) => (
            <button
              key={goal.goalId}
              type="button"
              onClick={() => setActiveGoal(goal.goalId)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                activeGoal === goal.goalId
                  ? 'bg-sky-200 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
        {visibleGoal ? (
          <div className="rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3">
            <p className="text-xs text-sky-300">{visibleGoal.label}</p>
            <p className="mt-1 text-sm text-slate-400">{visibleGoal.description}</p>
          </div>
        ) : null}
      </Card>

      <Card className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Training Sections</p>
          <span className="text-xs text-slate-600">{filteredSections.length} sections</span>
        </div>
        {filteredSections.length > 0 ? (
          <div className="space-y-1">
            {filteredSections.map((section) => (
              <LearnArticle key={section.sectionId} content={section} type="section" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No sections match this goal.</p>
        )}
      </Card>

      <Card className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Physiology Concepts</p>
          <span className="text-xs text-slate-600">{filteredConcepts.length} concepts</span>
        </div>
        {filteredConcepts.length > 0 ? (
          <div className="space-y-1">
            {filteredConcepts.map((concept) => (
              <LearnArticle key={concept.conceptId} content={concept} type="concept" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No concepts match this goal.</p>
        )}
      </Card>

      {sectionParam ? (
        <div id={`section-${sectionParam}`} />
      ) : null}
      {conceptParam ? (
        <div id={`concept-${conceptParam}`} />
      ) : null}
    </div>
  );
}
