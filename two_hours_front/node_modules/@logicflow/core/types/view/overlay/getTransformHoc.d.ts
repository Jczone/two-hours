import { h, ComponentType } from 'preact';
import { GraphTransform } from '../../type';
import GraphModel from '../../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
};
export default function getTransform<P>(WrappedComponent: ComponentType<P>): {
    new (props?: IProps & P, context?: any): {
        getMatrixString(): GraphTransform;
        render(): h.JSX.Element;
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillUnmount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<IProps & P>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<IProps & P>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<IProps & P>, nextState: Readonly<{}>, nextContext: any): void;
        getSnapshotBeforeUpdate?(oldProps: Readonly<IProps & P>, oldState: Readonly<{}>): any;
        componentDidUpdate?(previousProps: Readonly<IProps & P>, previousState: Readonly<{}>, snapshot: any): void;
        componentDidCatch?(error: any, errorInfo: any): void;
        state: Readonly<{}>;
        props: import("preact").RenderableProps<IProps & P, any>;
        context: any;
        base?: Element | Text;
        setState<K extends never>(state: Partial<{}> | ((prevState: Readonly<{}>, props: Readonly<IProps & P>) => Partial<{}> | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
    };
    displayName?: string;
    defaultProps?: any;
    contextType?: import("preact").Context<any>;
    getDerivedStateFromProps?(props: object, state: object): object;
    getDerivedStateFromError?(error: any): object;
};
export {};
