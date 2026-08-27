/**
 * Single source of truth for studio-wide facts that show up in copy across the
 * site. Numbers that can't be pulled live from an API (Discord size, all-time
 * peak CCU) live here so they're a one-line edit instead of a scavenger hunt.
 */
export const STUDIO = {
  name: "Mr.Ducky Studio",
  foundedYear: 2021,
  domain: "https://mrduckystudio.com",

  // Roblox group ("community") — used for the live member count fetch.
  robloxGroupId: "8954519",
  robloxGroupMembersFallback: 656_900,

  // Discord vanity invites aren't resolvable through Discord's public API, so
  // this is maintained by hand. Update after big membership milestones.
  discordMembers: 5_000,

  // All-time peak concurrent players across every experience. Bump when a game
  // sets a new record.
  peakCcu: 13_000,
} as const;
