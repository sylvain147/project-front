import Link from '../../src/Link';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import User from './user'
import LoginModal from "./loginModal";
import fetch from "isomorphic-unfetch";
import RegisterModal from "./registerModal";

const useStyles = makeStyles(theme => ({
    navLink: {
        color: '#454545',
        '&:hover': {
            color: '#850606',
            textDecoration: 'none'
        }
    },
    userContainer: {
        width: '0px',
        height: "100%",
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '1101',
        top: '0',
        right: '0',
        transition: 'width 300ms'
    },
    logoImg: {
        height: '100px'
    },
    titlePage: {
        color: '#850606',
        fontStyle: 'italic',
        borderLeft: '1px solid',
        paddingLeft: '12px'
    }
}))
const BarLink = props => (
    <Box p={1}>
        <Typography>
            <Link href={props.link} className={useStyles().navLink}>
                {props.title}
            </Link>
        </Typography>
    </Box>
);

class header extends React.Component {
    constructor(props, context) {

        super(props);
        this.state = {
            user: null,
        }
    }


    componentDidMount() {
        let headers = new Headers();
        headers.append("authorization", localStorage.getItem('idToken'));

        let obj = {
            method: 'POST',
            headers: headers
        }
        fetch(process.env.REACT_API+'/authed', obj)
            .then(response => response.status === 401 ? null  : response.json())
            .then(data => this.setState({user : data}));
    }

    showUser() {
        document.getElementById('userContainer').style.width = '500px'
    }

    getUserStatus() {
        if (this.state.user != null) {
            return <span onClick={this.showUser} id="showUser"><AccountCircleIcon style={{cursor: 'pointer'}}/></span>
        }
        return  <div><LoginModal id="login"/> / <RegisterModal /></div>
    }

    getUser() {
        if (this.state.user != null) {
            return <User user={this.state.user} container={"userContainer"}/>
        }
        return <div></div>
    }

    render() {
        let style = {
            navLink: {
                color: '#454545',
                '&:hover': {
                    color: '#850606',
                    textDecoration: 'none'
                }
            },
            userContainer: {
                width: '0px',
                height: "100%",
                position: 'absolute',
                overflow: 'hidden',
                zIndex: '1101',
                top: '0',
                right: '0',
                transition: 'width 300ms'
            },
            logoImg: {
                height: '100px'
            },
            titlePage: {
                color: '#850606',
                fontStyle: 'italic',
                borderLeft: '1px solid',
                paddingLeft: '12px'
            }
        }


        return (
            <React.Fragment>
                <AppBar color="default" position="sticky" height="100px">
                    <Toolbar height="100px">
                        <Box display="flex" justifyContent="space-between" style={{width: '100%'}}>

                            <Box display="flex" style={{width: '210px'}} justifyContent="flex-start"
                                 alignItems="center">
                                <BarLink title="Accueil" link="/"/>
                                <BarLink title="Catégories" link="/index"/>
                                <BarLink title="Articles" link="/articles"/>
                            </Box>
                            <Box display="flex" style={{width: '210px'}} justifyContent="center" alignItems="center">
                                <img style={style.logoImg} src="/logo.svg" alt="logo"/>
                                <Typography style={style.titlePage} variant="body1" align="center">
                                    Rougetube
                                </Typography>

                            </Box>
                            <Box display="flex" style={{width: '210px'}} justifyContent="flex-end" alignItems="center">
                                {this.getUserStatus()}
                            </Box>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Toolbar/>
                <div id={"userContainer"} style={style.userContainer}>
                    {this.getUser()}
                </div>
            </React.Fragment>

        )
    }
}

export default header
