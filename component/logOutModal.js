import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";


class logOutModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    disconnect = () => {
        localStorage.removeItem('idToken');
        window.location.reload();
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
                <span style={{cursor : 'pointer'}} onClick={this.handleOpen}>
                    Se déconnecter
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
                        <Box display="flex" flexDirection="column" style={style.paper}>
                            <Typography  variant="h6" align="center">
                                Êtes-vous sûr de vouloir nous quitter ?
                            </Typography>
                            <Box display="flex" >
                                <Button onClick={this.handleClose}>I'm not fucking leaving</Button>
                                <Button onClick={this.disconnect}>Se déconnecter</Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default logOutModal;