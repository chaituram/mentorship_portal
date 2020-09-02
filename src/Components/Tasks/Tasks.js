import React, { Component } from 'react';
import "./Tasks.css";

class Tasks extends Component {
    render() {
        // console.log(this.props);
        let task = (
            <span
                onClick={this.props.clicked}
                className="Task"
            >
                {this.props.taskData.title}</span>
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