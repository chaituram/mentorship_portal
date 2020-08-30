import React, { Component } from 'react';
import "./Tasks.css";

class Tasks extends Component {
    render() {
        // console.log(this.props);
        let task = (
            <a
                onClick={this.props.clicked}
                className="Task"
            >
                {this.props.taskData.title}</a>
        )
        return (
            <article>
                <div className="Tasks ">
                    {task}
                </div>
            </article>
        )
    }
}

export default Tasks;