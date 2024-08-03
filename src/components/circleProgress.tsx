/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";
interface CircleProgressProps {
    percentage: number;
  }
  const CircleProgress: React.FC<CircleProgressProps> = ({ percentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress < percentage ? prevProgress + 1 : percentage));
      },40);
  
      return () => clearInterval(interval);
    }, [percentage]);
    const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
    return ( 
        <>
            <div className="grid justify-center h-[300px] w-[300px] items-center">
                    <svg className="w-[250px] h-[250px]" viewBox="0 0 50 50">
                        <circle
                            className="stroke-current text-[#526484]"
                            stroke="#ddd"
                            strokeWidth="7"
                            fill="transparent"
                            r={radius}
                            cx="25"
                            cy="25"
                        />
                        <circle
                            className="stroke-current text-blue-500 ease-linear duration-100"
                            stroke="#3b82f6"
                            strokeWidth="7"
                            fill="transparent"
                            r={radius}
                            cx="25"
                            cy="25"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                        />
                        <text
                            x="50%"
                            y="46%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="text-center items-center text-gray-800 text-xs font-semibold"
                        >
                            {progress}
                            
                        </text>
                        <text
                            x="50%"
                            y="70%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className=" items-center text-gray-300 text-[5px] font-semibold"
                        >
                            {100-progress}
                        </text>
                        
                    </svg>
                </div>
        </>
    );
}
 
export default CircleProgress;