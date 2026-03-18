// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';


// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY_ID, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.S3_ACCESS_KEY // Secret access key defined through an environment variable.
    }
});

export function uploadImage(file: File) {
  // Step 3: Define the parameters for the object you want to upload.
  const params: PutObjectCommandInput = {
    Bucket: "kipbite-assets", // The path to the directory you want to upload the object to, starting with your Space name.
    Key: `kipbingo/${file.name}`, // Object key, referenced whenever you want to access this file later.
  Body: file, // The object's contents. This variable is an object, not a string.
    ACL: "public-read", // Defines ACL permissions, such as private or public.
    Metadata: {} // Defines metadata tags.
  };

  console.log(params);
  
  // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
  const uploadObject = async () => {
    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log(
        "Successfully uploaded object: " +
          params.Bucket +
          "/" +
          params.Key
      );
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  
  // Step 5: Call the uploadObject function.
  uploadObject();
}
