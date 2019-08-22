function recurse(
  s,
  index,
  pair,
  leftRemoveRemain,
  rightRemoveRemain,
  leftRemain,
  rightRemain,
  expressionArr,
  expressionArrIndex,
  result
) {
  if (index === s.length) {
    const expression = expressionArr.join('');
    for (let i = 0; i < result.length; ++i) {
      if (expression === result[i]) {
        return;
      }
    }
    result.push(expression);
    return;
  }

  const character = s[index];
  if (character === '(') {
    if (leftRemoveRemain > 0) {
      recurse(
        s,
        index + 1,
        pair,
        leftRemoveRemain - 1,
        rightRemoveRemain,
        leftRemain - 1,
        rightRemain,
        expressionArr,
        expressionArrIndex,
        result
      );
    }

    if (leftRemain > leftRemoveRemain) {
      expressionArr[expressionArrIndex++] = character;
      recurse(
        s,
        index + 1,
        pair + 1,
        leftRemoveRemain,
        rightRemoveRemain,
        leftRemain - 1,
        rightRemain,
        expressionArr,
        expressionArrIndex,
        result
      );
    }
  } else if (character === ')') {
    if (rightRemoveRemain > 0) {
      recurse(
        s,
        index + 1,
        pair,
        leftRemoveRemain,
        rightRemoveRemain - 1,
        leftRemain,
        rightRemain - 1,
        expressionArr,
        expressionArrIndex,
        result
      );
    }

    if (pair > 0 && rightRemain > rightRemoveRemain) {
      expressionArr[expressionArrIndex++] = character;
      recurse(
        s,
        index + 1,
        pair - 1,
        leftRemoveRemain,
        rightRemoveRemain,
        leftRemain,
        rightRemain - 1,
        expressionArr,
        expressionArrIndex,
        result
      );
    }
  } else {
    expressionArr[expressionArrIndex++] = character;
    recurse(
      s,
      index + 1,
      pair,
      leftRemoveRemain,
      rightRemoveRemain,
      leftRemain,
      rightRemain,
      expressionArr,
      expressionArrIndex,
      result
    );
  }
}

const expressionArr = new Array(8);
const sArr = new Array(8);

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
  // if (!s) {
  //   return [s];
  // }
  const length = s.length;
  // const sArr = new Array(length);
  sArr.length = length;
  let left = 0;
  let right = 0;
  let leftCount = 0;
  let rightCount = 0;
  let character;
  for (let i = 0; i < length; ++i) {
    character = s.charAt(i);
    sArr[i] = character;
    if (character === '(') {
      ++leftCount;
      ++left;
    } else if (character === ')') {
      ++rightCount;
      if (left === 0) {
        ++right;
      } else {
        --left;
      }
    }
  }

  const result = [];
  // const expressionArr = new Array(length - left - right);
  expressionArr.length = length - left - right;
  recurse(sArr, 0, 0, left, right, leftCount, rightCount, expressionArr, 0, result);
  return result;
};

console.log(removeInvalidParentheses("(()("));
