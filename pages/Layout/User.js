import {makeStyles} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import "../../app.css"

class User extends React.Component {
    hideUser = () => {
        this.refs.userBar.style.width = '0px'
    };
    getRefs = () => {
        return 'ok'
    }
    showUser = () => {
        console.log('EZ')
    };
    render () {
        return (
            <Box className={"user-space"} ref='userBar' id={"userBar"}>
            <CloseIcon onClick={this.hideUser}/>
            Wesh
        </Box>);
    }
}
export default User;
