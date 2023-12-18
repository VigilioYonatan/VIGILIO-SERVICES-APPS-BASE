interface LoaderProps {
    width?: number;
    height?: number;
    border?: number;
}
function Loader({ height = 40, width = 40, border = 6 }: LoaderProps) {
    return (
        <>
            <div class="lds-ring">
                <div />
                <div />
                <div />
                <div />
            </div>
            <style jsx>
                {`
                    .lds-ring {
                        display: block;
                        margin: 0 auto;
                        position: relative;
                    }
                    .lds-ring div {
                        box-sizing: border-box;
                        display: block;
                        position: absolute;
                        width: ${width}px;
                        height: ${height}px;
                        margin: 8px;
                        border: ${border}px solid var(--primary);
                        border-radius: 50%;
                        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1)
                            infinite;
                        border-color: var(--primary) transparent transparent
                            transparent;
                    }
                    .lds-ring div:nth-child(1) {
                        animation-delay: -0.45s;
                    }
                    .lds-ring div:nth-child(2) {
                        animation-delay: -0.3s;
                    }
                    .lds-ring div:nth-child(3) {
                        animation-delay: -0.15s;
                    }
                    @keyframes lds-ring {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </>
    );
}

export default Loader;
