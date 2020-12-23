/*
    _ENVIRONMENT.js
    Environment game objects id definition. Used for map spawning and referencing
*/

class ENVIRONMENT {
    NONE = 0;
    STONE = 1;
    GRASS = 2;
    PATH = 3;
    OBJECTIVE = 99;
    
    WALKABLE_BLOCKS = [this.PATH, this.GRASS];
}

// Freeze the object to prevent changes
export default Object.freeze(new ENVIRONMENT());