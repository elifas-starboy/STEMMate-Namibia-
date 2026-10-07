// MOCK DATABASE: the list of STEM activities.
// To add an activity, copy one object, give it a NEW unique id and fill in the fields.
// - subject  must be one of SUBJECTS
// - duration must be one of DURATIONS (minutes)
// - level    must be one of LEVELS
// - resources: use names from MATERIALS so the "Material I have" filter finds it
export const SUBJECTS = ["Science", "Maths", "Engineering", "Technology"];
export const DURATIONS = [20, 30, 45, 60];
export const LEVELS = ["Grade 4", "Grade 6", "Grade 8"];
export const MATERIALS = ["Bottles", "Paper", "Cardboard", "Sand", "Tape", "Foil", "Vinegar"];

export const activities = [
  {
    id: 1,
    title: "Bottle Rocket Launch",
    subject: "Science",
    duration: 30,
    level: "Grade 8",
    resources: ["Bottles", "Vinegar"],
    description: "Learners launch a bottle rocket using a vinegar and baking soda reaction.",
  },
  {
    id: 2,
    title: "Paper Bridge Challenge",
    subject: "Engineering",
    duration: 30,
    level: "Grade 8",
    resources: ["Paper", "Tape"],
    description: "Groups build a paper bridge and test how many coins it holds.",
  },
  {
    id: 3,
    title: "Simple Water Filter",
    subject: "Science",
    duration: 45,
    level: "Grade 6",
    resources: ["Bottles", "Sand"],
    description: "Build a filter from a cut bottle, sand and gravel.",
  },
  {
    id: 4,
    title: "Shape Hunt",
    subject: "Maths",
    duration: 20,
    level: "Grade 4",
    resources: ["Paper"],
    description: "Find and sort shapes around the room.",
  },
  {
    id: 5,
    title: "Solar Oven",
    subject: "Technology",
    duration: 60,
    level: "Grade 8",
    resources: ["Cardboard", "Foil"],
    description: "Build a box oven to warm food using sunlight.",
  },
  {
    id: 6,
    title: "Rainfall Graphs",
    subject: "Maths",
    duration: 30,
    level: "Grade 8",
    resources: ["Paper"],
    description: "Draw a bar graph from synthetic rainfall data.",
  },
];
