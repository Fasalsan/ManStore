import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="text-white text-2xl font-semibold">
                    <CirclesWithBar
                        height="150"
                        width="150"
                        color="#ffffff"
                        outerCircleColor="#ffffff"
                        innerCircleColor="#ffffff"
                        barColor="#ffffff"
                        ariaLabel="circles-with-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        </div>
    )
}
