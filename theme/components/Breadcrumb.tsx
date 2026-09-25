/** @jsxImportSource @ox-content/vite-plugin */
type BreadcrumbProps = {
  current: string;
};

export function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <nav class="breadcrumbs" aria-label="パンくずリスト">
      <a href="/">トップ</a>
      <span aria-hidden="true">&gt;</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
