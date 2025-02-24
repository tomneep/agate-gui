# Agate ui

A npm package named **climb-agate-gui**

It principally contains a single typescript widget named simply `Agate`, inheriting most of its features from react.

This is used to display the show ingestion attempts retrieved from the agate web API.

Construction of this widget requires a `httpPathHandler` as defined in `proerties.tsx`, which it uses to invoke the Agate web api without giving the UI explicit values for the agate domain name or any authorization token.

The widget shows a table of all the ingestion attempts retrieved from the first page of paginated results of the api call.  
It gives simple options to archive these, prompting the web api to tag them with an archived flag.

It updates every 10000 ms, (10s) to give the impression of live reporting of new ingestion attempts, or changes to the status of ingestion attempts.
The frequency of this is hard coded and can be changed in `Results.tsx`.
There is a **Refresh** button to prompt an earlier update.

The widget also has a header with shows the user id and the versions of the UI and enclosing environment.

There is a toggle to transition to a dark mode.

#### Local testing

The directory `src` contains a main function and a mock `httpPathHandler`, sufficient for testing locally.

Before testing on a local machine you will need to change `handler.tsx` so it contains the domain of an active Agate web api, and a valid authorization token.
Otherwise you will not be issued with an identity and the whole UI will fail.

#### Developing (trivial npm commands)

The most probable commands during development will be

`npm run build`
`npm run dev`

and

`npm publish`

can be used to push to the npm server.

