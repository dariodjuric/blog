import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h2>Oops, page not found</h2>
      <p>
        The page you are looking for does not exist. Feel free to{' '}
        <Link href="/">return to the home page</Link> to find other content.
      </p>
      <p>
        How did you arrive here, anyway?{' '}
        <Link href="/contact">Please let me know</Link>!
      </p>
    </>
  );
}
