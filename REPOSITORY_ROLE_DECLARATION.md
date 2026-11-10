# Repository Role Declaration — ArgLearn

Declaration version: 1.0
Effective status: ACTIVE ANALYTICAL SUBSYSTEM
Repository: Kelziejordan/ArgLearn
Package: `@kelziejordan/arglearn`

## Architectural classification

- Tier: Analytical and learning subsystem within the four-repository ARG authority set
- Lifecycle: Active
- Source of truth: Yes, for ArgLearn's learning-engine implementation and its own analytical artifacts; no, for constitutional law, runtime state, or ecosystem-wide architecture
- Runtime role: Package dependency consumed by Arg
- Historical/reference status: Historical candidates remain evidence unless explicitly promoted through governed evaluation

## Authority

- Identity: NONE
- State: NONE; Arg owns runtime Knowledge Vault persistence
- Governance: NONE; ArgCore owns constitutional governance
- Provenance: ANALYTICAL EVIDENCE REFERENCES ONLY; TCS and ArgAtlas retain their respective provenance responsibilities
- Execution: NONE; Arg owns runtime orchestration and execution

ArgLearn has epistemic/analytical autonomy, not constitutional or execution authority.

## Dependencies and integration

ArgLearn exports the learning engine through `src/index.js` and the package entry point. Arg consumes `@kelziejordan/arglearn` as a pinned Git dependency and owns the integration adapter that supplies TCS-linked observations and Knowledge Vault persistence.

ArgLearn MUST NOT depend on ArgCore, Arg, or ArgAtlas at runtime. It MUST NOT become a second runtime, memory store, provider router, or governance authority.

## Owned capabilities

- Evidence-driven observation analysis
- Hypothesis and candidate-lesson derivation
- Analytical profiles and confidence assessments
- Experiment design and evaluation support
- Findings, limitations, and improvement proposals
- Explicit provenance references for derived findings

## Not owned

- Constitutional rules, identity, authorization, or recovery authority
- ArgOS runtime orchestration or DigitalHands execution
- TCS event ordering or durable execution evidence
- Runtime Knowledge Vault storage, retention, or promotion authority
- Production provider routing or external effects
- Canonical ecosystem architecture and project continuity

## Governance and promotion boundary

ArgLearn may derive candidate lessons and recommend improvements. Candidate generation is not validation. Validation is not promotion. A candidate may influence governed runtime behavior only after the applicable validation and explicit governance approval are recorded through the Arg runtime boundary.

ArgLearn MUST NOT promote its own candidate, alter ArgCore mandates, silently modify Arg behavior, erase contradictory evidence, or bypass ArgOS governance.

## Evidence classification

A passing test proves only the exercised boundary. A candidate, hypothesis, profile, or analytical result is not authoritative merely because it exists or has a confidence value.

The bounded ArgOS memory integration associated with Arg PRs #118 and #132 demonstrates TCS-linked observation capture, governed lesson promotion/retrieval, and one synthetic cold/warm policy-effect fixture. It does not prove general autonomous learning, representative-workload improvement, production storage guarantees, or complete Memory Lifecycle V1.

## Authority boundary

ArgCore governs.
Arg implements and owns runtime memory persistence.
ArgAtlas preserves engineering continuity and provenance.
ArgLearn analyzes authorized evidence and proposes governed improvements.

FINAL RULE: ArgLearn learns from authorized evidence; it does not govern or execute.
