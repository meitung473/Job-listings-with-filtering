// @flow
import * as React from "react";
import Cross from "../images/icon-remove.svg";

type Props = {
    style: string,
    addFilterTag: function,
    removeFilterTag: function,
    children: string,
};

export default class Tag extends React.Component<Props> {
    render(): React.Node {
        const { style, children } = this.props;
        const className = `tag ${style}`.trim();
        return (
            <li className={className} onClick={this.props?.addFilterTag}>
                <span className="tag__text">{children}</span>
                {this.props?.removeFilterTag && (
                    <span
                        className="tag__remove"
                        onClick={this.props?.removeFilterTag}
                    >
                        <Cross />
                    </span>
                )}
            </li>
        );
    }
}
