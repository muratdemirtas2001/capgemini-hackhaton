const AdminNavigationItem = ({ page, onClick, active }) => {
    return (
        active ? (
            <div>

                <p onClick={onClick} className="bold-text"> {page} </p>
            </div>
        ) : (
        <p onClick={onClick}> {page} </p>
        )
    );
};

export default AdminNavigationItem;