function getParentIndex(index) {
  if (index % 2 === 0) {
    return (index >> 1) - 1;
  }
  return (index - 1) >> 1;
}

function getLeftChildIndex(index) {
  return (index << 1) + 1;
}

class PriorityQueue {
  constructor(compare) {
    this._heap = new Array(8);
    this._size = 0;
    this._compare = compare;
  }

  enq(value) {
    let index = this._size;
    const heap = this._heap;
    heap[index] = value;
    const size = ++this._size;

    while (index > 0) {
      index = getParentIndex(index);
      if (!this._adjustHeap(heap, index, size)) {
        return;
      }
    }
  }

  deq() {
    let size = this._size;
    if (size === 0) {
      return undefined;
    }
    const heap = this._heap;
    const value = heap[0];
    size = --this._size;
    heap[0] = heap[size];
    this._adjustHeap(heap, 0, size);
    return value;
  }

  getHead() {
    return this._size > 0 ? this._heap[0] : undefined;
  }

  swapHead(value) {
    if (this._size === 0) {
      return this.enq(value);
    }
    const heap = this._heap;
    const oldHead = heap[0];
    heap[0] = value;
    this._adjustHeap(heap, 0, this._size);
    return oldHead;
  }

  size() {
    return this._size;
  }

  _adjustHeap(heap, index, size) {
    let i = index;
    const temp = heap[i];
    let k = getLeftChildIndex(i);
    const compare = this._compare;
    while (k < size) {
      if (k + 1 < size && compare(heap[k], heap[k + 1]) < 0) {
        ++k;
      }
      if (compare(heap[k], temp) > 0) {
        heap[i] = heap[k];
        i = k;
        k = getLeftChildIndex(i);
      } else {
        break;
      }
    }

    if (i === index) {
      return false;
    }
    heap[i] = temp;
    return true;
  }
}

/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
  this.maxHeap = new PriorityQueue((a, b) => a - b);
  this.minHeap = new PriorityQueue((a, b) => b - a);
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  const maxHeap = this.maxHeap;
  const minHeap = this.minHeap;
  let maxHead = maxHeap.getHead();
  let minHead = minHeap.getHead();

  if (num < maxHead) {
    // 插入到 maxHeap
    if (maxHeap.size() > minHeap.size()) {
      maxHeap.swapHead(num);
      // HACK
      if (minHead != null) {
        minHeap._heap[0] = maxHead;
        minHeap.enq(minHead);
      } else {
        minHeap.enq(maxHead);
      }
    } else {
      maxHeap.enq(num);
    }
  } else if (num > minHead) {
     // 插入到 minHeap
     if (maxHeap.size() < minHeap.size()) {
      minHeap.swapHead(num);
      // HACK
      if (maxHead != null) {
        maxHeap._heap[0] = minHead;
        maxHeap.enq(maxHead);
      } else {
        maxHeap.enq(minHead);
      }
    } else {
      minHeap.enq(num);
    }
  } else if (maxHeap.size() > minHeap.size()) {
    minHeap.enq(num);
  } else {
    maxHeap.enq(num);
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if (this.maxHeap.size() > this.minHeap.size()) {
    return this.maxHeap.getHead();
  } else if (this.maxHeap.size() < this.minHeap.size()) {
    return this.minHeap.getHead();
  } else if (this.maxHeap.size() === 0) {
    return undefined;
  }
  return (this.maxHeap.getHead() + this.minHeap.getHead()) / 2;
};

function testMedianFinder() {
  const medianFinder = new MedianFinder();
  const arr = [3, 1, 6, 2, 4, 8, 5, 7];

  for (const v of arr) {
    medianFinder.addNum(v);

    console.log(medianFinder.findMedian());
  }
}

testMedianFinder();

function testQueue() {
  const queue = new PriorityQueue((a, b) => a - b);

  const arr = [3, 1, 6, 2, 4, 8, 5, 7];

  for (const v of arr) {
    queue.enq(v);
  }

  while (queue.size() > 0) {
    console.log(queue.getHead(), queue.deq());
  }

  for (const v of arr) {
    queue.enq(v);
  }

  const arr1 = [3, 1, 6, 2, 4, 8, 5, 7];

  console.log();
  for (const v of arr1) {
    console.log(queue.swapHead(v));
  }

  console.log();
  while (queue.size() > 0) {
    console.log(queue.getHead(), queue.deq());
  }
}

// testQueue();
