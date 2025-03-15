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
    "Generate a tweet for teenagers (think casual, relatable tone, similar to online youth culture, but without specific influencer mentions). The tweet should be under 280 characters, all lowercase, no emojis, and simple text. DO NOT USE LABELS (like 'Question,' 'Quote,' etc.). DO NOT USE THE WORDS: IS IT JUST ME. DO NOT MENTION THE OPTION YOU CHOOSE, JUST THE FINAL TEXT. Choose one of these options, WITHOUT LABELING THEM: * Discussion Prompt: Generate a tweet that presents a debatable question or statement related to current trends, relatable struggles, or social topics relevant to teens. The goal is to encourage discussion and diverse opinions. Examples: 'is social media more harmful than helpful?' or 'should schools teach more life skills than traditional subjects?' * Open-Ended Question: Ask a thought-provoking, open-ended question that invites personal reflection and sharing of experiences. Examples: 'what's the biggest challenge teens face today?' or 'how do you define success?' * Relatable Scenario: Describe a relatable scenario or dilemma that teens often face and ask for opinions or advice. Examples: 'when your friends want to do something you don't agree with, what do you do?' or 'how do you deal with feeling pressure to fit in?' * Quote/Observation: Offer a short, insightful quote or observation about self-discovery, relationships, or personal growth, followed by a short, open-ended question related to it. * Quick Tip/Advice: Give a short piece of advice or a helpful tip related to self-care, productivity, or navigating social situations, followed by a follow-up question to encourage the audience to reflect on the tip or share their own experiences. * This or That: You MUST generate a 'This or That' tweet. Follow this format EXACTLY: * Begin with one of the following phrases, chosen at random, followed by a colon (:): 'choose between', 'which one', 'pick one', 'decide between', 'either or'. * Then, on a NEW LINE, add a hyphen (-) followed by a SINGLE WORD or VERY SHORT PHRASE for [Option 1]. * On a NEW LINE below that, add a hyphen (-) followed by a SINGLE WORD or VERY SHORT PHRASE for [Option 2]. Instructions: * Instead of simple choices like 'sleep vs. homework,' think about choices that reflect current teen interests, social media trends, or relatable dilemmas. For example: 'unlimited streaming vs. unlimited mobile data' or 'being known for your creativity vs. being known for your popularity.' The choices should be simple but should also make people think and consider the implications. Avoid choices that are too obvious or easily answered. The choices should be somewhat difficult to make, requiring the audience to weigh the pros and cons of each option. Think about common dilemmas that teens face in their daily lives, such as balancing schoolwork and social life, dealing with peer pressure, or navigating online relationships. * Focus on topics like: Mental health: stress, anxiety, self-care; Social media: trends, online culture, digital well-being; Relationships: friendships, family, romance; Identity: self-discovery, personal growth, acceptance; Current events: relevant news, social issues, pop culture. * Keep the tweet fun, lighthearted, and relatable to the online youth culture. Avoid overly serious or philosophical options. Focus on topics like: Mental health: stress, anxiety, self-care; Social media: trends, online culture, digital well-being; Relationships: friendships, family, romance; Identity: self-discovery, personal growth, acceptance; Current events: relevant news, social issues, pop culture. Aim for brevity (you can choose to use almost 280 characters too sometimes) and engagement.";

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
