import { describe, it, expect } from "vitest";
import { TrackQueue } from "../../src";

//////////////////////////
// TrackQueue tests

describe("TrackQueue", () => {
    it("should create a TrackQueue instance", () => {
        const queue = new TrackQueue<number>();
        expect(queue).toBeInstanceOf(TrackQueue);
        expect(queue.isEmpty).toBe(true);
        expect(queue.length).toBe(0);
        expect(queue.currentPosition).toBeNull();
        expect(queue.current).toBeNull();
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(0);
    });

    it("should initialize the queue with an array", () => {
        const queue = new TrackQueue<number>([1, 2, 3]);
        expect(queue.isEmpty).toBe(false);
        expect(queue.length).toBe(3);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);
    });

    it("should add items to the queue one by one", () => {
        const queue = new TrackQueue<number>();
        expect(queue.isEmpty).toBe(true);

        queue.add(1);

        expect(queue.isEmpty).toBe(false);
        expect(queue.length).toBe(1);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(0);

        queue.add(2);
        expect(queue.length).toBe(2);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(1);
    });

    it("should add items to the queue", () => {
        const queue = new TrackQueue<number>();
        expect(queue.isEmpty).toBe(true);

        queue.add(1, 2, 3);

        expect(queue.isEmpty).toBe(false);
        expect(queue.length).toBe(3);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);

        queue.add(4);
        expect(queue.length).toBe(4);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(3);
    });

    it("should move to the next item in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        expect(queue.hasPrevious).toBe(false);
        expect(queue.hasNext).toBe(true);

        expect(queue.next()).toBe(2);
        expect(queue.currentPosition).toBe(1);
        expect(queue.current).toBe(2);
        expect(queue.hasNext).toBe(true);
        expect(queue.hasPrevious).toBe(true);
        expect(queue.previousCount).toBe(1);
        expect(queue.nextCount).toBe(1);

        expect(queue.next()).toBe(3);
        expect(queue.currentPosition).toBe(2);
        expect(queue.current).toBe(3);
        expect(queue.hasNext).toBe(false);
        expect(queue.hasPrevious).toBe(true);
        expect(queue.previousCount).toBe(2);
        expect(queue.nextCount).toBe(0);

        expect(queue.next()).toBeNull();
        expect(queue.currentPosition).toBe(2);
        expect(queue.current).toBe(3);
        expect(queue.hasNext).toBe(false);
        expect(queue.hasPrevious).toBe(true);
        expect(queue.previousCount).toBe(2);
        expect(queue.nextCount).toBe(0);
    });

    it("should move to the previous item in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        expect(queue.previous()).toBeNull();
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);

        expect(queue.next()).toBe(2);
        expect(queue.previous()).toBe(1);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);
    });

    it("should clear the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        queue.clear();
        expect(queue.length).toBe(0);
        expect(queue.currentPosition).toBeNull();
        expect(queue.current).toBeNull();
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(0);
    });

    it("should clone the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        const clone = queue.clone();
        expect(clone).toBeInstanceOf(TrackQueue);
        expect(clone.length).toBe(3);
        expect(clone.currentPosition).toBe(0);
        expect(clone.current).toBe(1);
        expect(clone.previousCount).toBe(0);
        expect(clone.nextCount).toBe(2);
        expect(clone.toArray()).toEqual([1, 2, 3]);

        // check that the clone is a distinct instance
        clone.add(4);
        expect(queue.length).toBe(3);
        expect(queue.toArray()).toEqual([1, 2, 3]);
    });

    it("should get an item at a specific position in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);

        expect(queue.getAt(0)).toBe(1);
        expect(queue.getAt(1)).toBe(2);
        expect(queue.getAt(2)).toBe(3);
        expect(queue.getAt(3)).toBeNull();
        expect(queue.getAt(-1)).toBeNull();
    });

    it("should concat queues together", () => {
        const queue1 = new TrackQueue<number>();
        queue1.add(1, 2, 3);
        const queue2 = new TrackQueue<number>();
        queue2.add(4, 5, 6);
        const combined = queue1.concat(queue2);

        expect(combined.length).toBe(6);
        expect(combined.currentPosition).toBe(0);
        expect(combined.current).toBe(1);
        expect(combined.previousCount).toBe(0);
        expect(combined.nextCount).toBe(5);
        expect(combined.toArray()).toEqual([1, 2, 3, 4, 5, 6]);

        // check that the original queues are distinct and unchanged
        combined.add(7);
        expect(queue1.length).toBe(3);
        expect(queue1.toArray()).toEqual([1, 2, 3]);
        expect(queue2.length).toBe(3);
        expect(queue2.toArray()).toEqual([4, 5, 6]);
    });

    it("should insert into an empty queue", () => {
        const queue = new TrackQueue<number>();
        queue.insert(1, 2, 3);

        expect(queue.length).toBe(3);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);
    });

    it("should insert items into the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        queue.insert(4, 5);
        expect(queue.length).toBe(5);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.next()).toBe(4);
        expect(queue.next()).toBe(5);
        expect(queue.next()).toBe(2);
    });

    it("should insert items into the queue at a specific position", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);

        queue.insertAt(1, 4, 5);
        expect(queue.length).toBe(5);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.next()).toBe(4);
        expect(queue.next()).toBe(5);
        expect(queue.next()).toBe(2);
        expect(queue.next()).toBe(3);
    });

    it("should move to a specific position in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);

        expect(queue.moveTo(1)).toBe(2);
        expect(queue.currentPosition).toBe(1);
        expect(queue.current).toBe(2);
        expect(queue.previousCount).toBe(1);
        expect(queue.nextCount).toBe(1);

        expect(queue.moveTo(0)).toBe(1);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);

        expect(queue.moveTo(2)).toBe(3);
        expect(queue.currentPosition).toBe(2);
        expect(queue.current).toBe(3);
        expect(queue.previousCount).toBe(2);
        expect(queue.nextCount).toBe(0);

        expect(queue.moveTo(3)).toBeNull();
        expect(queue.currentPosition).toBe(2);
        expect(queue.current).toBe(3);
        expect(queue.previousCount).toBe(2);
        expect(queue.nextCount).toBe(0);
    });

    it("should move by a specific number of positions in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);

        expect(queue.moveBy(1)).toBe(2);
        expect(queue.current).toBe(2);
        expect(queue.previousCount).toBe(1);
        expect(queue.nextCount).toBe(1);

        expect(queue.moveBy(1)).toBe(3);
        expect(queue.current).toBe(3);
        expect(queue.previousCount).toBe(2);
        expect(queue.nextCount).toBe(0);

        expect(queue.moveBy(1)).toBeNull();
        expect(queue.current).toBe(3);
        expect(queue.previousCount).toBe(2);
        expect(queue.nextCount).toBe(0);

        expect(queue.moveBy(-1)).toBe(2);
        expect(queue.current).toBe(2);
        expect(queue.previousCount).toBe(1);
        expect(queue.nextCount).toBe(1);

        expect(queue.moveBy(-1)).toBe(1);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);

        expect(queue.moveBy(-1)).toBeNull();
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);
    });

    it("should remove items from the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3, 4, 5);

        expect(queue.removeAt(1)).toBe(2);
        expect(queue.length).toBe(4);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(3);

        expect(queue.next()).toBe(3);
        expect(queue.next()).toBe(4);

        expect(queue.removeAt(0)).toBe(1);
        expect(queue.length).toBe(3);
        expect(queue.currentPosition).toBe(1);
        expect(queue.current).toBe(4);
        expect(queue.previousCount).toBe(1);
        expect(queue.nextCount).toBe(1);
    });

    it("should pop and shift items from the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);

        expect(queue.pop()).toBe(3);
        expect(queue.length).toBe(2);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(1);

        expect(queue.next()).toBe(2);
        expect(queue.shift()).toBe(1);
        expect(queue.length).toBe(1);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(2);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(0);

        queue.clear();
        queue.add(1, 2, 3);
        expect(queue.shift()).toBe(1);
        queue.moveTo(1);
        expect(queue.pop()).toBe(3);
    });

    it("should return an array of the items in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        expect(queue.toArray()).toEqual([1, 2, 3]);
    });
});
