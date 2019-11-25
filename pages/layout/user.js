import {makeStyles} from "@material-ui/core";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import LogOutModal from './logOutModal'

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }
    closeUser = () => {
        document.getElementById(this.props.container).style.width = '0px'

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
                cursor : 'pointer'
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

                    <span>
                        {this.state.user.username}
                    </span>
                </Box>
                <span>
            </span>
            </div>

        )
    }
}

export default User;