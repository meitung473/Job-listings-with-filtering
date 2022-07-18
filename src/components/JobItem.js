// @flow
import * as React from "react";

type Props = {
    show: boolean,
    info: React.Node,
    className: string,
    children: React.Node,
};

export default class JobItem extends React.Component<Props> {
    shouldComponentUpdate(prevProps: Props): boolean {
        if (prevProps.show === this.props.show) {
            return false;
        }
        return true;
    }
    render(): React.Node {
        const { show, info, className, children } = this.props;
        if (!show) return null;
        const Info = () => info;
        const Tags = () => children;
        return (
            <li className={className}>
                <Info />
                <ul className="tagList">
                    <Tags />
                </ul>
            </li>
        );
    }
}
