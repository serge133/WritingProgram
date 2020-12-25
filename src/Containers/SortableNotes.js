import React, { Component, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../Components/Workspace/Sortables/Note';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: '10px 0 0 0',
  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   padding: 8,
  //   width: 250
});

class Sortable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    // this.setState({
    //   items
    // });
    this.props.setItems(items);
  }

  handleClick = id => {
    const copyItems = [...this.props.items];
    const findNote = copyItems.find(note => note.id === id);
    // if(findNote)this.setState({note: 'findNote'});
    this.setState({
      note: findNote,
    });
  };

  renderNotes = () => {
    const { items, setAdd } = this.props;

    if (!this.state.note.name) {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <button className='addBtn' onClick={() => setAdd(true)}>
                  ADD NOTE
                </button>

                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className='noteList'
                      >
                        <Note
                          item={item}
                          handleClick={id => this.handleClick(id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    } else {
      return (
        // This is an individual note that is present
        <div>
          <h1>{this.state.note.name}</h1>
          <h2>{this.state.note.id}</h2>
        </div>
      );
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return <Fragment>{this.renderNotes()}</Fragment>;
  }
}

export default Sortable;
