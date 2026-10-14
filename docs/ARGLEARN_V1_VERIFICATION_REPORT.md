# ArgLearn V1 Verification Report

Date: 2026-10-13
Target: `feat/memory-lifecycle-v1` / PR #2
Disposition: VERIFICATION IN PROGRESS — DO NOT FREEZE YET

## Scope and authority

This report assesses the standalone deterministic learning engine proposed in PR #2. It does not certify durable persistence, ArgOS integration, autonomous experiment execution, or production learning.

ArgLearn remains an analytical component. It may derive provisional candidates and validation dispositions; it cannot authorize production promotion or change ArgCore/ArgOS policy.

## Verified at the tested boundary

- The contract test exercises observation validation and provenance references.
- Reusing an observation ID with different content is rejected.
- Hypotheses and provisional candidates retain supporting and contradictory observations within the tested task-class scope.
- Candidate evidence must reference known observations and match the hypothesis task class.
- Unsupported typed policy effects are rejected.
- Candidate evaluation reports either `REJECTED` or `ELIGIBLE_FOR_GOVERNED_REVIEW`; a pass does not grant promotion authority.
- The test rejects cherry-picked evidence that omits observations already included in the hypothesis scope.
- The engine exports a snapshot of its current in-memory observations, hypotheses, and candidates.
- Added in commit `41c208c3dcd093e85aa2f0c0510ee77649f00763`: independent-engine deterministic replay equivalence with identical inputs, injected clock, and ID factory.
- Added in the same commit: export snapshot isolation, including nested evidence, hypothesis, and candidate mutation attempts.

## CI status

- An earlier Node 20 CI run passed for PR head `d129803e6ef09920c47b8a3d8550e84bb97c1ff7` (run 38465426137). This does not verify the current head.
- At the time of this report update, the GitHub connector returned no workflow runs and no combined status checks for current head `41c208c3dcd093e85aa2f0c0510ee77649f00763`.
- Therefore, the new tests are committed but their execution on the final PR head is not yet confirmed. Do not treat the current revision as CI-passing until a check result is visible.

## Partially verified

- Evidence provenance is represented as caller-supplied references. The engine validates their shape but does not independently resolve or authenticate the referenced TCS events.
- Confidence is the observed success ratio for the selected evidence set. It is not a calibrated probability.
- Replay equivalence is tested for identical inputs, clock, and ID factory; this does not establish determinism for every possible input or environment.
- Export isolation is tested in-process. It is not persistence or restart recovery.

## Not proven / not implemented by this PR

- Durable persistence, restart survival, or an import/restore API.
- Cross-process identity-collision prevention or concurrent write serialization.
- Independent verification of evidence references or cryptographic binding of the complete evidence lifecycle.
- Autonomous experiment design/execution, market-data acquisition, or LLM calls.
- ArgOS, TCS, Knowledge Vault, or ArgAtlas runtime integration.
- Production policy promotion, autonomous deployment, or a complete end-to-end adaptive learning loop.
- Suitability for trading decisions or evidence of trading profitability.

## Required exit criteria before V1 freeze

1. Confirm all required CI checks pass on the exact current PR head, including the two new tests.
2. Reconcile any new failures or review findings and rerun CI on the resulting final head.
3. Keep the restore boundary explicit: no import/restore API and no durable persistence are claimed for V1.
4. Publish final capability disposition only after the exact final head has a confirmed passing CI result.

## Architectural disposition

Keep V1 standalone and deterministic. Do not add durable persistence or ArgOS integration as part of this verification gate. Keep trading as a separate ecosystem branch outside ArgOS core. ArgLearn may later analyze authorized trading evidence through a governed interface, but it must not control live trading or promote strategy changes by itself.
