import './chillerManagement.css';

import { useEffect, useState } from 'react';

import { useAxiosWithAuth } from '../../api/useAxiosWithAuth';
import { useSilentAxiosWithAuth } from '../../api/useSilentAxiosWithAuth';

import { SystemStatus } from './systemStatus';
import { VisualGraph } from './VisualGraph';
import { Control } from './control';

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

            //#region Display
            const inputTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ đầu vào"], "point_value");
            const roomTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ đầu ra"], "point_value");
            const inputHumidValue = GetPropValue(responseData, POINT_ID["Độ ẩm đầu vào"], "point_value");
            const roomHumidValue = GetPropValue(responseData, POINT_ID["Độ ẩm đầu ra"], "point_value");
            const pressureValue = GetPropValue(responseData, POINT_ID["Áp suất gió"], "point_value");
            const heatingCoilTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ PT100"], "point_value");
            const fanFreqValue = GetPropValue(responseData, POINT_ID["Đọc tần số động cơ"], "point_value");
            const co2Value = GetPropValue(responseData, POINT_ID["Nồng độ CO2"], "point_value");
            const waterTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ nước"], "point_value");
            //#endregion
            //#region Upload
            const fanStateValue = GetPropValue(responseData, POINT_ID["Read Value of DO5"], "point_value");
            const heatingCoilStateValue = GetPropValue(responseData, POINT_ID["Trạng thái heating coil"], "point_value");
            const inputValveStateValue = GetPropValue(responseData, POINT_ID["Trạng thái valve 1"], "point_value");
            const outputValveStateValue = GetPropValue(responseData, POINT_ID["Trạng thái valve 2"], "point_value");
            const valveOpenValue = GetPropValue(responseData, POINT_ID["đọc về % mở valve"], "point_value");
            //#endregion
            const controlModeValue = GetPropValue(responseData, POINT_ID["mode chuyển chế độ"], "point_value");
            
            setGlobalState((prev) => ({
                ...prev,
                display : {
                    inputTemp: inputTempValue || -1,
                    roomTemp: roomTempValue || -1,

                    inputHumid: inputHumidValue || -1,
                    roomHumid: roomHumidValue || -1,

                    pressure: pressureValue || -1,
                    heatingCoilTemp: heatingCoilTempValue || -1,

                    fanFreq: fanFreqValue || -1,
                    co2: co2Value || -1,

                    waterTemp: waterTempValue || -1
                },
                upload: {
                    ...prev.upload,
                    fanState: fanStateValue,
                    heatingCoilState: heatingCoilStateValue,
                    inputValveState: inputValveStateValue,
                    outputValveState: outputValveStateValue,

                    valveOpen: valveOpenValue || -1,
                },
                controlMode: controlModeValue || -1
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
    function handleModeSwitch(value){
        setGlobalState((prev) => ({
            ...prev,
            controlMode: value
        }));
    }
    //#endregion

    //#region Silent reload and Auto Control
    const [refreshRate, setRefreshRate] = useState(() => {return 5});
    //Auto refresh data at refreshRate
    useEffect(() => {

         function SlientlySetNewGlobalState(responseData){

            //#region Display
            const inputTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ đầu vào"], "point_value");
            const roomTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ đầu ra"], "point_value");
            const inputHumidValue = GetPropValue(responseData, POINT_ID["Độ ẩm đầu vào"], "point_value");
            const roomHumidValue = GetPropValue(responseData, POINT_ID["Độ ẩm đầu ra"], "point_value");
            const pressureValue = GetPropValue(responseData, POINT_ID["Áp suất gió"], "point_value");
            const heatingCoilTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ PT100"], "point_value");
            const fanFreqValue = GetPropValue(responseData, POINT_ID["Đọc tần số động cơ"], "point_value");
            const co2Value = GetPropValue(responseData, POINT_ID["Nồng độ CO2"], "point_value");
            const waterTempValue = GetPropValue(responseData, POINT_ID["Nhiệt độ nước"], "point_value");
            //#endregion
            //#region Upload
            const fanStateValue = GetPropValue(responseData, POINT_ID["Read Value of DO5"], "point_value");
            const heatingCoilStateValue = GetPropValue(responseData, POINT_ID["Trạng thái heating coil"], "point_value");
            const inputValveStateValue = GetPropValue(responseData, POINT_ID["Trạng thái valve 1"], "point_value");
            const outputValveStateValue = GetPropValue(responseData, POINT_ID["Trạng thái valve 2"], "point_value");
            const valveOpenValue = GetPropValue(responseData, POINT_ID["đọc về % mở valve"], "point_value");
            //#endregion
            const controlModeValue = GetPropValue(responseData, POINT_ID["mode chuyển chế độ"], "point_value");
            
            setGlobalState((prev) => ({
                ...prev,
                display : {
                    inputTemp: inputTempValue || -1,
                    roomTemp: roomTempValue || -1,

                    inputHumid: inputHumidValue || -1,
                    roomHumid: roomHumidValue || -1,

                    pressure: pressureValue || -1,
                    heatingCoilTemp: heatingCoilTempValue || -1,

                    fanFreq: fanFreqValue || -1,
                    co2: co2Value || -1,

                    waterTemp: waterTempValue || -1
                },
                upload: {
                    ...prev.upload,
                    fanState: fanStateValue,
                    heatingCoilState: heatingCoilStateValue,
                    inputValveState: inputValveStateValue,
                    outputValveState: outputValveStateValue,

                    valveOpen: valveOpenValue || -1,
                },
                controlMode: controlModeValue || -1
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
                    SlientlySetNewGlobalState(response?.data?.data);
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
        
    }, [silentAxiosInstance, refreshRate]);
    //#endregion

    //#region Control Submission
    function handleSwitchButton(field, value){
        setGlobalState((prev) => ({
            ...prev,
            upload:{
                ...prev.upload,
                [field]: value
            }
        }));
    }

    function handleValueSubmit(field, value){
        setGlobalState((prev) => ({
            ...prev,
            upload:{
                ...prev.upload,
                [field]: value
            }
        }));
    }

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
                        currentState={globalState}
                    />
                </div>
                <div className="control-display">
                    <div className="statistic-display">
                        <SystemStatus 
                            currentState={globalState}
                        />
                    </div>

                    <div className="control">
                        <Control 
                            currentState={globalState}
                            onModeSwitch={handleModeSwitch}
                            onButtonPress={handleSwitchButton}
                            onValueSubmit={handleValueSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChillerManagement;