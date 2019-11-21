import {makeStyles} from "@material-ui/core";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import ReactDOM from 'react-dom'
import fetch from "isomorphic-unfetch";
import Header from "./header";
import Container from "@material-ui/core/Container";
import articles from "../articles";

const theStyles = makeStyles(theme => ({
    user: {
        height: '100%',
        width: '500px',
        backgroundColor: '#ff0000',
        paddingTop: '35px',
        paddingRight: '35px',
        paddingLeft: '35px'
    },
    closeIcon: {
        position: 'absolute',
        top: '20px',
        right: '20px'
    },
    bigAvatar: {
        width: 100,
        height: 100
    }
}));

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/user/1')
            .then(response => response.json())
            .then(data => this.setState({user: data[0]}));

    }

    closeUser() {
        document.getElementById('userContainer').style.width = '0px'

    }

    render() {
        const user = this.state.user;
        const style = {
            user: {
                height: '100%',
                width: '500px',
                backgroundColor: '#ff0000',
                paddingTop: '35px',
                paddingRight: '35px',
                paddingLeft: '35px',
                color : '#fff'
            },
            closeIcon: {
                position: 'absolute',
                top: '20px',
                right: '20px'
            },
            bigAvatar: {
                width: 100,
                height: 100
            }
        }
        return (
            <div style={style.user}>

                <Box  display="flex" flexDirection="Column" alignItems="center">
                    <Avatar style={style.bigAvatar} src="/sylvain.jpg"/>

                    <span>
                        {user.username}
                    </span>
                </Box>
                <span>
                <CloseIcon onClick={this.closeUser} style={style.closeIcon}/>
            </span>
            </div>

        )
    }
}

export default User;