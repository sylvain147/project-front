import React from "react";
import Header from "../../component/header";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from "@material-ui/core/Container";
import MarkdownIt from 'markdown-it';
import dynamic from 'next/dynamic';
import {UserContext} from "../../component/UserContext";

const axios = require("axios");
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false
});

class newArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            slug: ''
        }
        this.mdParser = new MarkdownIt()
    }

    validateArticle = () => {
        axios.post(process.env.REACT_API + "/article", new FormData(document.getElementById('articleForm')))
            .then((response) => {
            }).catch((error) => {
        });
    }

    createSlug = (event) => {
        axios.get(process.env.REACT_API + "/slug?title=" + event.target.value)
            .then((response) => {
                this.setState({slug: response.data});
            }).catch((error) => {
        });
    };

    getPage = () => {
        if(this.context.connecting === true) {
            return <LinearProgress/>
        }
        else if(this.context.user === null) {
            return <div>You have nothing to do here</div>
        }
        else {
            return (
                <React.Fragment>
                    <Container maxWidth="md">
                        <FormControl fullWidth>
                            <form id="articleForm" >
                                <input type="number" name="userId" style={{display:'none'}} value={this.context.user.id}/>
                                <TextField  margin="normal" fullWidth id="title" name="title" label="Titre" onChange={this.createSlug}/>
                                <TextField fullWidth id="slug" name="slug" label="slug"
                                           InputProps={{
                                               readOnly: true
                                           }}
                                           value={this.state.slug}/>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Description"
                                    fullWidth
                                    name="description"
                                    multiline
                                    rows="4"
                                    margin="normal"
                                />
                                <div style={{height: "500px"}}>
                                    <MdEditor
                                        name="content"
                                        value="Créez ici votre article en markdown"
                                        renderHTML={(text) => this.mdParser.render(text)}
                                    />
                                </div>
                                <Button variant="contained" color="primary" onClick={this.validateArticle}>
                                    Valider l'article
                                </Button>
                            </form>
                        </FormControl>
                    </Container>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
           this.getPage()
        )
    }
}
newArticle.contextType = UserContext

export default newArticle