//================= Exercise Space =========================

/*
    This is the area where the user is expected to do thier
    work. 

    This contains the signature of a function.
    This function should be set to match the behaviour 
    described in the documentation space.
*/

function exerciseFunction( args ){

}

//================= /Exercise Space =========================

//================= Documentation Space =====================
/*
# What needs to be done:
This is a quick description of what the exercise function 
needs to do.

# Expected outputs
A list of given inputs and expected outputs from the 
function.

# Any required functions
Here, quick links to documentation that might be of use 
should be put here.

*/
//================= /Documentation Space ====================

//==================== Testing Space  =======================

(async function(){
    /*
        This is a finished example of what the above function
        should more or less act like.
        Just incase the user gets super stuck.
        It also proves that the exercise is indeed possible
    */
    const finishedExerciseFunction = () => {

    };
    
    const inputs = [
        //First group of test inputs
        //next
        //.etc
    ]

    const expectedOutputs = [
        //The expected outputs to match the above inputs
    ]

    for( let i = 0; i < inputs.length; ++i ){
        const expectedOutput = expectedOutputs[i];
        const actualOutput = exerciseFunction( ...inputs[i] );
        console.log("===============");
        console.log( actualOutput );
        console.log( expectedOutput );
        console.log("===============");
    }
})();


//==================== /Testing Space =======================
