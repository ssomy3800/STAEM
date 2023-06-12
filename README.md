# [STAEM](https://staem.onrender.com/)


live link https://staem.onrender.com/
## Background: 
  This project is a clone of the gaming platform, Steam, aiming to reproduce the main functionalities and features that the platform offers. The application is built with a Ruby on Rails backend, React front end, and utilizes Redux as a state management library.
## functionality:

 
# MVPs

1. User Auth
2. Hosting on Live Side
3. Game Previews
4. Cart/Storage (CRUD)
5. Reviews/Comments(CRUD)
6. Search/Filter
7. Tags/Genre Filter



## Feature:
- User Authentication: Users can create an account, log in, and log out securely.
- Game View: Users can go to the game page and see some trailer and in-game cutscenes.
- Game Library: Users can add games to their library and manage it.
- Reviews: Users can write, edit, and delete reviews for games.(FULL CRUD)
- Cart/Storage: User has one cart and one storage which displays game base on whether if it is purchased, can add game to cart as well. (CRUD)
- Tagging System: Games can be tagged by categories, which users can use to search and filter games.

## Home Page
### Hovering carousel will change the main picture
![hovering carousel](https://github.com/ssomy3800/STAEM/assets/48814249/966f762d-6086-4681-8447-b690b2e94643)

### Press carousel pictures, or game block will redirect you to the game page

### Presss any tags will redirect you to the specific tag page with all game listed under the tag

##Sign Up/Login
### Entering wrong form in signup or entering wrong credential pair will resulting an error warning![image](https://github.com/ssomy3800/STAEM/assets/48814249/59576de4-f053-459a-9da3-8b4a4cff3e37)

### Provided a Demo Login.

## Game Page
### Has a short game video
### allow user to put the game into the cart through add to cart button, which changes the button to "go to cart!", press it will redirect user to the cart page.

## Cart Page

### Press add to cart button without login will redirect user to the login page
### Allow user to purchase the game or remove the game, purchase the game will resulting the game disappear in the cart and show up in storage, remove the game will resulting the game being removed.

## Comments
### Under game page, will allow user to do CRUD action to the comments, try to leave a comment without login will redirect user to login page.



## Technologies, Libraries, APIs:
- Backend: Ruby on Rails
- Frontend: React.js, Redux.js
- Database: PostgreSQL
- Styling: CSS
- Hosting: Render.com
- Image hosting: AWS S3

## Production Timeline:
Day 1-2: Setup project skeleton, including user authentication on both the frontend and backend.
Day 3-4: Implement game preview and game page
Day 5: Implement search functionality
Day 6-8: Implement first CRUD cart
Day 9-10: Implement full CRUD comment system.
Day 11-12: Testing, debugging, and deploying the project.
Day 13: Some more styling
Day 14: Hosting

## Future Implementations:
- User profiles: Users can customize their profile and view others' profiles.
- Friends System: Users can add other users as friends.
- Real-time chat: Implement a real-time chat feature where users can message each other.
- Achievements: Users can earn achievements based on their activities on the platform.
- Game leaderboards: Show leaderboards for each game where users can compete.

## About Me
You can find me via email: ssomy3800@gmail.com
 
## Credit
all sources from steam website
