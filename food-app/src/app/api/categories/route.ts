import { Category } from "@/app/models/Category";

export async function POST(req: any) {
  const { name } = await req.json();
  const catDoc = await Category.create({ name });
  return Response.json(catDoc);
}

export async function PUT(req: any) {
  const { _id, name } = await req.json();
  await Category.updateOne({_id}, { name });
  return Response.json(true);
}

export async function GET(req: any) {
  const cats = await Category.find();
  return Response.json(cats);
}
