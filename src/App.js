import React from 'react';
import CanvasComponent from './CanvasComponent';

function App() {
    const canvasRef = React.useRef(null);

    const handlePredict = () => {
        // Prediction code will go here.
        alert('Predicting...');
    }

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div>
            <CanvasComponent ref={canvasRef} width={280} height={280} />
            <button onClick={handlePredict}>Predict</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}

export default App;
