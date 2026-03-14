import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import type { JobListing, JobListingFormData } from '@/types/jobs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const JOBS_SET_KEY = 'jobs:all';
const jobKey = (id: string) => `jobs:${id}`;

export async function getAllJobs(): Promise<JobListing[]> {
  const ids = await redis.smembers(JOBS_SET_KEY);
  if (!ids.length) return [];

  const pipeline = redis.pipeline();
  for (const id of ids) {
    pipeline.get(jobKey(id));
  }
  const results = await pipeline.exec<(JobListing | null)[]>();

  return results
    .filter((j): j is JobListing => j !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getActiveJobs(): Promise<JobListing[]> {
  const all = await getAllJobs();
  return all.filter((j) => j.isActive);
}

export async function getJobById(id: string): Promise<JobListing | null> {
  return redis.get<JobListing>(jobKey(id));
}

export async function createJob(data: JobListingFormData): Promise<JobListing> {
  const id = nanoid(12);
  const now = new Date().toISOString();
  const job: JobListing = { ...data, id, createdAt: now, updatedAt: now };

  const pipeline = redis.pipeline();
  pipeline.set(jobKey(id), job);
  pipeline.sadd(JOBS_SET_KEY, id);
  await pipeline.exec();

  return job;
}

export async function updateJob(id: string, data: Partial<JobListingFormData>): Promise<JobListing | null> {
  const existing = await getJobById(id);
  if (!existing) return null;

  const updated: JobListing = {
    ...existing,
    ...data,
    id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(jobKey(id), updated);
  return updated;
}

export async function deleteJob(id: string): Promise<boolean> {
  const pipeline = redis.pipeline();
  pipeline.del(jobKey(id));
  pipeline.srem(JOBS_SET_KEY, id);
  await pipeline.exec();
  return true;
}
