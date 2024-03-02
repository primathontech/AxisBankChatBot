/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
});

const Typinganimation = () => (
    <div>
        <ReactPlayer
            url='videos/typing.mp4'
            width="300px"
            height="100px"
            loop
            playing
            muted
        />
    </div>
)



export default Typinganimation