import React, { Component } from 'react';
import HeaderPicture from './headerPicture';

import RsoList from './RsoList'

import firebase from 'firebase/app'

class BackgroundImage {
    constructor(url, title, description) {
        this.url = url;
        this.title = title;
        this.description = description;
    }
}

class createRSO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RSOname: '',
            RSOdescription: '',
            created_by: '',
        };
        this.submitData = this.submitData.bind(this);
        this.inputData = this.inputData.bind(this);
    }

    componentDidMount() {
        firebase
            .database()
            .ref('RSOs')
            .on('value', snap => console.log('from db', snap.val()));
    }

    submitData(event) {
        event.preventDefault();
        if (this.state.RSOname !== '' || this.state.RSOdescription !== '' || this.state.created_by !== '') {
            firebase
                .database()
                .ref(`RSOs/` + this.state.RSOname)
                .set({
                    RSOname: this.state.RSOname,
                    RSOdescription: this.state.RSOdescription,
                    created_by: this.state.created_by
                })
                .catch(error => console.log(error));
                this.setState(()=> {
                    return {RSOname: '', RSOdescription: '', created_by: ''};
                })
                alert('Submitted RSO! Other students can now find it in the discover page.')
        }
    }

    inputData(event) {
        const RSOname = this.refs.name0.value;
        const RSOdescription = this.refs.name1.value;
        const created_by = this.refs.name2.value;
        this.setState({ RSOname, RSOdescription, created_by });
    }

    render() {
        var img = new BackgroundImage("url('./img/create.jpg')", "Create a New RSO.",
            'Submit an idea for an RSO and a description for it');
        return (
            <div>
                <section className="header-picture">
                    <HeaderPicture image={img}> </HeaderPicture>
                </section>
                <div className="container main main-raised text-center">
                    <br></br>
                    <br></br>
                    <h1 className="intro">Submit a New RSO Idea!</h1>
                    <br></br>
                    <div className="box">
                        <form onSubmit={this.submitData} >
                            <label className="label">RSO Name: </label>
                            <br></br>
                            <input className="input is-medium" type='text' id='input' value={this.state.RSOname} onChange={this.inputData} ref="name0" />
                            <br></br>
                            <label className="label">RSO Description: </label>
                            <br></br>
                            <input className="input is-medium" type='text' id='input' value={this.state.RSOdescription} onChange={this.inputData} ref="name1" />
                            <br></br>
                            <label className="label">Your Name: </label>
                            <br></br>
                            <input className="input is-medium" type='text' id='input' value={this.state.created_by} onChange={this.inputData} ref="name2" />
                            <button type="submit" onClick={this.submitData} value="Submit"> 
                            Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default createRSO;
