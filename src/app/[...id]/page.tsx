"use client"

import axios, { all } from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import NoSSr from '../NoSSr'
import { CircularProgress } from '@mui/material'

export const runtime = 'edge';

const page = ({ params }: { params: { slug: string } }) => {
    const [loading, setLoading] = useState(true)
    const [initial, setInitial] = useState(true)
    const [loadedData, setLoadedData] = useState<any[]>([])
    const [currentData, setCurrentData] = useState<any[]>([])
    const [oColor, setOColor] = useState("")
    const [pColor, setPColor] = useState("")
    const [sColor, setSColor] = useState("")
    const [pwColor, setPwColor] = useState("")
    const [bColor, setBColor] = useState("")
    const [aColor, setAColor] = useState("")
    const [pScore, setPScore] = useState(0)
    const [sScore, setSScore] = useState(0)
    const [aScore, setAScore] = useState(0)
    const [bScore, setBScore] = useState(0)
    const [pwScore, setPwScore] = useState(0)

    const getData = async () => {
        const current = JSON.parse(localStorage.getItem("currentItem") || '[]')
        console.log(current)
        currentData.push(current)
        setCurrentData([...currentData])
        const ps = Math.round(currentData[0]?.performance.score * 100)
        const ss = Math.round(currentData[0]?.SEO.score * 100)
        const as = Math.round(currentData[0]?.Accessibility.score * 100)
        const bs = Math.round(currentData[0]?.bestPractices.score * 100)
        const pws = Math.round(currentData[0]?.pwa.score * 100)
        setPScore(ps)
        setSScore(ss)
        setAScore(as)
        setPwScore(pws)
        setBScore(bs)

        if (ps <= 20 && ps >= 0) setPColor("#FF4B4B")
        else if (ps >= 21 && ps <= 40) setPColor("#FFA13D")
        else if (ps >= 41 && ps <= 60) setPColor("#FFDA6A")
        else if (ps >= 61 && ps <= 80) setPColor("#80E57E")
        else if (ps >= 81 && ps <= 100) setPColor("#32D482")
        if (ps <= 20 && ps >= 0) setPColor("#FF4B4B")
        else if (ps >= 21 && ps <= 40) setPColor("#FFA13D")
        else if (ps >= 41 && ps <= 60) setPColor("#FFDA6A")
        else if (ps >= 61 && ps <= 80) setPColor("#80E57E")
        else if (ps >= 81 && ps <= 100) setPColor("#32D482")
        if (ps <= 20 && ps >= 0) setSColor("#FF4B4B")
        else if (ss >= 21 && ss <= 40) setSColor("#FFA13D")
        else if (ss >= 41 && ss <= 60) setSColor("#FFDA6A")
        else if (ss >= 61 && ss <= 80) setSColor("#80E57E")
        else if (ss >= 81 && ss <= 100) setSColor("#32D482")
        if (as <= 20 && as >= 0) setAColor("#FF4B4B")
        else if (as >= 21 && as <= 40) setAColor("#FFA13D")
        else if (as >= 41 && as <= 60) setAColor("#FFDA6A")
        else if (as >= 61 && as <= 80) setAColor("#80E57E")
        else if (as >= 81 && as <= 100) setAColor("#32D482")
        if (pws <= 20 && pws >= 0) setPwColor("#FF4B4B")
        else if (pws >= 21 && pws <= 40) setPwColor("#FFA13D")
        else if (pws >= 41 && pws <= 60) setPwColor("#FFDA6A")
        else if (pws >= 61 && pws <= 80) setPwColor("#80E57E")
        else if (pws >= 81 && pws <= 100) setPwColor("#32D482")
        if (bs <= 20 && bs >= 0) setBColor("#FF4B4B")
        else if (bs >= 21 && bs <= 40) setBColor("#FFA13D")
        else if (bs >= 41 && bs <= 60) setBColor("#FFDA6A")
        else if (bs >= 61 && bs <= 80) setBColor("#80E57E")
        else if (bs >= 81 && bs <= 100) setBColor("#32D482")
        const options = [
            {
                url: currentData[0]?.url,
                enable_javascript: true,
                enable_browser_rendering: true,
            }
        ]
        const { data } = await axios({
            method: 'post',
            url: 'https://api.dataforseo.com/v3/on_page/instant_pages',
            auth: {
                username: "gauravrai54152@gmail.com",
                password: "0e99c7ec2463faad"
            },
            data: options,
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log(data)
        loadedData.push(data.tasks[0].result[0] || {})
        setLoadedData([...loadedData])
        const os = Math.round(loadedData[0]?.items[0]['onpage_score'])
        if (os <= 20 && os >= 0) setOColor("#FF4B4B")
        else if (os >= 21 && os <= 40) setOColor("#FFA13D")
        else if (os >= 41 && os <= 60) setOColor("#FFDA6A")
        else if (os >= 61 && os <= 80) setOColor("#80E57E")
        else if (os >= 81 && os <= 100) setOColor("#32D482")
        setLoading(false)
        console.log(os)
        console.log(loadedData)
    }
    useEffect(() => {
        if (initial) {
            setInitial(false)
        }
        else {
            getData()
        }
    }, [initial])
    return (
        <NoSSr>
            <div className='w-full p-5'>
                {
                    loading && currentData.length > 0 && <div className='flex flex-col gap-2 items-center'>
                        <div className='flex w-full items-center justify-center'>
                            <div className='relative w-max'>
                                <Image src={currentData[0]?.screenshot} alt='' width={500} height={100} />
                                <Image className='absolute z-10 top-10 left-20' src={'/Magnify.svg'} alt='' width={300} height={100} />
                            </div>
                        </div>
                        <div className='flex gap-2 text-[#f1f1f1] text-xl'>Hang on while we are analysing your website...</div>
                    </div>
                }
                {!loading && <div className='flex flex-col w-full gap-3'>
                    <div className='flex gap-1 items-center justify-center'>
                        <h1 className='text-3xl text-[#27ae60]'>WebGrader</h1>
                        <Image src={'https://img.icons8.com/fluency-systems-filled/0077cc/48/globe.png'} alt='' height={28} width={28} />
                    </div>
                    <div className='text-[#f1f1f1] gap-2 items-center justify-center w-full flex text-2xl'>Result for <span className='text-[#b0b0b0] text-xl font-semibold '>{currentData[0]?.url}</span>
                    </div>
                    <div className='flex gap-5 w-full'>
                        <div className='flex flex-col w-1/2 justify-center gap-3'>
                            <div className='relative w-full'>
                                <Image className='w-full h-full' src={currentData[0]?.screenshot} alt='' width={500} quality={100} height={100} />
                            </div>
                            <div className='text-[#f1f1f1] w-full text-center text-lg'>
                                Report generated at : <span className='text-[#b0b0b0] text-base'>{moment(currentData[0]?.timestamp).format("DD MMMM YYYY, HH:MM:SS")}</span>
                            </div>
                        </div>
                        <div className='text-[#f1f1f1] flex flex-col w-1/2 px-4 items-center '>
                            <div className='w-full flex flex-col items-center gap-5 '>
                                <div className='flex flex-col gap-1'>
                                    <div className='w-max flex relative items-center justify-center text-xl'>
                                        <CircularProgress size={128} variant='determinate' value={loadedData[0]?.items[0]['onpage_score']} sx={{ color: `${oColor}` }} />
                                        <div className='absolute text-[#b0b0b0] '>{Math.round(loadedData[0]?.items[0]['onpage_score'])}%</div>
                                    </div>
                                    <div className='font-medium text-xl'>On-Page Score</div>
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className='flex justify-between'>
                                        PERFORMANCE
                                        <div className="text-[#b0b0b0]">{pScore}%</div>
                                    </div>
                                    <div className='w-64 rounded-md h-3 bg-[#5b5b5b]'>
                                        <div style={{
                                            background: `${pColor}`,
                                            width: `${pScore}%`
                                        }} className="h-3 rounded-md"></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className='flex justify-between'>
                                        SEO
                                        <div className="text-[#b0b0b0]">{sScore}%</div>
                                    </div>
                                    <div className='w-64 rounded-md h-3 bg-[#5b5b5b]'>
                                        <div style={{
                                            background: `${sColor}`,
                                            width: `${sScore}%`
                                        }} className="h-3 rounded-md"></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className='flex justify-between'>
                                        ACCESSIBILITY
                                        <div className="text-[#b0b0b0]">{aScore}%</div>
                                    </div>
                                    <div className='w-64 rounded-md h-3 bg-[#5b5b5b]'>
                                        <div style={{
                                            background: `${aColor}`,
                                            width: `${aScore}%`
                                        }} className="h-3 rounded-md"></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className='flex justify-between'>
                                        Progressive Web App
                                        <div className="text-[#b0b0b0]">{pwScore}%</div>
                                    </div>
                                    <div className='w-64 rounded-md h-3 bg-[#5b5b5b]'>
                                        <div style={{
                                            background: `${pwColor}`,
                                            width: `${pwScore}%`
                                        }} className="h-3 rounded-md"></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className='flex justify-between'>
                                        Best Practices
                                        <div className="text-[#b0b0b0]">{bScore}%</div>
                                    </div>
                                    <div className='w-64 rounded-md h-3 bg-[#5b5b5b]'>
                                        <div style={{
                                            background: `${bColor}`,
                                            width: `${bScore}%`
                                        }} className="h-3 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-[#b0b0b0] flex flex-col mt-8 gap-3'>
                        <div className='font-semibold text-2xl text-[#f1f1f1]'>On-Page Results</div>
                        <div className='w-full flex flex-wrap gap-5'>
                            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }} className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['external_links_count'] || 123}</div>
                                <div>External Links</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['internal_links_count'] || 123}</div>
                                <div>Internal Links</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['images_count'] || 123}</div>
                                <div>Images Count</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['images_size'] || 123}</div>
                                <div>Images Size</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['scripts_count'] || 123}</div>
                                <div>Scripts Count</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['scripts_size'] || 123}</div>
                                <div>Scripts Size</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['stylesheets_count'] || 123}</div>
                                <div>Stylesheets Count</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta['stylesheets_size'] || 123}</div>
                                <div>Stylesheets Size</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.['page_timing']['waiting_time']}</div>
                                <div>Waiting Time</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.meta.content['plain_text_size']}</div>
                                <div>Plain Text Size</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{Math.round((loadedData[0]?.items[0]?.meta.content['automated_readability_index'])*100)/100}</div>
                                <div>Automated Readability Index</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.['total_dom_size']}</div>
                                <div>Total DOM Size</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.['resource_errors'].errors.length}</div>
                                <div>Errors</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.['resource_errors'].warnings.length || 4}</div>
                                <div>Warnings</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.['encoded_size'] || 18678670}</div>
                                <div>Encoded Size</div>
                            </div>
                            <div className='flex flex-col text-lg font-medium border border-[#23ae60] bg-[#2c2c2c] w-[290px] hover:bg-[#353535] h-[80px] items-center justify-center'>
                                <div className='text-[#f1f1f1] text-xl font-bold'>{loadedData[0]?.items[0]?.['url_length'] || 12}</div>
                                <div>URL Size</div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </NoSSr >
    )
}

export default page