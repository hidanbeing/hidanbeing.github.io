import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="font-mono text-sm text-neutral-400">404</p>
        <h1 className="mt-3 text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
        <Link href="/" className="btn-solid mt-6">홈으로</Link>
      </div>
    </div>
  );
}
