import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import PrizeModal from './PrizeModal';
import './App.css';

const data = [
  { option: 'Free Coffee' },
  { option: '₹50 Coupon' },
  { option: '10% Off' },
  { option: 'Buy 1 Get 1 Free' },
  { option: 'Free Earpods' }
];

/* Google‑Form pre‑fill base (keep the “=” at the end) */
const FORM_PREFILL_BASE =
  'https://docs.google.com/forms/d/e/1FAIpQLSfnLxuHqkZ766WjisV7d5L6brHhXLmN43haxDOzQ-aSdkW9pw/viewform?usp=pp_url&entry.1920605478=';

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const idx = Math.floor(Math.random() * data.length);
      setPrizeNumber(idx);
      setMustSpin(true);
    }
  };

  const handleStop = () => {
    setMustSpin(false);
    setShowModal(true);        // open popup
  };

  const prize = data[prizeNumber].option;

  /* redirect to the Google Form with prize pre‑filled */
  const handleClaim = () => {
    const url = FORM_PREFILL_BASE + encodeURIComponent(prize);
    window.location.href = url;   // same‑tab redirect
  };

  return (
    <main className="app">
      <h1 className="title">🎉 Spin & Win 🎉</h1>

      {/* wheel + custom arrow pointer */}
      <div className="wheel-wrapper">
        <div className="pointer" />
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#7bdff2', '#b2f7ef', '#eff7f6', '#f7d6e0', '#f5b0cb']}
          textColors={['#000']}
          outerBorderColor="#4a4747"
          outerBorderWidth={3}
          innerBorderColor="#4a4747"
          innerBorderWidth={6}
          radiusLineColor="#4a4747"
          radiusLineWidth={2}
          spinDuration={0.6}  // hide red nib; using CSS arrow
          onStopSpinning={handleStop}
        />
      </div>

      <button
        className="spin-btn"
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {mustSpin ? 'Spinning…' : 'Tap to Spin'}
      </button>

      {/* popup */}
      {showModal && (
        <PrizeModal
          prize={prize}
          // onClose={() => setShowModal(false)}
          onClaim={handleClaim}
        />
      )}
    </main>
  );
}
