const _ = require('lodash');

const utils = {
  getDefaultDatabase: () => (_.cloneDeep({
    server: {
      version: '',
      online: false,
      unreachable: false,
    },
    players: {},
  })),

  formatList: (list) => {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' });
    return formatter.format(_.cloneDeep(list).sort());
  },

  getSligtlyOffensiveMessage: (minutes) => {
    const fastLeaveMessages = [
      "Wow, that was quick. You speedrunning life?",
      "Blink and you're gone. Impressive.",
      "You leave faster than my motivation on Monday.",
      "Teleport much?",
      "That exit was Olympic-level.",
      "You allergic to staying?",
      "Record time. Should I start a stopwatch?",
      "You vanish like my paycheck.",
      "And... they're gone. Classic.",
      "Did you even arrive or was that a glitch?"
    ];
    const earlyLeaveMessages = [
      "And you're already gone? Commitment issues?",
      "Stayed just long enough to pretend you tried.",
      "Speedrun attempt failed successfully.",
      "Was that a visit or a WiFi reconnect?",
      "Personal best?",
      "That wasn’t even a warm-up.",
      "Arrive. Exist briefly. Disappear. Iconic.",
      "I’ve seen ads longer than that.",
      "So… that was your cameo?",
      "Next time just wave from outside."
    ];
    const midLeaveMessages = [
      "And then you dip? Just getting warmed up.",
      "You stayed long enough to seem committed. Almost.",
      "Mid effort. Mid exit.",
      "Ah yes, the classic ‘I was technically there’ move.",
      "You were just starting to matter.",
      "... couldn’t fully commit, huh?",
      "Not a rage quit. Not loyal either. Impressive balance.",
      "Stayed long enough to judge, not long enough to help.",
      "That was the participation trophy of exits.",
      "Almost respectable. Almost."
    ];
    const normalStayMessages = [
      "Stayed a reasonable amount of time. How responsible of you.",
      "Wow, a perfectly balanced human. Weird.",
      "Not too short, not too long. Suspiciously normal.",
      "You actually timed that well. Who are you?",
      "Respectable. Slightly disappointing, but respectable.",
      "You understood the assignment. Bare minimum achieved.",
      "That was… socially acceptable. Congrats.",
      "Look at you making balanced life choices.",
      "Optimal stay detected. No chaos today.",
      "You left like a functional adult. Rare."
    ];
    const kindaLongStayMessages = [
      "You stayed a bit longer than necessary, didn’t you?",
      "We were wrapping up… you weren’t.",
      "Comfortable, huh? A little too comfortable.",
      "That extra time wasn’t required, but go off.",
      "You missed the natural exit cue. Twice.",
      "Solid stay… slightly overstretched.",
      "You hovered just past the ideal length.",
      "That goodbye window? Yeah, you missed it.",
      "Not extreme… just mildly excessive.",
      "You almost nailed the timing. Almost."
    ];
    const longStayMessages = [
      "That was a long stay. You good?",
      "You definitely got your money’s worth.",
      "Okay, that was officially long.",
      "You really settled in, huh?",
      "We hit the ‘this is long’ phase a while ago.",
      "That wasn’t a visit. That was a session.",
      "You stretched that stay to full capacity.",
      "Long enough to need an intermission.",
      "That goodbye should’ve happened an hour ago.",
      "You stayed past the natural ending."
    ];
    const tooLongStayMessages = [
      "You still here? Rent’s due.",
      "At this point, you're part of the furniture.",
      "Blink twice if you need help leaving.",
      "This isn’t a subscription service.",
      "We closing soon… emotionally.",
      "You unlocked the ‘Overstayed’ achievement.",
      "Camping isn’t allowed here.",
      "You planning to retire here or what?",
      "This was a visit, not a residency.",
      "Alright, hero. Time to log off."
    ];
    if (minutes < 10) {
      const index = Math.floor(Math.random() * fastLeaveMessages.length);
      return fastLeaveMessages[index];
    } else if (minutes < 180) {
      const index = Math.floor(Math.random() * earlyLeaveMessages.length);
      return earlyLeaveMessages[index];
    } else if (minutes < 240) {
      const index = Math.floor(Math.random() * midLeaveMessages.length);
      return midLeaveMessages[index];
    } else if (minutes < 300) {
      const index = Math.floor(Math.random() * normalStayMessages.length);
      return normalStayMessages[index];
    } else if (minutes < 350) {
      const index = Math.floor(Math.random() * kindaLongStayMessages.length);
      return kindaLongStayMessages[index];
    } else if (minutes < 400) {
      const index = Math.floor(Math.random() * longStayMessages.length);
      return longStayMessages[index];
    } else {
      const index = Math.floor(Math.random() * tooLongStayMessages.length);
      return tooLongStayMessages[index];
    }
  },

  formatMinutes: (minutes) => {
    const remainingDays = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;

    let string = '';
    if (remainingDays > 0) {
      string += `${remainingDays} day${(remainingDays !== 1 ? 's' : '')}, `;
    }
    if (remainingDays > 0 || remainingHours > 0) {
      string += `${remainingHours} hour${(remainingHours !== 1 ? 's' : '')} and `;
    }
    return `${string}${remainingMinutes} minute${(remainingMinutes !== 1 ? 's' : '')}`;
  },

  formatPlayers: (players) => {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    return formatter.format(players.map(({ name }) => name)
      .sort((playerA, playerB) => playerA.toLowerCase()
        .localeCompare(playerB.toLowerCase())));
  },

  getOnlinePlayers: (db) => Object.values(db.players).filter((player) => player.joined > 0),

  getTimestamp: () => `<t:${Math.floor(new Date().getTime() / 1000)}>`,
};

module.exports = utils;
