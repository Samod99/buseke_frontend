// layout/Page.js
import React from 'react';
// import Header from '../components/Admin/Header';
// import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const WebLayout = ({ children, title, removemargin }) => {
    return (
        <div className=''>
            {/* <ScrollCircle /> */}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {/* <Header /> */}
            {children}
            {/* <Footer removemargin={removemargin} /> */}
        </div>
    );
};


export default WebLayout;