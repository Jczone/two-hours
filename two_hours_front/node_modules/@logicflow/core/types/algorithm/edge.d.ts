import { Point } from '../type/index';
export declare const getCorssPointOfLine: (a: Point, b: Point, c: Point, d: Point) => false | {
    x: number;
    y: number;
};
export declare const isInSegment: (point: any, start: any, end: any) => boolean;
