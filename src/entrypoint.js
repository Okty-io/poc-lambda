let aws = require('aws-sdk')
let lambda = new aws.Lambda({ region: 'eu-west-3' });

const mapping = { nginx: 'okty-nginx', php: 'okty-php' };

function callLambda(name, event) {
    const lambdaArn = mapping[name];

    return lambda
        .invoke({
            FunctionName: lambdaArn,
            Payload: JSON.stringify(event) // pass params
        })
        .promise();
}

async function buildOutput() {
    const nginx = callLambda('nginx', { test: 'Ok' });
    const php = callLambda('php', { test: 'Ok2' });

    return await Promise.all([nginx, php])
}

exports.handle = async (event) => {
    console.info(JSON.stringify({ event: 'Triggered', payload: event }));

    let output = await buildOutput();

    console.info(JSON.stringify({ event: 'End', output }));

    return { statusCode: 200, body: output };
}