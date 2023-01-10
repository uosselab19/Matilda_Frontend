import { ReactElement } from "react";

interface BlankMessageProps {
    isFull: boolean;
    blankMessage: string;
    children: ReactElement<any, any>[]|ReactElement<any, any>;
}

//카드 불러올 때 아무것도 없으면 공백 출력해주는 컴포넌트
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