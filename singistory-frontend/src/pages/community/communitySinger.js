import '../../css/communitySinger.css'
import * as React from 'react';
import CommunityForm from './communitySingerForm';
import CommunitySingerList from './communitySingerList';
import axios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import Spinner from '../../utils/spinner';
import DeletePost from './deletePost';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function CommunitySinger() {
    const { singerId } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();
    const { setError } = useContext(ErrorContext)

    const fetchPost = async () => {
        try {
            const res = await axios.get(`/posts/${singerId}`)
            setPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
    }, []);

    const createPost = async (title, header, img) => {
        const fromData = new FormData()
        fromData.append('title', title)
        fromData.append('header', header)
        fromData.append('img', img)
        fromData.append('singerId', singerId)
        console.log(fromData)

        try {
            setLoading(true)
            const res = await axios.post('/posts', fromData)
            fetchPost();
            if(res){
                setShowMessage(true)
            }
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    return (
        <>
            <div className="communitySingerPage">
                {loading && <Spinner />}
                <div className="community-singer-wrapper">
                    <div className="back-to-page" style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Community</div>
                    <h1>Community</h1>
                    <div className='post-list-main'>
                        <CommunityForm createPost={createPost} />
                        <CommunitySingerList posts={posts} />
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseSnake}
                open={showMessage}
            >
                <Alert onClose={handleCloseSnake} severity="success">
                    Post Created
                </Alert>
            </Snackbar>
        </>
    )
}

export default CommunitySinger;