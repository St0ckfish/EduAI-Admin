/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
interface DynamicPartitionProps {
    percentage: number;
  }
  const DynamicPartition: React.FC<DynamicPartitionProps> = ({ percentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
    }, [percentage]);
    const days = (percentage/14)*100;
    const angle = days * 3.6;
    return ( 
        <>
                <div className="relative w-[250px] h-[250px]">
                    {/* Full circle background */}
                    <div className="absolute w-full h-full rounded-full bg-[#526484]"></div>

                    {/* Dynamic partition */}
                    <div
                        className="absolute w-full h-full rounded-full clip-circle"
                        style={{
                            backgroundImage: `conic-gradient(#3E5AF0 ${angle}deg, transparent 0deg)`,
                        }}
                    ></div>

                </div>
        </>
    );
}
 
export default DynamicPartition;