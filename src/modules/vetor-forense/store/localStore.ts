/**
 * Vetor Forense — Persistência Local (localStorage)
 */

import type { ForensicAnalysis } from '../types/analysis';

const STORAGE_KEY = 'vetor-forense-analyses';

export function loadAnalyses(): ForensicAnalysis[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ForensicAnalysis[];
  } catch {
    return [];
  }
}

export function saveAnalysis(analysis: ForensicAnalysis): void {
  const all = loadAnalyses();
  const idx = all.findIndex(a => a.id === analysis.id);
  if (idx >= 0) {
    all[idx] = { ...analysis, updatedAt: new Date().toISOString() };
  } else {
    all.unshift(analysis);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteAnalysis(id: string): void {
  const all = loadAnalyses().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function duplicateAnalysis(id: string): ForensicAnalysis | null {
  const all = loadAnalyses();
  const original = all.find(a => a.id === id);
  if (!original) return null;
  const now = new Date().toISOString();
  const copy: ForensicAnalysis = {
    ...original,
    id: crypto.randomUUID(),
    title: `${original.title} (cópia)`,
    createdAt: now,
    updatedAt: now,
  };
  all.unshift(copy);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return copy;
}

export function exportAnalysisJSON(analysis: ForensicAnalysis): void {
  const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vetor-forense-${analysis.id.slice(0, 8)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
