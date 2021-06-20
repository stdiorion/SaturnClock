import React from "react";
import styled from "styled-components";
import getSaturnTime from "./getSaturnTime";
import Consts from "./consts";
import './App.css';

const Mark = styled.div<{size: number, rotation: string}>`
  position: absolute;
  width: ${({ size }) => size / 300}px;
  height: ${({ size }) => size / 10}px;
  background: ${Consts.MAINCOLOR};
  top: ${({ size }) => size / 30}px;
  left: 50%;
  transform: rotate( ${({ rotation }) => rotation || "0deg" } )
    translate3d(-50%, 0, 0);
  transform-origin: 0px ${({ size }) => size / 2 - size / 30}px;
`

const SecondHand = styled.div<{size: number, rotation: string}>`
  position: absolute;
  width: ${({ size }) => size / 300}px;
  height: ${({ size }) => size / 2 - size / 12}px;
  background: ${Consts.MAINCOLOR};
  top: ${({ size }) => size / 12}px;
  left: 50%;
  transform: rotate( ${({ rotation }) => rotation || "0deg" } )
    translate3d(-50%, 0, 0);
  transform-origin: 0px bottom;
`

const MinuteHand = styled.div<{size: number, rotation: string}>`
  position: absolute;
  width: ${({ size }) => size / 100}px;
  height: ${({ size }) => size / 2 - size / 6}px;
  background: ${Consts.MAINCOLOR};
  top: ${({ size }) => size / 6}px;
  left: 50%;
  transform: rotate( ${({ rotation }) => rotation || "0deg" } )
    translate3d(-50%, 0, 0);
  transform-origin: 0px bottom;
`

const HourHand = styled.div<{size: number, rotation: string}>`
  position: absolute;
  width: ${({ size }) => size / 60}px;
  height: ${({ size }) => size / 2 - size / 4.5}px;
  background: ${Consts.MAINCOLOR};
  top: ${({ size }) => size / 4.5}px;
  left: 50%;
  transform: rotate( ${({ rotation }) => rotation || "0deg" } )
    translate3d(-50%, 0, 0);
  transform-origin: 0px bottom;
`

const Circle = styled.div<{size: number}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`

const CenterDot = styled(Circle)`
  position: absolute;
  background: ${Consts.MAINCOLOR};
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`

const ClockWrapper = styled(Circle)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  box-sizing: content-box;
  margin: 0 auto;
  /* border: ${({ size }) => size / 30}px solid black; */
`

const ClockText = styled.div<{ size: number }>`
  position: absolute;
  top: ${({ size }) => (size + 3 * window.innerHeight) / 4}px;
  left: 50%;
  color: ${Consts.MAINCOLOR};
  font-size: ${({ size }) => size / 8}px;
  font-family: "Squada One";
  letter-spacing: -.02em;
  text-align: center;
  white-space: nowrap;
  transform: translate3d(-50%, -50%, 0);
`

const Colon = styled.span<{ size: number }>`
  font-family: Rubik;
  font-weight: 300;
  vertical-align: .1em;
`

const renderClock = ( className: string, size: number ) => {

  const time = getSaturnTime();

  return (
    <>
      <ClockWrapper className={className} size={size}>
        {[...Array(Consts.HOURS_PER_DAY)].map((_, i) => (
          <Mark key={i} size={size} rotation={i * 360 / Consts.HOURS_PER_DAY + "deg"} />
        ))}
        <div>
          <SecondHand size={size} rotation={time.seconds * 360 / Consts.SECONDS_PER_MINUTE + "deg"} />
          <MinuteHand size={size} rotation={(time.minutes + time.seconds / Consts.SECONDS_PER_MINUTE) * 360 / Consts.MINUTES_PER_HOUR + "deg"} />
          <HourHand size={size} rotation={(time.hours + time.minutes / Consts.MINUTES_PER_HOUR + time.seconds / Consts.MINUTES_PER_HOUR / Consts.SECONDS_PER_MINUTE) * 360 / Consts.HOURS_PER_DAY + "deg"} />
          <CenterDot size={size / 30} />
        </div>
      </ClockWrapper>
      <ClockText size={size}>
        <span className="hours">{time.hours.toString().padStart(2, "0")}</span>
        <Colon size={size}> : </Colon>
        <span className="minutes">{time.minutes.toString().padStart(2, "0")}</span>
        <Colon size={size}> : </Colon>
        <span className="seconds">{time.seconds.toString().padStart(3, "0")}</span>
      </ClockText>
    </>
  );

};

const Main = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
`

const App = () => {
  return (
    <Main>
        {renderClock("clock", Math.min(window.innerWidth, window.innerHeight) * 2 / 3)}
    </Main>
  );
}


export default App;
