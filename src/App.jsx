// src/App.jsx
import AppPC from "./AppPC";
import AppSP from "./AppSP";

export default function App() {
  const isSP = window.innerWidth <= 820; // ← 必要なら調整

  return isSP ? <AppSP /> : <AppPC />;
}
