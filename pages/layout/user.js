import {makeStyles} from "@material-ui/core";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import LogOutModal from './logOutModal'
import ReactDOM from 'react-dom'
import fetch from "isomorphic-unfetch";
import Header from "./header";
import Container from "@material-ui/core/Container";
import articles from "../articles";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    closeUser = () => {
        document.getElementById(this.props.container).style.width = '0px'

    }
    render() {
        const style = {
            user: {
                height: '100%',
                width: '500px',
                backgroundColor: 'rgb(133, 6, 6)',
                paddingTop: '15px',
                paddingRight: '35px',
                paddingLeft: '35px',
                color: '#fff'
            },
            closeIcon: {
                cursor : 'pointer'
            },
            bigAvatar: {
                width: 100,
                height: 100
            }
        }
        return (
            <div style={style.user}>
                <Box display="flex" flexDirection="Column" alignItems="center">
                    <Box display="flex" width="100%" justifyContent="space-between" mb={3}>
                        <LogOutModal/>
                        <CloseIcon onClick={this.closeUser} style={style.closeIcon}/>
                    </Box>
                    <Avatar style={style.bigAvatar} src="/sylvain.jpg"/>

                    <span>
                        {this.props.user.username}
                    </span>
                </Box>
                <span>
            </span>
            </div>

        )
    }
}

export default User;