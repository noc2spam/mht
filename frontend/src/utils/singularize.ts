export default function singularize(word: string) {
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y";
  } else if (word.endsWith("es")) {
    return word.slice(0, -2);
  } else if (word.endsWith("s")) {
    return word.slice(0, -1);
  } else {
    return word;
  }
}
