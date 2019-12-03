import React from "react";
import { withRouter } from 'next/router'
const axios = require("axios");

class article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article : null,
            slug :  props.router.query.slug
        };
        this.getArticle(props.router.query)

    }
    componentDidMount = () => {
        //this.getArticle(this.state.slug)
    }
    getArticle = (slug) => {
        console.log(slug)
        console.log(this.state)
        console.log(this.state)
        if(this.state.slug == undefined) {
            console.log('undefined')
        }
        else {
            console.log("ok")
        }

    }
    render () {
        return <div>
        </div>
    }
}

const articleData = withRouter(article);
export default articleData