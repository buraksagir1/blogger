import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, TextField, Button, Grid, Card, Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addToBlogs, likeBlog, commentOnBlog } from '../slices/blogSlice';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import Sidebar from '../components/Sidebar';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black'
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogger.blogs);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openNoComment, setOpenNoComment] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogDesc, setBlogDesc] = useState('');
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);

  const handleOpenComments = (blog) => {
    if (blog.comments.length === 0) {
      setOpenNoComment(true);
    } else {
      setOpen2(true);
      setComments(blog.comments);
    }
  };

  const handleSubmitComment = (comment, blogId) => {
    if (comment && comment.trim()) {
      dispatch(
        commentOnBlog({
          commentedBlogId: blogId,
          comment: {
            commentContent: comment,
            commenterName: 'Blogger',
            commentId: Date.now()
          }
        })
      );
      setNewComment((prev) => ({ ...prev, [blogId]: "" }));
    }
  };


  return (
    <Container maxWidth={'lg'}>
      <Sidebar width={'13%'} />
      <Box width={'85%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Grid container spacing={2} sx={{ marginLeft: { md: '290px', sm: '130px', xs: '130px' } }}>
          {blogs.map((blog) => (
            <Grid item xs={9} sm={5} md={4} key={blog.blogId}>
              <Card sx={{ maxWidth: '95%', margin: 'auto', height: 400, paddingX: '10px' }}>
                <Box sx={{ height: '55%' }}>
                  <h3 style={{ height: '25%' }}>{blog.blogTitle}</h3>
                  <p style={{ height: '50%' }}>{blog.blogDesc.length > 70 ? `${blog.blogDesc.substring(0, 71)}...` : blog.blogDesc}</p>
                  <h4 style={{ height: '10%' }}>{blog.bloggerName}</h4>
                </Box>

                <Box sx={{ height: '15%' }} display={'flex'} justifyContent={'space-between'}>
                  {blog.isLiked ? <Box display='flex' alignItems='center' gap={1}>

                    <ThumbUpIcon sx={{ cursor: 'pointer', color: "#74d875" }} onClick={() => dispatch(likeBlog(blog))} />
                    <p>{blog.likes}</p>
                  </Box> : <Box display='flex' alignItems='center' gap={1}>

                    <ThumbUpIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(likeBlog(blog))} />
                    <p>{blog.likes}</p>
                  </Box>}

                  <Box display='flex' alignItems='center' gap={1}>
                    <ChatBubbleOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => handleOpenComments(blog)} />
                    <p>{blog.comments.length}</p>
                  </Box>
                </Box>
                <Box sx={{ height: '10%' }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <TextField
                    sx={{ width: '100%' }}
                    value={newComment[blog.blogId]}
                    onChange={(e) => setNewComment({ ...newComment, [blog.blogId]: e.target.value })}
                    label='Make a Comment'
                    variant='standard'
                  />
                  <SendIcon mb={2} sx={{ cursor: 'pointer' }} onClick={() => handleSubmitComment(newComment[blog.blogId], blog.blogId)} />
                </Box>
                <Button variant='outlined' onClick={() => navigate('/' + blog.blogId)} sx={{ marginTop: '10px', height: '10%' }}>
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ cursor: 'pointer' }} mt={3} ml={40} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <h4 style={{ color: 'lightgreen' }}>Add a New Blog</h4>
          <AddCircleIcon onClick={() => setOpen(true)} sx={{ fontSize: '50px', color: 'lightgreen' }} />
        </Box>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box display={'flex'} flexDirection={'column'} sx={modalStyle} rowGap={4}>
            <TextField value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} label='Blog Title' variant='outlined' />
            <TextField value={blogContent} onChange={(e) => setBlogContent(e.target.value)} label='Blog Content' multiline rows={4} variant='outlined' />
            <TextField value={blogDesc} onChange={(e) => setBlogDesc(e.target.value)} label='Blog Description' variant='outlined' />
            <Button onClick={() => {
              if (blogTitle && blogContent && blogDesc) {
                dispatch(addToBlogs({ blogTitle, blogContent, blogId: Date.now(), bloggerName: 'Blogger', blogDesc, comments: [], likes: 0 }));
                setOpen(false);
                setBlogTitle('');
                setBlogContent('');
                setBlogDesc('');
              } else {
                alert('Lütfen tüm boşlukları doldurun');
              }
            }}>Submit</Button>
          </Box>
        </Modal>

        <Modal open={open2} onClose={() => setOpen2(false)}>
          <Box display={'flex'} flexDirection={'column'} sx={modalStyle}>
            {comments.map((comment) => (
              <Box display={'flex'} alignItems={'center'} gap={1} key={comment.commentId}>
                <Avatar />
                <h4>{comment.commenterName}</h4>
                <p>{comment.commentContent}</p>
              </Box>
            ))}
          </Box>
        </Modal>

        <Modal open={openNoComment} onClose={() => setOpenNoComment(false)}>
          <Box display={'flex'} flexDirection={'column'} gap={1} sx={modalStyle}>
            <h3>No Comment Yet</h3>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
