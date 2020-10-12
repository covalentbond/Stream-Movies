## Inspiration
We all know that it is impossible to open a news application or email these days without hearing about COVID-19. Unfortunately, the news is a constant stream of grim, depressing and often conflicting facts that can easily take the wind out of any readers sails if they aren’t careful. I think software engineers in particular struggle because our brains want to solve problems. We made this online streaming movie project to address this issue so that people get to spend a quality time with friends and family and provide an enriching real life cinema experience. This can make a lot of improvement in their mental condition by providing them a cheerful movie time.

## What it does
Stream Movie Online is a platform to search any Movie/Web-Series/TV Shows and  based on that. User get the option to create a movie room. The link of the room can be shared with as many friends, with the screen share feature. Users are able to do live video calls as well as live video chats and stream movie of their choice.
Not only this, with every movie search query a unique QR code is shown. After scanning the code, one can render AR model of the protagonist of the movie live in front of them.

## How we built it
We used Socket.io and WebRTC to create a virtual server and establish a bridge of real time communication between each peer. Rather than using WebRTC native API, we preferred PeerJs library. We used Echo AR platform to render our AR models.
The front-end was made on Node.js using Express and Embedded Javascript templates(EJS) to speed up the HTML and CSS part

## Challenges we ran into
It was very difficult to establish the screen share the media among all the peers.
Because of time constraint, we were not able to add AR models for every movie query

## Accomplishments that we're proud of
We successfully added the screen share feature and it was the first time for all of us using Echo AR.
We managed to render AR models of various popular movies and web-series like Interstellar, Iron man, Stranger Things, batman, superman and many more.

Devpost Link: https://devpost.com/software/stream-movies-online