import React from 'react'

const ConfirmationPopUp = ({ setFiles, handleFileUpload }) => {

    const handleClearFiles = () => {
        setFiles(null)
    }
    return (
        <>
            <div className="absolute antialiased bg-transparent text-gray-900 font-sans w-full h-full inset-0">
                <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                    <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
                    <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                        <div className="md:flex items-center">
                            Upload file
                        </div>
                        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                            <button onClick={handleFileUpload} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">Upload</button>
                            <button onClick={handleClearFiles} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConfirmationPopUp