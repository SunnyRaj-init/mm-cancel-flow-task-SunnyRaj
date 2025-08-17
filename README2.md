## Quick start
This project needs to be run using npm 
i.e. npm install followed by npm run db:setup if its a mac or linux environment NOW use npm run dev to start the server
on windows after npm install use npx supabase start to get th toml file and now place the seed.sql in the supabase folder and run npm run db:setup

### NOTE
unfortunately this will not run on windows as the files taht were provided were created on mac or linux and supabase cofiguration uses different docker images on windows because of which there has been a health check issue on a few containers thereby unable to start the database on windows
### because of this supabase container bug i had to reinitiate my task in ubuntu by installing it on vbox this has consumed a lot of time for me (i ended up doing this as ive tried to the databaseon various windows machines (2 laptops 1 pc) but it didnt workout)
##### BUT if it works for you on windows please let me know how you solved the health checks isssue on supabase containers my email is : rajsunnymyson@gmail.com

## Architecture Decisions
I've decided to store teh users who found a job in a different table:cancellation_job_feedback along with the job specific details in it
on the other hand the cancellations table deals with users who didnt get a job
no matter what at the end of each sequence the subscription status is set to cancelled

I've used this approach as it segregates users keepps the design simple and if we ever need all the users who have cancelled we can just query subscriptions for cancelled users

To add on I'm using Cookies to store and persist data loclaly instead of hitting the databse multiple times

if you ever want to change the user just replace the mock user id in the home page with another user id by looking at the seed file of the studio editor

i've enabled data to be prefilled if tis already filled and to add on ensured user only goes to the page they have stopped at or have encountered an server error at

users can also change their previous answered questions

## Security Implementation

i've used Row level security enabling ony users to mange their own subscriptions,cancellations,their user data, cancellation_job_feddback tables information
but since i'm using the serverside end of the routes to manipulate inforamtion ive used suapabseAdmin and have written policies to enable supabaseadmin obj i.e. created with service role key to manipulate inforamtion
ive enabled data validation in the frontend before and after  sending the request while i placed check to esnure the same in the backend

## A B test split
 whe we land on the home page ive used crypto.getRandomValues on random byte to get a secure one time RNG and i used it to have it toss the first value on the RNG and if its less 128 its an A variant else its B
 it only happens once and even if hte cookies are cleared data is read from t eh database and it persists