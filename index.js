const Alexa = require('ask-sdk-core');
const axios = require('axios');

const OpenAIHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpenAIIntent';
    },
    async handle(handlerInput) {
        const prompt = 'What is the capital of France?'; // Replace with your prompt

        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 60
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const speakOutput = response.data.choices[0].text.trim();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        OpenAIHandler
    )
    .lambda();
