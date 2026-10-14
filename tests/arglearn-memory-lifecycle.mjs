import assert from 'node:assert/strict';
import { createArgLearnEngine } from '../src/index.js';

let tick = Date.parse('2026-10-13T12:00:00.000Z');
let id = 0;
const learn = createArgLearnEngine({
  clock: () => tick,
  idFactory: () => `learn-${++id}`,
});

const first = learn.observe({
  observationId: 'obs-1',
  sourceRef: 'tcs:event:101',
  taskClass: 'dependency-classification',
  outcome: 'success',
  runtimeVersion: 'arg-main@abc123',
  environmentFingerprint: 'node20-linux-v1',
  evidenceRefs: ['tcs:event:101', 'test:baseline:1'],
  metrics: { correct: true, providerCalls: 0 },
});
const second = learn.observe({
  observationId: 'obs-2',
  sourceRef: 'tcs:event:102',
  taskClass: 'dependency-classification',
  outcome: 'success',
  runtimeVersion: 'arg-main@abc123',
  environmentFingerprint: 'node20-linux-v1',
  evidenceRefs: ['tcs:event:102', 'test:baseline:2'],
  metrics: { correct: true, providerCalls: 0 },
});
const gap = learn.identifyGap({
  taskClass: 'dependency-classification',
  question: 'Can the existing unsupported-dependency boundary be classified consistently?',
  whyItMatters: 'Avoid false capability claims and unintended provider effects.',
});
assert.equal(gap.evidenceCount, 2);

const hypothesis = learn.formulateHypothesis({
  taskClass: 'dependency-classification',
  statement: 'Declared unsupported dependencies are rejected before provider execution.',
  falsification: 'Any unsupported dependency reaches a provider.',
});
const candidate = learn.deriveCandidate({
  hypothesisId: hypothesis.hypothesisId,
  statement: 'Reject dependency-bearing tasks until dependency-aware execution is implemented.',
  procedure: 'Check dependency declarations before governance admission or provider invocation.',
  policyEffect: { type: 'REJECT_IF_PAYLOAD_FIELD_PRESENT_V1', field: 'dependsOn' },
  evidenceRefs: [first.observationId, second.observationId],
  applicability: { runtimeVersion: 'arg-main@abc123', environmentFingerprint: 'node20-linux-v1' },
  limitations: ['Does not implement dependency-aware execution.'],
});
assert.equal(candidate.status, 'PROVISIONAL');
assert.deepEqual(candidate.policyEffect, { type: 'REJECT_IF_PAYLOAD_FIELD_PRESENT_V1', field: 'dependsOn' });
assert.equal(candidate.confidence, 1);
assert.equal(candidate.evidenceCount, 2);
assert.equal(candidate.provenanceRefs.length, 4);
assert.equal(candidate.independentSourceCount, 2);

const rejected = learn.evaluateCandidate(candidate.candidateId, {
  validationRef: 'test:negative-control',
  runtimeVersion: 'arg-main@abc123',
  passed: false,
});
assert.equal(rejected.disposition, 'REJECTED');
assert.match(rejected.authorityNote, /not promotion authority/);

const passed = learn.evaluateCandidate(candidate.candidateId, {
  validationRef: 'test:reuse-validation',
  runtimeVersion: 'arg-main@abc123',
  environmentFingerprint: 'node20-linux-v1',
  passed: true,
});
assert.equal(passed.disposition, 'ELIGIBLE_FOR_GOVERNED_REVIEW');

assert.throws(() => learn.deriveCandidate({
  hypothesisId: hypothesis.hypothesisId,
  statement: 'unsupported executable policy effect',
  procedure: 'must be rejected',
  policyEffect: { type: 'EXECUTE_ARBITRARY_CODE', field: 'dependsOn' },
  evidenceRefs: [first.observationId, second.observationId],
}), /supported typed effect/);

assert.throws(() => learn.deriveCandidate({
  hypothesisId: hypothesis.hypothesisId,
  statement: 'bad provenance',
  procedure: 'bad procedure',
  evidenceRefs: [first.observationId, second.observationId, 'missing-observation'],
}), /unknown observation reference/);

assert.throws(() => learn.observe({
  observationId: 'obs-1',
  sourceRef: 'tcs:forged',
  taskClass: 'dependency-classification',
  outcome: 'success',
  runtimeVersion: 'arg-main@abc123',
  evidenceRefs: ['forged'],
}), /identity collision/);

const contradiction = learn.observe({
  observationId: 'obs-3',
  sourceRef: 'tcs:event:103',
  taskClass: 'dependency-classification',
  outcome: 'failure',
  runtimeVersion: 'arg-main@abc123',
  environmentFingerprint: 'node20-linux-v2',
  evidenceRefs: ['tcs:event:103', 'test:contradiction:1'],
});
const nextHypothesis = learn.formulateHypothesis({
  taskClass: 'dependency-classification',
  statement: 'The rejection boundary is invariant across runtime environments.',
  falsification: 'A task reaches a provider in any supported environment.',
});
assert.throws(() => learn.deriveCandidate({
  hypothesisId: nextHypothesis.hypothesisId,
  statement: 'Cherry-picked evidence must not hide an observed contradiction.',
  procedure: 'Reject all dependency-bearing tasks.',
  evidenceRefs: [first.observationId, contradiction.observationId],
}), /omits observations in the hypothesis scope/);
const contradicted = learn.deriveCandidate({
  hypothesisId: nextHypothesis.hypothesisId,
  statement: 'Dependency rejection is invariant.',
  procedure: 'Reject all dependency-bearing tasks.',
  evidenceRefs: [first.observationId, second.observationId, contradiction.observationId],
});
assert.deepEqual(contradicted.supportingObservationRefs, ['obs-1', 'obs-2']);
assert.deepEqual(contradicted.contradictoryObservationRefs, ['obs-3']);
assert.equal(contradicted.confidence, 2 / 3);
assert.equal(contradicted.environmentFingerprints.length, 2);

tick += 60_000;
const exported = learn.exportEvidence();
assert.equal(exported.observations.length, 3);
assert.equal(exported.candidates.length, 2);
assert.ok(exported.generatedAt);

// Deterministic replay: independent engine instances with identical inputs,
// clock, and ID factory must produce byte-equivalent canonical exports.
function replayScenario() {
  let replayTick = Date.parse('2026-10-13T12:00:00.000Z');
  let replayId = 0;
  const engine = createArgLearnEngine({
    clock: () => replayTick,
    idFactory: () => `replay-${++replayId}`,
  });
  engine.observe({
    observationId: 'replay-obs-1',
    sourceRef: 'tcs:replay:1',
    taskClass: 'replay-class',
    outcome: 'success',
    runtimeVersion: 'runtime@replay',
    environmentFingerprint: 'env-replay',
    evidenceRefs: ['tcs:replay:1'],
    metrics: { value: 7 },
    tags: ['replay'],
  });
  engine.observe({
    observationId: 'replay-obs-2',
    sourceRef: 'tcs:replay:2',
    taskClass: 'replay-class',
    outcome: 'failure',
    runtimeVersion: 'runtime@replay',
    environmentFingerprint: 'env-replay',
    evidenceRefs: ['tcs:replay:2'],
    metrics: { value: 3 },
  });
  engine.identifyGap({
    taskClass: 'replay-class',
    question: 'Does the replay reproduce?',
    whyItMatters: 'Stable evidence analysis must be repeatable.',
  });
  const replayHypothesis = engine.formulateHypothesis({
    taskClass: 'replay-class',
    statement: 'Replay is deterministic.',
    falsification: 'Equivalent inputs produce different output.',
  });
  engine.deriveCandidate({
    hypothesisId: replayHypothesis.hypothesisId,
    statement: 'Retain both supporting and contradictory evidence.',
    procedure: 'Evaluate the complete scoped evidence set.',
    evidenceRefs: ['replay-obs-1', 'replay-obs-2'],
    limitations: ['Determinism test only; no claim of predictive validity.'],
  });
  replayTick += 1000;
  return engine.exportEvidence();
}
const replayA = replayScenario();
const replayB = replayScenario();
assert.deepEqual(replayA, replayB, 'independent deterministic replays must match exactly');

// Export snapshot isolation: callers may mutate their copy without mutating
// engine state or changing later exports.
const beforeMutation = learn.exportEvidence();
const mutatedExport = learn.exportEvidence();
mutatedExport.observations[0].evidenceRefs.push('caller-injected-reference');
mutatedExport.observations[0].metrics.correct = false;
mutatedExport.hypotheses[0].statement = 'caller mutation';
mutatedExport.candidates[0].evidenceRefs.push('caller-injected-observation');
mutatedExport.candidates.push({ candidateId: 'caller-injected-candidate' });
const afterMutation = learn.exportEvidence();
assert.deepEqual(afterMutation, beforeMutation, 'mutating an export must not mutate internal engine state');

console.log('PASS: ArgLearn evidence -> hypothesis -> provisional candidate -> validation disposition');
console.log('PASS: provenance, identity collision, contradictions, environment scope, and authority boundary');
console.log('PASS: independent-engine deterministic replay equivalence');
console.log('PASS: export snapshot isolation');
