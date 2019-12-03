import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from "isomorphic-unfetch";
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
const CssTextField = withStyles({
    root: {
        '& .MuiFormLabel-root' :{
            color : '#E9EAE9',
            fontWeight : 'bold',
            fontSize : '20px'
        },
        '& .MuiInputBase-input' : {
            color : '#E9EAE9',
            paddingTop : '15px'
        },
        '& .MuiInput-underline:before' : {
            borderBottomColor : '#E9EAE9'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before, .MuiInput-colorSecondary.MuiInput-underline:after,.MuiInput-underline:before':
          {
            borderBottomColor : '#E9EAE9'
        },
    },
})(TextField);

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
                backgroundColor: "#850606",
                padding: '50px 10px',
                width: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border:'none',
            },
            input: {
                marginLeft: '10px',
                marginRight: '10px',
            },
            validate: {
                textAlign: 'center',
                width: '100%',
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
                                <Box display="flex"
                                flexDirection="column">
                                    <CssTextField
                                        label="Username"
                                        id="username"
                                        required
                                        style={{ margin: 25, color: '##E9EAE9' }}
                                        margin="normal"
                                        color="secondary"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: false
                                        }}
                                        onChange={this.changeUsername}
                                    />
                                    <CssTextField id="password"
                                               color="secondary"
                                               required
                                               label="Password"
                                               style={{ margin: 25, color: '##E9EAE9' }}
                                               type="password"
                                               margin="normal"
                                               InputLabelProps={{
                                                   shrink: true,
                                                   required: false
                                               }}
                                               onChange={this.changePassword}
                                    />
                                </Box>
                                <Box p={3} mt={3}>
                                <Button type="submit" variant="contained" color='secondary'
                                        style={style.validate}> Valider</Button>
                                </Box>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default loginModal;