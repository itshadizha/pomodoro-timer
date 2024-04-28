import { Title } from "../UI/AppTitle";
import { Container } from "../layouts/Container";
import styled from "styled-components";
import { PomodoroMode } from "./PomodoroMode";
import ProgressBar from "./ProgressBar";
import TimeView from "../UI/TimeView";
import Button from "../UI/Button";
import PomodoroForm from "./PomodoroForm";
import { useRef, useState } from "react";
import rainSound from "../../audio/soft-rain-ambient-111154.mp3";
import clockSoundFile from "../../audio/clock-chime-88027.mp3";
import InputRef from "../UI/InputRef";
import AppModal from "../UI/Modal";

export const Pomodoro = () => {
  const audioRain = useRef(null);
  const clockSound = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [modal, setModal] = useState(false);
  const [time, setTime] = useState(5 * 60);
  const [isActive, setActive] = useState(false);
  let interValId = useRef(null);
  const progressBar = useRef();
  const [pomodoroTimes, setPomodoroTimes] = useState({
    focus: 0,
    break: 0,
    rest: 0,
  });

  const playSoundClock = () => {
    clockSound.current.play();
    setTimeout(() => {
      clockSound.current.pause();
      clockSound.current.currentTime = 0;
    }, 1000);
  };

  const startTimer = () => {
    if (!isActive) {
      playSoundClock();

      setActive(true);
      interValId.current = setInterval(() => {
        setTime((prevState) => {
          if (prevState === 0) {
            setActive(false);
            clearInterval(interValId.current);
            return 0;
          } else {
            const time = prevState - 1;
            progress(time);
            return time;
          }
        });
      }, 1000);
    }
  };

  const modalHandler = () => {
    setModal((prevState) => !prevState);
  };

  const getTimeValue = (data) => {
    setPomodoroTimes(data);
    setTime(data.focus * 60);
  };

  const stopTimer = () => {
    setActive(false);
    playSoundClock();
    clearInterval(interValId.current);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = (initialTime) => {
    const progressDiv = progressBar.current;
    const percent = (initialTime / (5 * 60)) * 100;
    progressDiv.style.width = `${percent}%`;
  };

  const playAudio = () => {
    audioRain.current.play();
  };

  const pauseAudio = () => {
    audioRain.current.pause();
  };

  return (
    <Container>
      <audio ref={clockSound}>
        <source src={clockSoundFile} type="audio/mpeg" />
      </audio>
      {modal && (
        <PomodoroForm closeModal={modalHandler} onSubmit={getTimeValue} />
      )}
      <StyledTitle>Pomodoro</StyledTitle>
      <StyledDiv>
        <PomodoroMode />
        <ProgressBar ref={progressBar} />
        <TimeViewWrapper>
          <TimeView time={formatTime(time)} />
        </TimeViewWrapper>
        <TimeViewWrapperExchanged>
          <audio ref={audioRain}>
            <source src={rainSound} type="audio/mpeg" />
          </audio>

          <AudioButtons>
            <ButtonAudio onClick={playAudio}>PLay sound</ButtonAudio>
            <ButtonAudio onClick={pauseAudio}>Pause sound</ButtonAudio>
          </AudioButtons>

          <SettingStyled onClick={() => setSettingsOpen((prevState) => !prevState)}>
            Setting
          </SettingStyled>

          {settingsOpen && (
            <AppModal>
              {" "}
              <SettingsWrapper>
                <InputRef labelText="Auto Start Breaks" type="checkbox" />
                <InputRef labelText="Auto Start Pomodoros" type="checkbox" />
                <InputRef labelText="Long Break Interval" type="number" />
                <button onClick={() => setSettingsOpen((prevState) => !prevState)}  >Save</button>
              </SettingsWrapper>{" "}
            </AppModal>
          )}

          {!isActive ? (
            <Button onClick={startTimer}>Start</Button>
          ) : (
            <Button onClick={stopTimer}>Stop</Button>
          )}
        </TimeViewWrapperExchanged>
        <PositionedButton>
          <Button icon onClick={modalHandler}>
            🕦
          </Button>
        </PositionedButton>
      </StyledDiv>
    </Container>
  );
};

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  gap: 10px;
`;

const StyledTitle = styled(Title)`
  /* color: #be2640 ; */
  letter-spacing: 5px;
`;

const StyledDiv = styled.div`
  background-color: #232931;
  box-sizing: border-box;
  border: 1px solid rgb(175, 179, 183);
  border-radius: 4px;
  position: relative;
`;

const TimeViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeViewWrapperExchanged = styled(TimeViewWrapper)`
  margin-bottom: 67px;
`;

const PositionedButton = styled.div`
  position: absolute;
  top: 100px;
  right: 10px;
`;

const ButtonAudio = styled.button`
  background-color: #be2640;
  border: none;
  border-radius: 15px;
  width: 100px;
  height: 60px;
  padding: 10px 15px;
  &:hover {
    background-color: #db1032;
  }
  &:active {
    background-color: #97152b;
  }
`;

const AudioButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-right: 200px;
`;

const SettingStyled = styled.h3`
  position: absolute;
  bottom: 10px;
`