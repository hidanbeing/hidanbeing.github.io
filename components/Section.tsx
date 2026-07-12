export default function Section({
  id, eyebrow, title, desc, children,
}: {
  id?: string; eyebrow?: string; title: string; desc?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-neutral-200 py-16 dark:border-neutral-800 sm:py-20">
      <div className="container-x">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {desc && <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">{desc}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
