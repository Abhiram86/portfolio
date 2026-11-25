import KineticDossier from "./variants/KineticDossier";
import MidnightAzure from "./variants/MidnightAzure";

function App() {
  const params = new URLSearchParams(window.location.search);
  const v = params.get("v");

  if (v === "midnight") {
    return <MidnightAzure />;
  }

  return <KineticDossier />;
}

export default App;
