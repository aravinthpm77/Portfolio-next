import type { NextApiRequest, NextApiResponse } from "next";

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}

const result: Ireply[] = [
  {
    id: 0,
    name: "Rahul N",
    userName: "@rahulnair",
    reply: "Really liked your portfolio! The UI is clean and easy to use.",
  },
  {
    id: 1,
    name: "Priya Ramesh",
    userName: "@priyaramesh",
    reply: "Your video editing skills are impressive",
  },
  {
    id: 2,
    name: "Desperado2022",
    userName: "@desperado2022",
    reply: "The video edits are super smooth",
  },
  {
    id: 3,
    name: "Snehal Rao",
    userName: "@snehalr",
    reply: "His work looks professional and creative",
  },
  {
    id: 4,
    name: "Danny Devito L",
    userName: "@dannydevitol",
    reply: "Good designer and also a enthusiastic developer.",
  },
  {
    id: 5,
    name: "Anjali",
    userName: "@anjaliravi",
    reply: "The Payment gateway API is simple effective.",
  },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: result,
  });
}
