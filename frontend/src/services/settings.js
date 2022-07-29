const dates = ["MMM-dd-yyyy", "MM-dd-yyyy", "dd-MMM-yyyy", "dd-MM-yyyy"];
const getDates = () => {
  return dates;
};

//sortBySettings are key values in backend
//sortByOptions are for visuals for end user
//their indexes must match!!
const sortBySettings = ["dueDate", "isImportant", "createdOn", "isChecked"];
const getSortBySettings = () => sortBySettings;

const sortByOptions = [
  "Due Date",
  "Importance",
  "Created Date",
  "Completed Date",
];
const getSortByOptions = () => sortByOptions;

const orderOptions = ["Ascending", "Descending"];
const getOrderOptions = () => orderOptions;

const themes = [
  "Light",
  "Dark",
  "Cupcake",
  "Bumblebee",
  "Emerald",
  "Corporate",
  "Synthwave",
  "Retro",
  "Cyberpunk",
  "Valentine",
  "Halloween",
  "Garden",
  "Forest",
  "Aqua",
  "Lofi",
  "pastel",
  "Fantasy",
  "Wireframe",
  "Black",
  "Luxury",
  "Dracula",
  "Cmyk",
  "Lemonade",
  "Night",
  "Coffee",
  "Winter",
];

const getThemes = () => {
  return themes;
};

export default {
  getDates,
  getThemes,
  getSortBySettings,
  getSortByOptions,
  getOrderOptions,
};
