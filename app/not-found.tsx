import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="label">404</p>
        <h1 className="mt-4 text-[26px] font-semibold tracking-display">페이지를 찾을 수 없습니다</h1>
        <Link href="/" className="btn-solid mt-7">
          홈으로
        </Link>
      </div>
    </div>
  );
}
