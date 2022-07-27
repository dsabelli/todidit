const dates = ["MMM-dd-yyyy", "MM-dd-yyyy", "dd-MMM-yyyy", "dd-MM-yyyy"];
const getDates = () => {
  return dates;
};

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const getThemes = () => {
  return themes;
};
export default { getDates, getThemes };
