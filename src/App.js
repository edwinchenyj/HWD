import React, {useEffect, useState} from 'react';
import CanvasComponent from './CanvasComponent';
import * as tf from '@tensorflow/tfjs'

function preprocess(imageData) {
    const [data, width, height] = imageData;

    // 1. Convert the canvas data to grayscale (since MNIST is grayscale)
    const grayscaleData = new Float32Array(width* height);
    for (let i = 0; i < data.length; i += 4) {
        grayscaleData[i /4] = data[i] / 255.0;
    }

    // 2. Create a TensorFlow tensor from the grayscale data
    let tensor = tf.tensor2d(grayscaleData, [height,width]);

    // 3. Resize the image to 28 x 28 to match the MNIST data format
    const resized = tf.image.resizeBilinear(tensor, [28, 28]);

    // 4. Expand the tensor's dimensions to match the model's input shape: [batch, width, height, channels]
    const expanded = resized.expandDims(0);

    return expanded;
}

function App() {
    const canvasRef = React.useRef(null);
    const [model, setModel] = useState(null)

    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await tf.loadLayersModel(`${process.env.PUBLIC_URL}/model.json`);
            setModel(loadedModel);
        };
        
        loadModel();
    }, [])


    const handlePredict = () => {
        if (!model) {
            console.error("Model hasn't loaded yet!");
            return;
        }
    
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
