import countWordsInMarkdown from "./countWordsInMarkdown";
export default function calculateReadingTime(markdown: string) {
  const wordsPerMinute = 200;
  const words = countWordsInMarkdown(markdown);
  const minutes = Math.floor(words / wordsPerMinute);
  const seconds = Math.floor((words % wordsPerMinute) / (wordsPerMinute / 60));
  return `${minutes} min ${seconds} sec`;
}
