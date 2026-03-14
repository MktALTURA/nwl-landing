'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { JobListing, Campus } from '@/types/jobs';

interface JobFormProps {
  initialData?: JobListing;
}

const CAMPUS_OPTIONS: Campus[] = ['all', 'juriquilla', 'milenio', 'san-miguel', 'corregidora', 'zibata'];

export default function JobForm({ initialData }: JobFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    titleEn: initialData?.title.en ?? '',
    titleEs: initialData?.title.es ?? '',
    campus: initialData?.campus ?? ('all' as Campus),
    descriptionEn: initialData?.description.en ?? '',
    descriptionEs: initialData?.description.es ?? '',
    requirementsEn: initialData?.requirements.en ?? '',
    requirementsEs: initialData?.requirements.es ?? '',
    departmentEn: initialData?.department?.en ?? '',
    departmentEs: initialData?.department?.es ?? '',
    isActive: initialData?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      title: { en: form.titleEn, es: form.titleEs },
      campus: form.campus,
      description: { en: form.descriptionEn, es: form.descriptionEs },
      requirements: { en: form.requirementsEn, es: form.requirementsEs },
      ...(form.departmentEn || form.departmentEs
        ? { department: { en: form.departmentEn, es: form.departmentEs } }
        : {}),
      isActive: form.isActive,
    };

    try {
      const url = isEditing ? `/api/jobs/${initialData.id}` : '/api/jobs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/jobs');
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Connection error');
    }

    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <img src="/images/brand/nwl-logo-wine.png" alt="NWL" className="h-10 w-auto" />
        <h1 className="text-2xl font-display font-bold">
          {isEditing ? t.admin.formEditTitle : t.admin.formCreateTitle}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-gray-200 p-6">
        {/* Title */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formTitleEs}</label>
            <input
              type="text"
              value={form.titleEs}
              onChange={(e) => handleChange('titleEs', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formTitleEn}</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => handleChange('titleEn', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors"
              required
            />
          </div>
        </div>

        {/* Campus + Active */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formCampus}</label>
            <select
              value={form.campus}
              onChange={(e) => handleChange('campus', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors bg-white"
            >
              {CAMPUS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {t.admin.campusLabels[c]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => handleChange('isActive', !form.isActive)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  form.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    form.isActive ? 'translate-x-6' : ''
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-charcoal/70">{t.admin.formActive}</span>
            </label>
          </div>
        </div>

        {/* Department (optional) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formDepartmentEs}</label>
            <input
              type="text"
              value={form.departmentEs}
              onChange={(e) => handleChange('departmentEs', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formDepartmentEn}</label>
            <input
              type="text"
              value={form.departmentEn}
              onChange={(e) => handleChange('departmentEn', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formDescriptionEs}</label>
            <textarea
              value={form.descriptionEs}
              onChange={(e) => handleChange('descriptionEs', e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formDescriptionEn}</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => handleChange('descriptionEn', e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors resize-none"
              required
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formRequirementsEs}</label>
            <textarea
              value={form.requirementsEs}
              onChange={(e) => handleChange('requirementsEs', e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">{t.admin.formRequirementsEn}</label>
            <textarea
              value={form.requirementsEn}
              onChange={(e) => handleChange('requirementsEn', e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors resize-none"
              required
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.push('/admin/jobs')}
            className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            {t.admin.formCancel}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-wine text-white rounded-xl hover:bg-wine/90 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            {saving ? t.admin.formSaving : t.admin.formSave}
          </button>
        </div>
      </form>
    </div>
  );
}
