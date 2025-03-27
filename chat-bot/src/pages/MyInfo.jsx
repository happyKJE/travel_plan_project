import React, {useState} from "react";

const MyInfo = (userInfo,setUserInfo) => {
    const [editMode, setEditMode] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});

    const handleChange = (e) => {
        setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editedInfo)
            });
            if (res.ok) {
                setUserInfo(editedInfo);
                setEditMode(false);
                alert('✅ 정보 수정 완료!');
            }
        } catch (err) {
            console.error('수정 실패:', err);
        }
    };
    return (
        <section className="profile-section">
            <h3>내 정보</h3>
            {editMode ? (
            <>
                <input name="name" value={editedInfo.name} onChange={handleChange} />
                <input name="email" value={editedInfo.email} onChange={handleChange} />
                <input name="phone" value={editedInfo.phoneNumber} onChange={handleChange} />
                <button onClick={handleSave}>저장</button>
                <button onClick={() => setEditMode(false)}>취소</button>
            </>
            ):
            (<>
                <p>이름: {userInfo.userInfo.name}</p>
                <p>이메일: {userInfo.userInfo.email}</p>
                <p>전화번호: {userInfo.userInfo.phoneNumber}</p>
            </>
            )}

        </section>
    );
};

export default MyInfo;