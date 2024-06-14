/* eslint-disable react/prop-types */
import './toolTip.scss';

export default function ToolTip({ message, children }) {
    return (
        <div className="tooltip">
            <span className="tooltip-text">{message}</span>
            {children}
        </div>
    );
}
