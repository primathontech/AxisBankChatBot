/* eslint-disable import/no-extraneous-dependencies */
//* eslint-disable */
import React from 'react'
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
});
const Typinganimation = () => (
    <div>
        <ReactPlayer
            url='videos/typing.mp4'
            width="200px"
            height="100px"
            loop
            playing
            muted
            playsinline />
    </div>
)
export default Typinganimation