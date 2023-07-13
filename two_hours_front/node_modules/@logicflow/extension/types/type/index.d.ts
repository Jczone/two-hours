import { BaseNodeModel } from '@logicflow/core';
declare type PointTuple = [number, number];
export declare type ExclusiveGatewayAttribute = BaseNodeModel & {
    points?: PointTuple[] & string;
};
export {};
