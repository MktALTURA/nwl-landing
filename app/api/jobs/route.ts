import { NextRequest, NextResponse } from 'next/server';
import { getActiveJobs, getAllJobs, createJob } from '@/lib/db/jobs';
import { getSession } from '@/lib/auth';
import { jobListingSchema } from '@/lib/validations/jobs';

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get('all') === 'true';

  // Only allow fetching all (including inactive) if authenticated
  if (showAll) {
    const authenticated = await getSession();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const jobs = await getAllJobs();
    return NextResponse.json(jobs);
  }

  const jobs = await getActiveJobs();
  return NextResponse.json(jobs, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
    },
  });
}

export async function POST(request: NextRequest) {
  const authenticated = await getSession();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const parsed = jobListingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 });
  }

  const job = await createJob(parsed.data);
  return NextResponse.json(job, { status: 201 });
}
