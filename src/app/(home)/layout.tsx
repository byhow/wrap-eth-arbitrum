import ConnectWalletButton from "@/components/Button/ConnectWallet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col text-[15px] leading-[18px] md:px-20 md:py-2">
      <header className="flex items-center justify-end gap-2 bg-emerald-300 px-1 py-2 pr-2 text-sm md:py-1">
        <div className="flex min-w-[30%] flex-col items-end md:min-w-[inherit] md:flex-row md:items-center my-2 mr-2">
          <ConnectWalletButton label="Connect" />
        </div>
      </header>

      <main className="bg-white dark:bg-slate-800 px-1 py-4 md:px-2">
        {children}
      </main>
    </div>
  );
}
