import { createWorld, applyAction, worldInvariants, formatRs, planFeasibility, monthlyMaterialNeeds, SUPPLIERS, landedQuote } from '../engine/index';
let n = 0;
const act = (w: any, type: string, payload: any, companyId?: string) => {
  const r = applyAction(w, { type, payload, companyId }, { actionId: `A${++n}` });
  return r;
};
for (const industry of ['electronics', 'ev', 'food'] as const) {
  const w = createWorld({ name: 'Smoke', seed: 42 });
  const prods = { electronics: ['phone_a1', 'earbuds'], ev: ['scooter_s1', 'ebike_city'], food: ['koozh_classic', 'meal_bowl'] }[industry];
  const r = act(w, 'create_company', { name: 'Test Co', brand: 'Testo', industry, city: 'Chennai', strategy: 'focus', founderName: 'F', founderCapital: 30_00_00_000 * 100, openingLoan: 0, factoryMode: 'build', warehouseMode: 'lease', rndLab: true, products: prods });
  const cid = (r.data as any).companyId;
  const c = w.companies[0];
  for (let m = 0; m < 12; m++) {
    // plan at 70% of line capacity, buy materials for the plan from cheapest qualified supplier
    for (const line of c.lines) line.plannedUnits = Math.round(line.capacity * 0.7);
    const needs = monthlyMaterialNeeds(c);
    for (const line of c.lines) line.plannedUnits = 0;
    for (const [mat, need] of Object.entries(needs)) {
      const have = (c.rawInventory[mat]?.qty ?? 0) + c.purchaseOrders.filter((p) => p.materialId === mat && (p.status === 'in_transit' || p.status === 'delayed')).reduce((a, p) => a + p.qty, 0);
      const qty = Math.max(0, need * 2 - have);
      if (qty <= 0) continue;
      const sup = c.qualifiedSuppliers.map((q) => q.supplierId).filter((s) => SUPPLIERS[s].materials.includes(mat)).sort((a, b) => landedQuote(w, c, a, mat, 1000).total - landedQuote(w, c, b, mat, 1000).total);
      for (const s of sup) { try { act(w, 'place_po', { supplierId: s, materialId: mat, qty: Math.min(qty, SUPPLIERS[s].capacityPerMonth) }, cid); break; } catch (e: any) { if (m < 1) console.log('  po fail', mat, s, e.message); } }
    }
    for (const f of planFeasibility(w, c)) {
      const line = c.lines.find((l) => l.id === f.lineId)!;
      try { act(w, 'set_production_plan', { lineId: line.id, plannedUnits: Math.min(Math.round(line.capacity * 0.7), f.maxFeasible) }, cid); } catch (e: any) { console.log('  plan fail', e.message); }
    }
    act(w, 'advance_month', { expectedTick: w.tick });
    const inv = worldInvariants(w);
    if (!inv.ok) { console.log('INVARIANT FAIL', industry, m, inv.failures.map((f) => `${f.check.label} exp=${f.check.expected} act=${f.check.actual}`)); break; }
  }
  console.log(`\n== ${industry}: lifecycle ${c.lifecycle}`);
  for (const h of c.history) console.log(`t${h.tick} rev ${formatRs(h.revenue)} gp ${formatRs(h.grossProfit)} ni ${formatRs(h.netIncome)} cash ${formatRs(h.cash)} prod ${h.unitsProduced} sold ${h.unitsSold} share ${(h.marketShare*100).toFixed(1)}% aw ${h.awareness}`);
  console.log('events', w.events.map((e) => `${e.tick}:${e.title}`).join(' | '));
}
