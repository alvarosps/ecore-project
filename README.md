# ecore-project

- To run the project: (npm version 8.5.0 was used)
- `npm install`
- `npm start`

- To run tests: `npm run test`

- About the project development:

I tried to make my commits clear in terms of code/project progression, always keeping in mind results and what is needed to complete the project.
Approaching the problem, first I wanted to make sure the code logic works, designed a very simple project with a list of teams (using part of the API results as a mock),
and created the skeleton of what the homepage would be. After that, inserted React Hooks and did API calls using axios, to grab the actual data from the API.
Keeping in mind that I wanted the UI to be clean and not with tons of data, started working in a Pagination component. When that was done, the homepage idea,
with the Teams list and pagination was just missing the search component, so I created the component, being able to do search and update in any array of objects
that I wanted to. With that, the homepage skeleton with the team list was done.

Than I started implementing React-Routes, to create the Team specific page, and enable navigation between the pages. I never did routes with react-router-v6,
it was a new experience, a lot of things are different from the previous versions, I ran into a few issues to make it work, specially with webpack/babel and
the hot reloading, but I left this particular issue to resolve on the end (the issue was when going to a specific team page, it wouldn't reload directly, always getting an error.)
Then, I decided to use the ContextAPI for state management, to have all teams and users data stored on it, calling it on the homepage, and just accessing the 
state on the Teams page (this was removed at the end). Created a simple team list on the Team's component, used the search component on it as well. With that, 
the project base was done, just needed UI.

For UI, I decided to use styled-components, and material-ui framework, with which I created a simple UI with dark theme (this for the example project,
for a bigger project I would use the Theming part of styled-components, allowing to choose between light/dark theme). While building the UI, I realized that the user
data I needed in the Team component was not the one I was using (I was getting the results for /users , not specific data), then I re-designed the logic on the component,
creating parallel axios calls to get the data of all team's members.

As a note, the team's members avatarUrl from the api doesn't work (at least in the ones I tested), if it doesn't render, it'll render a default avatar instead.

After logic and UI were done, I started to work on unit tests, again facing some challenges in terms of finding documentation and examples on unit testing for React 18. I created basic examples of unit tests to run, and with more time I could work on it more, creating a 100% coverage tests.