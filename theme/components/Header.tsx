/** @jsxImportSource @ox-content/vite-plugin */
type HeaderProps = {
  actions?: unknown;
};

export function Header({ actions }: HeaderProps) {
  return (
    <header class="site-header">
      <div class="site-header-brand">
        <svg
          width="48"
          height="48"
          viewBox="0 0 246 242"
          role="img"
          aria-label="yamanoku logo"
        >
          <path
            class="site-logo"
            fill-rule="evenodd"
            d="M64,67v54l82,82-46,46v60h56L310,155V96H230l-21,20L160,67H64ZM176,203l-45,46h25L293,113H230l-39,39-31-31H94Z"
            transform="translate(-64 -67)"
          ></path>
        </svg>
        <span>アーカイブ</span>
      </div>
      {actions}
    </header>
  );
}
