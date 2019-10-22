/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const totalLen = len1 + len2;

  if (totalLen === 0) {
    return;
  }

  let start1 = 0;
  let end1 = len1 - 1;
  let start2 = 0;
  let end2 = len2 - 1;

  let i = Math.floor(len1 / 2);
  let j = Math.floor(len2 / 2);

  let v1;
  let v2;
  let stepLen;
  while (start1 < end1 && start2 < end2) {
    v1 = nums1[i];
    v2 = nums2[j];
    if (v1 < v2) {
      stepLen = Math.ceil(Math.min(end1 - i, j - start2) / 2);
      if (stepLen === 0) {
        break;
      }
      start1 = i + 1;
      end2 = j - 1;
      i += stepLen;
      j -= stepLen;
    } else {
      stepLen = Math.max(Math.ceil(Math.min(i - start1, end2 - j) / 2), 1);
      if (stepLen === 0) {
        break;
      }
      end1 = i - 1;
      start2 = j + 1;
      i -= stepLen;
      j += stepLen;
    }
  }

  let k = i + j - 1;
  const mid = Math.floor(totalLen / 2);
  while (k < mid) {
    if (i >= len1) {
      ++j;
    } else if (j >= len2) {
      ++i;
    } else {
      v1 = nums1[i];
      v2 = nums2[j];
      if (v1 < v2) {
        ++i;
      } else {
        ++j;
      }
    }
    ++k;
  }

  let vm1;
  let vm2;
  if (i > 0 && j > 0) {
    vm1 = nums1[i - 1];
    vm2 = nums2[j - 1];
    let vm;
    if (vm1 > vm2) {
      vm1 = vm2;
      vm2 = nums1[i - 1];
      if (i > 1) {
        vm = nums1[i - 2];
      }
    } else {
      if (j > 1) {
        vm = nums2[j - 2];
      }
    }
    if (vm != null) {
      vm1 = Math.max(vm1, vm);
    }
  } else if (i > 0) {
    if (i > 1) {
      vm1 = nums1[i - 2];
    }
    vm2 = nums1[i - 1];
  } else {
    if (j > 1) {
      vm1 = nums2[j - 2];
    }
    vm2 = nums2[j - 1];
  }

  if (totalLen % 2 === 1) {
    return vm2;
  }

  return (vm1 + vm2) / 2;
};


console.log(findMedianSortedArrays([1, 2], [3, 4]));