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
    setShowModal(true);    // show popup
  };

  const prize = data[prizeNumber].option;

  return (
    <main className="app">
      <h1 className="title">🎉 Spin &amp; Win 🎉</h1>

      {/* wheel + pointer */}
      <div className="wheel-wrapper">
        <div className="pointer" />
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#7bdff2', '#b2f7ef', '#eff7f6', '#f7d6e0', '#f5b0cb']}
          textColors={['#000000']}
          outerBorderColor="#4a4747"
          outerBorderWidth={3}
          innerBorderColor="#4a4747"
          innerBorderWidth={6}
          radiusLineColor="#4a4747"
          radiusLineWidth={2}
          onStopSpinning={handleStop}
          spinDuration={0.6}          /* snappier */
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
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
