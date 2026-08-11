// Legacy Y2K blinker — kept as a soft pulse in case any page still imports it.
export default function BlinkText({ children }: { children: React.ReactNode }) {
  return <span className="opacity-80">{children}</span>;
}
