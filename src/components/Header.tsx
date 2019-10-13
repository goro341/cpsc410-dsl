import * as React from "react";
import * as PropTypes from "prop-types";
import './Header.css';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        {this.state.text}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }

}
export default Header;
