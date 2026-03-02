import { prisma } from "./db";

export async function runSeed() {
  const configs = [
    { key: "site_name", value: "A1-SATTA" },
    { key: "tagline", value: "DELHI BAZAR SATTA CHART 2026" },
    { key: "hero_date", value: "March 2, 2026 20:00:00 PM" },
    { key: "hero_message", value: "हा भाई यही आती हे सबसे पहले खबर रूको और देखो" },
    { key: "whatsapp_message", value: "Follow the Result Update ✅✅ channel on WhatsApp" },
    { key: "telegram_message", value: "अब टेलीग्राम के players भी जल्दी रेिजल्ट पाने के लिए हमारे टेलीग्राम के चैनल को Join करे और Superfast रेिजल्ट पाए" },
    { key: "contact_email", value: "email@example.com" },
    { key: "whatsapp_link", value: "https://wa.me/1234567890" },
    { key: "telegram_link", value: "https://t.me/a1satta" },
    { key: "disclaimer", value: "!! DISCLAIMER - A1-Satta is a non-commercial informational website. Please view this site at your own risk, All The Information Shown On Website Is Sponsored And We Warn You That satta matka Gambling/Satta May Be Banned Or Illegal In Your Country. We Are Not Responsible For Any Issues Or Scam..., We Respect All Country Rules/Laws... If You Not Agree With Our Site disclaimer Please Quit Our Site Right Now. Thank You." },
    { key: "footer_copyright", value: "©️ 2026 A1-Satta All Rights Reserved" },
    { key: "meta_description", value: "A1-satta is an informational satta matka website which publishes all a1satta games results which includes A1Satta delhi bazar , sadar bazar satta king , a1 satta charts , dwarka satta , gali satta king 2026 and faridabad satta king 2026 and also ghaziabad 2026 satta charts are available on a1-satta.com." },
  ];

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }

  const liveResults = [
    { name: "alwar", result: "91", time: null, order: 0 },
    { name: "mandi bazar", result: "64", time: null, order: 1 },
    { name: "lion bazar", result: "68", time: null, order: 2 },
    { name: "disawer", result: "68", time: "5:15 AM", order: 3 },
  ];

  await prisma.liveResult.deleteMany({});
  for (const lr of liveResults) {
    await prisma.liveResult.create({ data: lr });
  }

  const mainGames = [
    { name: "sadar bazar", slug: "sadar-bazar", time: "1:40 PM", yesterday: "47", today: "26", order: 0, category: "main" as const },
    { name: "gwalior", slug: "gwalior", time: "2:40 PM", yesterday: "29", today: "49", order: 1, category: "main" as const },
    { name: "delhi bazar", slug: "delhi-bazar", time: "3:15 PM", yesterday: "35", today: "06", order: 2, category: "main" as const },
    { name: "delhi matka", slug: "delhi-matka", time: "3:40 PM", yesterday: "42", today: "63", order: 3, category: "main" as const },
    { name: "shri ganesh", slug: "shri-ganesh", time: "4:40 PM", yesterday: "36", today: "00", order: 4, category: "main" as const },
    { name: "agra", slug: "agra", time: "5:30 PM", yesterday: "37", today: "58", order: 5, category: "main" as const },
    { name: "faridabad", slug: "faridabad", time: "6:10 PM", yesterday: "02", today: "91", order: 6, category: "main" as const },
    { name: "alwar", slug: "alwar", time: "7:35 PM", yesterday: "85", today: "91", order: 7, category: "main" as const },
    { name: "gaziabad", slug: "gaziabad", time: "9:30 PM", yesterday: "10", today: "--", order: 8, category: "main" as const },
    { name: "dwarka", slug: "dwarka", time: "10:35 PM", yesterday: "04", today: "--", order: 9, category: "main" as const },
    { name: "gali", slug: "gali", time: "11:30 PM", yesterday: "92", today: "--", order: 10, category: "main" as const },
    { name: "disawer", slug: "disawer", time: "5:15 AM", yesterday: "--", today: "68", order: 11, category: "main" as const },
  ];

  const secondGames = [
    { name: "hr satta", slug: "hr-satta", time: "12:15 PM", yesterday: "40", today: "86", order: 0, category: "second" as const },
    { name: "madhupuri", slug: "madhupuri", time: "12:30 PM", yesterday: "73", today: "71", order: 1, category: "second" as const },
    { name: "kkr city", slug: "kkr-city", time: "12:30 PM", yesterday: "84", today: "14", order: 2, category: "second" as const },
    { name: "ujjala super", slug: "ujjala-super", time: "12:30 PM", yesterday: "--", today: "63", order: 3, category: "second" as const },
    { name: "karol bagh", slug: "karol-bagh", time: "1:45 PM", yesterday: "24", today: "64", order: 4, category: "second" as const },
    { name: "delhi darbar", slug: "delhi-darbar", time: "2:10 PM", yesterday: "01", today: "17", order: 5, category: "second" as const },
    { name: "new ganga", slug: "new-ganga", time: "3:30 PM", yesterday: "71", today: "79", order: 6, category: "second" as const },
    { name: "fatehabad", slug: "fatehabad-", time: "7:00 PM", yesterday: "52", today: "18", order: 7, category: "second" as const },
    { name: "raj shree", slug: "raj-shree", time: "7:20 PM", yesterday: "37", today: "42", order: 8, category: "second" as const },
    { name: "mandi bazar", slug: "mandi-bazar", time: "8:10 PM", yesterday: "90", today: "64", order: 9, category: "second" as const },
    { name: "lion bazar", slug: "lion-bazar", time: "8:30 PM", yesterday: "64", today: "29", order: 10, category: "second" as const },
    { name: "dehradun city", slug: "dehradun-city", time: "9:40 PM", yesterday: "87", today: "--", order: 11, category: "second" as const },
    { name: "daman", slug: "daman", time: "9:50 PM", yesterday: "60", today: "--", order: 12, category: "second" as const },
  ];

  for (const game of [...mainGames, ...secondGames]) {
    await prisma.sattaGame.upsert({
      where: { slug: game.slug },
      update: game,
      create: game,
    });
  }

  const mainSlugs = mainGames.map((g) => g.slug);
  const secondSlugs = secondGames.map((g) => g.slug);
  const mainResults1 = ["47", "29", "35", "42", "36", "37", "02", "85", "10", "04", "92", "-"];
  const mainResults2 = ["26", "49", "06", "63", "00", "58", "91", "91", "-", "-", "-", "68"];
  const secondResults1 = ["40", "73", "84", "24", "01", "71", "52", "37", "90", "60", "87", "-"];
  const secondResults2 = ["86", "71", "14", "64", "17", "79", "18", "42", "64", "-", "-", "63"];

  for (let i = 0; i < mainSlugs.length; i++) {
    await prisma.dailyResult.upsert({
      where: { date_gameSlug: { date: "01-03", gameSlug: mainSlugs[i] } },
      update: { result: mainResults1[i] },
      create: { date: "01-03", gameSlug: mainSlugs[i], result: mainResults1[i] },
    });
    await prisma.dailyResult.upsert({
      where: { date_gameSlug: { date: "02-03", gameSlug: mainSlugs[i] } },
      update: { result: mainResults2[i] || "-" },
      create: { date: "02-03", gameSlug: mainSlugs[i], result: mainResults2[i] || "-" },
    });
  }

  for (let i = 0; i < secondSlugs.length; i++) {
    await prisma.dailyResult.upsert({
      where: { date_gameSlug: { date: "01-03", gameSlug: secondSlugs[i] } },
      update: { result: secondResults1[i] },
      create: { date: "01-03", gameSlug: secondSlugs[i], result: secondResults1[i] },
    });
    await prisma.dailyResult.upsert({
      where: { date_gameSlug: { date: "02-03", gameSlug: secondSlugs[i] } },
      update: { result: secondResults2[i] || "-" },
      create: { date: "02-03", gameSlug: secondSlugs[i], result: secondResults2[i] || "-" },
    });
  }

  const contentSections = [
    { key: "chart_2025", title: "A1Satta Disawer Chart for 2025 is available", content: "", order: 0 },
    { key: "delhi_record", title: "Delhi Satta Record Chart available on A1SATTA", content: "", order: 1 },
    { key: "ganesh_chart", title: "CHECK UPDATED SHREE GANESH SATTA KING CHART HERE", content: "", order: 2 },
    { key: "record_chart_2026", title: "SATTA RECORD CHART 2026", content: "", order: 3 },
    { key: "march_2026", title: "MARCH 2026 RESULT CHART", content: "", order: 4 },
    { key: "what_is", title: "What is A1-Satta?", content: "You've probably heard the name A1 satta many times. In India, this name carries a lot of weight. A1 satta is a website which provides all satta king lottery game results that uses numbers ranging from 00 to 99. A1 Satta also known as A1Satta or A1-satta. This game is known as Satta Matka, where \"Satta\" refers to betting or gambling and \"Matka\" refers to a pot. In the Satta Matka game, money is wagered on numbers ranging from 00 to 99. The pot is then drawn, followed by a number. Because whoever's number was drawn won the prize, he was known as the Satta king. The winner of Satta Matka was given the title Satta King, not the game itself.", order: 5 },
    { key: "how_to_play", title: "How do you play A1-Satta?", content: "In A1 Satta, a wager can be placed on any number between 0 and 99. The odds of winning depend on the number chosen. They can get assistance with this from a Khaiwal who lives in their region. Khaiwal acts as a go-between for players and game operators, facilitating communication between the two groups. Players in Khaiwal's region submit money and numbers to the corporation based on the money they gather and the number they provide. This is done under the game's rules. Once a victor has been determined, he will then go around and collect the winnings and hand them out to the victors. The Satta firm selects winners at random and then announces the winners at a set time. An individual who successfully wagers on a winning number will receive ninety times the amount of his original wager.", order: 6 },
    { key: "play_online", title: "How do you play Satta King online, and why?", content: "When you play satta online, you don't have to worry about the police getting in the way. It's hard to catch people who play games online. But betting is against the law in India and can lead to a big fine. There are many exciting online games you can play with apps from the Google Play store. Get the app and install it. Play satta games at home.", order: 7 },
    { key: "delhi_money", title: "How much money can you make with Delhi satta?", content: "If a person bets 10 rupees on a number and that number is opened, they will get 10 times 90, which is 900 rupees. The same goes for 20, 30, 40, and 50 rupees; users get 1800 rupees for each. The user can play as many numbers as he wants and put as much money into the game as he wants.", order: 8 },
    { key: "reality", title: "What is the Reality of A1-Satta?", content: "It's worth noting that A1 Satta is just one of several lottery games out there. There will be 100 people taking part in it, all of their own. The whole collection of 100 digits is combined, and a single number, between 1 and 100, is drawn at random. After that, a number from any slip is chosen at random. If your ticket number is drawn as the winner, congratulations! This game is exactly as it sounds, yet it doesn't have any of these elements. Rather than randomly selecting a number from a pool of one hundred, Satta Company plays a game where players choose a winning slip from a pot. Profit maximization is the primary focus of Satta's business operations. In other words, the numbers are not chosen at random. The Satta Company dictates all of the numbers. As a result, Satta makes a lot of money, and the winners in Satta are decided by the amount of money each player takes home.", order: 9 },
    { key: "delhi_king", title: "What is DELHI SATTA KING?", content: "The term satta king delhi bazar came from the game delhi bazar Satta which is quite popular game which named upon capital of India which is Delhi. and the word \"bazar\" means Market so the collected word will mean as Delhi Market butin context to satta king , it means a game which have number from 0 to 99 where everyday at 3:15 one number is announced by game owner which is unknown and players who had bid for same number will be rewarded with 100 times of the bid amount and those who bid the wrong number will be loser and will have to loose their money so playing satta king delhi bajar is not quite easy as it have financial burden to end up loosing. Also keep in mind that playing satta king delhi bazar or other games like this are illegal.", order: 10 },
    { key: "leak_number", title: "What is the leak Number for A1-Satta?", content: "We'll give you a leak, and you'll see what happens right in front of your eyes. You can win lakhs of rupees by playing Satta with 100% Direct Speculative Leak in the Gali and Disawar. The only people we help are those who have lost a lot and are upset. You will have to put fees directly into a company's account, not just in the accounts of its employees. Gali and delhi satta will make someone wealthy. This is the only way to change your future. At the moment, we will pay for loans or players that we lose. We'll also give you millions and millions of crores, and the leaked Jodi will always be with you.", order: 11 },
    { key: "satta_king_mean", title: "What does it mean by SATTA KING?", content: "Satta king is a game which played in south east part of the world especially in India , To define it in true sense you can imagine a game which is prediction of number , infact there are numbers from 0 to 99 are playable numbers in satta king games , there are many games which are satta king games such as delhi bazar satta king , shri ganesh satta king , diwaser and gali . The players usually bids on a number through a mediator who takes bids money from player and pours in networks of game owner where result of one number from 0 to 99 is chosen by owner and later announced by diffrent channels then those who have bid on exact number will be paid upto 90 to 100 times of bid money. This is shortest description of SATTA KING game Play.", order: 12 },
    { key: "shri_ganesh", title: "Is Shri Ganesh result published on A1-satta?", content: "Yes , A1satta website is one of fast website to publish shri ganesh satta result which is published everyday around 4:40 PM where a1-satta updates on its chart section real time. Shri ganesh satta players likes A1satta website for its interactive interface and straigh forward result section which gives information real time", order: 13 },
    { key: "faq_title", title: "Frequently Asked Question About A1-Satta", content: "", order: 14 },
    { key: "faq_types", title: "What are the types of A1-Satta Games?", content: "In India, the game of satta bazar is most commonly played in one of four variations: Desawar Satta kings, Gali Satta kings, Ghaziabad Satta kings, and satta bazar. In addition to these four games, Khaiwal participated in several other games on his own, including Rajkot, Taj, New Faridabad, Hindustan, and Peshawar.", order: 15 },
    { key: "faq_winning", title: "Which A1 satta number is the most likely to win?", content: "To win money playing Delhi Satta, all you need is a number that is drawn as a winner. There is no specific mathematical formula that can be used to derive this number. When it comes to Satta King games, players would often refer to older record charts to make their guesses on the next number. As a direct consequence of this, a large number of numbers are played all at once.", order: 16 },
    { key: "faq_predict", title: "How to predict satta king number?", content: "For next prediction of number there need analysis , some people calculate it as how many occurrences occur within a specific time frame , however this is ideally easier way people predict these game but there is also need to catch pattern to get what number are published in a specific time with a specific pattern . Some people use some complex mind algos to predict which works once in while which ends up loosing money for players.", order: 17 },
  ];

  for (const section of contentSections) {
    await prisma.contentSection.upsert({
      where: { key: section.key },
      update: section,
      create: section,
    });
  }
}
