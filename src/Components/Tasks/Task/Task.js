import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const task = (props) => {
    console.log(props, 'task');
    return (
        <div>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={props.task.title} />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <CKEditor
                        data={props.task.description}
                        editor={ClassicEditor}
                        // data="<p>Hello from CKEditor 5!</p>"
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            const data = editor.getData();
                            // const updatedState = {
                            //     ...this.state.task
                            // }
                            // updatedState.description = data;
                            // this.setState({ task: updatedState })
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Start date</label>
                    <input type="date" disabled class="form-control" id="exampleInputPassword1" value={props.task.start_date} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">End date</label>
                    <input type="date" class="form-control" id="exampleInputPassword1" value={props.task.endDate} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Status</label>
                    <select value={props.task.status}>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default task;