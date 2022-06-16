import CommunityMainItem from "./communityMainItem";


function CommunityMainList({ community }) {
    return (
        <div className="community-all-singer-list">
            {community && community.map(item => (
                <CommunityMainItem key={item.id} community={item} />
            ))}
        </div>
    )
}

export default CommunityMainList;