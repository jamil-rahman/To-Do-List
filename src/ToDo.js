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
        let id = [0];
        this.setState({
            defaultData: this.state.defaultData.filter(item => {
                if (item.id !== id)return item;
            })
        });
    }

    onUpdateHandle(e){
        e.preventDefault();

        this.state({
            defaultData: this.state.defaultData
        })
    }

    render() {
        return (
            <div>
            {/* {this.renderEditForm()} */}
            <form onSubmit={this.onSubmitHandle.bind(this)}>
              <input type="text" name="item" className="item" />
              <button className="btn-add-item">Add</button>
            </form>
            <ul>
              {this.state.defaultData.map(item => (
                <li key={item.id} className={ item.done ? 'done' : 'hidden' }>
                  {item.title}
                  <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
                  <button onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</button>
                  <button onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button>
                </li>
              ))}
            </ul>
          </div>
        );
    }
}
