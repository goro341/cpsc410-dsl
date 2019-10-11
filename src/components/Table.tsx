import React from 'react';
import './Table.css'
import Row from "./Row";


const Table: React.FC = () => {
    return (
        <table className="App-table">
            <Row content={['one', '1']}/>
            <Row content={['two', '2']}/>
            <Row content={['three', '3', 'third']}/>
            <Row content={['four', '4', 'fourth', 'quad']}/>
        </table>
    );
}
export default (Table)