import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from "isomorphic-unfetch";
import {Box} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

class registerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            hideForm: false,
            error: false,
            mail: null,
            errorMessage : '',
            open: false,
            openBadSnack : false,
            openGoodSnack : false
        }
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value})
    };

    changePassword = (event) => {
        this.setState({password: event.target.value})
    };

    changeMail = (event) => {
        this.setState({mail: event.target.value})
    };

    handleOpen = () => {
        this.setState({open: true})
    };
    handleCloseBadSnack = () => {
        this.setState({openBadSnack :false})
    };
    handleCloseGoodSnack = () => {
        this.setState({openGoodSnack :false})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({hideForm: true})
        let obj = {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.mail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(process.env.REACT_API + '/user', obj)
            .then(response => {
                    if (response.status === 400) {
                        this.setState({
                            openBadSnack :true,
                            hideForm: false,
                            error : true
                        })
                    }
                    else {
                        this.setState({
                            openGoodSnack :true,
                            hideForm: false,
                            error : false
                        })
                    }
                }
            )
    }

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
                width: '500px',
                display: 'flex',
                alignItems: 'center',
                height: '320px',
                justifyContent: 'center'
            },
            validate: {
                textAlign: 'center',
                width: '100%',
                marginTop: '10px'
            },
            form: {
                display: this.state.hideForm ? 'none' : 'block'
            },
            progress: {
                display: this.state.hideForm ? 'block' : 'none',
                width: '300px'
            }

        }


        return (
            <div style={{display: 'inline-block'}}>
                <span style={{color : '#556cd6', cursor:'pointer'}}onClick={this.handleOpen}>
                    Créer un compte
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
                        <div style={style.paper}>
                            <LinearProgress style={style.progress}/>
                            <form onSubmit={this.handleSubmit} style={style.form}>
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <TextField id="email"
                                               label="email"
                                               margin="dense"
                                               type="email"
                                               error={this.state.error}
                                               onChange={this.changeMail}
                                               variant="outlined"
                                               required
                                    />
                                    <TextField id="username"
                                               label="username"
                                               margin="dense"
                                               error={this.state.error}
                                               onChange={this.changeUsername}
                                               variant="outlined"
                                               required
                                    />
                                    <TextField id="password"
                                               label="password"
                                               margin="dense"
                                               type="password"
                                               onChange={this.changePassword}
                                               variant="outlined"
                                               required
                                    />

                                </Box>
                                <Button  type="submit" variant="contained" color='primary'
                                        style={style.validate}> Valider</Button>
                            </form>
                            <Snackbar
                                open={this.state.openBadSnack}
                                autoHideDuration={3000}
                                onClose={this.handleCloseBadSnack}
                            >
                                <SnackbarContent style={{backgroundColor : '#d32f2f', textAlign : 'center'}}  message="Utitlisateur déjà existant"/>
                            </Snackbar>
                            <Snackbar
                                open={this.state.openGoodSnack}
                                autoHideDuration={3000}
                                onClose={this.handleCloseGoodSnack}
                            >
                                <SnackbarContent style={{backgroundColor : '#43a047', textAlign : 'center'}}  message="Utitlisateur crée"/>
                            </Snackbar>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default registerModal;