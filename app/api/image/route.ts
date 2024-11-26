import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
  try {
    const { file } = await request.json();

    if (!file) {
      return NextResponse.json(
        {
          message: "File is required"
        },
        {
          status: 400
        });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const folderName = "el_horno_de_la_abuelita_maruja";

    const paramsToSign = `folder=${folderName}&timestamp=${timestamp}&upload_preset=${process.env.CLOUDINARY_UPLOAD_PRESET}&use_filename=true`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
      .digest("hex");

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder:        folderName,
      timestamp,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      signature,
      use_filename:  true,
      api_key:       process.env.CLOUDINARY_API_KEY
    });

    return NextResponse.json({
      url: uploadResponse.secure_url
    }, {
      status: 200
    });

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({
      message: "Image upload failed"
    }, {
      status: 500
    });
  }
}
