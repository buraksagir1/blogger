import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar, Box, Container } from '@mui/material'
import Sidebar from '../components/Sidebar';

export default function DisplayBlog() {
    const { id } = useParams();
    const blogs = useSelector((state) => state.blogger.blogs);

    const displayedBlog = blogs.find((blog) => (
        Number(blog.blogId) === Number(id)
    ))

    return (
        <Container maxWidth={"lg"}>

            <Sidebar />

            <Box display={"flex"} flexDirection={"column"}>

                <Box ml={20} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <h4>{displayedBlog.blogTitle}</h4>
                    <p>{displayedBlog.blogContent}</p>
                    <h4>{displayedBlog.bloggerName}</h4>
                </Box>

                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} >

                    <h3 style={{ marginLeft: "170px", color: "#b0bec5" }}>Comments</h3>

                    {displayedBlog.comments.length === 0 ? <h3 style={{ marginLeft: "170px" }}>
                        No Comment Yet !
                    </h3> : displayedBlog.comments.map((c) => (
                        <Box ml={20} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap={1} maxWidth={"1000px"} >
                            <Avatar />
                            <h4 >{c.commenterName}</h4>
                            <p> {c.commentContent} </p>
                        </Box>
                    ))}
                </Box>


            </Box>
        </Container>

    )
}
