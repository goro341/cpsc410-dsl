import React from 'react';
import Header from "../components/Header";
import Text from "../components/Text";
import Table from "../components/Table";
import './Page.css'

const Page: React.FC = () => {
    console.log('here');
    return (
        <div className='App-page'>
            <Header name='Awesome Website Builder'/>
            <Text content='Input text here' />
            <Table />
        </div>
    );
}
export default (Page)
