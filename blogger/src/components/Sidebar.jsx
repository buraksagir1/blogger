import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { blueGrey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
{/** Search Modal Style Start */ }

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: "black"
};
{/** Search Modal Style End */ }

export default function Sidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchedBlog, setSearchedBlog] = useState("");

    const blogs = useSelector((state) => state.blogger.blogs);

    const handleClose = () => {
        setOpen(false);
        setSearchedBlog("");
    };

    const foundedBlogs = !searchedBlog.trim()
        ? []
        : blogs.filter((blog) =>
            blog.blogTitle.toLowerCase().includes(searchedBlog.toLowerCase())
        );


    return (
        <Box
            sx={{
                backgroundColor: blueGrey[300],
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: { xs: "6%", sm: "6%", md: "13%", lg: "13%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                pl: 5,
                pr: 4,
                rowGap: 5
            }}
        >
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"20px"} onClick={() => navigate("/")}
            >
                <AutoStoriesIcon sx={{
                    pr: "4px",
                    fontSize: "40px",
                    display: { xs: "block", sm: "block", md: "none", lg: "none" },
                    cursor: "pointer"
                }} />

                <Typography
                    variant="h5"
                    sx={{
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "block", lg: "block" },
                        fontWeight: "bold"
                    }}
                >
                    Blogger
                </Typography>
            </Box>


            <Box onClick={() => navigate("/")} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <HomeIcon sx={{ pr: "4px", fontSize: "35px", cursor: "pointer" }} />
                <Typography
                    variant="h6"
                    sx={{
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "block", lg: "block" },
                        fontWeight: "bold",
                        mt: "5px"
                    }}
                >
                    Home
                </Typography>

            </Box>

            <Box onClick={() => navigate("/myBlogs")} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <BorderColorIcon sx={{ pr: "4px", fontSize: "30px", cursor: "pointer" }} />
                <Typography
                    variant="h6"
                    sx={{
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "block", lg: "block" },
                        fontWeight: "bold"
                    }}
                >
                    My Blogs
                </Typography>
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={() => navigate("/favBlogs")} >
                <FavoriteIcon sx={{ pr: "4px", fontSize: "30px", cursor: "pointer" }} />
                <Typography
                    variant="h6"
                    sx={{
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "block", lg: "block" },
                        fontWeight: "bold",
                    }}
                >
                    Favorite Blogs
                </Typography>
            </Box>

            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} onClick={() => setOpen(true)}>
                <SearchIcon sx={{ pr: "4px", fontSize: "35px", fontWeight: "bold", cursor: "pointer" }} />
                <Typography
                    variant="h6"
                    sx={{
                        cursor: "pointer",
                        display: { xs: "none", sm: "none", md: "block", lg: "block" },
                        fontWeight: "bold"
                    }}

                >
                    Search
                </Typography>
            </Box>

            {/** Search Modal  Starts*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box display="flex" flexDirection="column" sx={style} >
                    <h3>Search a Blog</h3>
                    <TextField
                        value={searchedBlog}
                        onChange={(e) => setSearchedBlog(e.target.value)}
                        placeholder="Search Blog"
                    />
                    {foundedBlogs.map((b) => (
                        <Box display="flex" key={b.blogId} columnGap={2} sx={{ mt: 2 }}>
                            <h3>{b.blogTitle}</h3>
                            <h4>{b.bloggerName}</h4>
                            <Button variant='outlined' onClick={() => { navigate('/' + b.blogId); handleClose() }} sx={{ marginTop: '20px', height: '10%' }}>
                                Read More
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Modal >
            {/** Search Modal  Ends*/}

        </Box >
    );
}
