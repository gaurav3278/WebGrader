'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import moment from 'moment'


const page = () => {
  const [target, setTarget] = useState('')
  const [gradedData, setGradedData] = useState<any[]>([])
  const [loader, setLoader] = useState(false)
  const [listData, setListData] = useState([])
  const router = useRouter()
  const handleSubmit = async () => {
    setLoader(true)
    const options = [{
      url: target
    }]
    const { data } = await axios({
      method: 'post',
      url: "https://api.dataforseo.com/v3/on_page/lighthouse/live/json",
      auth: {
        username: "gauravrai54152@gmail.com",
        password: "0e99c7ec2463faad"
      },
      data: options,
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(data.tasks[0])
    gradedData.push(data.tasks[0].result[0])
    setGradedData([...gradedData])
    setLoader(false)
  }

  useEffect(() => {
    console.log(gradedData.length, "gradedData")
    if (gradedData.length > 0) {
      const data = localStorage.getItem("listData") || '[]'
      const dataList = JSON.parse(data)
      const newData = {
        url: target,
        timestamp: Date.now(),
        performance: gradedData[0]?.categories?.performance,
        SEO: gradedData[0]?.categories?.seo,
        Accessibility: gradedData[0]?.categories?.accessibility,
        screenshot: gradedData[0]?.audits['final-screenshot']?.details?.data,
        bestPractices: gradedData[0]?.categories['best-practices'],
        pwa: gradedData[0]?.categories.pwa
      }
      console.log(newData)
      dataList.push(newData)
      localStorage.setItem("listData", JSON.stringify(dataList))
      setListData(dataList)
      localStorage.setItem("currentItem", JSON.stringify(newData))
      router.push(`/${target.replace("https://", "")}`)
    }
  }, [gradedData])

  useEffect(() => {
    const data = localStorage.getItem("listData") || '[]'
    const dataList = JSON.parse(data)
    setListData(dataList)
  }, [])

  const handleClick = (url: any, timestamp: any) => {
    console.log(url, timestamp)
    let current: any
    listData.forEach((x: any) => {
      if (x.url === url && x.timestamp === timestamp) current = x
    })
    console.log(current)
    localStorage.setItem("currentItem", JSON.stringify(current))
    router.push(`/${current.url.replace("https://", "")}`)
  }


  return (
    <div className='flex flex-col p-5 text-[#f1f1f1] gap-5 items-center justify-center relative'>
      {loader && <div className='absolute flex items-center justify-center top-0 left-0 w-screen h-screen bg-gray-400/40'>
        <Image src="/Spinner.svg" alt='' width={200} height={200} />
      </div>}
      <div className='flex gap-1 items-center justify-center'>
        <h1 className='text-3xl text-[#27ae60]'>WebGrader</h1>
        <Image src={'https://img.icons8.com/fluency-systems-filled/0077cc/48/globe.png'} alt='' height={28} width={28} />
      </div>
      <div className='flex flex-col justify-center items-center gap-1 w-full'>
        <p className='text-xl text-center'>Start Optimizing Your Website For Free</p>
        <p className='w-[70%] text-[#b0b0b0] text-center'>From SEO to speed to security, our free website grader is intuitive, just like websites should be. Find out where you stand and identify opportunities that will help your website to climb those search results.
          Run your review today to get and instant website analytics and learn what yoy need to do to improve.</p>
      </div>
      <div className='text-[#f1f1f1] border border-[#2a7d50] rounded-md'>
        <input onChange={(e) => {
          setTarget(e.target.value)
        }} className='bg-[#2c2c2c] p-2 rounded-tr-none rounded-br-none rounded-md  text-[#f1f1f1] outline-none placeholder:text-[#747474]' type="text" placeholder='Enter your URL here...' />
        <button type='submit' onClick={handleSubmit} className='bg-[#27ae60] rounded-tl-none rounded-bl-none rounded-md hover:bg-[#1a7d4f] active:bg-[#15693d] p-2 rounded-'>Check my website score</button>
      </div>
      <div className='bg-[#121212] gap-5 rounded-sm border border-[#27ae60] text-[#f1f1f1] shadow-[0_4px_8px_rgba(0,0,0,0.2)] w-[90%] flex flex-col justify-center p-2'>
        <h1 className='font-semibold text-xl w-full text-center'>Your Grading Timeline</h1>
        {listData.length == 0 && <div className='text-center w-full text-[#b0b0b0]'>Welcome to WebGrader! Enter a URL above to get started.</div>}
        {listData.length > 0 && <ul className='flex flex-col gap-3'>
          {listData.map((value: any, i) => (
            <li className='flex gap-2 py-2 px-5 items-center border justify-between border-[#2c2c2c] hover:bg-[#232323] rounded-md shadow-[0_2px_5px_rgba(0, 0, 0, 0.1)] bg-[#1e1e1e]'>
              <div className='w-[300px]'>{value?.url}</div>
              <div className='text-[#b0b0b0]'>{moment(value?.timestamp).fromNow()}</div>
              <div className='flex flex-col items-center justify-center'>
                <div>{Math.round(value?.performance.score * 100)}</div>
                <div className='text-sm font-light'>(Performance)</div>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <div>{Math.round(value?.SEO.score * 100)}</div>
                <div className='text-sm font-light'>(SEO)</div>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <div>{Math.round(value?.Accessibility.score * 100)}</div>
                <div className='text-sm font-light'>(Accessibility)</div>
              </div>
              <button type='button' onClick={() => handleClick(value?.url, value?.timestamp)} className='bg-[#27ae60] hover:bg-[#1a7d4f] active:bg-[#15693d] p-2 rounded-sm'>View Report</button>
            </li>
          ))}
        </ul>}
      </div>
    </div>
  )
}

export default page