import Link from "next/link";
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import User from './User';
import Box from '@material-ui/core/Box';
import "../../app.css"

const BarLink = props => (
    <Box p={1}>
        <Typography>
            <Link href={props.link}>
                <a className={props.class}>
                    {props.title}
                </a>
            </Link>
        </Typography>
    </Box>
);
class appBar extends React.Component {
    showUser = () => {
        console.log()
        document.getElementById('userBar').style.width= '400px'
    }
    render () {
        return (
            <div>
                <AppBar color="default" position="fixed">
                    <Toolbar >
                        <Box display="flex" justifyContent="space-between" style={{width: '100%'}}>
                            <Box display="flex" style={{width: '200px'}} justifyContent="flex-start" alignItems="center">
                                <BarLink class="barLink" title="Accueil" link="/index"/>
                                <BarLink class="barLink" title="Catégories" link="/index"/>
                                <BarLink class="barLink" title="Articles" link="/articles"/>
                            </Box>
                            <Box display="flex" style={{width: '200px'}} justifyContent="center" alignItems="center">
                                <img className={'logoImg'} src="/logo.svg" alt="logo"/>
                                <span className={'titlePage'}>Rougetube</span>
                            </Box>
                            <Box display="flex" style={{width: '200px'}} justifyContent="flex-end" alignItems="center">
                                <AccountCircleIcon onClick={this.showUser}/>
                            </Box>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Toolbar />
                <User></User>

            </div>
        );
    }
}
export default appBar