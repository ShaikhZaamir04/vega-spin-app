import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { v4 as uuidv4 } from 'uuid';           // ✨ NEW
import PrizeModal from './PrizeModal';
import './App.css';

const data = [
  { option: 'Free Coffee' },
  { option: '₹50 Coupon' },
  { option: '10% Off' },
  { option: 'Buy 1 Get 1 Free' },
  { option: 'Free Earpods' }
];

/* --- Google Form pre‑fill pieces --- */
const FORM_BASE =
  'https://docs.google.com/forms/d/e/1FAIpQLSdvgd1Ee2Hgrlt3uuJ4P8HwY_v8peSggcsqYHhsogeSz_fVuA/viewform?usp=pp_url';
const UID_ENTRY = 'entry.300989821';   // UID field ID
const PRIZE_ENTRY = 'entry.1219197929';  // Prize field ID
/* ----------------------------------- */

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      setPrizeNumber(Math.floor(Math.random() * data.length));
      setMustSpin(true);
    }
  };

  const handleStop = () => {
    setMustSpin(false);
    setShowModal(true);
  };

  const prize = data[prizeNumber].option;

  const handleClaim = () => {
    const uid = uuidv4();   // generate unique ID
    const url =
      `${FORM_BASE}&${UID_ENTRY}=${encodeURIComponent(uid)}` +
      `&${PRIZE_ENTRY}=${encodeURIComponent(prize)}`;

    window.location.href = url;   // redirect to the Google Form
  };

  return (
    <main className="app">
      <h1 className="title">🎉 Spin & Win 🎉</h1>

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
          spinDuration={0.6}
          pointerProps={{ style: { display: 'none' } }}
          onStopSpinning={handleStop}
        />
      </div>

      <button
        className="spin-btn"
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {mustSpin ? 'Spinning…' : 'Tap to Spin'}
      </button>

      {showModal && (
        <PrizeModal
          prize={prize}
          onClaim={handleClaim}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
