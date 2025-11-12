import React, { useRef, useState, useEffect } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";

export default function SpinWheel() {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [progress, setProgress] = useState(100);

  const rewards = [
    { label: "10% OFF", code: "SAVE10" },
    { label: "50 Coins", code: "COIN50" },
    { label: "Free Shipping", code: "FREESHIP" },
    { label: "Better luck!", code: null },
    { label: "20% OFF", code: "SAVE20" },
    { label: "100 Coins", code: "COIN100" },
    { label: "Gift", code: "GIFTITEM" },
    { label: "5% OFF", code: "SAVE5" },
  ];

  const colors = [
    "#ff3c38", "#ffb142", "#7bed9f", "#70a1ff",
    "#ff6b81", "#feca57", "#1dd1a1", "#54a0ff"
  ];

  const drawWheel = (ctx, rotationDeg = 0) => {
    const size = 350;
    const radius = size / 2;
    const sliceAngle = (2 * Math.PI) / rewards.length;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((rotationDeg * Math.PI) / 180);

    rewards.forEach((reward, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(reward.label, radius - 20, 5);
      ctx.restore();
    });

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    drawWheel(ctx, rotation);
  }, [rotation]);

  const spin = () => {
    if (spinning) return;
    const selectedIndex = Math.floor(Math.random() * rewards.length);
    const sliceAngle = 360 / rewards.length;
    const extraSpins = 6 * 360;
    const targetRotation =
      extraSpins + (360 - selectedIndex * sliceAngle - sliceAngle / 2);

    setSpinning(true);
    setRotation(prev => prev + targetRotation);

    setTimeout(() => {
      setPrize(rewards[selectedIndex]);
      setSpinning(false);
      if (rewards[selectedIndex].code) triggerParticles();
    }, 5000);
  };

  const triggerParticles = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 5000);
  };

  const copyCode = () => {
    if (prize?.code) {
      navigator.clipboard.writeText(prize.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (prize) {
      let timeLeft = 10;
      setProgress(100);
      const interval = setInterval(() => {
        timeLeft -= 1;
        setProgress((timeLeft / 10) * 100);
      }, 1000);

      const timer = setTimeout(() => {
        setShowOverlay(false);
        clearInterval(interval);
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [prize]);

  if (!showOverlay) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      flexDirection: "column",
    }}>
      {/* Close button top-right */}
      <button
        onClick={() => setShowOverlay(false)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: "22px",
          fontWeight: "bold",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          zIndex: 10001
        }}
      >
        ×
      </button>

      <div style={{ position: "relative", width: "350px", height: "350px" }}>
        <canvas
          ref={canvasRef}
          width={350}
          height={350}
          style={{
            borderRadius: "50%",
            border: "6px solid #fff",
            transition: spinning ? "transform 5s cubic-bezier(0.33,1,0.68,1)" : "none",
            transform: `rotate(${rotation}deg)`,
            display: "block",
            margin: "0 auto",
            background: "#222"
          }}
        />
        <div style={{
          position: "absolute",
          top: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderTop: "50px solid #ffdd59",
          zIndex: 10
        }} />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        style={{
          marginTop: "20px",
          padding: "14px 40px",
          fontSize: "22px",
          borderRadius: "50px",
          border: "none",
          background: spinning ? "#aaa" : "#ff4757",
          color: "#fff",
          fontWeight: "bold",
          cursor: spinning ? "not-allowed" : "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5)"
        }}
      >
        {spinning ? "Spinning..." : "SPIN 🎡"}
      </button>

      {prize && !spinning && (
        <div className="sw-popup">
          <div className="sw-popup-inner">
            <div className="sw-reward-icon">🎉</div>
            <h1 className="sw-title">Congratulations!</h1>
            <p className="sw-label">{prize.label}</p>

            {prize.code && (
              <div className="sw-code-box">
                <span>{prize.code}</span>
                <button onClick={copyCode}>
                  {copied ? <FaCheck /> : <FaRegCopy />}
                </button>
              </div>
            )}

            <button
              onClick={() => setShowOverlay(false)}
              style={{
                marginTop: "20px",
                padding: "14px 36px",
                fontSize: "18px",
                borderRadius: "50px",
                border: "none",
                background: "#1dd1a1",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)"
              }}
            >
              Keep Reward 🎁
            </button>

            <div className="sw-progress-bar">
              <div className="sw-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="sw-closing-text">Closing in 10s...</p>
          </div>
        </div>
      )}

      {showParticles && (
        <div className="sw-confetti">
          {Array.from({ length: 150 }).map((_, i) => (
            <span key={i} className="sw-particle">
              {Math.random() > 0.5 ? "★" : "✦"}
            </span>
          ))}
        </div>
      )}

      <style>{`
        .sw-popup { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; animation: sw-fadeBounce 0.7s ease; }
        .sw-popup-inner { background: rgba(255,255,255,0.1); backdrop-filter: blur(18px); border-radius: 32px; padding: 70px 90px; text-align: center; color: #fff; box-shadow: 0 15px 50px rgba(0,0,0,0.7); border: 4px solid; border-image: linear-gradient(45deg,#ffdd59,#ff6b81,#70a1ff) 1; min-width: 520px; }
        .sw-reward-icon { font-size: 90px; margin-bottom: 25px; animation: sw-bounce 1s infinite; }
        .sw-title { font-size: 38px; margin: 0 0 18px; color: #ffdd59; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }
        .sw-label { font-size: 28px; font-weight: bold; margin-bottom: 28px; }
        .sw-code-box { display: flex; justify-content: center; align-items: center; gap: 16px; background: rgba(255,255,255,0.2); padding: 18px 26px; border-radius: 64px; margin: 22px auto; width: fit-content; }
        .sw-code-box span { font-size: 22px; font-weight: bold; color: #fff; letter-spacing: 2px; }
        .sw-code-box button { background: #1e90ff; color: #fff; border: none; padding: 10px 12px; border-radius: 50%; cursor: pointer; font-size: 20px; }
        .sw-progress-bar { width: 100%; height: 10px; background: rgba(255,255,255,0.2); border-radius: 5px; margin-top: 22px; overflow: hidden; }
        .sw-progress-fill { height: 100%; background: linear-gradient(90deg,#ffdd59,#ff6b81); transition: width 1s linear; }
        .sw-closing-text { font-size: 16px; margin-top: 12px; opacity: 0.85; }
        @keyframes sw-fadeBounce { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; } 60% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); } }
        @keyframes sw-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .sw-confetti { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20000; }
        .sw-particle { position: absolute; top: -20px; font-size: ${Math.random()*14+12}px; color: hsl(${Math.random()*360},70%,55%); animation: sw-fall ${Math.random()*3+3}s linear forwards; left: ${Math.random()*100}vw; }
        @keyframes sw-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      `}</style>
    </div>
  );
}
