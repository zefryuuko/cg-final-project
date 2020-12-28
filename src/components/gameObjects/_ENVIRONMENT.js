/*
    _ENVIRONMENT.js
    Environment game objects id definition. Used for map spawning and referencing
*/

class ENVIRONMENT {
    NONE = 0;
    STONE = 1;
    GRASS = 2;
    PATH = 3;
    WALKED_PATH = 4
    TREE_1 = 10;
    TREE_2 = 11;
    ROCK_1 = 12;
    ROCK_2 = 13;
    LARGE_RED_MUSHROOM = 14;
    SMALL_PURPLE_MUSHROOM = 15;
    SMALL_YELLOW_MUSHROOM = 16;
    CAMPFIRE = 17;
    TENT = 18;
    FENCE = 19;
    OBJECTIVE = 99;
    
    WALKABLE_BLOCKS = [this.PATH];
}

// Freeze the object to prevent changes
export default Object.freeze(new ENVIRONMENT());