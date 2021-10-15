import AdminNavigationItem from "../components/AdminNavigationItem/AdminNavigationItem";

const createNavigationLinks = (pageOptions, currentPage, setCurrentPage) => {
    return pageOptions.map((page) => {
        const updateCurrentPage = () => {
            setCurrentPage(page);
        };
        const onClick = updateCurrentPage;
        const active = page === currentPage ? true : false;
        return (
            <AdminNavigationItem page={page} onClick={onClick} active={active} />
        );
    }
    );

};

export default createNavigationLinks;