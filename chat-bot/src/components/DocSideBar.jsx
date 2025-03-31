const DocSidebar = () => {
    const menuItems = [
        { id: "overview", label: "프로젝트 개요" },
        { id: "stack", label: "기술 스택" },
        { id: "features", label: "주요 기능" },
        { id: "schema", label: "DB 스키마" },
        { id: "api", label: "REST API" },
        { id: "review", label: "자체 평가" },
    ];

    const handleClick = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="doc-sidebar">
            <ul>
                {menuItems.map(item => (
                    <li key={item.id} onClick={() => handleClick(item.id)}>
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
