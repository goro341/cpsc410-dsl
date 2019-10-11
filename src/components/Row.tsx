import * as React from "react";
import * as PropTypes from "prop-types";

interface IRowComponentProps {
    content: Array<string>;
}

interface IRowComponentState {
    cells: Array<String>;
}

const initialState: IRowComponentState = {
    cells: []
};


export class Row extends React.Component<IRowComponentProps, IRowComponentState>  {
    // propTypes is unnecessary
    static propTypes = {
        content: PropTypes.string
    };

    static defaultProps = {
        content: ["World", "Nice"]
    };

    constructor(props: IRowComponentProps) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(): void {
        const temp_arr = this.props.content;
        this.setState({cells: temp_arr});

    }
    public render(): JSX.Element {
        return (
                <tr>
                    {
                        this.state.cells.map((object, i) =>
                            <td key={i}>{object}</td>
                        )
                    }
                </tr>
        );
    }
}
export default Row;