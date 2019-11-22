import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from "isomorphic-unfetch";

class loginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null,
            password : null,
            open : false
        }
    }
    saveToken = (token) => {
        localStorage.setItem('idToken', token)
    }
    changeUsername = (event) => {
        this.setState({username : event.target.value})
    };

     changePassword = (event) => {
        this.setState({password : event.target.value})
    };

     handleOpen = () => {
         this.setState({open : true})
     }

     handleClose = () => {
         this.setState({open : false})
     }

     handleSubmit = () => {
         fetch('http://localhost:8080/api/login?username='+this.state.username+'&&password='+this.state.password)
             .then(response => response.json())
             .then(data => this.saveToken(data.token));
     }

    render () {
        const style = {
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            paper: {
                backgroundColor: "#fff",
                border: '2px solid #000',
            },
        }


        return (
            <div>
                <button type="button" onClick={this.handleOpen}>
                    Log in
                </button>
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
                            <form >
                                <div>
                                    <TextField id="username"
                                               label="username"
                                               margin="normal"
                                               onChange={this.changeUsername}
                                    />
                                    <TextField id="password"
                                               label="password"
                                               margin="normal"
                                               type="password"
                                               onChange={this.changePassword}
                                    />
                                </div>
                                <Button onClick={this.handleSubmit}> Here</Button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}
export default loginModal;