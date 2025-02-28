import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { Box, Button, Grid, Card, Container } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { deleteMyBlog } from '../slices/blogSlice';
export default function MyBlogs() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const blogs = useSelector((state) => state.blogger.blogs);

    const myBlogs = blogs.filter((blog) => (
        blog.bloggerName === "Blogger"
    ))

    return (
        <Container>
            <Sidebar width={"13%"} />
            <Box>
                <h2> My Blogs</h2>
                <Grid container sx={{ width: "80%", marginLeft: { md: "100px", sm: "130px", xs: "130px" } }} spacing={3} >
                    {myBlogs.length === 0 ? <h4 style={{ marginLeft: "100px" }}>You haven't written any blog!</h4> : myBlogs.map((blog) => (
                        <Grid item xs={9} sm={5} md={4} key={blog.blogId}>
                            <Card
                                sx={{
                                    maxWidth: "95%",
                                    margin: "auto",
                                    height: 400,
                                    backgroundColor: "white",
                                    alignItems: "space-between",
                                    paddingX: "10px",

                                }}>
                                <Box sx={{ height: "70%" }}>
                                    <h3 style={{ height: "30%" }}>{blog.blogTitle}</h3>
                                    <p style={{ height: "30%" }}>
                                        {blog.blogDesc.length > 70
                                            ? `${blog.blogDesc.substring(0, 70)}...`
                                            : blog.blogDesc}
                                    </p>
                                    <h4 style={{ height: "10%" }}>{blog.bloggerName}</h4>
                                </Box>


                                <Box sx={{ height: "20%" }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={1} >
                                    <Button sx={{ height: "50%" }} onClick={() => navigate("/" + blog.blogId)} > Read</Button>
                                    <DeleteIcon sx={{ cursor: "pointer", color: "red", height: "50%" }} onClick={() => { dispatch(deleteMyBlog(blog.blogId)) }} />
                                </Box>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
