//================= Exercise Space =========================

function exerciseFunction( promiseFunction ){

}

//================= /Exercise Space =========================

//================= Documentation Space =====================
/*
# Title 

promise.then( resolveFunction, rejectFunction )

Have a function that:
    * takes a fn
    * creates a promise that takes that function as a 
      constructor argument
    * on then => Return the value that was returned
        * Successful => return 1
        * Failed => return null
*/
//================= /Documentation Space ====================

//==================== Testing Space  =======================

(async function(){

    function PromiseFunctionResolve( promiseFunction ){
        return new Promise( promiseFunction )
                    .then( 
                        x => 1,
                        x => null
                    );
    }

    function PromiseFunctionReject( resolve, reject ){
        reject("This is the rejection message");
    }
    
    const finishedExerciseFunction = () => {

    };
    
    const inputs = [
        PromiseFunctionResolve,
        PromiseFunctionReject
    ]

    const expectedOutputs = [
        Promise.resolve(1),
        Promise.resolve(null)
    ]

    for( let i = 0; i < inputs.length; ++i ){
        const expectedOutput = expectedOutputs[i];
        const actualOutput = exerciseFunction( inputs[i] );
        console.log("===============");
        console.log("Actual Output");
        console.log( actualOutput );
        console.log( await actualOutput );
        console.log("Expected Output");
        console.log( expectedOutput );
        console.log( await expectedOutput );
        console.log("===============");
    }
})();

//==================== /Testing Space =======================
