import Header from '../component/header';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import Link from "../src/Link";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
    content: {
        borderBottom : "1px solid rgba(0, 0, 0,.2)",
        height: "230px",
        textDecoration : 'none',
        "&:hover" : {
            textDecoration: 'none !important'
        }
    },
    info: {
        color: '#454545',
        fontStyle: 'italic',
        position : 'relative',
        "&:hover" : {
            textDecoration : 'none'
        }
    },
    desc: {
        position: 'absolute',
        transition: 'width 500ms',
        width: "0%",
        height: "100%",
        left: '0',
        overflow: 'hidden',
        backgroundColor: "rgba(0, 0, 0,.9)",
        color: '#fff'
    },
    articleLink : {
        display : 'block',
        "&:hover": {
            textDecoration : 'none'
        }
    },
    para : {
        width : '600px',
        minWidth : '900px',
        maxWidth : '95%',
        textAlign : 'justify'
    },
    title : {
        position : 'relative',
        width : '100%',
        justifyContent : 'center',
        "&:hover $desc": {
            width: "100%"
        }

    }
}))
const Content = props => (
    <div>
        <Link  href="#" className={useStyles().articleLink} >
            <Box display="flex" alignItems="center" height="230px"  mb ={4} p={0}>
                <img height="230px" src="https://slentertainment.com/wp-content/uploads/2016/10/square-img-300x300.png"
                     alt=""/>
                <Box display="flex" flexDirection="column"
                     alignItems="center"  justifyContent="center"
                     width="100%"
                     p={0}
                     className={useStyles().content}>
                    <Box display="flex" alignItems="center" color="#000" flexGrow={1} className={useStyles().title}>
                        <Box display="flex" justifyContent="center" alignItems="center" className={useStyles().desc}>
                            <p className={useStyles().para}>
                                {props.description}
                            </p>
                        </Box>
                        {props.title}
                    </Box>
                    <Box mb={0} width="100%" display="flex" alignItems="space-between" justifyContent={"flex-end"}
                         pr={2}
                         className={useStyles().info}>
                        <Box mr={2}>
                            Ecrit par :  {props.username}
                        </Box>
                        -
                        <Box ml={2}>
                            Le <Moment format="DD-MM-YYYY">
                            {props.created}
                            </Moment>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Link>
    </div>
)

const articles = props => (
    <React.Fragment>
        <Container maxWidth="lg">
            {props.articles.map(article => (
                <Content key={article.article_id} title={article.title} description={JSON.parse(article.data)['description']} username={article.username} created={article.created_at}/>
            ))}
        </Container>
    </React.Fragment>
)
articles.getInitialProps = async function () {
    const res = await fetch(process.env.REACT_API+'/articles');
    console.log(res)
    const articles = await res.json();

    return {
        articles: articles
    };
};

export default articles;