/* eslint-disable import/no-extraneous-dependencies */
//* eslint-disable */
import React from 'react'
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
});
const Typinganimation = () => (
    <ReactPlayer
        url='videos/video.mp4'
        width="300px"
        height="100px"
        loop
        playing
        muted
        playsinline />
)
export default Typinganimation