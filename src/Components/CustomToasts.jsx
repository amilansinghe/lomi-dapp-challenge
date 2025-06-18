export function NoMetamaskToast() {
  return (
    <div
      className="flex flex-col gap-3 p-6 rounded-[2rem] shadow-2xl border-2"
      style={{
        background: "rgba(25, 34, 44, 0.97)", // deep dark with a touch of green for your vibe
        minWidth: 320,
        maxWidth: 390,
        color: "#fff",
        fontFamily: "inherit",
        borderColor: "#7ff15a", // Your bright green!
        boxShadow: "0 6px 32px 0 rgba(127,241,90,0.21)",
        marginTop: 16,
      }}
    >
      <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>
        🦊{" "}
        <span style={{ color: "#7ff15a" }}>
          No <span style={{ color: "#ffae35" }}>MetaMask</span>
        </span>{" "}
        <span style={{ color: "#fff" }}>detected</span>
      </span>
      <span style={{ color: "#bfffd9", fontSize: "1rem", fontWeight: 500 }}>
        Please install MetaMask to continue.
      </span>
      <a
        href="https://metamask.io/download.html"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 px-6 py-3 rounded-full font-bold text-lg text-center transition-colors"
        style={{
          background: "linear-gradient(90deg,#7ff15a 60%,#7beb43 100%)",
          color: "#162314",
          width: "fit-content",
          alignSelf: "center",
          textDecoration: "none",
          boxShadow: "0 3px 8px 0 rgba(127,241,90,0.13)",
          marginTop: 12,
        }}
      >
        Install MetaMask
      </a>
    </div>
  );
}
