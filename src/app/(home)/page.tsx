export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <button className="border border-black px-2 py-2">
        1 WETH -&gt; 1 ETH
      </button>
      <br />
      <button className="border border-black px-2 py-2">
        1 ETH -&gt; 1 WETH
      </button>
    </main>
  );
}
