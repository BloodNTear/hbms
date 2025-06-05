import './systemStatus.css';

import { useState, useEffect } from 'react';

import { InfoDisplayCase } from './InfoDisplayCase';

import { POINT_ID } from '../../../mocks/PointIDs';

function SystemStatus({currentState, currentMode, onOff, onManual, onAuto}){

    const [systemData, setSystemData] = useState(() => {
        return currentState;
    });

    useEffect(() => {
        setSystemData(currentState);
    },[currentState]);

    //#region Parent-passed functions
    function handleTurnOff(){
        onOff && onOff();
    }
    function handleTurnManual(){
        onManual && onManual();
    }
    function handleTurnAuto(){
        if(currentState.manualControl.pump &&
             currentState.manualControl.comp &&
              currentState.manualControl.pumpState){
            onAuto && onAuto();
        }else{
            alert("PUMP and COMP in Manual Control MUST be ON to use Auto <!>");
        }
    }
    //#endregion

    //#region UI Helper Functions
    function GetValue(id){
        const targetUnit = systemData?.pointerData?.find(unit => unit?.id === id);
        if(targetUnit){
            return targetUnit?.point_value;
        }else{
            return "Unit not found <!>";
        }
    };
    //#endregion

    const tempInfor = [
        {
            title: "Nhiet do dau vao"
        }
    ];

    return(
        <div className="system-status-wrapper">
            <div className="title">
                <h2>Giám sát</h2>
            </div>
            <div className="info-display">
            </div>
        </div>
    )
}

export default SystemStatus;