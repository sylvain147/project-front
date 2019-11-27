import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {UserContext} from "../component/UserContext";
import fetch from "isomorphic-unfetch";
import Header from '../component/header'


export default class MyApp extends App {
    state = {
        connecting : true,
        user: null
    };

    componentDidMount() {
        this.setState({connecting : true})
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        let headers = new Headers();
        headers.append("authorization", localStorage.getItem('idToken'));
        let obj = {
            method: 'POST',
            headers: headers
        }
        fetch(process.env.REACT_API + '/authed', obj)
            .then(response => response.status === 401 ? null : response.json())
            .then(data => this.setState({user : data, connecting : false}));
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>Le blog</title>
                </Head>
                <UserContext.Provider value={{user : this.state.user, connecting : this.state.connecting}}>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline/>

                        <Header/>
                        <Component {...pageProps} />

                    </ThemeProvider>
                </UserContext.Provider>
            </React.Fragment>
        );
    }
}
