import { lazy, Suspense } from "react";
import KineticDossier from "./variants/KineticDossier";

const MidnightAzure = lazy(() => import("./variants/MidnightAzure"));

function App() {
  const params = new URLSearchParams(window.location.search);
  const v = params.get("v");

  if (v === "midnight") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#030712]" />}>
        <MidnightAzure />
      </Suspense>
    );
  }

  return <KineticDossier />;
}

export default App;
