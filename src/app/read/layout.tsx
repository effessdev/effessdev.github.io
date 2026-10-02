export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 mt-10 xl:mt-0">{children}</div>
  );
}
