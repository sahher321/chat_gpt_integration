// const { ChatGPTAPIBrowser } = require("chatgpt");

// const letsChat = async () => {
//   // use puppeteer to bypass cloudflare (headful because of captchas)
//   const api = new ChatGPTAPIBrowser({
//     email: "bilalfire97@gmail.com",
//     password: "Commecs123",
//   });

//   await api.initSession();
//   const result = await api.sendMessage("Hello World!");
//   console.log(result.response, "<====== response from openai");
//   return result;
// };

// module.exports = { letsChat };

const { Configuration, OpenAIApi } = require("openai");
const config = require("../config/config");
const configuration = new Configuration({
  apiKey: config.openAi.apikey,
});
const openai = new OpenAIApi(configuration);

const getAnswer = async (query) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: query,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response?.data.choices[0]?.text, "<====== response");
    return { reply: response?.data?.choices[0]?.text };
  } catch (e) {
    // console.log(e.response.data, "<======= error");
    return { reply: e.response.data };
  }
};
module.exports = { getAnswer };
