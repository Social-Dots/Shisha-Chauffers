/**
 * Calm, premium shisha smoke for the hero.
 *
 * Previously this rendered 16 static particles + 3 dense layers + a constant
 * requestAnimationFrame mouse-trail loop. That hurt scroll/battery performance
 * and read as gimmicky. It's now a restrained ~6-particle rising plume, pure CSS,
 * with no JS animation loop. Honors prefers-reduced-motion via the CSS in index.css.
 */
export function EnhancedShishaSmoke({ className = "" }: { className?: string }) {
  // A few particles rising from the shisha source point. Spread + delays are
  // hardcoded (not random) so the plume looks intentional and consistent.
  const particles = [
    { cls: "smoke-1", left: -10, top: 0 },
    { cls: "smoke-3", left: 18, top: -8 },
    { cls: "smoke-5", left: -4, top: 12 },
    { cls: "smoke-10", left: 26, top: 6 },
    { cls: "smoke-14", left: 8, top: -4 },
    { cls: "smoke-dense smoke-dense-1", left: 4, top: 8 },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div style={{ position: "absolute", left: "62%", top: "48%" }}>
        {particles.map((p) => (
          <div
            key={p.cls}
            className={`smoke-particle ${p.cls}`}
            style={{ left: `${p.left}px`, top: `${p.top}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default EnhancedShishaSmoke;
