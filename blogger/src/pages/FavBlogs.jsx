import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid, Card, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { deleteFavBlog } from '../slices/blogSlice';



export default function FavBlogs() {

    const blogs = useSelector((state) => (state.blogger.blogs))
    const favBlogs = blogs.filter((b) => (b.isLiked === true))
    const navigate = useNavigate()
    const dispatch = useDispatch();

    return (
        <Container>
            <Sidebar width={"13%"} />
            <Box>
                <h2> Favorite Blogs</h2>
                <Grid container sx={{ width: "80%", marginLeft: { md: "100px", sm: "130px", xs: "130px" } }} spacing={3} >
                    {favBlogs.length === 0 ? <h3 style={{ marginLeft: "100px" }}>You haven't liked any blog!</h3> : favBlogs.map((blog) => (
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
                                <Box sx={{ height: "60%" }}>
                                    <h3 style={{ height: "35%" }}>{blog.blogTitle}</h3>
                                    <p style={{ height: "45%" }}>
                                        {blog.blogDesc.length > 70
                                            ? `${blog.blogDesc.substring(0, 70)}...`
                                            : blog.blogDesc}
                                    </p>
                                    <h4 style={{ height: "10%" }}>{blog.bloggerName}</h4>
                                </Box>


                                <Box sx={{ height: "40%" }} display={"flex"} flexDirection={"column"} justifyContent={"center"}
                                    alignItems={"center"}>
                                    <Button sx={{ height: "35%" }} onClick={() => navigate("/" + blog.blogId)} > Read</Button>
                                    <ThumbDownIcon sx={{ cursor: "pointer", color: "red", height: "35%" }} onClick={() => { dispatch(deleteFavBlog(blog.blogId)) }} />
                                </Box>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}
