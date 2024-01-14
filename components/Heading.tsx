interface HeadingProps {
  children: React.ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return <h2 className="mb-4 mt-0">{children}</h2>;
}
