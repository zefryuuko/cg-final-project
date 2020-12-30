# Learn to Code
A web application for people wanting to learn the basic concepts of coding. Written in Javascript using React and Babylon.js.

![Main Menu](https://github.com/zefryuuko/cg-final-project/blob/main/assets/readme-preview.png?raw=true)

Live Demo: https://zefryuuko.github.io/cg-final-project

## What is this?
The application is a game that lets users learn about the logics of coding and programming. The game gives users a chance to learn the framework and thought process that is used in programming in a fun and interactive way, using a pleasing graphical interface. The application can be accessed through a link so that any device with a browser can access the game without the need of installing and downloading more apps. 

The main objective of the game is to transport the character from the starting point to the end point that is signified by an elevated black tile with particles floating atop it. Between the starting point and the end point is a tiled path in which the characters need to follow. Each tile will be registered as one move done by the character. The character can walk and turn left or right. The user will have to choose what movement the character does (walk, turn left, or turn right) and in what order so that the character can move from the starting point to the end point. The order of moves will be presented in a stack style, from top to bottom. As the user increases the level, the number of moves the character can do will be less than the number of tiles the character needs to get from the starting point to the end point.
At the point where the number of moves the character can do in the level is less than the number of tiles required for the character to reach the end point, there will be more types of movements introduced into the list. There will be the addition of a Loop. Now, the user will be able to choose between four movements which are walk, turn left, turn right, or loop. In the loop movement, the user will be able to choose the movement that wants to be looped (walk, turn left, or turn right) and how many times it wants to be looped. Take note that the loop movement is only considered as one move. This section helps introduce the concept of loop that is often used in programming and helps understand the importance of using loops. 

As the level increases again, the number of moves the character can do in the level will be significantly less than the number of  tiles required for the character to reach the end point that the loop and the three other movements just will not cut it. Hence, there will be the introduction of another movement which is If Statements. The if statements will take in three different conditions. In a typical if statement in programming, the format will be like *if (x [operator] y) then z*. In the game, users will have to fill in *x*, *y*, *operator*, and *z*. The developers decide that the if statement is more complex compared to loops. This will provide the users with an introductory understanding of the use of loops. 

The application has a total of four levels. The first level is the basic level that only consists of the three main movements which are walk, turn left, and turn right. The second level introduces loops. The third level will introduce nested loops and the fourth level introduces if statements. In all of the levels, there will be an instruction which consists of the definition and the uses of what they are learning on the level. The user will not have a maximum number of tries in each of the levels and they can modify their movement orders by adding more and deleting the movements the users have added. To try the solutions, there is a “Start Simulation” button so that the user can see if something goes wrong or if they have succeeded in making the movements in the correct order.

So far, the game has four different levels. The developers of this application have created the game in such a way where it is very modular and highly expandable. There are no limits to how many levels the developer can create in the game. The only limitation is the different questions and the different scenarios that each level is trying to convey. Since each level is aimed to provide insights and teach users the different kinds of logical framework that is required in programming, the game only needs more questions and materials to be taught. However, beyond that, the developers of this application designed the game to be easily added for more levels and challenges.


## How to use
The picture above is the starting screen. When the user has entered the link to the game, the user will first be introduced to this page. To start the game, click on the “Start Game” button that is colored blue. When the user has pressed on the button, the user will be transported to the “Level One” page.

In the “Level One” page, there are a few ways the user can interact with the game. On the left console, the user can click and drag around the screen to move the perspective of the graphics. On the right console, the user can add the movements of the character, the user can press the “Start Simulation” button, and the user can read instructions of the level. To start adding the movements, the user can press the “+” button. After pressing the “+” button, the user can choose whether to walk or to turn. Press on the choice (walk or turn) then press add to proceed or press cancel to go back to the game screen and discard the changes. After the user presses add, there will be a bar added on the right console, a bar that consists of the movement the user chose. If the user chose turn, the user can then press the dropdown to decide if the character were to turn left or right. To delete the movement, the user can press the “-” button on the bar that corresponds to the movement. The order in which the movement is added will be the order of the movement of the character. The top being the first and the bottom being the last. Once the user has finished, they can click on the “Start Simulation” button and view the left console to see the movements of the character.

If the user manages to give the correct answer, the user will be transported to the next level. On the next levels, the “+” button will also have a quota. So, the user can only use the “+” button a certain number of times. If the user decides to use a loop, the user can input how many times the loop can occur and press the “+” button inside of the loop bar to decide what movement will be looped. To delete the loop movement, the user can press the “-” button on the bar. If the user decides to use the if statement, the user can input the different conditional inputs. The user can follow the drop down buttons and also press the “+” button inside of the if statement bar to decide the conditional outcome. To delete the if statement movement, the user can press the “-” button on the bar.


## Demo Video
*LINK*


## Credits
- Skybox: Fantasy Skybox FREE by Render Knight on [Unity Asset Store](https://assetstore.unity.com/packages/2d/textures-materials/sky/fantasy-skybox-free-18353)
- Textures: Pixelz by PixelPerfectGFC on [Planet Minecraft](https://www.planetminecraft.com/texture-pack/pixelz-4829706/)
- 3D Models: Simple Low Poly Nature Pack by NeutronCat on [Unity Asset Store](https://assetstore.unity.com/packages/3d/environments/landscapes/simple-low-poly-nature-pack-157552)
- Character model by [Livander Surya](https://youtube.com/livandergamedev)
- Music: Hypnotic Puzzle by Eric Matyas on [www.soundimage.org](https://soundimage.org/)
