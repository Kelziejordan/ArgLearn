# ArgLearn V1 Verification Report

Date: 2026-10-13
Target: `feat/memory-lifecycle-v1` / PR #2
Disposition: PRELIMINARY — DO NOT FREEZE YET

## Scope and authority

This report assesses the standalone deterministic learning engine proposed in PR #2. It does not certify durable persistence, ArgOS integration, autonomous experiment execution, or production learning.

ArgLearn remains an analytical component. It may derive provisional candidates and validation dispositions; it cannot authorize production promotion or change ArgCore/ArgOS policy.

## Verified at the current tested boundary

- Node 20 CI job `arglearn-lifecycle` completed successfully for PR head `d129803e6ef09920c47b8a3d8550e84bb97c1ff7` (run 38465426137).
- The contract test exercises observation validation and provenance references.
- Reusing an observation ID with different content is rejected.
- Hypotheses and provisional candidates retain supporting and contradictory observations within the tested task-class scope.
- Candidate evidence must reference known observations and match the hypothesis task class.
- Unsupported typed policy effects are rejected.
- Candidate evaluation reports either `REJECTED` or `ELIGIBLE_FOR_GOVERNED_REVIEW`; a pass does not grant promotion authority.
- The latest test explicitly checks rejection of cherry-picked evidence that omits an observation already included in the hypothesis scope.
- The engine exports a snapshot of its current in-memory observations, hypotheses, and candidates.

## Partially verified

- Evidence provenance is represented as caller-supplied references. The engine validates their shape but does not independently resolve or authenticate the referenced TCS events.
- Confidence is the observed success ratio for the selected evidence set. It is explicitly not a calibrated probability and must not be interpreted as one.
- Determinism is supported by injected clock and ID factory seams, but independent-engine replay equivalence is not yet asserted by the current contract test.
- Export is a snapshot of process-local maps. The current test checks counts and a generated timestamp, not restoration into a new process.

## Not proven / not implemented by this PR

- Durable persistence, restart survival, or an import/restore API.
- Cross-process identity-collision prevention or concurrent write serialization.
- Independent verification of evidence references or cryptographic binding of the complete evidence lifecycle.
- Autonomous experiment design/execution, market-data acquisition, or LLM calls.
- ArgOS, TCS, Knowledge Vault, or ArgAtlas runtime integration.
- Production policy promotion, autonomous deployment, or any complete end-to-end adaptive learning loop.

## Review reconciliation

The latest PR revision includes test coverage for the previously identified contradictory-evidence omission. It also adds input checks for environment/timestamp/tag fields and uses the injected clock for default observation timestamps. These changes are exercised in the contract test; broader adversarial testing remains appropriate.

## Required exit criteria before V1 freeze

1. PR review findings are reconciled and all required CI checks pass on the final head.
2. Add a deterministic replay test using two independently created engines with identical inputs, clock, and ID factory; compare canonical exported evidence.
3. Explicitly test export snapshot isolation (mutating a returned export must not mutate engine state).
4. State the restore boundary plainly: no import/restore API and no durable persistence in V1 unless separately implemented and proven.
5. Publish a final capability disposition after the above tests pass.

## Architectural disposition

Keep V1 standalone and deterministic. Do not add durable persistence or ArgOS integration as part of this verification gate. Keep trading as a separate ecosystem branch outside ArgOS core. ArgLearn may later analyze authorized trading evidence through a governed interface, but it must not control live trading or promote strategy changes by itself.
