/** @jsxImportSource @ox-content/vite-plugin */
export function TcyDate({ value }: { value: string }) {
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) {
    return <span class="tcy">{value}</span>;
  }
  return (
    <>
      <span class="tcy">{year}</span>-<span class="tcy">{month}</span>-
      <span class="tcy">{day}</span>
    </>
  );
}
