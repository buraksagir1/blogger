import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import DisplayBlog from '../pages/DisplayBlog'
import MyBlogs from '../pages/MyBlogs'
import FavBlogs from '../pages/FavBlogs'

export default function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<DisplayBlog />} />
            <Route path='/myBlogs' element={<MyBlogs />} />
            <Route path='/favBlogs' element={<FavBlogs />} />

        </Routes>
    )
}
