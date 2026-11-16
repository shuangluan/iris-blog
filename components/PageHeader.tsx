export default function PageHeader({
  title,
  children
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <h1 className="page-title">{title}</h1>
      {children}
    </header>
  );
}
