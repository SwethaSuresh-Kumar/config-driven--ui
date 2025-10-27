import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // import the CSS file

const Dashboard = () => {
    const [config, setConfig] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        fetch("../configuration/config.json")
            .then((res) => res.json())
            .then((data) => {
                setConfig(data);
                const firstCategory = Object.keys(data.categories)[0];
                setActiveCategory(firstCategory);
            });
    }, []);

    if (!config) return <div>Loading...</div>;

    const category = config.categories[activeCategory];

    return (
        <div className="dashboard-container">
            <aside className="dashboard-aside">
                <h1 className="dashboard-header">Config Dashboard</h1>
                <ul className="dashboard-category-list">
                    {Object.entries(config.categories).map(([key, cat]) => (
                        <li
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`dashboard-category-item ${
                                activeCategory === key ? "active" : ""
                            }`}>
                            <span>{cat.icon}</span>
                            <span>{cat.title}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="dashboard-main">
                <h2 className="dashboard-section-header">
                    {category.icon} {category.title}
                </h2>

                <div className="dashboard-card">
                    {category.fields
                        .filter((f) => f.display)
                        .map((field) => (
                            <div key={field.key}>
                                <label className="dashboard-label">{field.label}</label>

                                {field.type === "text" && (
                                    <input
                                        type="text"
                                        placeholder={field.placeholder}
                                        className="dashboard-input"
                                        style={{ borderColor: field.color }}
                                    />
                                )}

                                {field.type === "select" && (
                                    <select
                                        className="dashboard-select"
                                        style={{ borderColor: field.color }}
                                    >
                                        {field.options.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}

                                {field.type === "checkbox" && (
                                    <div className="dashboard-checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            className="dashboard-checkbox"
                                            style={{ accentColor: field.color }}
                                        />
                                        <span>{field.label}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
