# Project 1 : Event Planner
## Udacity : Senior Web Developer Nanodegree

### How to run it
`$> npm i` to install all dependencies and libraries via bower (automatically run as postinstall dependency)

`$> gulp` command runs local server and lifts the app

`$> gulp dist` builds dist package, ready to deploy

`$> gulp deploy` deploys dist to github pages

### Demos (and [live demo](sheniff.github.io/Udacity-SWDN-P1-Planner))
| Sign up     | New Event   | Validation  |
|-------------|-------------|-----|
| ![eventplanner_signup](https://cloud.githubusercontent.com/assets/1939291/12692363/d56a9ea0-c6aa-11e5-9147-ee54fc9ddf78.gif) | ![eventplanner_newevent](https://cloud.githubusercontent.com/assets/1939291/12692365/d720d7d2-c6aa-11e5-8cff-ae574047bd2c.gif) | ![eventplanner_validation](https://cloud.githubusercontent.com/assets/1939291/12692366/d8b6c0c0-c6aa-11e5-8138-d8fcba13abbd.gif) |

### Features
* [x] Autocompletes fields based on browser data
* [x] Autofill username based on email for convenience
* [x] Provides password guidance and "reveal" option
* [x] Fetches Gravatar image based on email for user confidence
* [x] Suggests options via datalists (limited usability on mobile devices, only available on Android 4.3+)
* [x] Uses proper input fields in each case (for validation and usability)
* [x] Uses device's gps location + Google Maps Location API to find places nearby and suggest event locations
* [x] Suggests already existing users as guests for the event
* [x] Fast 1-click action to set yourself as event host if that's the case
* [x] Labels and placeholders are visible and useful (providing example)
* [x] fixed progress bar to the top for the user to understand when he's done with mandatory fields
* [x] Event date prepopulated to "now" for start and "now + 1h" for end for easier setup

### Libraries and technologies I used
I wanted my first nanodegree project to be framework-less (for a change) and tried to do **all the logic** by myself. In every project I want to explore different libraries and frameworks to improve my ability to decide what's best in each occasion.
* Gulp + plugins (for task automation) as requested
* BootstrapCSS (didn't want to deal much with basic styling)
* JQuery (Mostly for Ajax requests and some selectors)
* Google Maps Locations JS API (to find locations based on GPS coords)
* LocalStorage HTML5 API
* querySelector

### Action plan
I made a [little bit of brainstorming at the beginning](actionPlan.md) of the project and I kind of followed it in order to cover most of the requirements.
