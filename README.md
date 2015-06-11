# Think Crazy



## Architecture
---

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

<!-- /Data -->


<!-- Sources -->

[firebase-queue/README]: https://github.com/firebase/firebase-queue#defining-specs-optional
[firebase-server/README]: https://github.com/urish/firebase-server

<!-- /Sources -->
