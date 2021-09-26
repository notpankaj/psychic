import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext"
import { KernelContext } from "./contexts/kernelContext"
import Engine from "./components/Engine";
import Tray from "./components/Tray";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MegaQuery from "./components/MegaQuery";
import AddMarkerPopup from "./components/AddMarkerPopup";



import './styles/App.css';

function App() {

  const [user, setUser] = useState();
  const [kernel, setKernel] = useState({
    activeEngine: 'google',
    currentPopup: null,
    mode: "ZEN",
  });

  const checkKernal = () => {

    const possibleKernel = JSON.parse(localStorage.getItem('kernel'));

    if (possibleKernel) {
      console.log(" KERNEl FOUND", { kernel })
      setKernel(possibleKernel);
      if (possibleKernel.mode === "HEX") {
        document.body.classList.add('HEX');
      }
    }
    else {
      setKernel({
        activeEngine: 'google',
        currentPopup: null,
        mode: "ZEN",
      })
      console.log("USING DEFAULT KERNEl", { kernel })
    }
  }


  useEffect(() => {
    window.addEventListener('keydown', keySequence);
    const colorScheme = localStorage.getItem('colorScheme');
    const possibleMode = localStorage.getItem('mode');

    if (colorScheme) {
      document.querySelector('body').style.backgroundColor = colorScheme;
    }

    if (possibleMode === 'HEX') {
      document.body.classList.add('HEX');
      document.body.style.background = '#121212';
    }


    checkKernal();

    return () => {
      window.removeEventListener('keydown', keySequence);
    };

  }, [])





  const drowsiness = (task) => {
    const DrowseEingne = document.querySelector('.engine__container .search');
    const DrowseTray = document.querySelector('.tray__container');

    if (task === 'add') {
      if (DrowseEingne) {
        DrowseEingne.classList.remove("search-open");
      }
      if (DrowseTray) {
        DrowseTray.classList.add("hide");
      }
    }

    if (task === 'remove') {
      if (DrowseEingne) {
        DrowseEingne.classList.add("search-open");
      }
      if (DrowseTray) {
        DrowseTray.classList.remove("hide");
      }
    }

  }

  const keySequence = e => {
    if (e.shiftKey && e.altKey && e.code === 'KeyG') {
      setKernel({ ...kernel, activeEngine: 'google' })
      localStorage.removeItem('kernel')
      localStorage.setItem('kernel', JSON.stringify({ activeEngine: "google", currentPopup: null }))
    }
    if (e.shiftKey && e.altKey && e.code === 'KeyY') {
      setKernel({ ...kernel, activeEngine: 'yahoo' })
      localStorage.removeItem('kernel')
      localStorage.setItem('kernel', JSON.stringify({ activeEngine: "yahoo", currentPopup: null }))
    }
    if (e.shiftKey && e.altKey && e.code === 'KeyB') {
      setKernel({ ...kernel, activeEngine: 'being' })
      localStorage.removeItem('kernel')
      localStorage.setItem('kernel', JSON.stringify({ activeEngine: "being", currentPopup: null }))
    }
    if (e.shiftKey && e.altKey && e.code === 'KeyD') {
      setKernel({ ...kernel, activeEngine: 'duckduckgo' })
      localStorage.removeItem('kernel')
      localStorage.setItem('kernel', JSON.stringify({ activeEngine: "duckduckgo", currentPopup: null }))
    }
    // mode
    if (e.shiftKey && e.altKey && e.code === 'KeyH') {
      document.body.classList.add('HEX');
      document.body.style.background = '#121212';
      localStorage.setItem('mode', "HEX");
    }
    if (e.shiftKey && e.altKey && e.code === 'KeyZ') {
      document.body.classList.remove('HEX');
      document.body.style.background = '#ececec';
      localStorage.setItem('mode', "ZEN");
    }
    // drowse
    if (e.shiftKey && e.altKey && e.code === 'KeyA') {
      drowsiness('add');
    }
    if (e.shiftKey && e.altKey && e.code === 'KeyR') {
      drowsiness('remove');
    }
    // mega query
    if (e.shiftKey && e.altKey && e.code === 'KeyO') {
      setKernel({ ...kernel, currentPopup: 'megaQuery' })
      document.body.classList.add('blur');

    }
    if (e.shiftKey && e.altKey && e.code === 'KeyC') {
      if (kernel) {
        setKernel({ ...kernel, currentPopup: null })
        document.body.classList.remove('blur');
      }
    }

  }

  return (
    <div className="App">
      <KernelContext.Provider value={{ kernel, setKernel }}>
        <UserContext.Provider value={{ user, setUser }}>

          <Header />

          {/* Popups */}
          {kernel?.currentPopup === "megaQuery" && <MegaQuery />}
          {kernel?.currentPopup === "AddMarker" && <AddMarkerPopup />}
          {/* END Popups */}

          <main className="main__container">
            <Engine />
            <Tray />
          </main>

          <Footer />
        </UserContext.Provider>
      </KernelContext.Provider>
    </div>
  )
}

export default App;
