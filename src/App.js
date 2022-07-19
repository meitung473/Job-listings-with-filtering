// @flow
import * as React from "react";
import { CompanyInfo, Tag, Nav, JobItem } from "./components";
import { data2Info } from "./convert";
import Data from "./data";

type Props = {};
type State = {
    filterTag: Array<string>,
    data: Array<Object>,
};
type tagMethod = (tagName: string) => () => void;

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            filterTag: [],
            data: [],
        };
    }
    componentDidMount() {
        /**
         * get data
         */
        fetch(Data)
            .then((res) => res.json())
            .then((data: Object) => {
                // handle svg url
                let newData: Array<any> = data.map((d: Object): Object => {
                    return Object.assign(d, {
                        logo: require(`${d.logo}?url`),
                    });
                });
                this.setState({
                    data: newData,
                });
            });
    }
    /**
     * add filter tag
     * @param {String} tagName
     * @returns
     */
    addFilterTag: tagMethod = (tagName) => () => {
        this.setState((prevState) => {
            if (prevState.filterTag.includes(tagName)) return prevState;
            return {
                filterTag: [...prevState.filterTag, tagName],
            };
        });
    };
    /**
     * remove filter tag
     * @param {String} tagName
     * @returns
     */
    removeFilterTag: tagMethod = (tagName) => () => {
        this.setState((prevState) => {
            return {
                filterTag: prevState.filterTag.filter((tag) => tag !== tagName),
            };
        });
    };
    /**
     * clean all tags
     */
    cleanAllFilterTag: () => void = () => {
        this.setState({
            filterTag: [],
        });
    };
    render(): React.Node {
        const isSelected: boolean = this.state.filterTag.length > 0;
        return (
            <div className="container">
                <Nav show={isSelected} cleanFilterTag={this.cleanAllFilterTag}>
                    {this.state.filterTag.map((tag) => (
                        <Tag
                            key={tag}
                            style="square selected"
                            removeFilterTag={this.removeFilterTag(tag)}
                        >
                            {tag}
                        </Tag>
                    ))}
                </Nav>
                <ul className={`jobList ${isSelected ? "filter" : ""}`}>
                    {this.state.data.map((data) => {
                        let show;
                        let filterData;
                        let jobitemclassName;
                        let itemselected = this.state.filterTag.every((f) =>
                            data2Info(data).tags.includes(f)
                        );

                        if (!isSelected || itemselected) {
                            show = true;
                            filterData = data2Info(data);
                            jobitemclassName = `jobItem ${
                                filterData["new"] && filterData.featured
                                    ? "all"
                                    : ""
                            }`;
                        }
                        return (
                            <JobItem
                                className={jobitemclassName}
                                show={show}
                                key={data.id}
                                info={<CompanyInfo data={data2Info(data)} />}
                            >
                                {data2Info(data).tags.map((tag) => {
                                    return (
                                        <Tag
                                            key={tag}
                                            style="square"
                                            addFilterTag={this.addFilterTag(
                                                tag
                                            )}
                                        >
                                            {tag}
                                        </Tag>
                                    );
                                })}
                            </JobItem>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default App;
