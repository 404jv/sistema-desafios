export default async function loadChallenges() {
  try {
    const response = await fetch(`${process.env.baseUrl}/challenges/list`);
    const challenges = await response.json();
    return challenges;
  } catch (error) {
    console.error(error);
  }
}
