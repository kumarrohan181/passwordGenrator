import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAloowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    if (numberAloowed)
      str += "0123456789"
    if (charAllowed)
      str += "!@#$%^&*()-_=+\|{};:/?.>"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)

  }, [length, numberAloowed, charAllowed, setPassword])
  const copyPasswordTOClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(Password)
  }, [Password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAloowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto mx-auto shasow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={Password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordTOClipboard} className='outline-none bg-blue-700 text-whitw p-3 py-0.5 shrink-0'>copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type="range" min={6} max={100} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAloowed}
              id="numberInput" onChange={() => { setNumberAllowed((prev) => !prev); }} />
            <label htmlFor="numberInput"> Numbers</label>

          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed}
              id="characterInput" onChange={() => { setCharAllowed((prev) => !prev); }} />
            <label htmlFor="characterInput">Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
