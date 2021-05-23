import React, {Component} from 'react';


export default class ToDo extends Component {
    state = {
        edit : false,
        id : null,
        defaultData : [{
                id : '1',
                title : 'Learn React Fundamentals',
                done : false,
                date : new Date() 
            },
            {
                id : '2',
                title : 'Watch Anime & Movies',
                done : false,
                date : new Date()
            },
            {
                id : '3',
                title : 'Create react app',
                done : false,
                date : new Date()
            },
            {
                id : '4',
                title : 'Finish Assignments',
                done : false,
                date : new Date()
            }
        ]
    }

    //Editing my tasks
        onEditHandle(e) {
            this.setState({
                edit: true,
                id: arguments[0],
                title: arguments[1]
            });
        }
//Completing the task
        onCompleteHandle(){
            let id = arguments[0];
            this.setState({
                defaultData : this.state.defaultData.map(item =>{
                    if(item.id === id){
                        item['done'] = true;
                        return item;
                    }
                    return item;
                })
            });
        }
//what happens when we render with our default data and also new data
    onSubmitHandle(e){
        e.preventDefault(); //dafaq is preventdefault

        this.setState({
            defaultData: [ ...this.state.defaultData, {
                id : Date.now(),
                title : e.target.item.value,
                done : false,
                date : new Date()
            }]     
        });
        e.target.item.value = '';
    }

//Deleting single tasks
    onDeleteHandle(){
        let id = arguments[0];
        this.setState({
            defaultData: this.state.defaultData.filter(item => {
                if (item.id !== id)return item;
            })
        });
    }

    onUpdateHandle(e){
        e.preventDefault();

        this.setState({
            defaultData: this.state.defaultData.map(item => {
                if(item.id === this.state.id){
                    item['title'] = e.target.updatedItem.value;
                    return item;
                }
                return item;
            })
        });
        this.setState({
            edit: false
        });
    }

    updateEditForm(){
        if(this.state.edit){
            return <form onSubmit={this.onUpdateHandle.bind(this)}>
                <input type="text" name="updatedItem" className="item" defaultValue={this.state.title}></input>
                <button className="update-edit-btn">Update</button>
            </form>
        }
    }


    render() {
        return (
            <div>
             {this.updateEditForm()} 
            <form onSubmit={this.onSubmitHandle.bind(this)}>
              <input type="text" name="item" className="item" />
              <button className="btn-add-item">Add</button>
            </form>
            <ul className="task-list">
              {this.state.defaultData.map(item => (
                <li key={item.id} className={ item.done ? 'done' : 'hidden' }>
                  {item.title}
                  <button  type="button" class="btn btn-danger btn-sm" onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
                  <button className = "btn btn-primary btn-sm" type = "submit" onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</button>
                  <button type="button" class="btn btn-success btn-sm" onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button>
                </li>
              ))}
            </ul>
          </div>
        );
    }
}
