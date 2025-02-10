export const parseMetadata = (metadata: string) => {
  try {
    return JSON.parse(metadata);
  } catch (e: any) {
    return {};
  }
};
