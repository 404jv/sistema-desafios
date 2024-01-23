export default async function loadChallenges() {
  const response = await fetch(`${process.env.baseUrl}/challenges/list`);
  const challenges = await response.json();
  return challenges;
}
