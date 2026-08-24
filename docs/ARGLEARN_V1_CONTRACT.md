# ArgLearn V1 Contract

Status: DRAFT FOR VERIFICATION
Version: 1.0

## 1. Purpose

ArgLearn is the active learning and discovery plane. It converts authorized observations and experiments into evidence-backed knowledge that can improve future ArgOS operation without acquiring constitutional authority.

## 2. Scope

V1 is focused on the four-LLM independent orchestration system. The contract is domain-neutral enough to support later learning domains.

## 3. Inputs

ArgLearn may consume authorized:

- execution records;
- Action Capsule metrics;
- normalized LLM outputs;
- task metadata;
- model/provider metadata;
- latency and cost telemetry;
- verification outcomes;
- user outcome signals when explicitly available;
- prior ArgLearn findings;
- ArgAtlas evidence references.

## 4. Core Objects

### LearningObservation

An immutable observation reference containing source, timestamp, task class, model identity, execution metadata, outcome, and provenance.

### KnowledgeGap

A statement of what ArgLearn does not know or cannot establish with sufficient confidence, including why the gap matters.

### Hypothesis

A testable proposition derived from observations, with expected evidence and confidence prior.

### LearningExperiment

A governed experiment definition containing objective, inputs, population, controls, variables, evaluation criteria, safety limits, and termination conditions.

### LearningResult

The observed result of an experiment, including metrics, deviations, failures, and evidence references.

### LearningFinding

An evidence-backed derived statement containing scope, confidence, supporting observations, contradictory observations, and applicability limits.

### LearningCandidate

A proposed change to knowledge, routing, model profile, benchmark, or future policy. A candidate is not authoritative merely because ArgLearn produced it.

## 5. Learning Lifecycle

OBSERVE
  -> identify knowledge gap
  -> formulate hypothesis
  -> design experiment
  -> pass governance/authorization gate
  -> execute
  -> collect evidence
  -> analyze
  -> produce finding
  -> assess confidence
  -> record
  -> identify next gap

## 6. Authority Boundary

ArgLearn may autonomously investigate within explicitly authorized resource and safety boundaries.

ArgLearn does not possess authority to modify ArgCore, rewrite constitutional rules, silently change ArgOS behavior, silently promote a learning candidate into production policy, or erase contradictory evidence.

Any operational promotion flows through an explicit governed authority path and is recorded in ArgAtlas.

## 7. Independent Multi-LLM Rule

The four LLMs are independent cognitive resources by default.

ArgLearn MUST preserve isolation during an independent evaluation. A model must not receive peer outputs unless the task explicitly authorizes a non-independent mode such as critique or debate.

Consensus is not a success criterion.

Agreement, disagreement, unique correctness, correlated failure, and complementary strengths are all valid evidence.

## 8. Evidence and Contradiction

A finding must preserve both supporting and contradictory evidence when available. ArgLearn must not collapse disagreement into consensus merely to produce a cleaner result.

Confidence must include evidence scope and sample size. Small samples are not treated as established capability.

## 9. Capsule Integration

ArgLearn consumes Action Capsule telemetry rather than bypassing the established execution/economic measurement path. Learning experiments may compare calls, actions, tokens, latency, cost, success, and user-value outcomes.

The claimed efficiency of orchestration must be verified on the actual orchestration path; benchmark results are evidence, not assumptions.

## 10. ArgAtlas Boundary

ArgLearn derives knowledge. ArgAtlas records authoritative engineering evidence and established decisions.

ArgLearn may submit evidence-backed findings and learning candidates to the Atlas recording path. ArgLearn does not rewrite historical Atlas records.

## 11. ArgOS Boundary

ArgOS owns runtime execution, task routing, orchestration, authorization, and production action.

ArgLearn may recommend routing or model-selection changes, but recommendations do not become runtime policy without the explicit ArgOS governance path.

## 12. V1 Non-Goals

- autonomous constitutional modification;
- self-authorized production changes;
- forced model consensus;
- permanent assumptions about provider/model personalities;
- building every future learning domain now;
- replacing ArgAtlas as the engineering record;
- replacing ArgOS as the runtime.

## 13. Initial Learning Domain

V1 establishes empirical knowledge about the four-LLM orchestration system, including:

- task-specific model strengths;
- failure modes;
- reliability;
- cost and latency;
- context sensitivity;
- independence/correlation of outputs;
- model combinations;
- orchestration effectiveness;
- user-effort reduction;
- Action Capsule efficiency.

## 14. Success Condition

ArgLearn V1 is successful when it can identify a meaningful knowledge gap, obtain authorized evidence through a governed experiment, derive an evidence-backed finding with explicit confidence and contradictions, and preserve that finding for later governed use.
