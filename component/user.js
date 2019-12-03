import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import LogOutModal from './logOutModal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const axios = require("axios");
import Card from '@material-ui/core/Card';
import fetch from "isomorphic-unfetch";
import {withStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
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

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            hideForm : false
        }

    }

    closeUser = () => {
        document.getElementById(this.props.container).style.width = '0px'

    };

    saveData = () => {
        this.setState({hideForm : true});
        axios.put(process.env.REACT_API + "/user/" + this.state.user.user_id, new FormData(document.getElementById('userForm')))
            .then(() => {
                this.reloadUser()
            });
    };

    onChangeImg = (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('id', this.state.user.user_id);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post(process.env.REACT_API+"/image", formData, config)
            .then((response) => {
                document.getElementById('imgContainer').style.backgroundImage =  `url(${process.env.REACT_BUCKET}/${response.data}`;
                this.reloadUser()
            })
    };
    reloadUser = () => {
        let headers = new Headers();
        headers.append("authorization", localStorage.getItem('idToken'));
        let obj = {
            method: 'POST',
            headers: headers
        };
        fetch(process.env.REACT_API + '/reloaduser', obj)
            .then(response => response.status === 401 ? null : response.json())
            .then(data => {
                this.setState({hideForm : false});

                localStorage.setItem('idToken', data.token)
            });
    };

    showChange = () => {
            document.getElementById('labelPicture').style.height = '100%'
    };
    hideChange = () => {
            document.getElementById('labelPicture').style.height = '0%'
    };

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
                width: 150,
                height: 150
            },

            labelPicture: {
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center',
                overflow:'hidden',
                width : '100%',
                height : '0%',
                color : '#fff',
                backgroundColor : 'rgba(0,0,0,0.7)',
                transition : 'height 200ms',
                cursor : 'pointer'
            },
            imgContainer: {
                backgroundImage: `url(${process.env.REACT_BUCKET}/${this.state.user.avatar}`,
                width: '160px',
                height: '160px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                placeItems: 'flex-end',
                justifyContent: 'center',
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

            <div style={style.user}>
                <Box display="flex" flexDirection="Column" alignItems="center">
                    <Box display="flex" width="100%" justifyContent="space-between" mb={3}>
                        <LogOutModal/>
                        <CloseIcon onClick={this.closeUser} style={style.closeIcon}/>
                    </Box>
                    <Card style={{borderRadius: '150px 150px'}}>
                        <div onMouseEnter={this.showChange} onMouseLeave={this.hideChange} id='imgContainer' style={style.imgContainer}>
                            <input style={{display: 'none'}} type="file" name="file" id="file"
                                   onChange={this.onChangeImg}/>
                            <label id='labelPicture' style={style.labelPicture} htmlFor="file">changer d'image</label>
                        </div>
                    </Card>


                    <Box mt={2}>
                        {this.state.user.username}
                    </Box>
                    <LinearProgress style={style.progress}/>
                    <form id="userForm"  style={style.form}>
                        <Box display="flex">
                            <Box mt={4} style={{fontWeight : "bold", fontSize : "15px"}}>
                                <span>Date de naissance</span>
                            </Box>
                            <Box m={2}>
                                <CssTextField
                                    id="date"
                                    type="date"
                                    name="birthday"
                                    defaultValue={JSON.parse(this.state.user.data).birthday}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column">
                                <CssTextField id="description"
                                              color="secondary"
                                              name="description"
                                              label="Biographie"
                                              margin="normal"
                                              rows="4"
                                              fullWidth
                                              multiline
                                              InputLabelProps={{
                                                  shrink: true,
                                                  required: false
                                              }}
                                              defaultValue={JSON.parse(this.state.user.data).description}

                                />
                        </Box>
                        <Box display="flex" mt={5} justifyContent="flex-end">
                            <Button onClick={this.saveData} color="secondary">Mettre à jour</Button>

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