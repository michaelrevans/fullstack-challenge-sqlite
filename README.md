# Fanvue's Fullstack challenge

Setup the project:

Make sure you install all the dependencies (currently pnpm, but you can opt-out) and start the solution in dev mode.

There is a simple homepage that will display a typical "feed" page.

Requirements:

- Use trpc for data fetching and mutations (https://trpc.io/) this is already setup for you.
- Custom styling is not required, you should use MUI5 components out-of-the box, check the docs here https://mui.com/material-ui/
- Fetch the data from the sqlite file that sits in the "prisma" folder, with the prisma library, more info here https://www.prisma.io/docs/orm/overview/databases/sqlite

Note:

- The database is already seeded, but you can add more data if you want to.

Please complete the following tasks:

- Show a centered column of posts which are simple boxes with at least title and content properties, you can aggregate more data where it makes sense.
- For each post, show a button with a counter of the comments, or nothing if there are no comments.
- When clicking on the comment counter, the comments appear below it, you can choose what component to use.
- Although there is no authentication, user can add a comment to a post.

Consider the following, for instance leaving comments close to where this is relevant:

- Scalability of the solution
- Performance
- What Database type would be fit
- How monitoring and logging could be implemented
- SSR and SSG
- Possible infrastructure setup to help with the above


- Scalability of the solution:
  - Switch to a Postgres database allowing for better scalability including introducing read replicas and sharding
  - Infinite scroll - not implemented due to time restrictions - instead of having to click on a button to load more posts
- Performance:
  - Should be quite good already due to small size of the app and simple query to retrieve data from DB. This could be improved by loading a smaller number of posts on initial page load and then loading more behind the scenes using similar functionality to infinite scroll
  - Data caching with React Query prevents loading the same data multiple times
  - Loading only comment count on initial page load prevents from loading unnecessary data (since the comments are not shown on initial load), loading them for an individual post when the button is clicked
  - Using skeleton loading components could be good to give the perception of faster loading times
  - Code splitting with dynamic imports of certain components (i.e. comments) reduces initial bundle size and result in faster initial page load
- What Database type would be fit
  - added a note in the migration_lock.toml file
- How monitoring and logging could be implemented:
  - Sentry is good for exception handling and also custom messaging (e.g. when data integrity comes into question)
  - Datadog can be used for traces, metrics and logging, as well as real user monitoring
  - Prometheus/Grafana could be alternatives to Datadog as they are open source, but require more setup for self-hosting
- SSR and SSG:
  - See comments in component files
- Possible infrastructure setup to help with the above:
  - Vercel is ideal for hosting Next since they created it
  - Vercel also provides hosting for databases like Postgres e.g. Supabase although I'm unsure whether this would support read replicas and/or sharding
  - Datadog is a cloud-hosted service, so no infrastructure would be required there. Prometheus/Grafana on the other hand would need some hosting setup
