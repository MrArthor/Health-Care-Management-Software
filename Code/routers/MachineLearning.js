const request = require("request-promise");

async function arraysum() {
    const data = {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };

    const options = {
        method: "POST",

        uri: "http://127.0.0.1:9501/MachineLearningModel",
        body: data,

        json: true,
    };

    const sendrequest = await request(options)
        .then(function(parsedBody) {
            console.log(parsedBody);

            let result;
            result = parsedBody["result"];
            console.log("Sum of Array from Python: ", result);
        })
        .catch(function(err) {
            console.log(err);
        });
}

arraysum();