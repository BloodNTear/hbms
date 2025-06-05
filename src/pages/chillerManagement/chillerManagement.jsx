import './chillerManagement.css';

import { useEffect, useState } from 'react';

import { useAxiosWithAuth } from '../../api/useAxiosWithAuth';
import { useSilentAxiosWithAuth } from '../../api/useSilentAxiosWithAuth';

import { SystemStatus } from './systemStatus';
import { VisualGraph } from './VisualGraph';
import { AutoControl } from './AutoControl';
import { ManualControl } from './ManualControl';

import { POINT_ID } from '../../mocks/PointIDs';

import BANNER from '../../assets/banner.png';

function ChillerManagement(){

    const axiosInstance = useAxiosWithAuth();
    const silentAxiosInstance = useSilentAxiosWithAuth();

    //#region Get API Info 
    const [globalState, setGlobalState] = useState(() => {
        const initialState = {
            display : {
                inputTemp: 0,
                roomTemp: 0,

                inputHumid: 0,
                roomHumid: 0,

                pressure: 0,
                heatingCoilTemp: 0,

                fanFreq: 0,
                co2: 0,

                waterTemp: 0
            },
            upload: {
                fanState: false,
                heatingCoilState: false,
                inputValveState: false,
                outputValveState: false,

                valveOpen: 0,


                fanControl: true,
                inputValveControl: true,
                outputValveControl: true,
                heatingCoilControl: true,
                emergencyControl: true,

                fanFreqInput: 0,
                valveOpenControl: 0,
                setAutoTemp: 0,
                setAutoHumid: 0,
                setAutoPressure: 0
            },
            hiddenUpload:{
                fanAutoOffTemp: 0,
                minByPass: 0,
                maxByPass: 0,
                maxHeatingCoilPercentage: 0
            },
            calUpload: {
                minAO4: 0,
                maxAO4: 0
            },
            controlMode: 0
        };

        return initialState;
    });

    const [reloadKey, setReloadKey] = useState(0);
    function callReload(){
        setReloadKey((prev) => (prev + 1));
    };

    useEffect(() => {
        function SetNewGlobalState(responseData){
            const valveOpen = GetPropValue(responseData, POINT_ID["Độ mở van"], "point_value");
            const pumpOn = GetPropValue(responseData, POINT_ID["On Off Pump"], "point_value");
            const pumpStart = GetPropValue(responseData, POINT_ID["Start Stop Pump"], "point_value");
            const compOn = GetPropValue(responseData, POINT_ID["On Off Comp"], "point_value");
            const pumpFreq = GetPropValue(responseData, POINT_ID["Tần số bơm"], "point_value");
            const waterTemp = GetPropValue(responseData, POINT_ID["Nhiệt độ nước cấp"], "point_value");

            setGlobalState((prev) => ({
                ...prev,
                autoControl: {
                    ...prev.autoControl,
                    currentWaterTemp: waterTemp
                },
                manualControl: {
                    valvePercentage: Number(valveOpen) || 0,
                    pump: Number(pumpOn) === 1,
                    pumpState: Number(pumpStart) === 1,
                    comp: Number(compOn) === 1,
                    frequency: Number(pumpFreq) || 0,
                },
                pointerData: responseData
            }));
        };

        function GetPropValue(objectArray, id, propName){
            const target = objectArray.find(o => o.id === id);
            if(target){
                return target[propName];
            }else{
                return undefined;
            }
        };

        async function fetchData(){
            const GET_URL = "points/list?page=1&ppp=100&device_id=&company_id=5cf4eb1557a81c267803c398";
            try{
                const response  = await axiosInstance.get(GET_URL);
                if(response?.data){
                    SetNewGlobalState(response?.data?.data);
                }else{
                    console.error("Error <!>");
                }
            }catch(err){
                console.error(err);
            }

        };
        fetchData();
    },[axiosInstance, reloadKey]);

    //#endregion

    //#region Control Mode
    //True for auto, false for manual
    const [controlMode, setControlMode] = useState("off");

    function GetControlElement(){
        switch(controlMode){
            case "auto": return (
                <AutoControl 
                    currentAutoData={globalState.autoControl}
                    currentManualData={globalState.manualControl}
                    onDataSubmit={handleAutoDataSubmit}
                    triggerReload={callReload}
                />
            );

            case "manual": return (
                <ManualControl
                    currentManualData={globalState.manualControl} 
                    triggerReload={callReload}
                />
            );

            default: return (
                <div className="control-wrapper">
                    <h2>Please Turn On First</h2>
                </div>
            );
        }
    };
    //#endregion

    //#region Handle Child Submit
    function handleManualStateChange(manualStateData){
        setGlobalState((prev) => ({
            ...prev,
            manualControl: manualStateData
        }));
    }

    function handleAutoStateChange(autoStateData){
        setGlobalState((prev) => ({
            ...prev,
            autoControl: autoStateData
        }));
    }
    //#endregion

    //#region Handle Auto Data Submit

    function handleAutoDataSubmit(field, value){
        setGlobalState((prev) => ({
            ...prev,
            autoControl: {
                ...prev.autoControl,
                [field]: value
            }
        }));
    }

    //#endregion

    //#region Silent reload and Auto Control
    const refreshRate = 30;
    
    //Auto refresh data at refreshRate
    useEffect(() => {

        function SilentSetNewGlobalState(responseData){
            setGlobalState((prev) => ({
               
            }));
        };

        function GetPropValue(objectArray, id, propName){
            const target = objectArray.find(o => o.id === id);
            if(target){
                return target[propName];
            }else{
                return undefined;
            }
        };

        async function fetchData(){
            const GET_URL = "points/list?page=1&ppp=100&device_id=&company_id=5cf4eb1557a81c267803c398";
            try{
                const response  = await silentAxiosInstance.get(GET_URL);
                if(response?.data){
                    SilentSetNewGlobalState(response?.data?.data);
                }else{
                    console.error("Error <!>");
                }
            }catch(err){
                console.error(err);
            }

        };

        const interval = setInterval(async () => {
            fetchData();
        }, refreshRate * 1000);
        return () => clearInterval(interval);
        
    }, [silentAxiosInstance]);
    //#endregion

    return(
        <div className="chiller-management-wrapper">
            <div className="page-header">
                <img 
                    src={BANNER}
                    alt="banner"
                />
                <div className="header-text">
                    <h2>ĐỒ ÁN TỐT NGHIỆP</h2>
                    <h2>ĐIỀU KHIỂN VÀ GIÁM SÁT HỆ THỐNG AHU</h2>
                </div>
            </div>
            <div className="page-body">
                <div className="visual-graph">
                    <VisualGraph 
                        pumpState={true}
                        valveState={true}
                        compState={true}
                    />
                </div>
                <div className="control-display">
                    <div className="statistic-display">
                        <SystemStatus 
                            currentState={globalState}
                            currentMode={controlMode}
                        />
                    </div>

                    <div className="control">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChillerManagement;