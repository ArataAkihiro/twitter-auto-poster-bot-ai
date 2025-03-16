// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Generate a tweet for teenagers (think casual, relatable tone, similar to online youth culture, but without specific influencer mentions). The tweet should be under 280 characters, all lowercase, no emojis, and simple text. Focus on trending topics relevant to teens. Prioritize engagement and avoid repeating topics. Choose one of these options AND DON'T LABEL THEM: Question: Ask an open-ended question about current trends, relatable struggles, or social topics relevant to teens. Quote/Observation: Offer a short, insightful quote or observation about self-discovery, relationships, or personal growth. Relatable Comment: Make a brief comment about everyday life, current events, or social issues that resonates with teens (e.g., school stress, social media, identity). Quick Tip/Advice: Give a short piece of advice or a helpful tip related to self-care, productivity, or navigating social situations. Focus on topics like: Mental health: stress, anxiety, self-care; Social media: trends, online culture, digital well-being; Relationships: friendships, family, romance; Identity: self-discovery, personal growth, acceptance; Current events: relevant news, social issues, pop culture. Aim for brevity (but you can choose to use almost 280 characters too sometimes) and engagement. Do not use the words 'is it just me.' Do not mention the option you chose, just the final text. Do not repeat topics.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
