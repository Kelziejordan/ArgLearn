let sequence = 0;

function createId(prefix) {
  sequence += 1;
  return `${prefix}-${sequence}`;
}

function createRecord(type, data) {
  return {
    id: createId(type),
    type,
    ...data,
  };
}

export function createLearningEngine() {
  return {
    observe(input) {
      return createRecord('observation', input);
    },

    identifyKnowledgeGap(input) {
      return createRecord('knowledge-gap', input);
    },

    formulateHypothesis(input) {
      return createRecord('hypothesis', input);
    },

    designExperiment(input) {
      return createRecord('experiment', input);
    },

    recordResult(input) {
      return createRecord('result', input);
    },

    deriveFinding(input) {
      return createRecord('finding', input);
    },

    createLearningCandidate(input) {
      return createRecord('learning-candidate', input);
    },
  };
}
