import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


export default function Dashboard(props) {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    console.log(windowDimensions)
  return (

    
    <div className='hidden lg:block'>
 
 <BarChart
      xAxis={[{ scaleType: 'band', data: ['january', 'February', 'March','April','May','June','July','August','September','October','November','December'] }]}
      series={[{ data: [4, 3, 5] }]}
      width={windowDimensions.width-(windowDimensions.width*.4)}
      height={windowDimensions.height-200}
    />
    </div>
  )
}
