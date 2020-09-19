import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicCommentEditor from '@ckeditor/ckeditor5-build-classic';
import Comment from "./Comment/Comment";


const comments = (props) => {
    // console.log(props, 'comments list');
    return (
        <div>
            <Comment
                comment={props.comments}
                // update={props.updatingComment}
            />
        </div>
    )
}

export default comments;