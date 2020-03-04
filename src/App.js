import React from "react";
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <input
                    type="text"
                    onKeyUp={this.addTodo}
                    ref={this.todoInput}
                    className="todo-input"
                    placeholder="What task is to be done?"
                />
                {this.state.todos.sort((todo1, todo2) => todo1.completed - todo2.completed).map((todo, index) =>
                    <div key={todo.id} className='todo-item'>
                        <div className="todo-item-left">
                            <input
                                type="checkbox"
                                className="box"
                                onChange={(event) => this.updateCompleteTodo(todo, index, event)}
                            />
                            {!todo.editing &&
                            <div className="todo-item-label"
                                 onDoubleClick={() => this.editTodo(todo, index)}>
                                {todo.title}
                            </div>
                            }
                            {todo.editing &&
                            <input
                                type="text"
                                className="todo-edit"
                                autoFocus={true}
                                defaultValue={todo.title}
                                onBlur={
                                    (event) =>
                                        this.doneEdit(todo, index, event)
                                }
                                onKeyUp={
                                    (event) => {
                                        if (event.key === 'Enter') {
                                            this.doneEdit(todo, index, event);
                                        }
                                    }
                                }
                            />
                            }
                        </div>
                        <div
                            className="remove-items"
                            onClick={(event) => this.deleteTodo(index)}>
                            &times;
                        </div>
                    </div>)
                }
            </div>
        );
    }

    state = {
        todoId: 3,
        todos: [
            {
                'id': 1,
                'title': 'Finish all tasks',
                'completed': false,
                'editing': false,
            },
            {
                'id': 2,
                'title': 'Complete React app basics',
                'completed': false,
                'editing': false,
            },

        ]
    };

    todoInput = React.createRef();

    addTodo = event => {
        if (event.key === 'Enter') {
            const inputValue = this.todoInput.current.value;
            if (inputValue.trim().length === 0) {
                return;
            }
            this.setState((prevState, props) => {
                let todos = prevState.todos;
                let todoId = prevState.todoId + 1;
                todos.push({id: todoId, title: inputValue, completed: false, editing: false});
                return {todos, todoId};
            });
            this.todoInput.current.value = '';
        }
    };

    deleteTodo = index => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todos.splice(index, 1);
            return {todos};
        });
    };

    updateCompleteTodo = (todo, index, event) => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todo.completed = !todo.completed;
            todos.splice(index, 1, todo);
            return {todos};
        });
    };

    editTodo = (todo, index) => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todo.editing = true;
            todos.splice(index, 1, todo);
            return {todos};
        });
    };

    doneEdit = (todo, index, event) => {
        event.persist();
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todo.editing = false;
            todo.title = event.target.value;
            todos.splice(index, 1, todo);
            return {todos};
        });
    }

}

export default App