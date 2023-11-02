import clientPromise from "@/app/lib/mongodb";

export default async function sheetsEndpointPatch(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();

  const updateDoc = {};

  const response = await db
    .collection(process.env.DATABASE)
    .update({
      
    })
}