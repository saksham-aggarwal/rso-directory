import React, { Component } from 'react';

class EventAddForm extends Component {
  state = { show: false }

  showModal = () => {
    this.setState({ show: true });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }
    
  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal} >
           <form class="modal-content" action="#">
                <div class="container">
                    <h1>New Event</h1>
                    <p>Please fill in this form to create a new event!</p>
                    <hr />
                    <label><b>Event</b></label>
                    <input id="eventName" type="text" placeholder="Event Name" name="ename" required />

                    <label><b>Location</b></label>
                    <input id="eventLocation" type="text" placeholder="Add Location" name="location" required />

                    <label><b>Event Date</b></label><br />
                    <span>
                        <input id="eventInputF" type="datetime-local" placeholder="Starts at" name="edate" required />
                    </span>

                    <div class="flex-container-register">
                        <button type="button" onClick={this.hideModal} class="cancelbtn">Cancel</button>
                        <button type="button" class="add-event">Add Event</button>
                    </div>
                </div>
            </form>
        </Modal>
        <button type='button' onClick={this.showModal} className="openBtn">Add to Calendar</button>
      </main>
    )
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
      </section>
    </div>
  );
}

export default EventAddForm;