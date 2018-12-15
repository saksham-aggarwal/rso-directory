import React, { Component } from 'react';
import dateFns from "date-fns";
import { Route, Link, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import NewsFilter from './newsFilter';
import RSOInfo from './rsoInfo';
import PageSubheader from './pageSubHeader';
import FeatureIcon from './featureIcon';
import SpecIcon from './specIcon';
import HeaderPicture from './headerPicture';
import Navbar from './navBar';
import NewsCardRender from './newsCardRender';
import CheckboxContainer from './CheckboxContainer';
import firebase from 'firebase/app'
import RSODisplay from './RSODisplay';
import createRSO from './createRSO';
import SignUpLogin from './signupLogin';
import DesignSpecPage from './designSpecPage';
import Newsfeed from './newsFeed';

import "../App.css";
import "../Modal.css" 

class BackgroundImage {
  constructor(url, title, description) {
    this.url = url;
    this.title = title;
    this.description = description;
  }
}


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {day:props.day, events:props.events};
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  render() {
    var event = '';
    for (let i = 0; i < this.state.events.length; i++) {
      var eventDay = this.state.events[i];
      if (this.state.day.getDay() == eventDay.startDate.getDay() && this.state.day.getMonth() == eventDay.startDate.getMonth() &&
        this.state.day.getFullYear() == eventDay.startDate.getFullYear() && this.state.day.getDate() == eventDay.startDate.getDate()) {
        event = eventDay.title + " in the " + eventDay.location +  " at " + this.formatAMPM(eventDay.startDate);
      }
    }
    return(
      <p style={{height:'100vm'}}>{event}</p>
    )
  }
}

class EventAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false , eventName: "", eventLocation: "", eventDate: ""};
  }

  changeEventName = (event) => {
    this.setState({eventName: event.target.value});
  }

  changeEventLocation = (event) => {
    this.setState({eventLocation: event.target.value});
  }

  changeEventDate = (event) => {
    this.setState({eventDate: event.target.value});
  }

  showModal = () => {
    this.setState({ show: true });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }

  addEvent = () => {
    if (this.state.eventName == null || this.state.eventDate == null || this.state.eventLocation == null) {
      this.hideModal();
      return;
    }
    this.props.addEventCallback({title:this.state.eventName, location:this.state.eventLocation, startDate:new Date(this.state.eventDate)});
    this.hideModal();
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
                    <input onChange={this.changeEventName} id="eventName" type="text" placeholder="Event Name" name="ename" required />

                    <label><b>Location</b></label>
                    <input onChange={this.changeEventLocation} id="eventLocation" type="text" placeholder="Add Location" name="location" required />

                    <label><b>Event Date</b></label><br />
                    <span>
                        <input onChange={this.changeEventDate} id="eventInputF" type="datetime-local" placeholder="Starts at" name="edate" required />
                    </span>

                    <div class="flex-container-register">
                        <button type="button" onClick={this.hideModal} class="cancelbtn">Cancel</button>
                        <button type="button" onClick={this.addEvent} class="add-event">Add Event</button>
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

class EventDays extends Component {
  render() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.props.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }
}

class EventCells extends Component {
  onDateClick = day => {
    this.props.onDateClickCallback(day);
  };

  render() {
    const currentMonth = this.props.currentMonth;
    const selectedDate = this.props.selectedDate;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            style={{height:'12.5vw'}}>
            <Events events={this.props.events} day={day}></Events>
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }
}

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.userEvents = [];
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      events: this.userEvents
    };
  }

  componentDidMount() {
    if(this.props.user) {
      var ref = firebase.database().ref('users/' + this.props.user.uid + '/Events');
      ref.once("value").then((snapshot) => {
        snapshot.forEach((rso) => {
          this.userEvents.push({title: rso.child("name").val(), 
                              location: rso.child("location").val(), 
                              startDate: new Date(rso.child("date").val())});
        });
        this.setState(() => {
          return {events:this.userEvents};
        });
      });
    } else {
        alert('Please sign out and log in again to view/add events to the calendar.\n' + 'If you do not have an account, please sign up first!');
    }
  }

  addEventCallback = (event) => {
    if(this.props.user) {
      var ref = firebase.database().ref('users/' + this.props.user.uid + '/Events/' + event.title);
      ref.set({
        name: event.title,
        location: event.location,
        date: event.startDate.toString()
      })
      this.setState((currentState) => {
        return {events: currentState.events.push(event)};
      })
    } else {
        alert('Please sign out and log in again to add events to the calendar\n.' + 'If you do not have an account, please sign up first!');
    }
  } 


  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
  
  onDateClick = (day) => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    var img = new BackgroundImage("url('./img/calendar.jpg')", "Disocver events coming up.",
   'It is hard to keep up with everything that is happening around you, so we have curated ' +
   'events going on soon that you can choose to attend.');
    
    return (
      <div>
        <section className="header-picture">
          <HeaderPicture image = {img}> </HeaderPicture>
        </section>
        
        <section className="search">
          <div className="main main-raised">
            <div className="container">
              <div className="text-center">
                <div className="row">
                  <div className="col-md ml-auto mr-auto">
                    <div className="calendar">
                      {// <EventPageHeader prevMonthCallback = {this.prevMonth} nextMonthCallback={this.nextMonth}> </EventPageHeader>
                      }
                      {this.renderHeader()}
                      <EventDays currentMonth={this.state.currentMonth}></EventDays>
                      <EventCells onDateClickCallback={this.onDateClick} currentMonth={this.state.currentMonth} selectedDate={this.state.selectedDate} events={this.state.events}> </EventCells>
                      {//<EventCells currentMonth={this.state.currentMonth} selectedDate={this.state.selectedDate}></EventCells>
                      }
                      <EventAddForm addEventCallback={this.addEventCallback} user={this.props.user} />
                    </div>
                  </div>
                </div>    
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default EventPage;