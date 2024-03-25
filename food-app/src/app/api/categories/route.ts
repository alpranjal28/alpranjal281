import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const { name } = await req.json();
  const catDoc = await Category.create({ name });
  return Response.json(catDoc);
}

export async function PUT(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}

export async function GET(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const cats = await Category.find();
  return Response.json(cats);
}

export async function DELETE(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const { _id } = await req.json();
  await Category.deleteOne({ _id });
  return Response.json(true);
}
