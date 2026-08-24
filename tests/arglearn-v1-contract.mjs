import assert from 'node:assert/strict';

const engine = await import('../src/learning/engine.js');

assert.equal(typeof engine.createLearningEngine, 'function');

const learner = engine.createLearningEngine();

assert.equal(typeof learner.observe, 'function');
assert.equal(typeof learner.identifyKnowledgeGap, 'function');
assert.equal(typeof learner.formulateHypothesis, 'function');
assert.equal(typeof learner.designExperiment, 'function');
assert.equal(typeof learner.recordResult, 'function');
assert.equal(typeof learner.deriveFinding, 'function');
assert.equal(typeof learner.createLearningCandidate, 'function');

const observation = learner.observe({
  source: 'fixture',
  taskClass: 'orchestration',
  outcome: { success: true },
});
assert.ok(observation.id);

const gap = learner.identifyKnowledgeGap({
  statement: 'Model capability evidence is insufficient.',
  importance: 'high',
});
assert.ok(gap.id);

const hypothesis = learner.formulateHypothesis({
  gapId: gap.id,
  statement: 'Independent model perspectives improve task quality.',
});
assert.ok(hypothesis.id);

const experiment = learner.designExperiment({
  hypothesisId: hypothesis.id,
  objective: 'Compare independent model perspectives.',
});
assert.ok(experiment.id);

const result = learner.recordResult({
  experimentId: experiment.id,
  metrics: { success: 1 },
});
assert.ok(result.id);

const finding = learner.deriveFinding({
  resultId: result.id,
  statement: 'Fixture evidence supports further evaluation.',
  confidence: 0.5,
});
assert.ok(finding.id);

const candidate = learner.createLearningCandidate({
  findingId: finding.id,
  statement: 'Run a larger controlled orchestration benchmark.',
});
assert.ok(candidate.id);

console.log('[GREEN] ArgLearn V1 executable contract satisfied');
