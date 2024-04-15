import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";

export async function PUT(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const data = await req.json();
  // const session = await getServerSession(authOptions);
  // const email = session?.user?.email;

  const { _id, name, image, ...otherUserInfo } = data;
  console.log({ _id });

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email };
  }
  const user = await User.findOne(filter);
  await User.updateOne(filter, { name, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });
  return Response.json(true);
}

export async function GET(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }
  const user: any = (await User.findOne(filterUser).lean()) as string[];
  const userInfo = (await UserInfo.findOne({
    email: user?.email,
  }).lean()) as string[];
  return Response.json({ ...user, ...userInfo });
}
