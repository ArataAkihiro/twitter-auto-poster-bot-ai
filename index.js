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
    "Generate a tweet for teenagers (think casual, relatable tone, similar to online youth culture, but without specific influencer mentions). The tweet should be under 280 characters, all lowercase, no emojis, and simple text. DO NOT USE LABELS (like 'Question,' 'Quote,' etc.). DO NOT USE THE WORDS: IS IT JUST ME. DO NOT MENTION THE OPTION YOU CHOOSE, JUST THE FINAL TEXT. Choose one of these options, WITHOUT LABELING THEM: * Engagement Question: Ask an open-ended question that encourages interaction, using one of these formats: * \\\"Would you rather...\\\" Question: Pose a \\\"would you rather\\\" question that is creative, relatable, and engaging for a teenage audience. Think about current trends, social media humor, and relatable struggles. Focus on topics related to social media, online trends, pop culture, or everyday teenage experiences. Keep the question fun, lighthearted, and relatable to the online youth culture. Avoid overly serious or philosophical questions. * \\\"Fill in the blank...\\\" Statement: Start a sentence and leave a blank for the audience to complete, related to current trends, relatable struggles, or social topics relevant to teens. * \\\"Share your thoughts...\\\" Prompt: Ask an open-ended question that encourages the audience to share their opinions or experiences, related to current trends, relatable struggles, or social topics relevant to teens. * \\\"This or that...\\\" Choice: You MUST generate a 'This or That' tweet. Follow this format EXACTLY: * Begin with one of the following phrases, chosen at random, followed by a colon (:): \\\"choose between\\\", \\\"which one\\\", \\\"pick one\\\", \\\"decide between\\\", \\\"either or\\\". * Then, on a NEW LINE, add a hyphen (-) followed by a SINGLE WORD or VERY SHORT PHRASE for [Option 1]. * On a NEW LINE below that, add a hyphen (-) followed by a SINGLE WORD or VERY SHORT PHRASE for [Option 2]. Instructions: * [Option 1] and [Option 2] should be two options that are DIRECT and RELATABLE, focusing on choices that are easily understood and resonate with a wide audience. * Focus on topics like: Mental health: stress, anxiety, self-care; Social media: trends, online culture, digital well-being; Relationships: friendships, family, romance; Identity: self-discovery, personal growth, acceptance; Current events: relevant news, social issues, pop culture. * Keep the tweet fun, lighthearted, and relatable to the online youth culture. Avoid overly serious or philosophical options. * Quote/Observation: Offer a short, insightful quote or observation about self-discovery, relationships, or personal growth, followed by a short, open-ended question related to it. * Relatable Comment: Make a brief comment about everyday life, current events, or social issues that resonates with teens (e.g., school stress, social media, identity), ending with a phrase that invites sharing personal experiences or opinions. * Quick Tip/Advice: Give a short piece of advice or a helpful tip related to self-care, productivity, or navigating social situations, followed by a follow-up question to encourage the audience to reflect on the tip or share their own experiences. Focus on topics like: Mental health: stress, anxiety, self-care; Social media: trends, online culture, digital well-being; Relationships: friendships, family, romance; Identity: self-discovery, personal growth, acceptance; Current events: relevant news, social issues, pop culture. Aim for brevity (you can choose to use almost 280 characters too sometimes) and engagement.";

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
