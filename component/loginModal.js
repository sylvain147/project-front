import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from "isomorphic-unfetch";
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';


class loginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            hideForm: false,
            error: false,
            open: false
        }
    }

    saveToken = (token) => {
        localStorage.setItem('idToken', token)
    };
    changeUsername = (event) => {
        this.setState({username: event.target.value})
    };

    changePassword = (event) => {
        this.setState({password: event.target.value})
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({hideForm: true});
        let req = {
            method : 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(process.env.REACT_API + '/login',req)
            .then(response => {
                    if (response.status === 401) {
                        this.setState({
                            error: true,
                            hideForm: false
                        });
                        return null;
                    }
                    return response.json()
                }
            )
            .then(data => {
                if(data!== null) {
                    this.saveToken(data.token);
                    window.location.reload();
                }
            });
    };

    render() {
        const style = {
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            paper: {
                backgroundColor: "#fff",
                border: '2px solid #000',
                padding: '10px',
                width: '500px',
                display: 'flex',
                alignItems: 'center',
                height: '200px',
                justifyContent: 'center'

            },
            input: {
                marginLeft: '10px',
                marginRight: '10px',
            },
            validate: {
                textAlign: 'center',
                width: '96%',
                margin: "10px",
                marginTop: '20px'
            },
            form: {
                display: this.state.hideForm ? 'none' : 'block'
            },
            progress: {
                display: this.state.hideForm ? 'block' : 'none',
                width: '300px'
            }
        };


        return (
            <div style={{display: 'inline-block'}}>
                <span style={{color : '#556cd6', cursor:'pointer'}} onClick={this.handleOpen}>
                    Se connecter
                </span>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={style.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <Box style={style.paper}>
                            <LinearProgress style={style.progress}/>
                            <form onSubmit={this.handleSubmit} style={style.form}>
                                <Box display="flex">
                                    <TextField id="username"
                                               required
                                               error={this.state.error}
                                               style={style.input}
                                               label="username"
                                               margin="dense"
                                               variant="outlined"
                                               onChange={this.changeUsername}
                                    />
                                    <TextField id="password"
                                               required
                                               label="password"
                                               style={style.input}
                                               error={this.state.error}
                                               type="password"
                                               variant="outlined"
                                               margin="dense"
                                               onChange={this.changePassword}
                                    />
                                </Box>
                                <Button type="submit" variant="contained" color='primary'
                                        style={style.validate}> Valider</Button>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default loginModal;