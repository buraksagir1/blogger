import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: [
        {
            blogId: 12, blogTitle: "CAVALRIES IN WAR OF INDEPENDENCY", blogDesc: "This is a detailed review article about the role played by cavalry in the War of Independence.", blogContent: "The horse holds a very important place in Turkish history. In Turkish societies, the horse was seen as a sacred being sent down from the sky, like state rulers and community heroes. Because they believed that their deceased heroes would ride their horses in heaven, they buried their horses with them. Turkish horsemen are the main actors in the history of cavalry. Cavalry, which developed in the Central Asian steppes where it began to appear on the historical stage and was gifted to the world, has left its place to armored units in line with the developments in weapons technology. The cavalry and their ancient friends horses, who also made very important contributions to the establishment of the Republic of Turkey, the last Turkish state on Anatolian soil, will be remembered forever with this honor they have. Atatürk's: Masters! Take Care of Your Horses. Because, These Sublime Creatures have Played a Very Important Role in Winning the National Struggle.\n\nOur war of Independence was the last war in history in which cavalry was used strategically to influence the outcome. The Command of the Land Forces Equestrian Sports Training Center, organized to fulfill the task of keeping alive the historical past of the Turkish cavalry and instilling a love of riding in the younger generations, continues its duty in Ankara as the last cavalry unit. The last representatives of the cavalry units, which were the striking force of the Turkish army in history and played a major role in the victory of the War of Independence, continue to exist within the Command of the Land Military Academy. In addition, a cavalry association was established in Ankara on April 13, 2020. It aims to promote and develop the “Glorious and Heroic Cavalry” from the past to the future, to promote and make Equestrianism, which is our equestrian sport, successful primarily at the national and international level, to bring cavalry and equestrian sport together with its historical roots. He is the chairman of the association and his father is M, who is also a retired cavalry officer.Levent conducts it FIRST and signs successful works.", bloggerName: "Burhanettin Şenli", likes: 10, comments:
                [{
                    commentContent: "Bravo Mr. Şenli this blog answered many questions.",
                    commenterName: "Hüseyin Özdemir",
                    commentId: 1
                }, {
                    commentContent: "It is a very informative blog. Keep up the great work.",
                    commenterName: "Tony Montana",
                    commentId: 2
                },], isLiked: false
        }, {
            blogId: 1, blogTitle: "HOW TO WRITE A BLOG ON BLOGGER", blogDesc: "Simply dummy text of the printing and typesetting industry.", blogContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", bloggerName: "Blogger", likes: 4, comments:
                [], isLiked: false
        },
    ],
}

export const bloggerSlice = createSlice({
    name: 'blogger',
    initialState,
    reducers: {
        addToBlogs: (state, action) => {
            state.blogs.push(action.payload);
        },
        likeBlog: (state, action) => {
            const likedBlog = state.blogs.find((blog) => (
                blog.blogId === action.payload.blogId
            ))
            if (likedBlog) {
                if (!likedBlog.isLiked) {
                    likedBlog.isLiked = true;
                    likedBlog.likes++
                } else {
                    likedBlog.isLiked = false;
                    likedBlog.likes--
                }
            } else {
                alert("Blog Not Found")
            }
        }, commentOnBlog: (state, action) => {
            const { commentedBlogId, comment } = action.payload;

            const commentedBlog = state.blogs.find((b) => (b.blogId === commentedBlogId))

            if (commentedBlog && comment) {
                commentedBlog.comments.push(comment)
            }
        }, deleteMyBlog: (state, action) => {

            const deletedBlog = state.blogs.find((blog) => (blog.blogId === action.payload))

            state.blogs = state.blogs.filter((b) => (b.blogId !== deletedBlog.blogId));
        }, deleteFavBlog: (state, action) => {
            const unlikedBlog = state.blogs.find((b) => (b.blogId === action.payload));
            unlikedBlog.isLiked = false;
            unlikedBlog.likes--;
        },
    },
})

export const { addToBlogs, commentOnBlog, likeBlog, addToMyBlogs, deleteMyBlog, deleteFavBlog } = bloggerSlice.actions

export default bloggerSlice.reducer