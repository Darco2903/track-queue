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
     * Creates a new TrackQueue instance that is a copy of this queue, including the current position.
     */
    public clone(): TrackQueue<T> {
        const clone = new TrackQueue<T>(this.toArray());
        clone.position = this.position;
        return clone;
    }

    /**
     * Gets the item at the specified index in the queue, or returns null if the index is out of bounds.
     * @param index The index of the item to get from the queue.
     * @returns The item at the specified index in the queue, or null if the index is out of bounds.
     */
    public getAt(index: number): T | null {
        if (index >= 0 && index < this.queue.length) {
            return this.queue[index];
        }
        return null;
    }

    /**
     * Concatenates the specified queues to the end of this queue.
     * @param queues The queues to concatenate to the end of this queue.
     * @returns This queue after concatenating the specified queues.
     */
    public concat(...queues: TrackQueue<T>[]): TrackQueue<T> {
        return new TrackQueue<T>(this.queue.concat(...queues.map((queue) => queue.queue)));
    }

    /**
     * Checks if the queue contains the specified item.
     * @param item The item to check for in the queue.
     * @returns True if the queue contains the specified item, false otherwise.
     */
    public contains(item: T): boolean {
        return this.queue.includes(item);
    }

    /**
     * Returns the index of the first occurrence of a value in the queue, or -1 if it is not present.
     * @param item The value to locate in the queue.
     * @returns The queue index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    public indexOf(item: T): number {
        return this.queue.indexOf(item);
    }

    /**
     * Returns the index of the last occurrence of a specified value in the queue, or -1 if it is not present.
     * @param item The value to locate in the queue.
     * @returns The queue index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the queue.
     */
    public lastIndexOf(item: T): number {
        return this.queue.lastIndexOf(item);
    }

    /**
     * Returns the value of the first element in the queue where predicate is true, and undefined otherwise.
     * @param predicate find calls predicate once for each element of the queue, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
     */
    public find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined {
        return this.queue.find(predicate);
    }

    /**
     * Returns the index of the first element in the queue where predicate is true, and -1 otherwise.
     * @param predicate findIndex calls predicate once for each element of the queue, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns the element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
     */
    public findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number {
        return this.queue.findIndex(predicate);
    }

    /**
     * Executes a provided function once for each item in the queue.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each item in the queue.
     * @param thisArg If provided, it will be used as the this value for each invocation of callbackfn. If it is not provided, undefined is used instead.
     */
    public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        this.queue.forEach(callbackfn, thisArg);
    }

    /**
     * Determines whether the specified predicate function returns true for all items in the queue.
     * @param predicate test each item in the queue. Return true to keep iterating, or false to stop and return false.
     * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
     */
    public every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.queue.every(predicate, thisArg);
    }

    /**
     * Determines whether the specified predicate function returns true for any item in the queue.
     * @param predicate test each item in the queue. Return true to keep iterating, or false to stop and return true.
     * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
     */
    public some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.queue.some(predicate, thisArg);
    }

    /**
     * Creates a new array with all items in the queue that pass the test implemented by the provided predicate function.
     * @param predicate test each item in the queue. Return true to keep the item, or false to filter it out.
     * @param thisArg If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
     */
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] {
        return this.queue.filter(predicate, thisArg);
    }

    /**
     * Adds items to the end of the queue.
     * @param items The items to add to the queue.
     */
    public add(...items: T[]): void {
        this.queue.push(...items);
    }

    /**
     * Removes the last item from the queue and returns it, or returns null if the queue is empty. If the current position is at or beyond the end of the queue after popping, the current position will be adjusted to point to the last item in the queue.
     * @returns The last item in the queue, or null if the queue is empty.
     */
    public pop(): T | null {
        return this.removeAt(this.queue.length - 1);
    }

    public shift(): T | null {
        return this.removeAt(0);
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
     */
    public removeAt(position: number): T {
        this.checkBounds(position);

        const deleted = this.queue.splice(position, 1);
        if (position <= this.position) {
            this.position--;
        }
        return deleted[0];
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
