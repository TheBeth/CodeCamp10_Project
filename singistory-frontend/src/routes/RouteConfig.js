import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/home";
import Contact from "../pages/contact/contact";
import About from "../pages/about/about";
import SingerList from "../pages/singerList/singerList";
import SingerDetail from "../pages/singerDetail/singerDetial";
import Album from "../pages/album/album";
import Genre from "../pages/genre/genre";
import EventList from "../pages/event/eventList"
import EventDetail from "../pages/event/eventDetail";
import CommunityMain from "../pages/community/communityMain";
import CommunitySinger from "../pages/community/communitySinger";
import Post from "../pages/post/post";
import Profile from "../pages/profile/profile";
import EditProfile from "../pages/profile/editProfile";
import NewSinger from "../pages/newSinger";
import NewAlbum from "../pages/newAlbum";
import EditAlbum from "../pages/album/editAlbum";
import NewEvent from "../pages/newEvent";
import PublicLayout from "../layout/PublicLayout";
import PrivateLayout from "../layout/PrivateLayout";
import ChangePassword from "../pages/profile/changePassword";
import Register from "../components/register";
import Login from '../components/login'
import Explore from "../pages/index/explore";
import { AuthContext } from "../context/AuthContext";
import EditingAlbum from "../pages/editingAlbum";
import EditSinger from "../pages/singerDetail/editSinger";
import Search from "../pages/search";
import CreateAward from "../pages/singerDetail/createAward";


function RouteConfig() {
    const { user } = useContext(AuthContext)
    return (
        <Routes>
            {user ? (
                <>
                    <Route path="/" element={<PrivateLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='contact' element={<Contact />} />
                        <Route path='about' element={<About />} />
                        <Route path="singer" element={<SingerList />} />
                        <Route path="singer/:singerId" element={<SingerDetail />} />
                        <Route path="album/:albumId" element={<Album />} />
                        <Route path="genre" element={<Genre />} />
                        <Route path="event" element={<EventList />} />
                        <Route path="event/:eventId" element={<EventDetail />} />
                        <Route path="community" element={<CommunityMain />} />
                        <Route path="community/:singerId" element={<CommunitySinger />} />
                        <Route path="post/:postId" element={<Post />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="editprofile" element={<EditProfile />} />
                        <Route path="newsinger" element={<NewSinger />} />
                        <Route path="newalbum/:singerId" element={<NewAlbum />} />
                        <Route path="editalbum/:albumId" element={<EditAlbum />} />
                        <Route path='editsinger/:singerId' element={<EditSinger />} />
                        <Route path="editingalbum/:albumId" element={<EditingAlbum />} />
                        <Route path="newevent/:singerId" element={<NewEvent />} />
                        <Route path="changepassword" element={<ChangePassword />} />
                        <Route path="search/:search" element={<Search />} />
                        <Route path="createaward/:singerId" element={<CreateAward />} />
                        <Route path="*" element={<Navigate to='/'/>} />
                    </Route>
                </>
            ) : (
                <Route path='/' element={<PublicLayout />}>
                    <Route path="" element={<Explore />} />
                    <Route path="signin" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<Navigate to='/' />} />
                </Route>
            )}
        </Routes>
    );
};

export default RouteConfig;
