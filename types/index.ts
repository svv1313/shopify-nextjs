export interface INode<T> {
  node: INode<T>;
}
export type IEdges<T> = {
    edges: {
        node: T;
    }[];
};
export type Nullable<T> = T | undefined | null;
