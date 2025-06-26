import React, { useEffect, useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';

const rewards = [
  '💸 Win ₹5000',
  '🏫 Free 1 Year School Fee',
  '🎁 Gift Hamper',
  '⭐ Extra Credit Points',
  '🎉 Surprise Package',
  '😞 Try Again',
];
function LuckyDrawPage() {
  const [result, setResult] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [display, setDisplay] = useState('');
  const student = JSON.parse(localStorage.getItem('loggedInStudent')) || { name: 'Guest' };

  useEffect(() => {
    const spunStatus = localStorage.getItem(`spinStatus-${student.name}`);
    if (spunStatus === 'done') {
      setHasSpun(true);
      const lastResult = localStorage.getItem(`spinResult-${student.name}`);
      setResult(lastResult);
    }
  }, [student.name]);

  const handleSpin = () => {
    if (hasSpun) return;

    setIsSpinning(true);
    let count = 0;
    const maxCount = 30;
    const interval = setInterval(() => {
      const random = rewards[Math.floor(Math.random() * rewards.length)];
      setDisplay(random);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        setIsSpinning(false);
        setResult(random);
        setHasSpun(true);
        localStorage.setItem(`spinStatus-${student.name}`, 'done');
        localStorage.setItem(`spinResult-${student.name}`, random);
      }
    }, 100);
  };

  return (
    <Container className="text-center mt-5">
      <h2>🎡 Schoolzoe Lucky Spin</h2>
      <p className="text-muted mb-4">Hi, {student.name}. You can spin only once!</p>

      <div className="display-4 mb-4" style={{ height: '60px' }}>
        {isSpinning ? display : result || 'Click Spin to try your luck!'}
      </div>

      <Button
        variant="primary"
        onClick={handleSpin}
        disabled={hasSpun || isSpinning}
      >
        {hasSpun ? '✅ Already Spun' : isSpinning ? 'Spinning...' : '🎯 Spin Now'}
      </Button>

      {result && !isSpinning && (
        <Alert variant="success" className="mt-4">
          🎉 You won: <strong>{result}</strong>
        </Alert>
      )}
    </Container>
  );
}
export default LuckyDrawPage;
