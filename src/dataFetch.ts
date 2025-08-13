const API_BASE_URL = `roproxy.com/v1/`;

function fetchProjectThumbnails(universeId: string) {
  return fetch(
    `https://thumbnails.${API_BASE_URL}games/multiget/thumbnails?countPerUniverse=999&format=Png&isCircular=false&size=768x432&universeIds=${universeId}`
  )
    .then((response) => response.json())
    .then(
      (data) =>
        data.data[0]?.thumbnails.map((thumb: any) => thumb.imageUrl) || []
    );
}

function fetchProjectData(universeId: string) {
  return fetch(`https://games.${API_BASE_URL}/games?universeIds=${universeId}`)
    .then((response) => response.json())
    .then((data) => {
      const game = data.data[0];
      return {
        placeId: game.rootPlaceId,
        playing: game.playing,
        visits: game.visits,
        favorites: game.favoritedCount,
        created: new Date(game.created).toLocaleDateString(),
      };
    })
    .catch((error) => {
      console.error("Error fetching project data:", error);
      return null;
    });
}

function fetchGroupData(groupId: string) {
  return fetch(`https://groups.${API_BASE_URL}/groups/${groupId}`)
    .then((response) => response.json())
    .then((data) => ({
      memberCount: data.memberCount,
    }))
    .catch((error) => {
      console.error("Error fetching group data:", error);
      return null;
    });
}

export { fetchProjectThumbnails, fetchProjectData, fetchGroupData };
