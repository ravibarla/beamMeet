// Import crypto for random values
const crypto = require("crypto");

// Arrays of adjectives and nouns for random chatroom names
const adjectives = [
  "Sunny",
  "Breezy",
  "Chilly",
  "Silent",
  "Vivid",
  "Glowing",
  "Shady",
  "Cozy",
  "Lively",
];
const nouns = [
  "Forest",
  "Ocean",
  "Mountain",
  "Garden",
  "Valley",
  "Desert",
  "Meadow",
  "Cave",
  "Castle",
];

// Function to generate a random chatroom name
function generateChatroomName() {
  const randomAdjective = adjectives[crypto.randomInt(adjectives.length)];
  const randomNoun = nouns[crypto.randomInt(nouns.length)];
  const randomNum = crypto.randomInt(1000); // Add a random number for uniqueness

  return `${randomAdjective}${randomNoun}${randomNum}`;
}

module.exports=generateChatroomName
