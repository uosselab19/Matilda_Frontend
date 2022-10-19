import { ReactElement } from "react";

interface BlankMessageProps {
    isFull: boolean;
    blankMessage: string;
    children: ReactElement<any, any>[]|ReactElement<any, any>;
}

export const BlankMessage = (props: BlankMessageProps) => {
    const { isFull, blankMessage, children } = props;
    return (isFull) ?
        (
            <div>
                {children}
            </div>
        )
        :
        (
            <div className="d-flex justify-content-center py-2">
                {blankMessage}
            </div>
        );
}