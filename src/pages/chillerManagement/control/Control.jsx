import './Control.css';

import { InputButton } from '../../../common/InputButton';
import { InputCase } from '../../../common/InputCase';

import ModeSwitcher from './ModeSwitcher/ModeSwitcher.jsx';

function Control({currentState, onModeSwitch, onButtonPress, onValueSubmit}){

    function handleModeSwitch(value){
        onModeSwitch && onModeSwitch(value);
    }

    function handleButtonPress(field, value){
        onButtonPress && onButtonPress(field, value);
    }

    function handleValueSubmit(field, value){
        onValueSubmit && onValueSubmit(field, value);
    }

    return(
        <div className="control-element">
            <div className="control-title">
                <h2>Điều khiển</h2>
            </div>
            <div className="control-controller">
                {
                    currentState.controlMode === 1 ? 
                    (
                        <div className="auto-control">
                            <div className="control-buttons">
                                <InputButton 
                                    title={"Quạt"}
                                    field={"fanState"}
                                    value={currentState.upload.fanState}
                                />
                                <InputButton 
                                    title={"Valve Cấp"}
                                    field={"inputValveState"}
                                    value={currentState.upload.inputValveState}
                                />
                                <InputButton 
                                    title={"Valve Hồi"}
                                    field={"outputValveState"}
                                    value={currentState.upload.outputValveState}
                                />
                                <InputButton 
                                    title={"Heating Coil"}
                                    field={"heatingCoilState"}
                                    value={currentState.upload.heatingCoilState}
                                />
                                <InputButton 
                                    title={"Tắt Khẩn Cấp"}
                                    field={"emergencyControl"}
                                    value={false}
                                />
                            </div>
                            <div className="control-input">
                                <InputCase 
                                    key={1001}
                                    title={"Nhiệt độ"}
                                    field={"setAutoTemp"}
                                    value={currentState.upload.setAutoTemp}
                                    onSubmit={handleValueSubmit}
                                />
                                <InputCase
                                    key={1002}
                                    title={"Độ ẩm"}
                                    field={"setAutoHumid"}
                                    value={currentState.upload.setAutoHumid}
                                    onSubmit={handleValueSubmit}
                                />
                                <InputCase 
                                    key={1003}
                                    title={"Áp Suất"}
                                    field={"setAutoPressure"}
                                    value={currentState.upload.setAutoPressure}
                                    onSubmit={handleValueSubmit}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="manual-control">
                            <div className="control-buttons">
                                <InputButton 
                                    title={"Quạt"}
                                    //field={"fanControl"}
                                    field={"fanState"}
                                    value={currentState.upload.fanState}
                                    onChange={handleButtonPress}
                                />
                                <InputButton 
                                    title={"Valve Cấp"}
                                    //field={"inputValveControl"}
                                    field={"inputValveState"}
                                    value={currentState.upload.inputValveState}
                                    onChange={handleButtonPress}
                                />
                                <InputButton 
                                    title={"Valve Hồi"}
                                    //field={"outputValveControl"}
                                    field={"outputValveState"}
                                    value={currentState.upload.outputValveState}
                                    onChange={handleButtonPress}
                                />
                                <InputButton 
                                    title={"Heating Coil"}
                                    //field={"heatingCoilControl"}
                                    field={"heatingCoilState"}
                                    value={currentState.upload.heatingCoilState}
                                    onChange={handleButtonPress}
                                />
                                <InputButton 
                                    title={"Tắt Khẩn Cấp"}
                                    field={"emergencyControl"}
                                    value={false}
                                />
                            </div>
                            <div className="control-input">
                                <InputCase 
                                    key={2001}
                                    title={"Tần số quạt"}
                                    field={"fanFreqInput"}
                                    // value={currentState.display.fanFreq}
                                    value={currentState.upload.fanFreqInput}
                                    onSubmit={handleValueSubmit}
                                />
                                <InputCase 
                                    key={2002}
                                    title={"Góc mở van By Pass"}
                                    field={"valveOpen"}
                                    value={currentState.upload.valveOpen}
                                    onSubmit={handleValueSubmit}
                                />
                            </div>
                        </div>
                    )
                }

                <div className="mode-control">
                    <ModeSwitcher 
                        currentMode={currentState.controlMode}
                        onModeSwitch={handleModeSwitch}
                    />
                </div>
            </div>
        </div>
    )
}

export default Control;