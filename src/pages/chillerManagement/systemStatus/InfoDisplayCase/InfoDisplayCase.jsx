import './InfoDisplayCase.css';

/**
 * icon = image.
 * info = [], inside {title, value}
 * @param {*} param0 
 * @returns 
 */
function InfoDisplayCase({icon, info = []}){
    return (
        <div className="info-display-case">
            <img 
                src={icon}
                alt='case-icon'
                style={{height: 40, width:40}}
            />
            <div className="detail-container">
                {info.map((detail, index) => {
                    return(
                        <div className="detail"
                            key={index + 1000}
                        >
                            <label>{detail?.title}: </label>
                            <p>{detail?.value} {}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InfoDisplayCase;