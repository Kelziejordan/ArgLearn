import { createHash, randomUUID } from 'node:crypto';

const nowIso = (clock) => new Date(clock()).toISOString();
const clone = (value) => structuredClone(value);
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

function requireString(value, name) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${name} must be a non-empty string`);
  }
  return value;
}

function digest(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function validateObservation(input, clock) {
  if (!isObject(input)) throw new TypeError('observation must be an object');
  requireString(input.observationId, 'observationId');
  requireString(input.sourceRef, 'sourceRef');
  requireString(input.taskClass, 'taskClass');
  requireString(input.outcome, 'outcome');
  requireString(input.runtimeVersion, 'runtimeVersion');
  if (!Array.isArray(input.evidenceRefs) || input.evidenceRefs.length === 0) {
    throw new TypeError('evidenceRefs must contain at least one provenance reference');
  }
  if (input.evidenceRefs.some((ref) => typeof ref !== 'string' || !ref.trim())) {
    throw new TypeError('every evidence reference must be a non-empty string');
  }
  if (input.environmentFingerprint !== undefined && typeof input.environmentFingerprint !== 'string') {
    throw new TypeError('environmentFingerprint must be a string');
  }
  if (input.occurredAt !== undefined && typeof input.occurredAt !== 'string') {
    throw new TypeError('occurredAt must be an ISO timestamp string');
  }
  if (input.tags !== undefined && (!Array.isArray(input.tags) || input.tags.some((tag) => typeof tag !== 'string'))) {
    throw new TypeError('tags must be an array of strings');
  }
  return Object.freeze({
    observationId: input.observationId,
    sourceRef: input.sourceRef,
    taskClass: input.taskClass,
    outcome: input.outcome,
    runtimeVersion: input.runtimeVersion,
    environmentFingerprint: input.environmentFingerprint ?? 'unspecified',
    evidenceRefs: [...new Set(input.evidenceRefs)],
    occurredAt: input.occurredAt ?? nowIso(clock),
    metrics: isObject(input.metrics) ? clone(input.metrics) : {},
    tags: input.tags ? [...new Set(input.tags)] : [],
  });
}

/**
 * Deterministic evidence-analysis core. It derives candidates; it never promotes
 * them into runtime policy or authoritative memory. Persistence and governed
 * adoption belong to the caller/Knowledge Vault.
 */
export function createArgLearnEngine({ clock = Date.now, idFactory = randomUUID } = {}) {
  const observations = new Map();
  const hypotheses = new Map();
  const candidates = new Map();

  function observe(input) {
    const observation = validateObservation(input, clock);
    const existing = observations.get(observation.observationId);
    if (existing && digest(existing) !== digest(observation)) {
      throw new Error(`observation identity collision: ${observation.observationId}`);
    }
    observations.set(observation.observationId, observation);
    return clone(observation);
  }

  function identifyGap({ taskClass, question, whyItMatters }) {
    requireString(taskClass, 'taskClass');
    requireString(question, 'question');
    requireString(whyItMatters, 'whyItMatters');
    const related = [...observations.values()].filter((item) => item.taskClass === taskClass);
    return Object.freeze({
      gapId: idFactory(),
      taskClass,
      question,
      whyItMatters,
      observationRefs: related.map((item) => item.observationId),
      evidenceCount: related.length,
      createdAt: nowIso(clock),
      status: related.length ? 'EVIDENCE_AVAILABLE' : 'EVIDENCE_REQUIRED',
    });
  }

  function formulateHypothesis(input) {
    if (!isObject(input)) throw new TypeError('hypothesis input must be an object');
    requireString(input.taskClass, 'taskClass');
    requireString(input.statement, 'statement');
    requireString(input.falsification, 'falsification');
    const related = [...observations.values()].filter((item) => item.taskClass === input.taskClass);
    const hypothesis = Object.freeze({
      hypothesisId: idFactory(),
      taskClass: input.taskClass,
      statement: input.statement,
      falsification: input.falsification,
      priorConfidence: Number.isFinite(input.priorConfidence)
        ? Math.max(0, Math.min(1, input.priorConfidence)) : 0.25,
      supportingObservationRefs: related.filter((item) => item.outcome === 'success').map((item) => item.observationId),
      contradictoryObservationRefs: related.filter((item) => item.outcome !== 'success').map((item) => item.observationId),
      createdAt: nowIso(clock),
      status: 'HYPOTHESIS',
    });
    hypotheses.set(hypothesis.hypothesisId, hypothesis);
    return clone(hypothesis);
  }

  function deriveCandidate(input) {
    if (!isObject(input)) throw new TypeError('candidate input must be an object');
    const hypothesis = hypotheses.get(requireString(input.hypothesisId, 'hypothesisId'));
    if (!hypothesis) throw new Error('candidate must reference an existing hypothesis');
    const evidenceIds = [...new Set(input.evidenceRefs ?? [])];
    if (evidenceIds.length === 0) throw new TypeError('candidate requires evidence references');
    const requiredScope = new Set([
      ...hypothesis.supportingObservationRefs,
      ...hypothesis.contradictoryObservationRefs,
    ]);
    const omittedScope = [...requiredScope].filter((id) => !evidenceIds.includes(id));
    if (omittedScope.length) {
      throw new Error(`candidate evidence omits observations in the hypothesis scope: ${omittedScope.join(', ')}`);
    }
    const evidence = evidenceIds.map((id) => {
      const item = observations.get(id);
      if (!item) throw new Error(`unknown observation reference: ${id}`);
      return item;
    });
    if (evidence.some((item) => item.taskClass !== hypothesis.taskClass)) {
      throw new Error('candidate evidence task class does not match hypothesis scope');
    }
    const support = evidence.filter((item) => item.outcome === 'success');
    const contradiction = evidence.filter((item) => item.outcome !== 'success');
    const distinctSources = new Set(evidence.map((item) => item.sourceRef)).size;
    const confidence = evidence.length === 0 ? 0 : support.length / evidence.length;
    const candidate = Object.freeze({
      candidateId: idFactory(),
      hypothesisId: hypothesis.hypothesisId,
      taskClass: hypothesis.taskClass,
      statement: requireString(input.statement, 'statement'),
      procedure: requireString(input.procedure, 'procedure'),
      ...(input.policyEffect !== undefined ? { policyEffect: clone(input.policyEffect) } : {}),
      applicability: isObject(input.applicability) ? clone(input.applicability) : {},
      limitations: Array.isArray(input.limitations) ? [...input.limitations] : [],
      falsification: hypothesis.falsification,
      evidenceRefs: evidence.map((item) => item.observationId),
      provenanceRefs: [...new Set(evidence.flatMap((item) => item.evidenceRefs))],
      supportingObservationRefs: support.map((item) => item.observationId),
      contradictoryObservationRefs: contradiction.map((item) => item.observationId),
      confidence,
      evidenceCount: evidence.length,
      independentSourceCount: distinctSources,
      confidenceBasis: 'observed outcome ratio; not a calibrated probability',
      runtimeVersions: [...new Set(evidence.map((item) => item.runtimeVersion))],
      environmentFingerprints: [...new Set(evidence.map((item) => item.environmentFingerprint))],
      createdAt: nowIso(clock),
      status: 'PROVISIONAL',
      contentDigest: digest({
        taskClass: hypothesis.taskClass,
        statement: input.statement,
        procedure: input.procedure,
        policyEffect: input.policyEffect ?? null,
        applicability: input.applicability ?? {},
      }),
    });
    candidates.set(candidate.candidateId, candidate);
    return clone(candidate);
  }

  function evaluateCandidate(candidateId, validation) {
    const candidate = candidates.get(requireString(candidateId, 'candidateId'));
    if (!candidate) throw new Error('unknown learning candidate');
    if (!isObject(validation)) throw new TypeError('validation must be an object');
    requireString(validation.validationRef, 'validationRef');
    requireString(validation.runtimeVersion, 'runtimeVersion');
    if (typeof validation.passed !== 'boolean') throw new TypeError('validation.passed must be boolean');
    const record = Object.freeze({
      candidateId,
      validationRef: validation.validationRef,
      runtimeVersion: validation.runtimeVersion,
      environmentFingerprint: validation.environmentFingerprint ?? 'unspecified',
      passed: validation.passed,
      observedAt: nowIso(clock),
      notes: validation.notes ?? '',
      disposition: validation.passed ? 'ELIGIBLE_FOR_GOVERNED_REVIEW' : 'REJECTED',
      authorityNote: 'ArgLearn evaluation is not promotion authority; Knowledge Vault / ArgOS governance decides adoption.',
    });
    return clone(record);
  }

  function getCandidate(candidateId) {
    const item = candidates.get(candidateId);
    return item ? clone(item) : null;
  }

  function exportEvidence() {
    return {
      generatedAt: nowIso(clock),
      observations: [...observations.values()].map(clone),
      hypotheses: [...hypotheses.values()].map(clone),
      candidates: [...candidates.values()].map(clone),
    };
  }

  return Object.freeze({
    observe,
    identifyGap,
    formulateHypothesis,
    deriveCandidate,
    evaluateCandidate,
    getCandidate,
    exportEvidence,
  });
}
