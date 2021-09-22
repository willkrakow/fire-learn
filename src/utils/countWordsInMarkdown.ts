export default function countWordsInMarkdown(markdown: string) {
  return markdown.split(/\s+/).length;
}
