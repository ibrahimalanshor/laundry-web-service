function valueHasOperator(value) {
  return value.indexOf('|') !== -1;
}

function valueIsArray(value) {
  return value.indexOf(',') !== -1;
}

function getOperatorFromValueWithOperator(value) {
  const operatorLists = {
    not: '$ne',
    in: '$in',
  };

  return operatorLists[value.substr(0, value.indexOf('|'))];
}

function getValueFromValueWithOperator(value) {
  const valueOnly = value.substr(value.indexOf('|') + 1);

  return valueIsArray(valueOnly) ? valueOnly.split(',') : valueOnly;
}

function normalizeValueWithOperator(value) {
  return {
    [getOperatorFromValueWithOperator(value)]:
      getValueFromValueWithOperator(value),
  };
}

exports.valueHasOperator = valueHasOperator;
exports.getOperatorFromValueWithOperator = getOperatorFromValueWithOperator;
exports.getValueFromValueWithOperator = getValueFromValueWithOperator;
exports.normalizeValueWithOperator = normalizeValueWithOperator;
