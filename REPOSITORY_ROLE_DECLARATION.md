# Repository Role Declaration — ArgLearn

**Repository:** `Kelziejordan/ArgLearn`  
**Default branch:** `main`  
**Role:** Evidence-driven analysis, learning experiments, empirical evaluation, and improvement proposals  
**Authority status:** Analytical authority only; no constitutional, deployment, or production-change authority

## 1. Purpose

ArgLearn studies authorized evidence to identify knowledge gaps, evaluate hypotheses, compare outcomes, assess confidence, and propose improvements to Arg-derived systems. It exists to make learning measurable and reviewable rather than implicit, anecdotal, or self-authorizing.

ArgLearn has epistemic autonomy: it may form and revise hypotheses in response to evidence. It does not have constitutional authority and cannot convert a learned preference or statistical result into permission to execute.

## 2. Ownership

ArgLearn owns:
- Analysis of authorized observations, test results, benchmarks, and historical evidence.
- Hypothesis management, experiment design, controlled comparisons, and confidence assessments.
- Evaluation methodology, learning artifacts, empirical profiles, and reproducible findings.
- Recommendations that identify expected benefit, supporting evidence, uncertainty, risks, and verification steps.
- Explicit tracking of contradictory evidence, failed experiments, limitations, and possible catastrophic-forgetting/regression risks.

ArgLearn does not own:
- ArgCore constitutional mandates or enforcement.
- ArgOS orchestration, runtime routing, external-effect execution, or production configuration.
- ArgAtlas's canonical architecture records or authority to rewrite provenance.
- Approval of its own proposals for production use.
- Permission to bypass human approval, runtime governance, or domain-specific controls.

## 3. Relationship to the ecosystem

- **ArgCore:** defines constitutional boundaries that ArgLearn cannot change.
- **Arg:** executes governed runtime workflows and owns integration of accepted proposals.
- **ArgAtlas:** records canonical contracts, evidence provenance, decisions, and project state.
- **Domain branches/apps:** provide domain-specific outcomes and constraints. ArgLearn may analyze authorized evidence from them but cannot assume authority over them.
- **Companion or other user interfaces:** may present findings and collect approvals; presentation does not grant ArgLearn execution authority.

The learning loop is a governed feedback path around the canonical lifecycle, not a replacement for it.

## 4. Lifecycle relationship

The ecosystem's ACL-001 lifecycle is:

`Intent → Translation (ATL) → Planning → Execution → Validation → Observation → Memory → Next Intent`

ArgLearn consumes authorized observations and produces analysis or proposals for a subsequent governed decision. It does not own intent translation, planning, execution, validation, memory persistence, or the lifecycle's constitutional rules merely because its output influences a later step.

## 5. Required experiment discipline

A material finding or proposal should state:
- The question or hypothesis being tested.
- Evidence inputs and their provenance.
- Baseline, comparison method, and evaluation criteria.
- Sample size, environment, version, and known confounders where applicable.
- Results, uncertainty, negative/contradictory evidence, and reproducibility instructions.
- Expected benefit, possible regressions, and blast radius.
- The exact approval and verification needed before integration.
- A rollback or disable strategy for any accepted runtime change.

Do not report correlation as causation, a single successful run as general proof, or a model-generated explanation as independent evidence.

## 6. Safety and authority constraints

ArgLearn MUST NOT:
- Modify ArgCore constitutional contracts or release authority.
- Silently change ArgOS code, routing, policies, risk limits, or production behavior.
- Erase, suppress, or selectively omit contradictory evidence to preserve a hypothesis.
- Promote its own confidence score into authorization.
- Trigger consequential external effects without the consuming runtime's approved workflow.
- Treat a proposal, experiment, or locally passing test as production certification.

Any learning that changes behavior must pass through the repository owning that behavior, with review, tests, explicit approval, and traceable evidence.

## 7. Memory integrity and forgetting

Learning artifacts should preserve source provenance and distinguish observations, inferences, hypotheses, and decisions. When evidence conflicts, preserve the conflict rather than overwriting the prior result. Updates to empirical profiles should be versioned and reviewable; destructive replacement of historical evidence is not an acceptable default. Claims about durable memory, recovery, or catastrophic-forgetting resistance require restart/recovery and regression evidence.

## 8. Status language

- **OBSERVED:** source evidence was inspected.
- **HYPOTHESIZED:** an explanation or candidate rule is proposed.
- **EVALUATED:** a defined method was applied.
- **RECOMMENDED:** evidence supports considering a change.
- **ACCEPTED:** an authorized owner approved a proposal.
- **INTEGRATED:** an implementation was merged into its owning runtime.
- **PROVEN:** the specific claim passed the stated evidence criteria.
- **NOT PROVEN:** the claim exceeds available evidence.

Do not call ArgLearn itself a fully autonomous, continuously learning production system unless the complete governed loop is demonstrated.

## 9. Current status and decision rule

ArgLearn remains an analytical component, not a prerequisite for unrelated runtime or economic gates. Its work may support an explicitly authorized experiment, but cannot independently authorize offers, external actions, or runtime changes. The full adaptive-learning loop and complete ecosystem lifecycle remain **NOT PROVEN** unless current executable evidence establishes otherwise.

**ArgLearn learns from evidence and proposes improvements; the runtime and constitutional authority decide what may change.**
