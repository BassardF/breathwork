import type { ConceptContent } from '../types';

export const CONCEPTS: ConceptContent[] = [
  {
    conceptId: 'co2-tolerance',
    title: 'CO\u2082 Tolerance',
    summary:
      'The ability to tolerate elevated carbon dioxide levels without experiencing distress or an overwhelming urge to breathe. This is the primary adaptation from CO\u2082 table training and a key factor in breath-hold extension.',
    sections: [
      {
        heading: 'What is CO\u2082 tolerance?',
        body: 'Your brainstem has chemoreceptors that detect CO\u2082 levels in the blood. When CO\u2082 rises, it dissolves into carbonic acid, lowering blood pH. The brain interprets this as a need to breathe \u2014 this is the primary respiratory drive, far stronger than the oxygen drive. CO\u2082 tolerance means your brain raises its threshold for triggering this reflex, allowing you to stay comfortable at higher CO\u2082 levels.',
      },
      {
        heading: 'How do you train it?',
        body: 'CO\u2082 tables expose you to progressively shorter recovery windows, causing CO\u2082 to accumulate across rounds. Over weeks, your chemoreceptors become less sensitive to CO\u2082, and your diaphragm learns to operate under higher CO\u2082 loads without spasming or panicking. This adaptation happens at the level of the medulla oblongata and does not require changes in lung function.',
      },
      {
        heading: 'Why it matters beyond breath holding',
        body: 'Low CO\u2082 tolerance is linked to panic disorder and anxiety sensitivity. Many panic attacks are triggered by the sensation of breathlessness \u2014 which is really a CO\u2082 sensitivity. Training CO\u2082 tolerance can reduce the intensity of anxiety responses and improve emotional regulation.',
      },
    ],
    relatedSections: ['co2', 'breath-hold'],
  },
  {
    conceptId: 'hypoxic-response',
    title: 'Hypoxic Response',
    summary:
      'The body\u2019s physiological response to low oxygen levels. Understanding hypoxia is critical for safe breath-hold training \u2014 it is the mechanism behind blackout risk and also the driver of powerful adaptations like increased red blood cell production.',
    sections: [
      {
        heading: 'What is hypoxia?',
        body: 'Hypoxia is a state of insufficient oxygen reaching the tissues. In breath-hold training, it refers specifically to hypoxic hypoxia \u2014 low oxygen partial pressure in arterial blood. Unlike the CO\u2082 drive (which you can feel as an urge to breathe), hypoxia produces no subjective sensation before consciousness is lost. This is what makes it dangerous.',
      },
      {
        heading: 'The hypoxic ventilatory response',
        body: 'The body does have oxygen sensors \u2014 the carotid and aortic bodies \u2014 but their signal is weaker than the CO\u2082 signal. When O\u2082 drops, they trigger increased breathing, but this response is easily overridden by a low CO\u2082 level. After hyperventilation, the CO\u2082 drive is silenced while the hypoxic drive is too weak to protect you, creating the exact conditions for shallow water blackout.',
      },
      {
        heading: 'Adaptations to hypoxic training',
        body: 'Repeated controlled exposure to mild hypoxia (as in O\u2082 tables) stimulates: (1) increased erythropoietin (EPO) production, boosting red blood cell count by 5-15%, (2) improved mitochondrial efficiency \u2014 your cells extract more energy per molecule of oxygen, (3) cerebral metabolic down-regulation \u2014 the brain learns to function on less oxygen. These are the same adaptations targeted by altitude training camps.',
      },
      {
        heading: 'Safety critical',
        body: 'Never train hypoxia alone. The first sign of hypoxia is often unconsciousness, not discomfort. This is why O\u2082 tables \u2014 which push toward hypoxia \u2014 should use conservative hold percentages (60-70% of PB) and never be performed without a safety partner or in water. If you feel tingling, tunnel vision, or confusion during a hold, end it immediately.',
      },
    ],
    relatedSections: ['o2', 'breath-hold'],
  },
  {
    conceptId: 'dive-reflex',
    title: 'Mammalian Dive Reflex',
    summary:
      'An evolutionarily ancient set of autonomic responses shared by all mammals that optimizes oxygen usage during breath holding. Triggered by facial contact with cold water and breath holding, it is the foundation of many breath-hold adaptations.',
    sections: [
      {
        heading: 'What is the dive reflex?',
        body: 'When you hold your breath and especially when your face contacts cool water, three things happen automatically: (1) bradycardia \u2014 heart rate slows by 10-50% to conserve oxygen, (2) peripheral vasoconstriction \u2014 blood vessels in extremities constrict, shunting oxygen-rich blood to the brain and heart, (3) spleen contraction \u2014 the spleen releases stored oxygenated red blood cells into circulation.',
      },
      {
        heading: 'Training the reflex',
        body: 'The dive reflex is partially trainable. Experienced freedivers show a stronger, faster bradycardia response than beginners. This means the reflex strengthens with practice \u2014 your heart learns to slow down more efficiently during holds. Dry land breath-hold training (without water) still triggers the reflex, though less intensely than cold water immersion.',
      },
      {
        heading: 'The role of relaxation',
        body: 'Tension inhibits the dive reflex. If your muscles are tight, your sympathetic nervous system stays active, maintaining a high heart rate and blunting the reflex. This is why relaxation is the single most important skill in breath-hold training \u2014 it is not just about comfort, it is about unlocking your physiological potential.',
      },
    ],
    relatedSections: ['breath-hold', 'o2'],
  },
  {
    conceptId: 'spleen-response',
    title: 'Spleen Contraction & Oxygen Reserve',
    summary:
      'The spleen stores ~200-250 mL of oxygenated red blood cells and can contract under stress (including breath holding) to release them into circulation, effectively giving you an oxygen \u201Cbonus\u201D during a hold.',
    sections: [
      {
        heading: 'How the spleen works',
        body: 'The spleen acts as a reserve tank of concentrated red blood cells. In a normal resting state, it holds about 1-3% of your total red blood cell volume. During a breath hold, sympathetic activation causes the spleen to contract, releasing these stored cells and increasing the oxygen carrying capacity of your blood by 5-10% within seconds.',
      },
      {
        heading: 'Training the splenic response',
        body: 'Elite freedivers have been shown to have significantly larger spleen volumes and more forceful spleen contractions than non-divers. This adaptation appears to be both genetic (certain populations, like the Ama divers of Japan, have larger spleens) and trainable through regular breath-hold exposure.',
      },
      {
        heading: 'Time window',
        body: 'The spleen\u2019s oxygen boost is most relevant in holds lasting 60 seconds or longer. For shorter holds, the effect is negligible. This is one reason why the first 30-40 seconds of a hold can feel manageable but the final 20 seconds become progressively harder \u2014 the spleen\u2019s reserve is finite.',
      },
    ],
    relatedSections: ['breath-hold', 'o2'],
  },
  {
    conceptId: 'hypercapnia-drive',
    title: 'The CO\u2082 Respiratory Drive',
    summary:
      'The primary mechanism that forces you to breathe. CO\u2082 dissolves in blood to form carbonic acid, lowering pH. Chemoreceptors in the brainstem detect this pH shift and trigger the diaphragm to contract. This is the signal most people interpret as \u201Cneeding air\u201D.',
    sections: [
      {
        heading: 'How the drive works',
        body: 'Central chemoreceptors in the medulla oblongata are bathed in cerebrospinal fluid. When CO\u2082 rises, it crosses the blood-brain barrier and reacts with water to form H\u207A ions. The chemoreceptors detect this acidification and send signals to the respiratory muscles. This feedback loop is so sensitive that a change of just 2-3 mmHg in arterial CO\u2082 can double your breathing rate.',
      },
      {
        heading: 'Why hyperventilation is dangerous',
        body: 'Hyperventilation blows off CO\u2082, dropping your baseline to below-normal levels (hypocapnia). This artificially silences the CO\u2082 drive. You can then hold your breath until O\u2082 drops dangerously low \u2014 the CO\u2082 alarm never fires because you started below baseline. By the time CO\u2082 builds up enough to trigger the drive, O\u2082 is already critically low. This is the mechanism of shallow water blackout.',
      },
      {
        heading: 'CO\u2082 tolerance vs. suppression',
        body: 'CO\u2082 training does not suppress the drive \u2014 it raises your tolerance threshold. Your brain is still getting the CO\u2082 signal, but it no longer interprets it as an emergency. The diaphragm may contract, but you do not panic. This distinction is important: suppression (hyperventilation) is dangerous; tolerance (training) is adaptive.',
      },
    ],
    relatedSections: ['co2', 'breath-hold'],
  },
  {
    conceptId: 'bohr-effect',
    title: 'The Bohr Effect',
    summary:
      'A physiological phenomenon where rising CO\u2082 levels cause hemoglobin to release oxygen more readily to tissues. This is the molecular mechanism that makes CO\u2082 tolerance training valuable \u2014 by tolerating higher CO\u2082, you improve oxygen delivery.',
    sections: [
      {
        heading: 'What is the Bohr effect?',
        body: 'Named after Christian Bohr (father of Niels Bohr), this effect describes how hemoglobin\u2019s affinity for oxygen decreases as CO\u2082 increases and pH drops. In practical terms: when tissues are producing CO\u2082 (which they always are), the blood passing through them releases oxygen more easily. The more CO\u2082 present, the more oxygen is offloaded.',
      },
      {
        heading: 'Relevance to training',
        body: 'By training yourself to tolerate higher CO\u2082 levels during holds, you shift the oxygen-hemoglobin dissociation curve. This means that at any given O\u2082 level, more oxygen is released to tissues. This is one of the key adaptations that makes freedivers more efficient oxygen users than non-divers.',
      },
      {
        heading: 'Counterpoint: hyperventilation',
        body: 'Hyperventilation has the opposite effect. By lowering CO\u2082, it causes a leftward shift in the dissociation curve \u2014 hemoglobin holds onto oxygen more tightly and releases less to tissues. This means even though your blood may have normal O\u2082 saturation, less oxygen reaches your brain. This further increases blackout risk.',
      },
    ],
    relatedSections: ['co2', 'o2'],
  },
  {
    conceptId: 'hrv',
    title: 'Heart Rate Variability (HRV)',
    summary:
      'The variation in time between consecutive heartbeats. Higher HRV indicates a healthy, responsive autonomic nervous system. Breathing at ~6 breaths per minute (0.1 Hz) maximizes HRV through a phenomenon called respiratory sinus arrhythmia.',
    sections: [
      {
        heading: 'What HRV measures',
        body: 'HRV is not the same as heart rate. Two people with a resting heart rate of 60 BPM can have very different HRV values. HRV measures the subtle variations in beat-to-beat intervals \u2014 a healthy heart does not beat like a metronome. These variations reflect the ongoing push-pull between sympathetic (stress) and parasympathetic (relaxation) branches of your autonomic nervous system.',
      },
      {
        heading: 'Breathing and HRV',
        body: 'When you inhale, your heart rate speeds up slightly; when you exhale, it slows down. This is respiratory sinus arrhythmia (RSA). At normal breathing rates (12-20 breaths/min), RSA contributes modestly to HRV. But at ~6 breaths per minute (0.1 Hz), RSA becomes resonant \u2014 heart rate oscillations amplify dramatically, creating large swings that reflect healthy autonomic function.',
      },
      {
        heading: 'Why HRV matters',
        body: 'High HRV is associated with greater emotional regulation, cognitive flexibility, and physiological resilience. Low HRV is linked to chronic stress, anxiety, depression, and increased cardiovascular risk. Unlike heart rate (which tells you how hard your heart is working), HRV tells you how adaptable your nervous system is. Training with resonant breathing (cardiac coherence) is one of the most effective ways to improve HRV.',
      },
    ],
    relatedSections: ['pattern'],
  },
  {
    conceptId: 'vagal-tone',
    title: 'Vagal Tone & the Parasympathetic System',
    summary:
      'Vagal tone refers to the activity level of the vagus nerve \u2014 the primary nerve of the parasympathetic nervous system. Higher vagal tone means better recovery, lower inflammation, and greater emotional stability. Breathing is the most direct way to influence vagal tone.',
    sections: [
      {
        heading: 'The vagus nerve',
        body: 'The vagus nerve (the 10th cranial nerve) runs from the brainstem to the abdomen, innervating the heart, lungs, and digestive tract. It is the main highway of the parasympathetic nervous system. When vagal tone is high, heart rate slows, digestion improves, inflammation decreases, and you recover faster from stress.',
      },
      {
        heading: 'How to improve vagal tone',
        body: 'Long exhales directly stimulate the vagus nerve. This is because the vagus nerve is active primarily during exhale \u2014 it inhibits the heart\u2019s pacemaker, slowing heart rate. Extending the exhale to 1.5-2x the inhale length is the simplest way to increase vagal activation. Cold exposure, gargling, singing, and humming also stimulate the vagus via its pharyngeal branches.',
      },
      {
        heading: 'Polyvagal theory',
        body: 'Stephen Porges\u2019 polyvagal theory distinguishes two vagal circuits: the ventral vagus (social engagement, calm state) and the dorsal vagus (freeze response, shutdown). Breathing patterns that emphasize slow, extended exhales activate the ventral vagal pathway, promoting states of safety and connection. This is why slow breathing feels calming \u2014 it is literally activating the neural circuits of safety.',
      },
    ],
    relatedSections: ['pattern'],
  },
  {
    conceptId: 'diaphragmatic-breathing',
    title: 'Diaphragmatic Breathing',
    summary:
      'Breathing driven by the diaphragm rather than the accessory muscles of the chest. It is more efficient, triggers the relaxation response, and is the foundation of all serious breath work. Most adults have lost this pattern due to stress and sedentary lifestyle.',
    sections: [
      {
        heading: 'What is diaphragmatic breathing?',
        body: 'Also called belly breathing or abdominal breathing, this is the natural way babies and animals breathe. The diaphragm contracts and flattens downward, creating negative pressure in the chest that pulls air into the lungs. The belly expands outward as the diaphragm pushes abdominal contents down. Chest breathing, by contrast, uses the intercostal muscles and is less efficient.',
      },
      {
        heading: 'Why it matters for breath training',
        body: 'Diaphragmatic breathing: (1) recruits the lower lobes of the lungs where blood flow is greatest, improving gas exchange, (2) activates the vagus nerve through mechanical stimulation of the diaphragm, (3) reduces the work of breathing by up to 30% compared to chest breathing, (4) naturally slows respiratory rate. All breath-hold records are set using diaphragmatic breathing.',
      },
      {
        heading: 'How to practice',
        body: 'Lie on your back with one hand on your chest and one on your belly. Breathe in through your nose and feel your belly rise (the hand on your belly should move, the one on your chest should stay relatively still). Exhale through your mouth and feel your belly fall. Practice for 5 minutes daily until this becomes your default breathing pattern.',
      },
    ],
    relatedSections: ['pattern'],
  },
  {
    conceptId: 'nervous-system',
    title: 'Autonomic Nervous System & Breath Work',
    summary:
      'The autonomic nervous system (ANS) regulates all involuntary bodily functions. It has two branches \u2014 sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) \u2014 and breathing is the only autonomic function you can consciously control, making it a gateway to regulating the entire system.',
    sections: [
      {
        heading: 'The two branches',
        body: 'The sympathetic nervous system (SNS) prepares the body for action: increased heart rate, dilated pupils, redirected blood flow to muscles, release of cortisol and adrenaline. The parasympathetic nervous system (PNS) promotes recovery: slowed heart rate, digestion, immune function, relaxation. Modern life tends to keep the SNS chronically activated \u2014 this is the stress epidemic.',
      },
      {
        heading: 'Why the breath is unique',
        body: 'Unlike heart rate, digestion, or pupil dilation, breathing is both voluntary and involuntary. You can consciously change your breath (voluntary control via the cerebral cortex), and those changes will propagate through the entire autonomic system. This makes breathing the single most powerful tool for autonomic regulation. No other body system offers this interface.',
      },
      {
        heading: 'Practical application',
        body: 'Short, fast breathing activates the SNS (used in Wim Hof method and some pranayama). Slow, extended exhale breathing activates the PNS (used in cardiac coherence, 4-7-8, and relaxation practices). By choosing your breathing pattern, you choose which branch of your nervous system to engage. This is conscious physiology.',
      },
    ],
    relatedSections: ['pattern'],
  },
];

export function getConcept(conceptId: string): ConceptContent | undefined {
  return CONCEPTS.find((c) => c.conceptId === conceptId);
}
