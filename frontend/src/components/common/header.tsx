export function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        ☰
      </button>
      <div className="hidden lg:block">
        <p className="text-sm font-semibold text-slate-800">
          Motorcycle Shop Management
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
          A
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-bold text-slate-800">Admin</p>
          <p className="text-[11px] text-slate-400">Administrator</p>
        </div>
      </div>
    </header>
  );
}
