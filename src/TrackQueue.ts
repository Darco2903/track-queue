export class TrackQueue<T> {
    private queue: T[];
    private position: number;

    /**
     * The number of items in the queue.
     */
    public get length(): number {
        return this.queue.length;
    }

    /**
     * Whether the queue is empty.
     */
    public get isEmpty(): boolean {
        return this.queue.length === 0;
    }

    /**
     * The current position in the queue, starting at 0 for the first item, or null if the queue is empty.
     */
    public get currentPosition(): number | null {
        return this.isEmpty ? null : this.position;
    }

    /**
     * The current item in the queue, or null if the queue is empty.
     */
    public get current(): T | null {
        return this.isEmpty ? null : this.queue[this.position];
    }

    /**
     * Whether there are items in the queue that come before the current position.
     */
    public get hasPrevious(): boolean {
        return this.position > 0;
    }

    /**
     * Whether there are items in the queue that come after the current position.
     */
    public get hasNext(): boolean {
        return this.position < this.queue.length - 1;
    }

    /**
     * The number of items in the queue that come before the current position.
     */
    public get previousCount(): number {
        return this.position;
    }

    /**
     * The number of items in the queue that come after the current position.
     */
    public get nextCount(): number {
        return Math.max(0, this.queue.length - this.position - 1);
    }

    /**
     * Creates a new TrackQueue instance.
     */
    constructor(array: T[] = []) {
        this.queue = array.slice();
        this.position = 0;
    }

    /**
     * Checks if the specified position is within the bounds of the queue, and throws a RangeError if it is not.
     * @param position The position to check against the bounds of the queue.
     */
    protected checkBounds(position: number): void {
        if (position < 0 || position >= this.queue.length) {
            throw new RangeError("Position out of bounds");
        }
    }

    /**
     * Clears the queue and resets the position to the beginning.
     */
    public clear(): void {
        this.queue = [];
        this.position = 0;
    }

    /**
     * Adds items to the end of the queue.
     * @param items The items to add to the queue.
     */
    public add(...items: T[]): void {
        this.queue.push(...items);
    }

    /**
     * Inserts items immediately after the current position in the queue.
     * @param items The items to insert into the queue.
     */
    public insert(...items: T[]): void {
        this.queue.splice(this.position + 1, 0, ...items);
    }

    /**
     * Inserts items at the specified position in the queue. If the position is less than or equal to the current position, the current position will be adjusted to account for the new items.
     * @param position The position at which to insert the items in the queue. Must be between 0 and the length of the queue, inclusive.
     * @param items The items to insert into the queue.
     */
    public insertAt(position: number, ...items: T[]): void {
        this.checkBounds(position);

        this.queue.splice(position, 0, ...items);

        if (position <= this.position) {
            this.position += items.length;
        }
    }

    /**
     * Removes items from the queue starting at the specified position. If the position is less than the current position, the current position will be adjusted to account for the removed items.
     * @param position The position at which to start removing items from the queue. Must be between 0 and the length of the queue, exclusive.
     * @param count The number of items to remove from the queue, starting at the specified position. Must be a non-negative integer. Defaults to 1.
     */
    public removeAt(position: number, count: number = 1): void {
        this.checkBounds(position);

        const removedCount = Math.min(count, this.queue.length - position);
        this.queue.splice(position, removedCount);
        if (position < this.position) {
            this.position = Math.max(0, this.position - removedCount);
        }
    }

    /**
     * Moves to the next item in the queue and returns it, or returns null if there are no more items.
     * @returns The next item in the queue, or null if there are no more items.
     */
    public next(): T | null {
        if (this.position < this.queue.length - 1) {
            this.position++;
            return this.current;
        }
        return null;
    }

    /**
     * Moves to the previous item in the queue and returns it, or returns null if there are no previous items.
     * @returns The previous item in the queue, or null if there are no previous items.
     */
    public previous(): T | null {
        if (this.position > 0) {
            this.position--;
            return this.current;
        }
        return null;
    }

    /**
     * Moves to the specified position in the queue and returns the item at that position, or returns null if the position is out of bounds.
     * @param position The position to move to in the queue.
     * @returns The item at the specified position in the queue, or null if the position is out of bounds.
     */
    public moveTo(position: number): T | null {
        if (position >= 0 && position < this.queue.length) {
            this.position = position;
            return this.current;
        }
        return null;
    }

    /**
     * Moves by the specified offset from the current position and returns the item at the new position, or returns null if the new position is out of bounds.
     * @param offset The number of positions to move from the current position. Positive values move forward, negative values move backward.
     * @returns The item at the new position in the queue, or null if the new position is out of bounds.
     */
    public moveBy(offset: number): T | null {
        return this.moveTo(this.position + offset);
    }

    /**
     * Returns a copy of the items in the queue as an array.
     * @returns An array containing the items in the queue.
     */
    public toArray(): T[] {
        return this.queue.slice();
    }
}
