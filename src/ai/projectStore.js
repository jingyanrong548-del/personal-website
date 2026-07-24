/**
 * Local project space — Phase 1 shell (localStorage only).
 * Future: sync to backend / SaaS project API.
 */

const STORAGE_KEY = 'ota-projects-v1';

/**
 * @typedef {object} OtaProject
 * @property {string} id
 * @property {string} name
 * @property {string} updatedAt
 * @property {object} context
 * @property {Array<{ role: string, content: string, at: string }>} messages
 */

export function listProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getProject(id) {
  return listProjects().find((p) => p.id === id) || null;
}

export function createProject(partial = {}) {
  const now = new Date().toISOString();
  const project = {
    id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: partial.name || 'Untitled thermal project',
    updatedAt: now,
    context: {
      sourceTempC: '',
      targetTempC: '',
      heatLoadKw: '',
      refrigerant: '',
      compressor: '',
      hx: '',
      copTarget: '',
      budget: '',
      ...(partial.context || {}),
    },
    messages: partial.messages || [],
  };
  const list = listProjects();
  list.unshift(project);
  saveAll(list);
  return project;
}

export function updateProject(id, patch) {
  const list = listProjects();
  const idx = list.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  list[idx] = {
    ...list[idx],
    ...patch,
    id: list[idx].id,
    updatedAt: new Date().toISOString(),
    context: { ...list[idx].context, ...(patch.context || {}) },
    messages: patch.messages != null ? patch.messages : list[idx].messages,
  };
  saveAll(list);
  return list[idx];
}

export function deleteProject(id) {
  saveAll(listProjects().filter((p) => p.id !== id));
}
