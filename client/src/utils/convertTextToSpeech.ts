import textToSpeech from "@google-cloud/text-to-speech"
// const { SsmlBuilder } = require('ssml-builder');

// const client = new textToSpeech.TextToSpeechClient();

// async function convertTextToSpeech(text) {
//   const ssml = new SsmlBuilder()
//     .sayAs({ word: text, interpretAs: 'verbatim' });

//   const request = {
//     input: { ssml: ssml.toString() },
//     voice: { languageCode: 'vi-VN', name: 'vi-VN-Wavenet-A' },
//     audioConfig: { audioEncoding: 'MP3' },
//   };

//   const [response] = await client.synthesizeSpeech(request);

//   return response.audioContent;
// }

// module.exports = convertTextToSpeech;