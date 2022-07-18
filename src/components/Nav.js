// @flow
import * as React from "react";
type Props = {
    show: boolean,
    cleanFilterTag: function,
    children: React.Node,
};

export default class Nav extends React.Component<Props> {
    render(): React.Node {
        const { show, cleanFilterTag, children } = this.props;
        if (!show) return null;
        const Tags = () => children;
        return (
            <div className="nav">
                <ul className="nav__list">
                    <Tags />
                </ul>
                <span className="nav__clear" onClick={cleanFilterTag}>
                    Clear
                </span>
            </div>
        );
    }
}
