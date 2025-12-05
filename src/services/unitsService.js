// 책임: /api/angels, /api/devils, /api/buildings 를 모두 호출해서
// 하나의 "units" 배열로 합쳐 반환 (프론트에서 사용하기 쉬운 형태로 정규화)

async function fetchJsonIfOk(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('Network error fetching', path, e);
    return null;
  }
}


function normalizeUnit(raw) {
  if (!raw) return null;
  return {
    id: raw.id ?? raw._id ?? raw._id?.$oid ?? '',
    category: raw.category ?? raw.Category ?? '',
    classification: raw.classification ?? raw.Classification ?? raw.class ?? '',
    hierarchy: raw.hierarchy ?? raw.Hierarchy ?? '',
    name: raw.name ?? raw.Name ?? '',
    nickname: raw.nickname ?? raw.Nickname ?? '',
    type: raw.type ?? raw.Type ?? '',
    damage: raw.damage ?? raw.Damage ?? '',
    range: raw.range ?? raw.Range ?? null,
    speedOfAttack: raw.speedOfAttack ?? raw.Speed_of_Attack ?? raw.SpeedOfAttack ?? null,
    description: raw.description ?? raw.Description ?? '',
    health: raw.health ?? raw.Health ?? null,
    health2: raw.health2 ?? raw.Health2 ?? null,
    shield: raw.shield ?? raw.Shield ?? null,
    reward: raw.reward ?? raw.Reward ?? null,
    imageUrl: raw.imageUrl ?? raw.image_url ?? null // 백엔드가 내려주면 우선 사용
  };
}


export async function loadAllUnits() {
  const [angels, devils, buildings] = await Promise.all([
    fetchJsonIfOk('/api/angels'),
    fetchJsonIfOk('/api/devils'),
    fetchJsonIfOk('/api/buildings')
  ]);

  const all = [];
  if (Array.isArray(angels)) all.push(...angels.map(normalizeUnit));
  if (Array.isArray(devils)) all.push(...devils.map(normalizeUnit));
  if (Array.isArray(buildings)) all.push(...buildings.map(normalizeUnit));
  return all;
}
