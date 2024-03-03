import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";

export async function PUT(req: any) {
  mongoose.connect(process.env.MONGO_URL as string);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const {name,image,...otherUserInfo}= data
  await User.updateOne({ email }, {name,image});
  await UserInfo.findOneAndUpdate({ email }, otherUserInfo, {upsert:true});

  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL as string);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }

  const user = await User.findOne({ email }).lean() as string[];
  const userInfo = await UserInfo.findOne({ email }).lean() as string[];
  
  return Response.json({...user,...userInfo});
}
