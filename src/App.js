import "./App.css";
import divider from "./pattern-divider-desktop.svg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faDiceFive } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const getAdvice = async () => {
    setLoading(false);
    const request = await fetch("https://api.adviceslip.com/advice");
    const response = await request.json();
    setData(response);
    setLoading(true);
  };
  useEffect(() => {
    getAdvice();
  }, []);

  const { slip } = data;

  return (
    <div className="flex min-h-screen flex-col items-center bg-dark-blue text-white font-manrope">
      <main className="flex-auto flex items-center md:w-6/12 lg:w-4/12 px-3 sm:px-24 md:px-0">
        <div className="bg-dark-grayish-blue w-full h-full p-12 text-center rounded-2xl relative">
          <span className="text-neon-green block text-xs tracking-[.3em] font-extrabold mb-6">
            {loading && `ADVICE #${slip.id}`}
          </span>

          {loading ? (
            <q className="text-[28px] font-bold text-light-cyan leading-tight">
              {slip.advice}
            </q>
          ) : (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin text-5xl" />
          )}
          <img src={divider} className="w-full h-4 mb-6 mt-8" alt="line" />
          <div className="absolute w-16 h-16 hover:shadow-neon-green bg-neon-green cursor-pointer hover:shadow-[0px_0px_30px_0px_rgba(82_255_168_0.69)] transition-all duration-200 hover:green-neon rounded-full left-1/2 -translate-x-1/2 -bottom-8">
            <div
              className="flex justify-center items-center h-full rounded-full bg-neon-green"
              onClick={getAdvice}
            >
              <FontAwesomeIcon
                icon={faDiceFive}
                className={`text-black text-3xl ${!loading && "fa-shake"}`}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-sm text-center py-5 pt-24 bg-">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          className="text-blue-600"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          className="text-blue-600"
          href="https://github.com/anggitow/advice-generator-app"
          target="_blank"
          rel="noreferrer"
        >
          Anggito Wicaksono
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
