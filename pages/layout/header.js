import Link from '../../src/Link';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import User from './user'

const useStyles = makeStyles(theme => ({
    navLink: {
        color : '#454545',
        '&:hover': {
            color : '#850606',
            textDecoration : 'none'
        }
    },
    userContainer : {
        width : '0px',
        height : "100%",
        position : 'absolute',
        overflow : 'hidden',
        zIndex : '1101',
        top:'0',
        right : '0',
        transition : 'width 300ms'
    },
    logoImg : {
        height : '100px'
    },
    titlePage : {
        color : '#850606',
        fontStyle : 'italic',
        borderLeft : '1px solid',
        paddingLeft : '12px'
    }
}))
const BarLink = props => (
    <Box p={1} >
        <Typography >
            <Link href={props.link} className={useStyles().navLink}>
                    {props.title}
            </Link>
        </Typography>
    </Box>
);

const getRouteName = () => {
    let route = useRouter().pathname.split('/').pop();
    route = route.charAt(0).toUpperCase()+route.slice(1);
    return route !== '' ? route : 'Rougetube';
}
export default function () {
    const classes = useStyles();
    const showUser = () => {
        document.getElementById('userContainer').style.width = '500px'
    };
    const route = getRouteName();
    return (
        <React.Fragment>
            <AppBar color="default" position="sticky" height="100px">
                <Toolbar height="100px">
                    <Box display="flex" justifyContent="space-between" style={{width: '100%'}}>

                        <Box display="flex" style={{width: '200px'}} justifyContent="flex-start" alignItems="center">
                            <BarLink title="Accueil" link="/"/>
                            <BarLink title="Catégories" link="/index"/>
                            <BarLink title="Articles" link="/articles"/>
                        </Box>
                        <Box display="flex" style={{width: '200px'}} justifyContent="center" alignItems="center">
                            <img className={classes.logoImg} src="/logo.svg" alt="logo"/>
                            <Typography className={classes.titlePage} variant="body1" align="center">
                                {route}
                            </Typography>

                        </Box>
                        <Box display="flex" style={{width: '200px'}} justifyContent="flex-end" alignItems="center">
                            <span onClick={showUser}><AccountCircleIcon style={{cursor : 'pointer'}}/></span>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
            <Toolbar />
            <div id={"userContainer"} className={classes.userContainer}><User/></div>
        </React.Fragment>
    )
}