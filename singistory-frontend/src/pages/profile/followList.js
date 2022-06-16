import FollowItem from "./followItem";

function FollowList({ follow }) {
    return (
        <div>
            {follow && follow.map(item => (
                <FollowItem key={item.id} singer={item.Singer} />
            ))}
        </div>

        // <FollowItem singer={follow}/>
    )
}

export default FollowList;