import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req: any) {
  const data = await req.formData();
  if (data.get("file")) {
    //upload the file
    const file = data.get("file");
    const extn = file.name.split(".").slice(-1)[0]; //extension of file
    const newFileName = uniqid() + "." + extn;

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      },
    });

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const bucket = "food-ordering-webapp";

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
        Expires: new Date(Date.now() + 1000 * 60), //expires in 60 seconds
      })
    );
    const link = "https://" + bucket + ".s3.amazonaws.com/" + newFileName;
    return Response.json(link); //this is s3 image link
  }

  return Response.json(true);
}
