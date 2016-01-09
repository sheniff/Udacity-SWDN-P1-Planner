# Action plan (Brainstorm)

* Note: each view to be an independent HTML for convenience ;) When loading new event or event list we'll check if user is logged in and if not he'll be redirected to signup page :D just by changing the html page, that's easy.
* Note: use bower for packages (only bootstrap CSS for now)
* Note: structure folders in html/css/js/lib for further minification and stuff

## Before starting...
- [x] Set up gh project
- [x] Set up gulp for project
- [x] Finish High Conversion Forms course
- [ ] Finish Tools course
- [x] Install Bootstrap for project

## FormView: Sign up
- Layout form fields
  - Email
    - [x] validate "email" and "required"
    - [x] Use Gravatar api to fetch user's picture when valid email
  - Name
    - [x] Auto populate with email once filled in if no value yet :)
    - [x] validate "required"
  - Password
    - [x] Make secure validation (as done in high conversion form course)
    - [x] Add option to reveal password (eye icon) instead of asking the user for repeating the password (that's annoying and so '90s...)
  - Optional bio
    - [x] Idea: we can show this bio section separated with a horizontal line and only showing one of the fields and make the rest appear when the user focuses on the first one? Or under a collapsed courtain (TBD)

- Apply usability strategies
  - [x] labels
  - [x] placeholders
  - [x] progress bar that fills in with valid fields
  - [! ToDo: investigate how] validation (html5 validation) in focus out
  - [! ToDo: requires validation on blur to work properly] do not enable "save" until progress bar is full (optional fields should not affect the progress)
  - Clearly indicate mandatory fields (typical asterisk?)
  - Include aria info for screen readers
  - Include auto-complete by using autofill and autocomplete
  - [x] Allow proper jump between form fields (with tab or arrow in phone)

- Styling (CSS)
  - Mobile first
    - Label over field in mobile
    - fields taking whole width (except margins)
    - progress bar as a thin bar to the top
    - additional styling for validation (showing a small tick or cross in form)
    - spinner for saving process in "Sign Up" button
    - take care of using fonts with proper resizing for handheld devices
    - use em for font sizes!! (for proper resizing)
  - desktop later
    - label to left
    - automatic focus in first field
    - maybe password validation can be done while typing showing tick/cross to right of field?

- Other strategies
  - [x] Store in local storage to pretend some kind of persistence
  - [x] This persistence is useful to show suggested guests :)


## FormView: New event
- Layout form fields
  - Name
  - Type (of the event)
    - Suggest some types
  - Host (could be an individual or org)
    - Idea: Add a checkbox saying "me" that autopopulates the field to user's name
  - Start date-time
    - Use datetime field
  - End date-time
    - Use datetime field
  - Guest list
    - by adding emails
    - Suggest users that already exist in the platform (another logged in users)
    - List guests above the field to add more (that helps to see them with the onscreen keyboard)
    - Allow removing guests from list with a X (And by swiping horizontally on phones!! that's cool!)
  - Location
    - Request location when focusing to suggest places nearby :D
    - those suggestions should show up above the form field in phones
  - Optional Message
    - text area with a maximum length?

- Styling (CSS)
  - Mobile first
    - Label over field in mobile
    - fields taking whole width (except margins)
    - progress bar as a thin bar to the top
    - additional styling for validation (showing a small tick or cross in form)
    - spinner for saving process in "Sign Up" button
    - take care of using fonts with proper resizing for handheld devices
  - desktop later
    - label to left
    - automatic focus in first field

- Other strategies
  - Store in local storage to pretend some kind of persistence
  - Store event creator as well to show in the list of events


## View: Created events
- List of events
  - [x] List all the events as cards :D for phone version at least
  - [x] Include buttons to alert "going"/"not going"
- [x] New event option to the top (fixed, for easier access)
- Logout button


## Automated build process
- Use gulp
- include gh-pages
