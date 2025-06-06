import './systemStatus.css';

import { useState, useEffect } from 'react';

import { InfoDisplayCase } from './InfoDisplayCase';

import CO2 from '../../../assets/co2.png';
import FREQUENCY from '../../../assets/frequency.png';
import HEATINGCOIL from '../../../assets/heatingcoil.png';
import HUMIDITY from '../../../assets/humidity.png';
import PRESSURE from '../../../assets/pressure.png';
import TEMP from '../../../assets/temp.png';

function SystemStatus({currentState}){

    //#region Distribute Info
    const tempInfor = [
        {
            title: "Nhiệt độ đầu vào",
            value: `${currentState.display.inputTemp} °C`
        },
        {
            title: "Nhiệt độ phòng",
            value: `${currentState.display.roomTemp} °C`
        }
    ];

    const humidInfo = [
        {
            title: "Độ ẩm đầu vào",
            value: `${currentState.display.inputHumid} %`
        },
        {
            title: "Độ ẩm phòng",
            value: `${currentState.display.inputHumid} %`
        }
    ];

    const pressureInfo = [
        {
            title: "Áp suất gió",
            value: `${currentState.display.pressure} Pa`
        }
    ];

    const heatingCoilInfo = [
        {
            title: "Nhiệt độ trở nhiệt",
            value: `${currentState.display.heatingCoilTemp} °C`
        }
    ];

    const fanFreqInfo = [
        {
            title: "Tần số quạt",
            value: `${currentState.display.fanFreq} Hz`
        }
    ];

    const co2Info = [
        {
            title: "Nồng độ CO2",
            value: `${currentState.display.co2} ppm`
        }
    ];
    //#endregion

    return(
        <div className="system-status-wrapper">
            <div className="title">
                <h2>Giám sát</h2>
            </div>
            <div className="info-display">
                <InfoDisplayCase 
                    key={1}
                    icon={TEMP}
                    info={tempInfor}
                />
                <InfoDisplayCase 
                    key={2}
                    icon={HUMIDITY}
                    info={humidInfo}
                />
                <InfoDisplayCase 
                    key={3}
                    icon={PRESSURE}
                    info={pressureInfo}
                />
                <InfoDisplayCase 
                    key={4}
                    icon={FREQUENCY}
                    info={fanFreqInfo}
                />
                <InfoDisplayCase 
                    key={5}
                    icon={HEATINGCOIL}
                    info={heatingCoilInfo}
                />
                <InfoDisplayCase 
                    key={6}
                    icon={CO2}
                    info={co2Info}
                />
            </div>
        </div>
    )
}

export default SystemStatus;