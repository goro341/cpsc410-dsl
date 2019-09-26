import * as React from "react";
import * as PropTypes from "prop-types";
import './Header.css';

interface IHeaderComponentProps {
    name: string;
}

interface IHeaderComponentState {
    text: string;
}

const initialState: IHeaderComponentState = {
    text: 'empty'
};

export class Header extends React.Component<IHeaderComponentProps, IHeaderComponentState>  {

    // propTypes is unnecessary
    static propTypes = {
        name: PropTypes.string
    };

    static defaultProps = {
        name: "World"
    };

    constructor(props: IHeaderComponentProps) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(): void {
        const temp_text = this.props.name;
        this.setState({text: temp_text});

    }

    public render(): JSX.Element {
        return (
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.state.text}
                </a>
            </header>
        );
    }

}
export default Header;
