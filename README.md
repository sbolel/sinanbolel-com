# Think Crazy


## Functionality

### Overview

* Clients
* Invoices
* Documents
    - Contracts
* File sharing
    - Assets from client
    - Project files to client

### Client Backlog

* Client can login and see a dashboard for her project
* Client can see my contract
* Client can upload her own contract if needed, 
    - which is then added to the terms of my contract
* Client can sign my contract with e-sign or by uploading a picture of a signed print-out
* Client can see the project schedule which shows
    - deliverable dates
    - payment dates
* Client can see an invoice I've issued to her
* Client can pay a new invoice by
    - using a credit card number,
    - uploading an image of a check
* Client can chat with me in realtime
    - and see a notification when I've replied
* Client can see a timeline of
    - past project events
        + Documents
            * X created/uploaded a doc
            * X signed a doc
            * doc was completed
        + Project Status
            * Sinan delivered Y
            * Client submitted Z
            * project started
            * project finished
        + Payments
            * Client sent payment of X
            * Sinan received payment of X
            * Client sent late payment
    - the current status
        + Sinan is working on Y
        + Client needs to do Z
    - upcoming project events
        + typesOf(events.upcoming) === typesOf(events.past)

### Freelancer Backlog

* I can see a table of clients and choose to
    - add a new Client who is then invited via email
    - disable a Client account
- I can add/configure a project of a Client, and set/edit
    + deadlines for deliverables of the Client's project
    + the payment schedule for the Client's project
* I can access my calendar
    - I can see
        + deliverable due dates
        + dates payments are expected
        + scheduled meetings
        + reminders I have set
    - I can create
        + meetings with clients
        + reminders
* I can see a timeline of past, current, and future events
    - timeline.content === calendar.content
* I can manage the content of my outward-facing website
    - portfolio
    - resume
    - social links & contact information




## Architecture

### Bower Components

* angular
* angular-animate
* angular-aria
* angular-local-storage
* angular-material
* angular-mocks
* angular-route
* angular-ui-router.stateHelper
* angularfire
* material-design-icons
* angular-ui-router
* firebase
* ionicons
* underscore

### Other Libraries

* [firebase-queue][firebase-queue/README]
* [firebase-server][firebase-server/README]

### Future Libraries

* Modernizr
* Moment.js
* Head.js

<!-- /Architecture -->



## Data
---

### Objects

* accounts
    - visitors
    - users
    - clients
* clientsProjects
* projects
    - new
    - active
    - inactive
    - published
* tracking
    - usersSessions
    - users
        + sessionCount
        + accountType

### Schema

<sup>[in-progress]</sup>

users: {
    anonymous: {},
    simplelogin: {
        type: [client,regular]
    }
},
clientsProjects: {
    
},
projects: {
    
}


<!-- $Sources -->

[firebase-queue/README]: https://github.com/firebase/firebase-queue#defining-specs-optional
[firebase-server/README]: https://github.com/urish/firebase-server
