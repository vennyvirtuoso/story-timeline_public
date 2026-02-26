const styles = `
  @keyframes float {
    0% { transform: translateY(0) scale(0.5); opacity: 0; }
    20% { opacity: 0.4; }
    50% { transform: translateY(-100px) scale(1.1); opacity: 0.7; }
    100% { transform: translateY(-200px) scale(0.8); opacity: 0; }
  }
  .floating-heart { position: fixed; bottom: -10vh; animation: float linear infinite; pointer-events: none; z-index: 0; }
  @keyframes fadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
  .animate-fadeIn { animation: fadeIn 0.25s ease; }
  @keyframes bounceSlow { 0%,100% { transform:translateY(-4px); } 50% { transform:translateY(0); } }
  .animate-bounce-slow { animation: bounceSlow 2s infinite; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 99px; }
`;

export default styles;