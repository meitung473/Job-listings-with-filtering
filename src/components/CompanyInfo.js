// @flow
import * as React from "react";

type Props = {
    data: {
        company: string,
        contract: string,
        featured: boolean,
        ["new"]: boolean,
        location: string,
        logo: string,
        position: string,
        postedAt: string,
    },
};

export default class CompanyInfo extends React.Component<Props> {
    render(): React.Node {
        const {
            company,
            contract,
            featured,
            location,
            logo,
            position,
            postedAt,
            ["new"]: New,
        } = this.props.data;
        return (
            <div className="info">
                <img
                    className="info__avatar"
                    src={logo}
                    alt={`${company}'s logo`}
                />
                <div className="info__content">
                    <div className="content__header">
                        <span className="content__header-title">{company}</span>
                        {New && <span className="tag round new">New!</span>}
                        {featured && (
                            <span className="tag round features">Features</span>
                        )}
                    </div>
                    <p className="content__body">{position}</p>
                    <div className="content__footer">
                        <span>{postedAt}</span>
                        <span>{contract}</span>
                        <span>{location}</span>
                    </div>
                </div>
            </div>
        );
    }
}
