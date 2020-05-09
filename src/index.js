const fs = require('fs');

//Dirty globals
const exerciseDirectoryPath = "exercises"
const trackerPath = "tracker.json";
const tempDirectory = "temp"

function getTrackerTemplate(){
    return {
        "exercises" : [
        ]
    }
}

function doesFileExist( file ){
    return fs.existsSync( file );
}

function echoFiles( err, files ){
    console.log( files );
}

/*
   callback( err, [...fileNames not paths] )
 */
function getExerciseFileNames( callback ){
    fs.readdir( exerciseDirectoryPath, callback );
}

/*
   If the tracker file exists, open it and pass it to the callback as a json
   else, just return an empty json.

   callback( err, json ) => {}
 */
function getTrackerIfExists( callback ){
    if( doesFileExist( trackerPath ) ){
        const fileContent = fs.readFileSync( trackerPath )
        const fileAsJson = JSON.parse( fileContent );
        callback( null, fileAsJson );
    }
    else{
        callback( null, getTrackerTemplate() );
    }
}

/*
    For every element in source that's not in destination
    return a new array, containing the old one with the exercises at the start
*/
function mergeAdditionalFiles(destination, source){
    const missingFiles = source.filter( x => !destination.includes( x ) );
    return [...missingFiles, ...destination];
}

async function dumpTrackerToFile( trackerJson ){
    return await new Promise( (resolve, reject) => {
        fs.writeFile(trackerPath, JSON.stringify( trackerJson ), ( err ) => err ? reject( err ) : resolve() );
    });
}

/*
   Grab the tracker file
   Check that the length of the exercises array in the tracker
   is the same length of the exercise directory
   else, add all new exercises to the top of the file
   return that new tracker file
 */
async function getSetupTracker( callback ){ 
    const trackerJson = await new Promise( (resolve, reject) => {
        getTrackerIfExists( (err, trackerJson) => {
            resolve(trackerJson);
        });
    });

    const exerciseFiles = await new Promise( (resolve, reject) => {
        getExerciseFileNames(( err, files) => resolve(files) );
    });

    if( trackerJson.exercises.length != exerciseFiles ){
        trackerJson.exercises = mergeAdditionalFiles( trackerJson.exercises, exerciseFiles ); 
    }
    
    return trackerJson;
}

/*
    Take the last element of an array
    put it at the front
    return a copy of the new array
*/
function moveLastToFirst( array ){
    const lastElement = array[array.length - 1];
    const withoutLast = array.slice(0, -1);
    return [lastElement, ...withoutLast];
}

/*
    return the number of wanted exercises from the array.
    This will be more complex in the future, using exponentials and stuff
*/  
function getWantedExercises( exerciseArray, count ){
    return exerciseArray.slice(0, count); 
}

async function setupNextSession( exerciseCount ){
    const tracker = await getSetupTracker();
    tracker.exercises = moveLastToFirst( tracker.exercises );
    await dumpTrackerToFile( tracker );

    const wantedExercises = getWantedExercises( tracker.exercises, 2 );
    return wantedExercises;
}

function doesPractiseDirectoryExist(){
    return fs.existsSync( tempDirectory );
}

/*
   check if the directory exists
   clean out any existing files if they do exist
*/
async function initPractiseDirectory(){
    if( !doesPractiseDirectoryExist() ){
        fs.mkdirSync( tempDirectory );
    }

    const existingFiles = fs.readdirSync( tempDirectory );
    if( existingFiles.length ){
        existingFiles.forEach( file => {
            fs.unlinkSync(`${ tempDirectory }/${ file }`);
        });
    }
}

function copyExercisesToPractise( exerciseArray=[] ){
    //Just copy everything across
    exerciseArray.forEach( exercise => {
        fs.copyFileSync(`${ exerciseDirectoryPath }/${ exercise }`,`${ tempDirectory }/${ exercise }`);
    });
}

//=========== Main ==================
(async function(){
    const exercises = await setupNextSession( 2 ); 
    console.log( exercises );
    await initPractiseDirectory();
    copyExercisesToPractise( exercises );
})()
