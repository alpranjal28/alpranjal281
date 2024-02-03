import { StaticImageData } from "next/image";

import photo1 from "./photos/1.webp";
import photo2 from "./photos/2.webp";
import photo3 from "./photos/3.webp";
import photo4 from "./photos/4.webp";
import photo5 from "./photos/5.webp";
import photo6 from "./photos/6.webp";
import photo7 from "./photos/7.webp";

export type WonderImage = {
    id: string;
    name: string;
    src: StaticImageData;
    description: string;
    location: string;
};

const wondersImages: WonderImage[] = [
    {
        id: "1",
        name: "Great Wall of China",
        src: photo1,
        description:
            "The Great Wall of China is a series of fortifications built across the northern borders of China.",
        location: "China",
    },
    {
        id: "2",
        name: "Chichén Itzá",
        src: photo2,
        description:
            "Chichén Itzá is a mountain range in the Andes mountains in Mexico.",
        location: "Mexico",
    },
    {
        id: "3",
        name: "Petra",
        src: photo3,
        description: "Petra is a famous rock formation in Jordan.",
        location: "Jordan",
    },
    {
        id: "4",
        name: "Machu Picchu",
        src: photo4,
        description: "Machu Picchu is a famous rock formation in Peru.",
        location: "Peru",
    },
    {
        id: "5",
        name: "Christ the Redeemer",
        src: photo5,
        description: "Christ the Redeemer is a famous statue in Jerusalem.",
        location: "Israel",
    },
    {
        id: "6",
        name: "Colosseum",
        src: photo6,
        description:
            "Colosseum of Rome built in first century was capable of holding 50000 spectators.",
        location: "Italy",
    },
    {
        id: "7",
        name: "Taj Mahal",
        src: photo7,
        description: "Taj Mahal is a famous mausoleum in India.",
        location: "India",
    },
];

export default wondersImages;