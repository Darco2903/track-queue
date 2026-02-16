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

        queue.removeAt(1, 2);
        expect(queue.length).toBe(3);
        expect(queue.currentPosition).toBe(0);
        expect(queue.current).toBe(1);
        expect(queue.previousCount).toBe(0);
        expect(queue.nextCount).toBe(2);

        expect(queue.next()).toBe(4);
        expect(queue.next()).toBe(5);

        queue.removeAt(0);
        expect(queue.length).toBe(2);
        expect(queue.currentPosition).toBe(1);
        expect(queue.current).toBe(5);
        expect(queue.previousCount).toBe(1);
        expect(queue.nextCount).toBe(0);
    });

    it("should return an array of the items in the queue", () => {
        const queue = new TrackQueue<number>();
        queue.add(1, 2, 3);
        expect(queue.toArray()).toEqual([1, 2, 3]);
    });
});
