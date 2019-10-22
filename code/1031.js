/**
 * @param {number[]} A
 * @param {number} L
 * @param {number} M
 * @return {number}
 */
var maxSumTwoNoOverlap = function(A, L, M) {
  // if (A.length < L + M) {
  //   return 0;
  // }
  const lArr = new Array(A.length - L + 1);
  let sumL = 0;
  for (let i = 0; i < L; ++i) {
    sumL += A[i];
  }
  lArr[0] = [0, sumL];
  for (let i = 1; i <= A.length - L; ++i) {
    sumL += A[i + L - 1] - A[i - 1];
    lArr[i] = [i, sumL];
  }
  lArr.sort((a, b) => b[1] - a[1]);

  let maxSum = 0;
  let sumM = 0;
  for (let i = 0; i < M; ++i) {
    sumM += A[i];
  }

  let sumLM = 0;
  let i = 0;
  let j;
  let lIndex;
  let lLeftEndIndex;
  let lRightStartIndex;
  for (;;) {
    lLeftEndIndex = i - L;
    lRightStartIndex = i + M;
    if (lLeftEndIndex >= 0 || lRightStartIndex < A.length) {
      for (j = 0; j < lArr.length; ++j) {
        lIndex = lArr[j][0];
        if (lIndex <= lLeftEndIndex || lIndex >= lRightStartIndex) {
          sumLM = lArr[j][1] + sumM;
          if (sumLM > maxSum) {
            maxSum = sumLM;
          }
          break;
        }
      }
    }
    

    if (++i > A.length - M) {
      break;
    }

    sumM += A[i + M - 1] - A[i - 1];
  }

  return maxSum;
};

console.log(maxSumTwoNoOverlap([8,20,6,2,20,17,6,3,20,8,12], 5, 4));

var maxSumTwoNoOverlap = function(A, L, M) {
  let len = A.length;
  for(let i = 1; i < len; i++) {
      A[i] += A[i - 1];
  }
  
  let LMax = A[L - 1], MMax = A[M-1];
  let res = A[M + L - 1];
  for(let i = M + L ; i< len ; i++) {
      // update LMax to i - M; 
      LMax = Math.max(LMax, A[i - M ] - A[i - M - L]);
      MMax = Math.max(MMax, A[i - L ] - A[i - M - L]);
      res = Math.max(res,
          LMax + A[i] - A[i - M],
          MMax + A[i] - A[i - L]
      )
  }
  return res;
};
