export const calcLastSeen = (lastSeen) => {
  const currentTime = Date.now();

  return (currentTime - lastSeen) / 1000;
}