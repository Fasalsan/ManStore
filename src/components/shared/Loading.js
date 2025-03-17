import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="text-white text-2xl font-semibold">
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#ffffff"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        </div>
    )
}
