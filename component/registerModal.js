import React from 'react';
import { withStyles} from '@material-ui/core/styles';
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

const CssTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#E9EAE9',
            fontWeight: 'bold',
            fontSize: '20px'
        },
        '& .MuiInputBase-input': {
            color: '#E9EAE9',
            paddingTop: '15px'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#E9EAE9'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before, .MuiInput-colorSecondary.MuiInput-underline:after,.MuiInput-underline:before':
            {
                borderBottomColor: '#E9EAE9'
            },
    },
})(TextField);

class registerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            hideForm: false,
            error: false,
            mail: null,
            errorMessage: '',
            open: false,
            openBadSnack: false,
            openGoodSnack: false
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
        this.setState({openBadSnack: false})
    };
    handleCloseGoodSnack = () => {
        this.setState({openGoodSnack: false})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({hideForm: true});
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
        };
        fetch(process.env.REACT_API + '/user', obj)
            .then(response => {
                    if (response.status === 400) {
                        this.setState({
                            openBadSnack: true,
                            hideForm: false,
                            error: true
                        })
                    } else {
                        this.setState({
                            openGoodSnack: true,
                            hideForm: false,
                            error: false
                        })
                    }
                }
            )
    };

    render() {
        const style = {
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            paper: {
                backgroundColor: "#850606",
                padding: '50px 10px',
                width: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
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

        };


        return (
            <div style={{display: 'inline-block'}}>
                <span style={{color: '#556cd6', cursor: 'pointer'}} onClick={this.handleOpen}>
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
                                    <CssTextField id="email"
                                                  style={{margin: 25, color: '##E9EAE9'}}
                                                  margin="normal"
                                                  InputLabelProps={{
                                                      shrink: true,
                                                  }}
                                                  label="Email"
                                                  onChange={this.changeMail}
                                                  required
                                    />
                                    <CssTextField id="username"
                                               label="Username"
                                               onChange={this.changeUsername}
                                               style={{margin: 25, color: '##E9EAE9'}}
                                               margin="normal"
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                                  required
                                    />
                                    <CssTextField id="password"
                                               label="Password"
                                               type="password"
                                               onChange={this.changePassword}
                                               style={{margin: 25, color: '##E9EAE9'}}
                                               margin="normal"
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                                  required
                                    />

                                </Box>
                                <Box p={3} mt={3}>
                                <Button type="submit" variant="contained" color='secondary'
                                        style={style.validate}> Valider</Button>
                                </Box>
                            </form>
                            <Snackbar
                                open={this.state.openBadSnack}
                                autoHideDuration={3000}
                                onClose={this.handleCloseBadSnack}
                            >
                                <SnackbarContent style={{backgroundColor: '#d32f2f', textAlign: 'center'}}
                                                 message="Utitlisateur déjà existant"/>
                            </Snackbar>
                            <Snackbar
                                open={this.state.openGoodSnack}
                                autoHideDuration={3000}
                                onClose={this.handleCloseGoodSnack}
                            >
                                <SnackbarContent style={{backgroundColor: '#43a047', textAlign: 'center'}}
                                                 message="Utitlisateur crée"/>
                            </Snackbar>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default registerModal;