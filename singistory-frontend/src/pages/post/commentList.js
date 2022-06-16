import CommentItem from "./commentItem";

function CommentList({ comment }, {fetchComment}) {
    return (
        <>
            {comment && comment.map(item => (
                <CommentItem key={item.id} comment={item}/>
            ))}
        </>

    )
}

export default CommentList;