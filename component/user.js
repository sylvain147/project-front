import {makeStyles} from "@material-ui/core";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import LogOutModal from './logOutModal';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
const axios = require("axios");




class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }

    }
    closeUser = () => {
        document.getElementById(this.props.container).style.width = '0px'

    };

    saveData = () => {
        axios.put(process.env.REACT_API + "/user/"+this.state.user.user_id, new FormData(document.getElementById('userForm')))
            .then((response) => {
            }).catch((error) => {
        });
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
                cursor: 'pointer'
            },
            bigAvatar: {
                width: 100,
                height: 100
            }
        };
        return (
            <div style={style.user}>
                <Box display="flex" flexDirection="Column" alignItems="center">
                    <Box display="flex" width="100%" justifyContent="space-between" mb={3}>
                        <LogOutModal/>
                        <CloseIcon onClick={this.closeUser} style={style.closeIcon}/>
                    </Box>
                    <Avatar style={style.bigAvatar} src="/sylvain.jpg"/>
                    <Box mt={2}>
                        {this.state.user.username}
                    </Box>
                    <form id="userForm">
                        <Box display="flex">
                            <Box mt={3} mar={1}>
                                <span>Date de naissance</span>
                            </Box>
                            <Box m={2}>
                                <TextField
                                    id="date"
                                    type="date"
                                    name="birthday"
                                    defaultValue={JSON.parse(this.state.user.data).birthday}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Box>
                                <span>
                                    Biographie
                                </span>

                            </Box>
                            <Box>
                                <TextField
                                    id="description"
                                    rows="4"
                                    fullWidth
                                    multiline
                                    name="description"
                                    defaultValue={JSON.parse(this.state.user.data).description}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" mt={5} justifyContent="flex-end">
                            <Button onClick={this.saveData} style={{color: '#43a047'}}>Sauvegarder les données</Button>

                        </Box>
                    </form>

                </Box>
                <span>
            </span>
            </div>

    )
    }
    }

    export default User;