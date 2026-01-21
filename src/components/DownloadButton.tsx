import React from 'react';

interface DownloadButtonProps {
  onClick?: () => void;
  tooltip?: string;
  ariaLabel?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, tooltip = "Download", ariaLabel = "Download" }) => {
  return (
    <>
      <style>{`
        .download-btn-wrapper .download-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 50%;
          background-color: rgb(27, 27, 27);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: background-color 0.3s, transform 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);
          padding: 0;
        }

        .download-btn-wrapper .download-btn:hover {
          background-color: hsl(var(--primary));
          transform: scale(1.05);
        }

        .download-btn-wrapper .svgIcon {
          fill: hsl(var(--primary));
          width: 1em;
          height: 1em;
          transition: fill 0.3s;
          flex-shrink: 0;
        }

        .download-btn-wrapper .download-btn:hover .svgIcon {
          fill: black;
          animation: slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .download-btn-wrapper .icon2 {
          width: 10px;
          height: 2px;
          border-bottom: 2px solid hsl(var(--primary));
          border-left: 2px solid hsl(var(--primary));
          border-right: 2px solid hsl(var(--primary));
          transition: border-color 0.3s;
          position: absolute;
          bottom: 4px;
        }

        .download-btn-wrapper .download-btn:hover .icon2 {
          border-bottom: 2px solid black;
          border-left: 2px solid black;
          border-right: 2px solid black;
        }

        .download-btn-wrapper .tooltip {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          background-color: rgb(12, 12, 12);
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
          pointer-events: none;
          letter-spacing: 0.5px;
          white-space: nowrap;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .download-btn-wrapper .tooltip::after {
          position: absolute;
          content: "";
          width: 8px;
          height: 8px;
          background-color: rgb(12, 12, 12);
          transform: rotate(45deg);
          right: -4px;
          top: 50%;
          margin-top: -4px;
        }

        .download-btn-wrapper .download-btn:hover .tooltip {
          opacity: 1;
        }

        @keyframes slide-in-top {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }
      `}</style>

      <div className="download-btn-wrapper">
        <button className="download-btn" onClick={onClick} aria-label={ariaLabel} type="button">
          <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
          <span className="icon2" />
          <span className="tooltip">{tooltip}</span>
        </button>
      </div>
    </>
  );
}

export default DownloadButton;
