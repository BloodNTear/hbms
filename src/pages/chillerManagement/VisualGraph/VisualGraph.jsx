import './VisualGraph.css';

import { useRef, useEffect, useState } from 'react';

import SYSTEMGRAPH from '../../../assets/system-graph.png';
import WaterPipe from './WaterPipe/WaterPipe';
import WindArrow from './WindArrow/WindArrow';

function VisualGraph({ pumpState, valveState, compState }) {
  const svgRef = useRef(null);

  function handleSvgClick(event) {
    const svg = svgRef.current;
    if (!svg) return;

    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    alert(`x: ${svgP.x.toFixed(2)}, y: ${svgP.y.toFixed(2)}`);
  };

  function GetValveSpeed(){
     if(valveState > 0 && valveState < 10){
        return 1;
     }else if(valveState < 20){
        return 2;
     }else{
        return 3;
     }
  };

  const imgRef = useRef(null);
  const [size, setSize] = useState({ width: 1000, height: 750 });

  useEffect(() => {
    if (imgRef.current) {
      const updateSize = () => {
        const { width, height } = imgRef.current.getBoundingClientRect();
        setSize({ width, height });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  return (
    <div className="image-container" style={{ position: 'relative' }}>
      <img
        ref={imgRef}
        src={SYSTEMGRAPH}
        alt="Visual Graph"
        style={{ width: '80%', height: 'auto', display: 'block' , margin: 'auto'}}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 2000 750"
        width={size.width}
        height={size.height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto', cursor: 'crosshair' }}
        onClick={handleSvgClick}
      >

      </svg>
    </div>
  );
};

export default VisualGraph;