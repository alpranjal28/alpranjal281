import { MenuItems } from "@/app/models/MenuItems";
import mongoose from "mongoose";

interface menuitems {
  name: string;
  basePrice: number;
  desc: string;
  image: string;
  extraSizes: string[];
}

export async function POST(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const data = await req.json();
  const menuItemDoc = await MenuItems.create(data);
  return Response.json(menuItemDoc);
}

export async function PUT(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const { _id, ...data } = await req.json();
  await MenuItems.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL as string);
  const menuItems = await MenuItems.find();
  return Response.json(menuItems);
}

export async function DELETE(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const { _id } = await req.json();
  await MenuItems.findByIdAndDelete(_id);
  return Response.json(true);
}
