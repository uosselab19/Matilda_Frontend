interface Subpage {
    key: string;
    page: JSX.Element | undefined;
}

interface SubpageProps {
    selectedKey: string;
    pages: Subpage[];
}

// 네비게이션 컴포넌트로부터 렌더링되는 서브페이지를 구현하는 함수
export const Subpage = (props: SubpageProps) => {
    const { selectedKey, pages } = props;

    const selectedPage = (pages.find((e) => { return e["key"]==selectedKey; }))?.page;
    return selectedPage ? selectedPage : null;
};
