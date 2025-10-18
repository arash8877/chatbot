export const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1')     // italic
    .replace(/_(.*?)_/g, '$1')       // underscores
    .replace(/`(.*?)`/g, '$1')       // inline code
    .replace(/#{1,6}\s?(.*)/g, '$1') // headings
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
    .trim();
};
