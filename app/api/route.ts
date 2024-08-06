export async function POST(request: NextRequest) {
  const data = await request.json();
  return Response.json(data);
}
