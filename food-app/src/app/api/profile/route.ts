import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req: any) {
  try{

    mongoose.connect(process.env.MONGO_URL as string);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    
    const update: any = {};
    if (data.name) {
      //update userName
      update.name = data.name;
      
    }
    if (data.image) {
      //update userImage
      update.image = data.image;
      console.log(update);
    }
    if (Object.keys(update).length > 0) {
      await User.updateOne({ email }, update);
    }
    
    return Response.json(true);
  }catch(e){
    console.log("profileRoute",e);
  }
}
