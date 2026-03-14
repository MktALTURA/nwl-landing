'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut } from 'react-icons/fi';
import type { JobListing } from '@/types/jobs';

export default function AdminJobsPage() {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      // Fetch all jobs (not just active) via a query param
      const res = await fetch('/api/jobs?all=true');
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleToggleActive = async (job: JobListing) => {
    await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !job.isActive }),
    });
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.admin.deleteConfirm)) return;
    setDeleting(id);
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    setDeleting(null);
    fetchJobs();
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const campusLabel = (campus: string) => t.admin.campusLabels[campus] || campus;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img src="/images/brand/nwl-logo-wine.png" alt="NWL" className="h-10 w-auto" />
          <h1 className="text-2xl font-display font-bold">{t.admin.dashboardTitle}</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/admin/jobs/new')}
            className="flex items-center gap-2 px-4 py-2 bg-wine text-white rounded-xl hover:bg-wine/90 transition-colors text-sm font-medium"
          >
            <FiPlus size={16} />
            {t.admin.newJobButton}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-sm"
          >
            <FiLogOut size={16} />
            {t.admin.logoutButton}
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 text-charcoal/50">
          <p className="text-lg">{t.admin.noJobs}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-sm font-medium text-charcoal/60">{t.admin.tableTitle}</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-charcoal/60">{t.admin.tableCampus}</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-charcoal/60">{t.admin.tableStatus}</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-charcoal/60">{t.admin.tableCreated}</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-charcoal/60">{t.admin.tableActions}</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium">{job.title[locale]}</span>
                    {job.department?.[locale] && (
                      <span className="block text-sm text-charcoal/50">{job.department[locale]}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">{campusLabel(job.campus)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(job)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        job.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {job.isActive ? t.admin.statusActive : t.admin.statusInactive}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/50">
                    {new Date(job.createdAt).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/jobs/${job.id}/edit`)}
                        className="p-2 text-charcoal/50 hover:text-wine hover:bg-wine/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deleting === job.id}
                        className="p-2 text-charcoal/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
