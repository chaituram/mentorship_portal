import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicCommentEditor from '@ckeditor/ckeditor5-build-classic';

const createComment = (props) => {
    return (
        <div>
            <label>Comment: </label>
            <div
                className="form-group"
            >
                <CKEditor
                    data='comment'
                    editor={ClassicCommentEditor}
                    // data="<p>Hello from CKEditor 5!</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        props.comment(data)
                        // console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        // const data = editor.getData();

                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                />
            </div>
        </div>
    )
}

export default createComment;