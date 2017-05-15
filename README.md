# starter express app template

* What I did:
I built the frontend and backend of a blogging platform with authentication.
for authentication, I used passport.js and jwt on the backend to create and authenticate tokens
as well as creating and authenticating users. On the frontend I protect the newPost endpoint
and redirect users to the signin endpoint if they are not authenticated. I also use redux on the
frontend to keep track of authentication, redirecting users and toggling navbar elements as needed.


* What worked:
Passport and jwt made managing authentication on the backend simple and secure.
Using redux on the frontend made it simple to manage state, particularly whether
or not the user is authenticated.


* What didn't work:
Debugging local storage with chrome. Developing without first writing an error handler.
