/**
 * 섹션 라벨은 데스크톱에서 좌측 스파인에 상주한다.
 * 번호(01/02/03)는 쓰지 않는다 — 섹션은 순서가 의미를 갖는 시퀀스가 아니다.
 */
export default function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-rule py-16 sm:py-20">
      <div className="container-x spine">
        <div className="lg:sticky lg:top-20 lg:self-start">
          {eyebrow && <p className="label">{eyebrow}</p>}
        </div>

        <div>
          <h2 className="text-[26px] font-semibold tracking-display sm:text-[30px]">{title}</h2>
          {desc && <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">{desc}</p>}
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
