import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './PrizeModal.css';

export default function PrizeModal({ prize, onClaim, onClose }) {
    useEffect(() => {
        confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
    }, []);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <h2>Congratulations! 🎉</h2>
                <p>You won:</p>
                <span className="prize-text">{prize}</span>

                <button className="primary" onClick={onClaim}>
                    Claim Prize
                </button>
            </div>
        </div>
    );
}
