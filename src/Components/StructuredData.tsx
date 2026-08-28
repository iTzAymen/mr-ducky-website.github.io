import { STUDIO } from "../config/studio";
import { FAQ_TEXT } from "../Data/faq";
import type { ProjectData } from "../Types";

/**
 * Emits JSON-LD (schema.org) so search engines understand the studio and its
 * catalog. The static Organization/WebSite graph also lives in index.html for
 * crawlers that don't run JS; this component adds the live game list on top.
 */
export function StructuredData({ projects }: { projects: ProjectData[] }) {
  const games = projects
    .filter((p) => p.placeId)
    .map((p) => ({
      "@type": "VideoGame",
      name: p.name,
      url: `https://www.roblox.com/games/${p.placeId}`,
      ...(p.description ? { description: p.description } : {}),
      ...(p.thumbnails[0] ? { image: p.thumbnails[0] } : {}),
      gamePlatform: "Roblox",
      ...(p.visits
        ? {
            interactionStatistic: {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/PlayAction",
              userInteractionCount: p.visits,
            },
          }
        : {}),
    }));

  // The Organization / WebSite nodes are declared statically in index.html
  // (so no-JS crawlers get them); here we add the live game catalog and the
  // FAQ, linked back to that Organization by @id.
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: `${STUDIO.name} games`,
        itemListElement: games.map((game, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            ...game,
            publisher: {
              "@type": "Organization",
              "@id": `${STUDIO.domain}/#organization`,
              name: STUDIO.name,
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_TEXT.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
