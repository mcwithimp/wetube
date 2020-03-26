import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB!");
const handleError = err => console.log(`❗  Error on DB Connection: ${err}`);

db.once("open", handleOpen);
db.once("error", handleError);

const sampleVideos = [
  {
    id: 1,
    title: "Night of the Living Dead",
    description: "This is something I love",
    views: 675843,
    videoFile:
      "https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4",
    creator: {
      id: 1,
      name: "George A. Romero",
      email: "romero@gmail.com"
    }
  },
  {
    id: 2,
    title: "Cosmos: War of the Planets",
    description: "This is something I love",
    views: 2324,
    videoFile:
      "https://archive.org/download/Cosmos_War_of_the_Planets/Cosmos_War_of_the_Planets_512kb.mp4",
    creator: {
      id: 2,
      name: "Alfonso Brescia",
      email: "brescia@gmail.com"
    }
  },
  {
    id: 3,
    title: "Invasion of the Bee girls",
    description: "This is something I love",
    views: 23524,
    videoFile:
      "https://archive.org/download/InvasionOfTheBeeGirls/InvasionOfTheBeeGirls_512kb.mp4",
    creator: {
      id: 3,
      name: "kjessec",
      email: "kjessec@gmail.com"
    }
  },
  {
    id: 4,
    title: "The Child Molester",
    description: "This is something I love",
    views: 2265624,
    videoFile: "https://archive.org/download/CHILD/CHILD_512kb.mp4",
    creator: {
      id: 4,
      name: "mcwithimp",
      email: "mcwithimp@gmail.com"
    }
  },
  {
    id: 5,
    title: "Lady Frankenstein",
    description: "This is something I love",
    views: 2114,
    videoFile:
      "https://archive.org/download/Lady_Frankenstein/Lady_Frankenstein_512kb.mp4",
    creator: {
      id: 5,
      name: "Mel Welles",
      email: "welles@gmail.com"
    }
  },
  {
    id: 6,
    title: "Plan 9 from Outer Space",
    description: "This is something I love",
    views: 5321124,
    videoFile:
      "https://archive.org/download/Plan_9_from_Outer_Space_1959/Plan_9_from_Outer_Space_1959_512kb.mp4",
    creator: {
      id: 6,
      name: "Edward D. Wood Jr.",
      email: "edward@gmail.com"
    }
  }
];
