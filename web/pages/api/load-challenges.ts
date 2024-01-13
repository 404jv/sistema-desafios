export default async function loadChallenges() {
  const response = await fetch('http://localhost:3333/api/v1/challenges/list');
  const challenges = await response.json();
  return challenges;
}
