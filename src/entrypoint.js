exports.handle = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`entrypoint only accept POST method, you tried: ${event.httpMethod}`);
    }


    console.info(JSON.stringify({ event: 'Triggered', payload: event }));

    return { statusCode: 200, body: JSON.stringify({ 'details': 'It works.' }) };
}