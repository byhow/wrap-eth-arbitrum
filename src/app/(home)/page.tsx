import TokenSwap from "@/components/Swap/Swap";
import WrapEth from "@/components/Swap/WethInput";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <WrapEth />
    </main>
  );
}
