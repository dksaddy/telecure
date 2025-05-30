import { connectDB } from '@/app/lib/mongodb';
import Medicine from '@/app/models/Medicine';

export async function POST(req) {
  try {
    const { searchTerm } = await req.json();

    if (!searchTerm || typeof searchTerm !== 'string') {
      return Response.json({ message: 'Invalid search term' }, { status: 400 });
    }

    await connectDB();

    const results = await Medicine.find({
      brandName: { $regex: searchTerm, $options: 'i' },
    })
      .limit(10)
      .select('_id brandName dosageForm strength');

    return Response.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
