// "use client"
import React from 'react'

const Card = () => {
    return (
        <div className='w-max p-5 flex flex-col bg-[#1e1e1e] border border-[#444444]'>
            <div className='flex gap-5'>
                <p>example.com</p>
                <p>1 jan 2022</p>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-3'>
                    <p>Performace:</p>
                    <p>85</p>
                </div>
                <div className='flex gap-3'>
                    <p>Accessibility:</p>
                    <p>85</p>
                </div>
                <div className='flex gap-3'>
                    <p>SEO Score:</p>
                    <p>85</p>
                </div>
            </div>
            <div className='flex gap-3'>
                <button>View Report</button>
                <button>Delete Report</button>
            </div>
        </div>
    )
}

export default Card