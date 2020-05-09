const fs = require('fs');

//Dirty globals
const exerciseDirectoryPath = "exercises"
const trackerPath = "tracker.json";

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

    console.log(trackerJson);
}

//=========== Main ==================
getSetupTracker();
