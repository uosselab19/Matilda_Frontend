interface Subpage {
    key: string;
    page: JSX.Element | undefined;
}

interface SubpageProps {
    selectedKey: string;
    pages: Subpage[];
}

export const Subpage = (props: SubpageProps) => {
    const { selectedKey, pages } = props;

    const selectedPage = (pages.find((e) => { return e["key"]==selectedKey; }))?.page;
    return selectedPage ? selectedPage : null;
};
