import Image from 'next/image'
import React from 'react'

export default function Requirements({ requirements }:{requirements: string[] | null | undefined}) {
  return (
    <>
        <div className="text-xl font-bold text-gray-900 ">Course requirements</div>
        <ul className="list-disc pl-5">
            {requirements && requirements.length > 0 ? (
                requirements.map((requirement) => (
                <li className="text-sm text-gray-700" key={requirement}>
                    {requirement}
                </li>
                ))
            ) : (
                <div className="text-xs text-gray-500">No requirements available</div>
            )}
        </ul>


    </>

  )
}
