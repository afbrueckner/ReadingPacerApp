import { foundationalPassages } from './foundational.js';
import { intermediatePassages } from './intermediate.js';
import { advancedPassages } from './advanced.js';

export const allPassages = [
  ...foundationalPassages,
  ...intermediatePassages,
  ...advancedPassages
];

export function getPassageByTopicOrLexile(queryTopic, lexileBand) {
  const cleanTopic = (queryTopic || '').toLowerCase().trim();
  
  // 1. Try exact topic match
  if (cleanTopic) {
    const topicMatch = allPassages.find(p => 
      p.topic.toLowerCase().includes(cleanTopic) || 
      p.title.toLowerCase().includes(cleanTopic) ||
      p.id.toLowerCase().includes(cleanTopic)
    );
    if (topicMatch) return topicMatch;
  }

  // 2. Try Lexile band match
  if (lexileBand) {
    const bandMatches = allPassages.filter(p => p.lexileLabel === lexileBand);
    if (bandMatches.length > 0) {
      return bandMatches[Math.floor(Math.random() * bandMatches.length)];
    }
  }

  // 3. Fallback to default first entry
  return allPassages[0];
}