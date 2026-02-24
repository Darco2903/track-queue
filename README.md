# Track Queue

## Description

`Track Queue` is a TypeScript library that provides a strongly-typed queue with tracking capabilities. It allows to define a queue of items and track the current position, previous items, and next items in the queue.

## Installation

You can find the package here: [**@darco2903/track-queue**](https://github.com/users/Darco2903/packages/npm/package/track-queue)

## Example Usage

```ts
import { TrackQueue } from "@darco2903/track-queue";

const queue = new TrackQueue<number>();
queue.add(1, 2, 3, 4, 5);

console.log(queue.currentPosition); // 0
console.log(queue.current); // 1

console.log(queue.next()); // 2
console.log(queue.currentPosition); // 1
console.log(queue.nextCount); // 3

console.log(queue.previous()); // 1

console.log(queue.moveTo(4)); // 5
console.log(queue.currentPosition); // 4
console.log(queue.hasNext); // false

console.log(queue.moveBy(-2)); // 3
console.log(queue.currentPosition); // 2

queue.insertAt(0, -1, 0); // (position, ...items)
console.log(queue.moveTo(0)); // -1
console.log(queue.currentPosition); // 0

console.log(queue.toArray()); // [-1, 0, 1, 2, 3, 4, 5]
```
