import nextPlugin from "eslint-config-next";

export default [
  ...(Array.isArray(nextPlugin) ? nextPlugin : [nextPlugin]),
];
