# ArgLearn

ArgLearn is the active learning and discovery system for the Arg ecosystem.

## V1 Scope

ArgLearn observes authorized system evidence, identifies knowledge gaps, can design and execute governed learning experiments, derives empirical findings, and produces learning candidates with evidence and confidence.

V1 begins with the Multi-LLM orchestration system. The interfaces are intentionally domain-neutral so the learning engine can later be applied to other Arg ecosystem domains without changing its constitutional role.

## Architectural Role

- ArgCore: frozen contracts, mandates, and enforcement boundary.
- ArgOS: governed runtime, execution, and orchestration.
- ArgAtlas: authoritative engineering record, continuity, provenance, and evidence.
- ArgLearn: active learning, analysis, discovery, and experiment engine.

## Authority Boundary

ArgLearn has epistemic autonomy, not constitutional authority.

ArgLearn MAY:
- inspect authorized evidence;
- identify knowledge gaps;
- request or obtain authorized information;
- design governed experiments;
- execute approved experiments;
- compare outcomes;
- maintain hypotheses and empirical profiles;
- derive findings and confidence;
- recommend changes;
- request additional evidence.

ArgLearn MUST NOT:
- modify ArgCore;
- alter constitutional mandates;
- silently modify ArgOS behavior;
- silently change production routing policy;
- erase contradictory evidence;
- declare its own findings authoritative;
- bypass ArgOS governance or ArgCore contracts.

## Learning Loop

Observe -> identify gap -> hypothesize -> design experiment -> execute -> analyze -> derive finding -> record evidence -> assess confidence -> identify next gap.

## V1 Principle

ArgLearn learns from real evidence. Declared model capabilities are hypotheses; observed performance is evidence.

The first learning domain is independent Multi-LLM orchestration: model strengths, weaknesses, reliability, cost, latency, task fit, independence of perspectives, and user-value outcomes.
