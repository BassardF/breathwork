import type { SectionContent } from '../types';

export const SECTIONS: SectionContent[] = [
  {
    sectionId: 'breath-hold',
    title: 'Static Apnea',
    subtitle: 'Max Breath Hold Training',
    whySummary:
      'A static apnea test measures your breath-hold duration after a full exhale. It is the most direct measure of your body\u2019s ability to tolerate both rising CO\u2082 and falling O\u2082 under resting conditions. Tracking this baseline over weeks reveals physiological adaptations: increased oxygen storage capacity (via spleen contraction and hemoglobin), improved CO\u2082 tolerance, and more efficient oxygen utilization by tissues.',
    whyDetails: [
      'When you hold your breath, two things happen simultaneously: CO\u2082 builds up (which creates the urge to breathe) and O\u2082 depletes (which eventually causes loss of consciousness). Your personal best represents how long you can manage both before the urge becomes overwhelming.',
      'Regular practice triggers the mammalian dive reflex \u2014 a set of autonomic responses including bradycardia (slowed heart rate), peripheral vasoconstriction (redirecting blood to vital organs), and spleen contraction (releasing stored red blood cells for extra oxygen carrying capacity).',
      'Research on competitive breath-hold divers (Lindholm & Lundgren, 2006) found that elite athletes can hold their breath until end-tidal PO\u2082 drops to ~27 mmHg \u2014 levels that would cause unconsciousness in untrained individuals. This demonstrates that the brain itself can adapt to extreme hypoxia.',
      'Mental resilience is a real training effect. Learning to remain calm while your diaphragm contracts and your body signals for air builds interoceptive awareness \u2014 the ability to sense and regulate internal bodily states. This skill transfers to stress management in daily life.',
      'Consistent weekly testing (never daily \u2014 your nervous system needs recovery) produces reliable trend data. A 5-10% improvement over 4-6 weeks is typical for beginners who train twice per week with proper recovery.',
    ],
    howSummary:
      'Begin with a 10-second ready phase to settle your breath and heart rate. Take a normal breath (do not hyperventilate \u2014 this is dangerous), exhale fully, and hold. Relax every muscle. When the urge to breathe becomes strong, stop the timer and breathe normally.',
    howSteps: [
      'Find a safe space: seated or lying down on a couch, bed, or mat. Never practice breath holds in or near water without a trained safety buddy.',
      'Sit or lie in a comfortable position. Close your eyes and take 2-3 slow, natural breaths to settle into relaxation.',
      'Take a normal, comfortable breath in, then exhale fully but gently \u2014 do not force all air out. This is your starting point for a consistent baseline.',
      'Begin the hold. Relax your entire body: jaw, shoulders, hands, legs. If you feel tension anywhere, consciously release it.',
      'During the hold, if you feel diaphragm contractions (the urge to breathe), acknowledge them without reacting. Stay mentally present. If discomfort escalates, end the hold calmly.',
      'When you stop, exhale and then breathe normally. Do not gasp or take huge breaths \u2014 let your breathing return naturally. Wait at least 2-3 minutes before another attempt.',
    ],
    tips: [
      'Always practice in a safe environment \u2014 seated or lying down, never in water.',
      'Exhale fully before starting your hold for a consistent baseline.',
      'Relax your body completely \u2014 tension burns oxygen.',
      'Do not push to the point of discomfort or gasping. The goal is a calm, controlled hold.',
      'Wait at least 2-3 minutes between attempts to recover fully and clear CO\u2082.',
      'Never hyperventilate before a hold \u2014 it depletes CO\u2082 and increases blackout risk without adding oxygen.',
      'Train max 2-3 times per week. Your nervous system adapts during rest, not during training.',
    ],
    relatedConcepts: ['co2-tolerance', 'hypoxic-response', 'dive-reflex', 'spleen-response'],
    relatedGoals: ['hold-longer', 'track-progress', 'mental-resilience'],
  },
  {
    sectionId: 'co2',
    title: 'CO\u2082 Tolerance Table',
    subtitle: 'Fixed Hold, Descending Rest',
    whySummary:
      'A CO\u2082 table trains your ability to function under rising carbon dioxide levels. Each round keeps the hold duration constant while reducing rest time. This means each successive round starts with a higher baseline CO\u2082 level, forcing your respiratory control system to adapt to hypercapnia without triggering panic.',
    whyDetails: [
      'The primary drive to breathe comes from CO\u2082 chemoreceptors in the brainstem, not from low oxygen. As CO\u2082 rises, pH drops, and your brain signals the diaphragm to contract. CO\u2082 table training raises your threshold for this reflex \u2014 you can stay comfortable at CO\u2082 levels that would previously have caused breathlessness.',
      'Each round, your rest window shrinks (by 15s by default). Less recovery means more CO\u2082 carryover from the previous hold. By round 6-8, you are breathing against a significant CO\u2082 load, teaching your nervous system to stay calm under respiratory stress.',
      'Practitioners of spearfishing and competitive freediving use CO\u2082 tables extensively. Studies show that 4-6 weeks of bi-weekly CO\u2082 table training can reduce resting respiratory rate and increase breath-hold duration by 20-40% in novice subjects.',
      'The fixed hold duration (typically 50% of your max breath hold) ensures safety \u2014 you never push into hypoxic territory. The challenge is purely CO\u2082-driven, which makes this one of the safest breath-hold training modalities.',
      'Beyond freediving, CO\u2082 tolerance training may benefit athletes in sports that involve breath control, such as swimming, rowing, and endurance running, as well as individuals with anxiety disorders characterized by respiratory sensitivity.',
    ],
    howSummary:
      'Set your hold duration (as a percentage of your max breath hold) and starting rest time. Each round you hold for the same duration while rest decreases. Complete all 8 rounds by breathing calmly during rest and relaxing completely during holds.',
    howSteps: [
      'Determine your current max breath hold (use the Max Breath Hold section first). Set hold percentage to 50% for your first session.',
      'Set initial rest to roughly double your max hold time (e.g., if your hold is 60s, start with 120s rest). Set rest decrement to 15s per round.',
      'Review the 8-round preview. The first few rounds should feel easy. If round 1 feels hard, lower the hold percentage.',
      'Press Start. During rest phases, breathe calmly with slow, deep belly breaths. Do not pant or hyperventilate.',
      'When the hold phase begins, relax completely. You know exactly how long this hold will last \u2014 pace your relaxation to match.',
      'If a round feels too easy in future sessions, increase hold percentage by 5%. If too hard, decrease it. The goal is completing all 8 rounds.',
      'When the session completes, log your results. Track your settings week over week \u2014 increasing hold percentage over time is how progress looks.',
    ],
    tips: [
      'Start with a hold duration around 50% of your max breath hold for a comfortable first session.',
      'Breathe calmly during rest \u2014 slow, deep belly breaths, not rapid panting.',
      'If a round feels too easy, increase the hold percentage. If too hard, decrease it.',
      'Consistency matters more than intensity \u2014 aim to complete all 8 rounds.',
      'The last 2-3 rounds are where adaptation happens. Stay mentally present.',
      'Log your sessions to track how your CO\u2082 tolerance improves over time.',
      'CO\u2082 tables can be done 3-4 times per week since they avoid deep hypoxia.',
    ],
    relatedConcepts: ['co2-tolerance', 'hypercapnia-drive', 'bohr-effect'],
    relatedGoals: ['hold-longer', 'reduce-panic', 'better-recovery'],
  },
  {
    sectionId: 'o2',
    title: 'O\u2082 Tolerance Table',
    subtitle: 'Fixed Rest, Rising Hold',
    whySummary:
      'An O\u2082 table trains your body to function under progressive oxygen debt. Rest stays constant while hold time increases each round. Unlike CO\u2082 tables (which challenge your CO\u2082 tolerance), O\u2082 tables push you closer to hypoxia, teaching your brain and body to maintain composure as O\u2082 saturation drops.',
    whyDetails: [
      'During each hold, your body consumes oxygen. The longer the hold, the lower your blood O\u2082 saturation drops before you recover. By round 6-8, you are starting each hold from a slightly lower baseline \u2014 the final rounds are where the real adaptation happens.',
      'Hypoxic training stimulates the production of erythropoietin (EPO), which increases red blood cell count and improves oxygen carrying capacity. This is the same mechanism behind altitude training, but without needing to travel to altitude.',
      'The mammalian dive reflex becomes more pronounced with O\u2082 table training: your heart rate slows more rapidly during holds, blood vessels in extremities constrict more efficiently, and your spleen releases stored red blood cells more readily. These are trained autonomic responses.',
      'O\u2082 tables require more recovery between sessions than CO\u2082 tables because they stress the hypoxic pathway more intensely. Skip at least one day between sessions to allow your nervous system to fully recover.',
      'Research on elite freedivers shows that O\u2082 table training increases breath-hold time not just by improving oxygen efficiency, but by reducing the brain\u2019s oxygen consumption itself \u2014 a form of metabolic down-regulation that has parallels in meditation and cold exposure.',
    ],
    howSummary:
      'Set your rest duration and max hold target (as a percentage of your PB). Hold time increases each round from a starting percentage up to your max target. Rest stays the same every round. Breathe calmly during rest and focus on relaxation during holds.',
    howSteps: [
      'Record your max breath hold first. Set rest duration to 2-3 minutes. Set max hold target to 60-70% of your PB for your first session.',
      'Set starting hold to ~30% of PB \u2014 the first 2-3 rounds should feel easy and serve as warm-up.',
      'Review the preview to understand how hold times ramp up. The increments are automatic and evenly spaced across 8 rounds.',
      'Press Start. During rest, practice slow diaphragmatic breathing. Your heart rate should drop noticeably during these recovery windows.',
      'During holds, scan your body for tension. The urge to breathe may come earlier than in CO\u2082 tables \u2014 that is the O\u2082 drive. Stay calm.',
      'If you cannot complete the final round, lower your max hold target next time. If you finish easily, increase it by 5%.',
      'After the session, recover with normal breathing for a few minutes before standing up. Your O\u2082 saturation takes time to normalize.',
    ],
    tips: [
      'Set your rest duration long enough to feel recovered between rounds (2-3 minutes is a good start).',
      'Start with a conservative max hold target around 60-70% of your PB.',
      'Focus on relaxation during holds \u2014 a still body consumes less oxygen.',
      'The last 2-3 rounds are where the adaptation happens. Push gently.',
      'Skip a day between O\u2082 table sessions \u2014 your nervous system needs recovery time.',
      'If you feel dizzy or lightheaded after a hold, extend your rest time next session.',
      'Combine O\u2082 tables with CO\u2082 tables on alternating days for balanced training.',
    ],
    relatedConcepts: ['hypoxic-response', 'dive-reflex', 'spleen-response', 'bohr-effect'],
    relatedGoals: ['hold-longer', 'track-progress', 'mental-resilience'],
  },
  {
    sectionId: 'pattern',
    title: 'Breathing Patterns',
    subtitle: 'Guided Rhythm Work',
    whySummary:
      'Conscious breathing patterns regulate the autonomic nervous system by directly influencing heart rate variability (HRV), vagal tone, and the balance between sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) activity. Different ratios of inhale, hold, and exhale produce distinct physiological effects.',
    whyDetails: [
      'Extending the exhale relative to the inhale activates the parasympathetic nervous system. This is because exhale is the only phase of breathing under passive control of the vagus nerve \u2014 longer exhales mean more vagal activation, which slows heart rate and lowers blood pressure.',
      'Box breathing (4-4-4-4) was developed by Navy SEALs for operational performance under extreme stress. The equal ratios create a predictable rhythm that the brain can anchor to, reducing anxiety and improving cognitive performance in high-pressure situations.',
      'The 4-7-8 pattern (Dr. Andrew Weil\u2019s \u201CRelaxing Breath\u201D) uses a 7-second hold after inhale to maximize oxygen loading and an 8-second exhale to maximize vagal activation. It is clinically used as a non-pharmacological intervention for insomnia and anxiety.',
      'Cardiac coherence breathing (5-5, 6 breaths per minute) resonates at ~0.1 Hz, which is the natural resonant frequency of the cardiovascular system. At this rate, heart rate oscillations synchronize with breathing, maximizing HRV and baroreflex efficiency.',
      'Pranayama \u2014 the yogic science of breath control \u2014 describes thousands of patterns (kumbhakas) developed over millennia. Modern research confirms that slow breathing techniques reduce cortisol, improve emotional regulation, and enhance vagal tone in as little as 5 minutes of daily practice.',
    ],
    howSummary:
      'Select a preset pattern or create a custom one. Choose a session duration (5-20 minutes). Follow the guided phases: the circle animation shows you when to inhale, hold, or exhale. Stay with the rhythm \u2014 let the pattern lead.',
    howSteps: [
      'Choose a preset pattern from the list \u2014 Box Breathing for focus, 4-7-8 for relaxation, or Cardiac Coherence for HRV training.',
      'Review the phase durations shown in the preview. Each phase name and duration is displayed so you know what to expect.',
      'Select your session duration. Shorter sessions (5 min) are good for beginners or quick resets; longer sessions (15-20 min) create deeper physiological change.',
      'Press Start. Follow the guided animation: inhale as the circle expands, hold when it pauses, exhale as it contracts. Do not force the breath \u2014 let it be smooth.',
      'If your mind wanders, gently bring attention back to the circle. Counting the seconds mentally can help maintain focus.',
      'When the session ends, take a moment to notice how you feel. A few natural breaths before returning to activity.',
      'To create a custom pattern, tap \u201CCustom pattern\u201D and define your own phase sequence. You can save it for future sessions.',
    ],
    tips: [
      'Start with 5-minute sessions and gradually increase duration as the pattern becomes familiar.',
      'Breathe through your nose for most patterns \u2014 nasal breathing filters, warms, and regulates airflow.',
      'Do not force your breath to exactly match the timing. If 4 seconds feels too fast, find a comfortable rhythm and grow into the pattern.',
      'Consistency beats intensity \u2014 5 minutes daily is more effective than 20 minutes once a week.',
      'Use patterns as a transition tool: before sleep (4-7-8), before a meeting (box breathing), or after exercise (cardiac coherence).',
      'If you feel lightheaded, return to natural breathing and reduce hold durations.',
      'Custom patterns let you experiment with different ratios. A useful starting point: make your exhale 1.5-2x your inhale for calming effects.',
    ],
    relatedConcepts: ['hrv', 'vagal-tone', 'diaphragmatic-breathing', 'nervous-system'],
    relatedGoals: ['reduce-anxiety', 'improve-focus', 'better-sleep', 'stress-management'],
  },
];

export function getSection(sectionId: string): SectionContent | undefined {
  return SECTIONS.find((s) => s.sectionId === sectionId);
}
