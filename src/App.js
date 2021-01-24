import { useEffect, useRef, useState } from 'react';
import './App.css';
function App() {
  const songUrl = "https://assets.breatheco.de/apis/sound/";
  const [dataSongs, setdataSongs] = useState([]);
  const getApi = () => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
    .then ((response) =>{
      return response.json();
    })
    .then((data) =>{
      setdataSongs(data)})
    .catch((error) => {
      console.log(error)
    })
  }
  
  useEffect(() => {getApi()}, []);


  const play = () => {
    newSong.current.play();

  };
  
  const pause = () => {
    newSong.current.pause();
  };
  const [currentIndex, setCurrentIndex] = useState(null);
  const nextSong = () => {
    if ( currentIndex !== dataSongs.length -1) {
      newSong.current.src = songUrl + dataSongs[currentIndex + 1].url
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0)
      newSong.current.src = songUrl + dataSongs[0].url
    }
  };
  const prevSong = () => {
    if(currentIndex !== 0) {
      newSong.current.src = songUrl + dataSongs[currentIndex - 1].url
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      newSong.current.src = songUrl + dataSongs[dataSongs.length -1].url
      setCurrentIndex(dataSongs.length - 1);
    }
  };

  const volUp = () => {
    newSong.current.volume += 0.1;
  };
  const volDown = () => {
    newSong.current.volume -= 0.1;
  };
  const newSong = useRef(null);
  const listItems = dataSongs.map((trackList, i) =>
    <li className="action d-flex justify-content-between list-group-item list-group-item-action  " key={i} onClick={() => {setCurrentIndex(i); newSong.current.src = songUrl + trackList.url }}>{trackList.name} <span className="badge badge-dark badge-pill">{trackList.id}</span></li>);
  return (
    <div className=" container-fluid col-8 mt-5">
      <ol>
        {listItems}
      </ol>
      <div className="bottom col-8 ">
        <div className="btn-group d-flex justify-content-center aling-item-center ">
          <button onClick={prevSong} className="btn btn-outline-dark"><i className="fas fa-arrow-left"></i></button>
          <button onClick={play} className="btn btn-outline-dark ml-1"><i className="fas fa-play"></i></button>
          <button onClick={pause} className="btn btn-outline-dark ml-1"><i className="fas fa-pause"></i></button>
          <button onClick={nextSong} className="btn btn-outline-dark ml-1"><i className="fas fa-arrow-right"></i></button>
          <button onClick={volDown} className="btn btn-outline-dark ml-1"><i className="fas fa-volume-down"></i></button>
          <button onClick={volUp} className="btn btn-outline-dark ml-1"><i className="fas fa-volume-up"></i></button>
        </div>
      </div>
      <audio autoPlay ref={newSong} />
    </div>
  );
}
export default App;