import CommunitySingerItem from "./communitySingerItem";


function CommunitySingerList({posts}) {
    return (
        <div className='all-post-list'>
            {posts && posts.map(item => (
                <CommunitySingerItem key={item.id} post={item} />
            ))}
        </div>
    )
}

export default CommunitySingerList;