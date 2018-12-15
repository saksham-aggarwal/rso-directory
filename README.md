# Course Project

This repository contains code for an interactive web app, created for the _Client-Side Web Development_ course at the UW iSchool. (This repository is created from the private repository to showcase the project publicly.)

The site can be viewed at <https://info340c-au18.github.io/stage-0-topic-proposal-mfa8/>

The site, bootstrapped with Create React App and backed by the firebase database, currently includes the general idea about the project, some of our planned future features, and current features such as a newsfeed that currently shows the popular new channels to meet the requirement of the project. However, this newsfeed is meant to mock a future newsfeed that shows news on campus. Also, we've included a calendar that shows all the upcoming events, allowing the user to add events as well.

We've included user login since merging with Varun and Kelsey's group, as one of our major features, as this by itself does not count as a major feature, it allows us to curate other features to match the specific user. One of these features include a calendar event that shows upcoming events from the RSOs that the user subscribed to, and adding personal events. These events are loaded from firebase, and if a user decided to add an event, it will be pushed to firebase and stay there until deleted. If a user subscribed to another RSO or another user is logged in, the calendar component will be changed.

Another feature is the ability to create an RSO, which will also push to our firebase database, and can now be seen as one of the RSOs that we list to other students. This adds the ability to use our app to create communities for students!

Our final feature is the ability to find RSOs and subscribe to them, this will change loads of things in our backend, as it will add the RSO information to that user's data, and also add the events to that user's calendar. This brings our application to life, as the user's decisions has real consequence which can be reflected in our app. Our is special, similar to how each student is unique, the experience of our application is unique to each user!

For the project, we've included Mohammed's design and layout and all of Saksham's, Varun's and Kelsey's features and data source. We believed that Mohammed's design provides a nice aesthetic, while the remaining team members' features are better and more polished for our application. 
