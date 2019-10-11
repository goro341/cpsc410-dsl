import * as React from "react";
import * as PropTypes from "prop-types";

interface ITextComponentProps {
    content: string;
}

interface ITextComponentState {
    text: string;
}

const initialState: ITextComponentState = {
    text: 'empty'
};

export class Text extends React.Component<ITextComponentProps, ITextComponentState>  {

    // propTypes is unnecessary
    static propTypes = {
        content: PropTypes.string
    };

    static defaultProps = {
        content: "World"
    };

    constructor(props: ITextComponentProps) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(): void {
        const temp_text = this.props.content;
        this.setState({text: temp_text});

    }

    public render(): JSX.Element {
        return (
                <p>
                    {this.state.text}
                </p>
        );
    }

}
export default Text;
